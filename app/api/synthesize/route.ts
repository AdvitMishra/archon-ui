import { GoogleGenAI, Type } from '@google/genai';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Simple in-memory rate limit
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 15;
const requestLog: number[] = [];

function withinRateLimit() {
  const now = Date.now();

  while (
    requestLog.length &&
    now - requestLog[0] > WINDOW_MS
  ) {
    requestLog.shift();
  }

  if (requestLog.length >= MAX_REQUESTS) {
    return false;
  }

  requestLog.push(now);
  return true;
}

// Gemini response structure
const responseSchema = {
  type: Type.OBJECT,

  properties: {
    componentName: {
      type: Type.STRING,
    },

    jsxCode: {
      type: Type.STRING,
    },

    designScorecard: {
      type: Type.OBJECT,

      properties: {
        uxScore: {
          type: Type.NUMBER,
        },

        brandVoice: {
          type: Type.STRING,
        },

        critique: {
          type: Type.STRING,
        },

        copywritingSuggestions: {
          type: Type.STRING,
        },

        improvements: {
          type: Type.ARRAY,

          items: {
            type: Type.STRING,
          },
        },
      },

      required: [
        'uxScore',
        'brandVoice',
        'critique',
        'copywritingSuggestions',
        'improvements',
      ],
    },
  },

  required: [
    'componentName',
    'jsxCode',
    'designScorecard',
  ],
};

export async function POST(req: Request) {
  try {
    // --------------------------------
    // Rate limit
    // --------------------------------

    if (!withinRateLimit()) {
      return NextResponse.json(
        {
          error:
            'Rate limit reached. Please try again shortly.',
        },
        {
          status: 429,
        }
      );
    }

    // --------------------------------
    // API key
    // --------------------------------

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            'Server is missing GEMINI_API_KEY. Add it to .env.local and restart.',
        },
        {
          status: 500,
        }
      );
    }

    // --------------------------------
    // Read request
    // --------------------------------

    const body = await req.json();

    const {
      prompt,
      stylePreset,
      audienceTarget,
      history,
    } = body as {
      prompt: string;
      stylePreset: string;
      audienceTarget: string;

      history?: {
        role: string;
        text: string;
      }[];
    };

    // --------------------------------
    // Validate prompt
    // --------------------------------

    if (
      !prompt ||
      typeof prompt !== 'string' ||
      prompt.trim().length === 0
    ) {
      return NextResponse.json(
        {
          error: 'A prompt is required.',
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------
    // Gemini client
    // --------------------------------

    const ai = new GoogleGenAI({
      apiKey,
    });

    // --------------------------------
    // Previous conversation
    // --------------------------------

    const priorContext = (history ?? [])
      .slice(-8)
      .map(
        (entry) =>
          `${entry.role === 'user' ? 'User' : 'Assistant'}: ${entry.text}`
      )
      .join('\n');

    // --------------------------------
    // Prompt
    // --------------------------------

    const contents = [
      priorContext
        ? `Conversation so far:\n${priorContext}\n`
        : '',

      `Build or update a React component for: "${prompt}".`,

      `Applied Style Vibe: "${stylePreset}".`,

      `Target Audience Copy: "${audienceTarget}".`,

      'The jsxCode must be a single self-contained React function component using Tailwind CSS classes only, with no imports and no export statements other than a default export of the component.',
    ]
      .filter(Boolean)
      .join('\n');

    // --------------------------------
    // Gemini request
    // --------------------------------

    console.log('Sending request to Gemini...');

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',

      contents,

      config: {
        systemInstruction:
          'You are an expert React developer and UI/UX designer. Output clean React component code using inline Tailwind CSS alongside a plain-English design critique. Never invent testimonials, user counts, or statistics. Use concrete, specific interface copy. Do not use em dashes anywhere.',

        responseMimeType: 'application/json',

        responseSchema,
      },
    });

    // --------------------------------
    // Parse response
    // --------------------------------

    const text = response.text || '{}';

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (parseError) {
      console.error(
        'Gemini returned invalid JSON:',
        text
      );

      return NextResponse.json(
        {
          error: 'Gemini returned invalid JSON.',
          details:
            parseError instanceof Error
              ? parseError.message
              : String(parseError),
        },
        {
          status: 502,
        }
      );
    }

    // --------------------------------
    // Return result
    // --------------------------------

    return NextResponse.json(parsed);
  } catch (error) {
    // --------------------------------
    // Error handling
    // --------------------------------

    console.error(
      'GEMINI SYNTHESIS ERROR:',
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : String(error);

    // Gemini temporarily unavailable
    if (
      message.includes('503') ||
      message.includes('UNAVAILABLE') ||
      message.includes('high demand')
    ) {
      return NextResponse.json(
        {
          error:
            'Gemini is temporarily busy. Please try again shortly.',
          details: message,
        },
        {
          status: 503,
        }
      );
    }

    // Other errors
    return NextResponse.json(
      {
        error: 'Synthesis failed.',
        details: message,
      },
      {
        status: 500,
      }
    );
  }
}