import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://utsmarinellp.com'),
  title: {
    default: "UTS Marine LLP | Marine Ship Spare Parts",
    template: "%s | UTS Marine LLP"
  },
  description: "Leading Exporter & Supplier of Marine Ship Spare Parts.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'UTS Marine LLP',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@utsmarine',
  },
  verification: {
    google: 'QzFnVvhcdkdk3_xFhlz1R7MP_NcbugLQ16gCmzLxnlQ',
  },
  keywords: [
    "marine spare parts",
    "ship machinery",
    "marine engine parts",
    "two stroke engine parts",
    "four stroke engine parts",
    "OEM marine parts",
    "genuine marine spares",
    "ship equipment",
    "marine diesel engine parts",
    "UTS Marine LLP"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased bg-white text-gray-900`}
      >
        <GoogleAnalytics gaId="G-YN76ZE1QBH" />
        <script
          id="json-ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "UTS Marine LLP",
              "url": "https://utsmarinellp.com",
              "logo": "https://utsmarinellp.com/logo.png",
              "sameAs": [
                "https://www.facebook.com/utsmarine",
                "https://twitter.com/utsmarine",
                "https://www.linkedin.com/company/uts-marine-llp"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-97232-98676",
                "contactType": "sales",
                "areaServed": "Global",
                "availableLanguage": "English"
              }
            }
          `}}
        />
        {children}
      </body>
    </html>
  );
}
