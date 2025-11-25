'use client'

import Script from 'next/script'

export default function GoogleAnalytics() {
    return (
        <>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-P3PES4S528"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-P3PES4S528', {
            page_path: window.location.pathname,
          });
        `}
            </Script>
        </>
    )
}
