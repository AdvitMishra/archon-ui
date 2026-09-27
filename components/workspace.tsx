'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import html2canvas from 'html2canvas';
import { Monitor, Smartphone, Copy, Check, Download, Mic, MicOff, RotateCcw, AlertCircle } from 'lucide-react';
import { useWorkspace } from '@/lib/store';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { AUDIENCES } from '@/lib/constants';
import { GenerateButton } from '@/components/generate-button';
import { SynthesisLoadingState } from '@/components/synthesis-loading';
import { SandboxBorderContainer } from '@/components/sandbox-border-container';
import { VibeStyleTransitionPanel } from '@/components/vibe-style-panel';
import { ScorecardDisclosure } from '@/components/scorecard-disclosure';
import { HeaderTextLoop } from '@/components/header-text-loop';
import { TechStackSlider } from '@/components/tech-stack-slider';
import ArchonQuickToolbar from '@/components/quick-toolbar';

const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => <div className="p-4 font-mono text-xs text-zinc-500">Loading editor...</div>,
});

const DEFAULT_CODE = `export default function StarterHero() {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center bg-zinc-50 p-10 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
        Your component will render here
      </h1>
      <p className="mt-2 max-w-md text-sm text-zinc-500">
        Describe what you want in plain English, then press Generate.
      </p>
    </div>
  );
}`;

