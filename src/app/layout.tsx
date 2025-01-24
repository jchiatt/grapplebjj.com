import { Poppins, Metrophobic } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Layout } from "@/components/layout/layout";
import { LiveStreamProvider } from "@/components/livestream/livestream-context";
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${metrophobic.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <LiveStreamProvider>
            <Layout>{children}</Layout>
          </LiveStreamProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
