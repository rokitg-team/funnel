import { FlagValues } from 'flags/react';
import type { Metadata } from 'next';
import { Bebas_Neue, DM_Sans, Space_Mono } from 'next/font/google';
import { headers } from 'next/headers';
import Script from 'next/script';
import { Suspense } from 'react';
import { mainCtaFlag, whopCtaExperiment } from '@/flags';
import { getFunnelLocale } from '@/lib/marketing-locale';
import { getSiteUrl, SITE_ORIGIN } from '@/lib/site';
import './globals.css';

const assistLoopAgentId =
  process.env.NEXT_PUBLIC_help_ASSISTLOOP_AGENT_ID ?? process.env.NEXT_PUBLIC_ASSISTLOOP_AGENT_ID;

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas-neue',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: 'RokitG — Direct Lifetime Access To The Circle',
  description:
    'Buy lifetime access to The Circle on-site. Skip recurring billing and get real-time memecoin and altcoin signals, private community access, and the live edge.',
  openGraph: {
    title: 'RokitG — Direct Lifetime Access To The Circle',
    description:
      'Skip recurring billing. Lock in lifetime access to The Circle with real-time signals, private community access, and a live edge.',
    url: getSiteUrl('/'),
    siteName: 'RokitG',
    type: 'website',
    images: [
      {
        url: getSiteUrl('/opengraph-image'),
        width: 1200,
        height: 630,
        alt: 'RokitG lifetime access preview card for The Circle',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RokitG — Direct Lifetime Access To The Circle',
    description:
      'Skip recurring billing. Lock in lifetime access to The Circle with real-time signals, private community access, and a live edge.',
    images: [getSiteUrl('/opengraph-image')],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = getFunnelLocale(await headers());
  const [mainCta, ctaVariant] = await Promise.all([mainCtaFlag(), whopCtaExperiment()]);

  return (
    <html
      lang={locale}
      className={`${spaceMono.variable} ${bebasNeue.variable} ${dmSans.variable}`}
    >
      <body>
        {children}
        <Suspense fallback={null}>
          <FlagValues values={{ 'main-cta': mainCta, 'whop-cta-experiment': ctaVariant }} />
        </Suspense>
        <Script async src="https://tally.so/widgets/embed.js" />
        <Script src="https://assistloop.ai/assistloop-widget.js" strategy="afterInteractive" />
        {assistLoopAgentId ? (
          <Script id="assistloop-init" strategy="afterInteractive">
            {`(function(){var agentId=${JSON.stringify(assistLoopAgentId)};var tries=0;function init(){if(window.AssistLoopWidget&&typeof window.AssistLoopWidget.init==='function'){window.AssistLoopWidget.init({agentId:agentId});return;}if(tries<40){tries+=1;setTimeout(init,250);}}init();})();`}
          </Script>
        ) : null}
        <Script id="vercel-analytics" strategy="beforeInteractive">
          {`window.va = window.va || function() { (window.vaq = window.vaq || []).push(arguments); };`}
        </Script>
        <Script
          defer
          src="https://cdn.vercel-insights.com/v1/script.js"
          strategy="afterInteractive"
        />
        <Script id="vercel-speed-insights-queue" strategy="beforeInteractive">
          {`window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };`}
        </Script>
        <Script defer src="/_vercel/speed-insights/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
