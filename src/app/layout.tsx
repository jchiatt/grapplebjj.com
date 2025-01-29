import { Poppins, Metrophobic } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Layout } from "@/components/layout/layout";
import { LiveStreamProvider } from "@/components/livestream/livestream-context";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { FloatingCTA } from "@/components/ui/floating-cta";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

const metrophobic = Metrophobic({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-metrophobic",
});

export const metadata: Metadata = {
  title: "Grapple Jiu Jitsu",
  description: "No-Gi submission grappling gym in Pearl, Mississippi.",
  metadataBase: new URL("https://grapplejj.com"),
  themeColor: "#6236FF",
  openGraph: {
    type: "website",
    title: "Grapple Jiu Jitsu",
    description: "No-Gi submission grappling gym in Pearl, Mississippi.",
    siteName: "Grapple Jiu Jitsu",
    url: "https://grapplejj.com",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Grapple Jiu Jitsu - No-Gi submission grappling in Pearl, Mississippi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grapple Jiu Jitsu",
    description: "No-Gi submission grappling gym in Pearl, Mississippi.",
    images: ["/og-image.jpg"],
    creator: "@jchiatt",
    site: "@grapplebjj",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${poppins.variable} ${metrophobic.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <LiveStreamProvider>
            <Layout>{children}</Layout>
          </LiveStreamProvider>
          <FloatingCTA />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />

        {/* Facebook Pixel Code */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '391158875206656');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=391158875206656&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Facebook Pixel Code */}
      </body>
    </html>
  );
}
