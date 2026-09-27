# Archon UI

Natural Language Web Component Synthesizer and Live Sandbox.

## What it does

Describe a web component in plain English or by voice. The app returns a self-contained React component styled with Tailwind CSS, renders it live in a sandboxed iframe with desktop and mobile viewports, and attaches a plain-language design scorecard. Style presets and a target audience switcher reshape the design rules and placeholder copy without editing CSS.

## Stack

- Next.js 14 (App Router) with a serverless route at `app/api/synthesize`
- Gemini 2.0 Flash through `@google/genai` with a structured JSON response schema
- Tailwind CSS, Lucide icons, motion primitives built on `motion/react`
- Monaco editor, html2canvas PNG export, Zustand state, Web Speech API voice input

## Run locally

1. `npm install`
2. Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY`
3. `npm run dev` and open http://localhost:3000

## Deploy checklist (do not launch before this is done)

- [ ] Connect the custom domain in your hosting dashboard
- [ ] Confirm the favicon renders (app/icon.svg is included)
- [ ] Confirm no platform badge or Made with AI tag is present on the live site
- [ ] Review the Privacy Policy and Terms pages with a lawyer and fill in operator details
- [ ] Rotate the Gemini API key if it was ever shared in a document or chat

## Security note

The API key is read only from `process.env.GEMINI_API_KEY` inside the server route. Never hardcode keys, and never expose them with a NEXT_PUBLIC_ prefix.
