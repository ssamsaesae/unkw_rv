import { createTranslation } from "@/i18n/server";
import { LocaleTypes } from "@/i18n/settings";
import type { Metadata, ResolvingMetadata } from "next";
import HomeClient from "./components/HomeClient";

type Props = {
  params: { locale: LocaleTypes };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { t } = await createTranslation(params.locale, "meta");
  const title = t("title");
  const description = t("description");
  const keywords = t("keywords");
  const siteName = t("siteName");

  return {
    title,
    description,
    keywords: keywords.split(",").map((k: string) => k.trim()),
    openGraph: {
      title,
      description,
      siteName,
      locale: params.locale === "ko" ? "ko_KR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: params.locale === "en" ? "/" : `/${params.locale}`,
      languages: {
        en: "/",
        ko: "/ko",
      },
    },
  };
}

export default async function Home({
  params: { locale },
}: {
  params: { locale: LocaleTypes };
}) {
  const { t } = await createTranslation(locale, "about");

  return <HomeClient description={t("description")} locale={locale} />;
}
