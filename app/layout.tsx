import type { Metadata } from 'next';
import { Bebas_Neue, DM_Sans, Space_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

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
  title: 'RokitG — Crypto Signals That Print',
  description:
    'Real-time memecoin & altcoin signals from @rokitdotgg. Stop guessing. Start following the chart.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${bebasNeue.variable} ${dmSans.variable}`}
    >
      <body>
        {children}
        <Script async src="https://tally.so/widgets/embed.js" />
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
        <Script
          defer
          src="/_vercel/speed-insights/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
