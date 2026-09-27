import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'The terms that govern your use of Archon UI.',
};

const SECTIONS = [
  {
    heading: '1. Acceptance of terms',
    body: ['By accessing or using Archon UI, you agree to these Terms and Conditions. If you do not agree, do not use the service.'],
  },
  {
    heading: '2. The service',
    body: [
      'Archon UI is a workspace that converts natural language prompts into React and Tailwind CSS component code, renders that code in a preview sandbox, and returns an automated design critique.',
      'The service is provided on a free-tier basis and may be rate limited, modified, or interrupted without notice.',
    ],
  },
  {
    heading: '3. Your content',
    body: [
      'You retain ownership of the prompts you submit and the code generated from them. You grant us only the limited right to transmit your prompts to the model provider for the purpose of generating a response.',
      'You are responsible for the prompts you submit and for reviewing generated code before using it in production. Generated output may contain errors, and you should treat it as a draft.',
    ],
  },
  {
    heading: '4. Acceptable use',
    body: [
      'You agree not to submit unlawful, harmful, or infringing content, not to attempt to extract API keys or server internals, not to abuse the rate limits, and not to present generated output as legal, financial, or professional advice.',
    ],
  },
  {
    heading: '5. Intellectual property',
    body: [
      'The Archon UI name, interface, and underlying software are owned by the operator of this site. Third-party libraries and trademarks remain the property of their respective owners.',
    ],
  },
  {
    heading: '6. Disclaimer of warranties',
    body: [
      'The service is provided as is and as available, without warranties of any kind, express or implied, including fitness for a particular purpose and non-infringement. We do not warrant that generations will be accurate, secure, or suitable for your use case.',
    ],
  },
  {
    heading: '7. Limitation of liability',
    body: [
      'To the maximum extent permitted by law, the operator is not liable for indirect, incidental, or consequential damages, including lost profits or lost data, arising from your use of the service.',
    ],
  },
  {
    heading: '8. Termination',
    body: ['We may restrict or terminate access for abuse of the service or violation of these terms, without prior notice.'],
  },
  {
    heading: '9. Governing law',
    body: ['These terms are governed by the laws of the jurisdiction where the operator is established, without regard to conflict of law rules.'],
  },
  {
    heading: '10. Changes',
    body: ['We may update these terms from time to time. Continued use after a change constitutes acceptance of the revised terms.'],
  },
];

export default function Terms() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">Terms and Conditions</h1>
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
          before you launch, and replace the jurisdiction and operator details with your own.
        </p>
      </main>
      <Footer />
    </>
  );
}
