import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Archon UI collects, uses, and protects your data.',
};

const SECTIONS = [
  {
    heading: '1. What we collect',
    body: [
      'Prompts you type or dictate. Voice recognition runs in your browser through the native Web Speech API. Audio is processed by your browser vendor, not by our servers, and we never receive the raw audio.',
      'Generated component code, scorecard output, and session history. Session history is held in memory in your browser tab and is cleared when you reset the session or close the tab. We do not operate user accounts.',
      'Standard server logs. Our hosting provider records request metadata such as IP address, user agent, and timestamp for security and abuse prevention.',
    ],
  },
  {
    heading: '2. How we use it',
    body: [
      'Your prompt, selected style preset, and audience setting are sent to our serverless API route so they can be forwarded to the Google Gemini 2.0 Flash model to generate component code and a design scorecard.',
      'We do not sell your data, we do not use your prompts to train models, and we do not share prompts with third parties beyond the model provider described below.',
    ],
  },
  {
    heading: '3. Third-party processing',
    body: [
      'Google AI Studio (Gemini API) processes prompt text to produce generations and is subject to the Google Privacy Policy and the Gemini API terms of service.',
      'The sandbox preview loads the Tailwind CSS CDN, React UMD builds, and Babel Standalone from public CDNs to render your component. Those requests expose your IP address to the CDN operators.',
      'The Monaco editor and fonts are loaded from their respective public distribution endpoints.',
    ],
  },
  {
    heading: '4. Data retention',
    body: [
      'Prompt text exists only for the lifetime of the request and is not written to a database by this application.',
      'Rate limiting is performed with an in-memory counter on the server and contains no personal data.',
    ],
  },
  {
    heading: '5. Your choices',
    body: [
      'You can use the application without an account and without cookies for tracking.',
      'If you want a record of your session deleted from server logs, contact us with the approximate time of the request and we will purge it where our hosting provider allows.',
    ],
  },
  {
    heading: '6. Children',
    body: ['Archon UI is not directed at children under 13, and we do not knowingly collect data from them.'],
  },
  {
    heading: '7. Changes',
    body: ['If this policy changes, the revised version will be posted on this page with an updated effective date.'],
  },
  {
    heading: '8. Contact',
    body: ['For privacy questions, reach us through the contact channel listed on the Archon UI site.'],
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">Privacy Policy</h1>
        <p className="mt-2 text-sm text-zinc-500">Effective date: September 27, 2026</p>
        <div className="mt-8 flex flex-col gap-8">
          {SECTIONS.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-semibold text-zinc-100">{section.heading}</h2>
              <div className="mt-2 flex flex-col gap-2">
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-zinc-400">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
        <p className="mt-10 rounded-lg border border-amber-500/20 bg-amber-500/10 p-4 text-xs leading-relaxed text-amber-300">
          This is a template written for the Archon UI application. Have a qualified lawyer review it
          before you launch, especially if you add accounts, analytics, or payments.
        </p>
      </main>
      <Footer />
    </>
  );
}
