import Script from "next/script";

interface LogoStructuredDataProps {
  logoUrl: string;
}

export function LogoStructuredData({ logoUrl }: LogoStructuredDataProps) {
  return (
    <Script
      id="logo-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          //   "@context": "https://schema.org",
          //   "@type": "Organization",
          name: "Dentsu",
          url: "https://dentsu.lv",
          logo: logoUrl, // Use your optimized logo path here
        }),
      }}
    />
  );
}
