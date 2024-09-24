import React from "react";
import Script from "next/script";

interface GoogleAnalyticsProps {
  googleAnalyticsMeasurementId: string;
}

// https://medium.com/readytowork-org/google-analytics-in-next-js-a26cc2b28db5

const GoogleAnalytics = ({
  googleAnalyticsMeasurementId,
}: GoogleAnalyticsProps) => {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsMeasurementId}`}
      />

      <Script id="" strategy="lazyOnload">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsMeasurementId}', {
              page_path: window.location.pathname,
              });
          `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
