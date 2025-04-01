"use client";

interface GoogleTagManagerNoScriptProps {
  gtmId: string;
}

export default function GoogleTagManagerNoScript({
  gtmId,
}: GoogleTagManagerNoScriptProps) {
  if (!gtmId) {
    return null;
  }

  // Using dangerouslySetInnerHTML for the noscript tag content
  return (
    <noscript
      dangerouslySetInnerHTML={{
        __html: `
        <iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
          height="0" width="0" style="display:none;visibility:hidden">
        </iframe>
      `,
      }}
    />
  );
}
