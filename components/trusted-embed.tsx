import Script from 'next/script';

type TrustedEmbedProps = {
  html: string;
  className?: string;
};

type ExtractedScript = {
  content: string;
  src?: string;
};

function extractScripts(html: string) {
  const scripts: ExtractedScript[] = [];
  const markup = html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (_, attrs, content) => {
    const srcMatch = attrs.match(/\ssrc=["']([^"']+)["']/i);
    scripts.push({ content: content?.trim() ?? '', src: srcMatch?.[1] });
    return '';
  });

  return { markup, scripts };
}

export function TrustedEmbed({ html, className }: TrustedEmbedProps) {
  const { markup, scripts } = extractScripts(html);

  return (
    <>
      <div className={className} dangerouslySetInnerHTML={{ __html: markup }} />
      {scripts.map((script, index) =>
        script.src ? (
          <Script key={`${script.src}-${index}`} src={script.src} strategy="afterInteractive" />
        ) : script.content ? (
          <Script id={`trusted-embed-${index}`} key={`inline-${index}`} strategy="afterInteractive">
            {script.content}
          </Script>
        ) : null,
      )}
    </>
  );
}
