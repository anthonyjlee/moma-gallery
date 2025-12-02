import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { homepageMetadata } from "@/lib/aeo-metadata";
import { generateHomepageSchemas } from "@/lib/schema-homepage";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Generate AEO-optimized metadata
export const metadata: Metadata = {
  ...homepageMetadata(),
  // Additional metadata not covered by AEO generator
  metadataBase: new URL('https://moma-gallery.vercel.app'),
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate JSON-LD structured data
  const jsonLd = generateHomepageSchemas();

  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data for AEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
