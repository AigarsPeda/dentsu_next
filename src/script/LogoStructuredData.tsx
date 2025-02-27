interface LogoStructuredDataProps {
  logoUrl: string;
  organizationName: string;
  siteUrl: string;
}

export const LogoStructuredData = ({
  logoUrl,
  organizationName,
  siteUrl,
}: LogoStructuredDataProps) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          url: siteUrl,
          name: organizationName,
          logo: logoUrl,
        }),
      }}
    />
  );
};
