import type { Metadata } from "next";
import { Providers } from "./providers";
import "../styles/globals.css";

const SITE_URL = "https://unknownriver.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "UNKNOWN RIVER | Frontend Developer & UI/UX Designer",
    template: "%s",
  },
  description:
    "Frontend Developer with 5+ years of experience specializing in React, Next.js, and TypeScript. Based in Seoul, South Korea.",
  keywords: [
    "frontend developer",
    "react",
    "next.js",
    "typescript",
    "UI/UX designer",
    "portfolio",
    "web developer",
    "seoul",
  ],
  authors: [{ name: "UNKNOWN RIVER" }],
  creator: "UNKNOWN RIVER",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ko_KR",
    siteName: "UNKNOWN RIVER",
    title: "UNKNOWN RIVER | Frontend Developer & UI/UX Designer",
    description:
      "Frontend Developer with 5+ years of experience specializing in React, Next.js, and TypeScript. Based in Seoul, South Korea.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "UNKNOWN RIVER | Frontend Developer & UI/UX Designer",
    description:
      "Frontend Developer with 5+ years of experience. React, Next.js, TypeScript.",
    creator: "@unknownriver",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: SITE_URL,
      ko: `${SITE_URL}/ko`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