export function Workspace() {
  const state = useWorkspace();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  const onTranscript = useCallback(
    (text: string, final: boolean) => {
      if (final) state.setPrompt((state.prompt ? state.prompt + ' ' : '') + text.trim());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.prompt]
  );
  const { isListening, toggle, supported } = useSpeechRecognition(onTranscript);

  const jsxCode = state.jsxCode || DEFAULT_CODE;
  const componentName = state.componentName || 'StarterHero';

  const srcDoc = useMemo(() => {
    const safeCode = JSON.stringify(jsxCode);
    const safeName = JSON.stringify(componentName);
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<script src="https://cdn.tailwindcss.com"></script>
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<style>body { margin: 0; }</style>
</head>
<body>
<div id="root"></div>
<script>
  try {
    var raw = ${safeCode};
    var name = ${safeName};
    var cleaned = raw.replace(/export\\s+default\\s+/g, '').replace(/import[^;]+;/g, '');
    var compiled = Babel.transform(cleaned, { presets: ['react'] }).code;
    var factory = new Function('React', 'ReactDOM', compiled + '; return typeof ' + name + " !== 'undefined' ? " + name + ' : null;');
    var Component = factory(React, ReactDOM);
    if (!Component) throw new Error('Component ' + name + ' not found');
    ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(Component));
  } catch (err) {
    document.getElementById('root').innerHTML =
      '<pre style="color:#f87171;padding:16px;font-size:12px;white-space:pre-wrap;">' + String(err && err.message ? err.message : err) + '</pre>';
  }
</script>
</body>
</html>`;
  }, [jsxCode, componentName]);

  const generate = useCallback(async () => {
    if (!state.prompt.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: state.prompt,
          stylePreset: state.stylePreset,
          audienceTarget: state.audienceTarget,
          history: state.history,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Synthesis failed');
      state.applySynthesis({
        componentName: data.componentName,
        jsxCode: data.jsxCode,
        scorecard: data.designScorecard,
        userPrompt: state.prompt,
      });
      state.setPrompt('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.prompt, state.stylePreset, state.audienceTarget, state.history, isLoading]);

  const copyCode = useCallback(async () => {
    await navigator.clipboard.writeText(jsxCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [jsxCode]);

  const exportPng = useCallback(async () => {
    const node = captureRef.current;
    if (!node) return;
    const canvas = await html2canvas(node, { backgroundColor: '#09090b', useCORS: true });
    const link = document.createElement('a');
    link.download = `${componentName || 'archon-component'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, [componentName]);

  const copyShareLink = useCallback(async () => {
    await navigator.clipboard.writeText(window.location.href);
  }, []);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-40 sm:px-6">
      <div className="border-b border-zinc-800 py-6" id="prompt">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-100">Synthesis Workspace</h2>
            <HeaderTextLoop />
          </div>
          <TechStackSlider />
        </div>
      </div>

      <div className="grid gap-6 py-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="flex flex-col gap-4">
          <label htmlFor="prompt-input" className="text-sm font-medium text-zinc-300">
            Describe your component
          </label>
          <div className="relative">
            <textarea
              id="prompt-input"
              value={state.prompt}
              onChange={(event) => state.setPrompt(event.target.value)}
              onKeyDown={(event) => {
                if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') generate();
              }}
              rows={5}
              placeholder="Example: A pricing section with three tiers, a monthly and yearly toggle, and a highlighted recommended plan."
              className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900 p-3 pr-12 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-zinc-700 focus:outline-none"
            />
            <button
              onClick={toggle}
              disabled={!supported}
              aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
              title={supported ? 'Voice input' : 'Voice input is not supported in this browser'}
              className={`absolute bottom-3 right-3 rounded-md p-2 transition-colors ${
                isListening
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'
              } disabled:cursor-not-allowed disabled:opacity-40`}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <GenerateButton onClick={generate} isLoading={isLoading} />
            <button
              onClick={state.reset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 px-3 py-2 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-200"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset session
            </button>
            {isLoading && <SynthesisLoadingState />}
          </div>

          {isListening && (
            <p className="text-xs text-emerald-400">Listening. Speak your component description.</p>
          )}
          {error && (
            <p className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" /> {error}
            </p>
          )}

          <div>
            <label htmlFor="audience-select" className="mb-1.5 block text-sm font-medium text-zinc-300">
              Target audience
            </label>
            <select
              id="audience-select"
              value={state.audienceTarget}
              onChange={(event) => state.setAudience(event.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 focus:border-zinc-700 focus:outline-none"
            >
              {AUDIENCES.map((audience) => (
                <option key={audience} value={audience}>
                  {audience}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-xs text-zinc-500">
              The audience shifts placeholder copy inside the generated component to match the demographic.
            </p>
          </div>

          <VibeStyleTransitionPanel
            onSelectPreset={state.setStylePreset}
            selectedPreset={state.stylePreset}
          />

          <ScorecardDisclosure scorecard={state.scorecard} />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-zinc-200" id="sandbox">
              Live Sandbox
            </h3>
            <div className="flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 p-1">
              <button
                onClick={() => state.setViewport('desktop')}
                aria-label="Desktop viewport"
                className={`rounded-md p-1.5 transition-colors ${state.viewport === 'desktop' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <Monitor className="h-4 w-4" />
              </button>
              <button
                onClick={() => state.setViewport('mobile')}
                aria-label="Mobile viewport"
                className={`rounded-md p-1.5 transition-colors ${state.viewport === 'mobile' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <Smartphone className="h-4 w-4" />
              </button>
            </div>
          </div>

          <SandboxBorderContainer isLoading={isLoading}>
            <div className="flex justify-center">
              <div
                ref={captureRef}
                className={`overflow-hidden rounded-lg bg-white transition-all duration-300 ${state.viewport === 'mobile' ? 'w-[375px] max-w-full' : 'w-full'}`}
              >
                <iframe
                  ref={iframeRef}
                  title="Component sandbox preview"
                  srcDoc={srcDoc}
                  sandbox="allow-scripts allow-same-origin"
                  className={`w-full border-0 ${state.viewport === 'mobile' ? 'h-[640px]' : 'h-[420px]'}`}
                />
              </div>
            </div>
          </SandboxBorderContainer>

          <div className="flex items-center justify-between" id="code">
            <h3 className="text-sm font-semibold text-zinc-200">Generated code</h3>
            <div className="flex gap-2">
              <button
                onClick={copyCode}
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-900"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy code'}
              </button>
              <button
                onClick={exportPng}
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-900"
              >
                <Download className="h-3.5 w-3.5" /> Export PNG
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-zinc-800">
            <Editor
              height="380px"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={jsxCode}
              onChange={(value) => useWorkspace.setState({ jsxCode: value || '' })}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily: 'var(--font-jetbrains), monospace',
                wordWrap: 'on',
                scrollBeyondLastLine: false,
                readOnly: isLoading,
              }}
            />
          </div>
        </div>
      </div>

      <ArchonQuickToolbar
        onVoice={toggle}
        onAudience={state.setAudience}
        onPreset={state.setStylePreset}
        onExportPng={exportPng}
        onCopyLink={copyShareLink}
      />
    </div>
  );
}
