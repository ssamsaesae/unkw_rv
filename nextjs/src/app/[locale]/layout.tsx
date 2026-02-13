import React from "react";
import "@/styles/globals.css";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import { LocaleTypes } from "@/i18n/settings";

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "UNKNOWN RIVER",
    jobTitle: "Frontend Developer & UI/UX Designer",
    url: "https://unknownriver.dev",
    sameAs: [],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "React Native",
      "Vue.js",
      "Node.js",
      "UI/UX Design",
      "Web3",
      "Carbon Credit Platform",
      "LCA System",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Seoul",
      addressCountry: "KR",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: LocaleTypes };
}) {
  return (
    <>
      <JsonLd />
      <Header />
      {children}
      <Footer />
    </>
  );
}
