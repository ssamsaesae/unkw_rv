import SectionBgTitle from "@/components/display/SectionBgTitle";
import { createTranslation } from "@/i18n/server";
import { LocaleTypes } from "@/i18n/settings";
import type { Metadata, ResolvingMetadata } from "next";
import {
  ExperienceItemProps,
  ExperienceItem,
} from "./component/ExperienceItem";

interface SpecData {
  education: { name: string; year: string };
  certificate: { name: string; year: string };
}

type Props = {
  params: { locale: LocaleTypes };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { t } = await createTranslation(params.locale, "meta");
  const title = t("aboutTitle");
  const description = t("aboutDesc");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: params.locale === "ko" ? "ko_KR" : "en_US",
      type: "profile",
    },
    twitter: { card: "summary", title, description },
    alternates: {
      canonical: params.locale === "en" ? "/about" : `/${params.locale}/about`,
      languages: { en: "/about", ko: "/ko/about" },
    },
  };
}

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: LocaleTypes };
}) {
  const { t } = await createTranslation(locale, "about");
  const description = t("description");
  const highlights = t("highlights", { returnObjects: true }) as string[];
  const experience = t("experience", {
    returnObjects: true,
  }) as ExperienceItemProps[];
  const spec = t("spec", { returnObjects: true }) as SpecData;

  return (
    <main>
      <SectionBgTitle title="Career" description="" />

      {/* Intro & Highlights */}
      <section className="bg-black px-6 py-16">
        <div className="max-w-5xl">
          <h1 className="sr-only">Career & Experience</h1>
          <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 mt-8">
            {highlights.map((item: string, idx: number) => (
              <span
                key={`hl-${idx}`}
                className="py-1.5 px-4 border border-primary rounded-full text-primary text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="bg-black pb-16">
        <div className="px-6 mb-10">
          <div className="flex items-center gap-6">
            <h2 className="font-clash text-white font-semibold text-3xl">
              Experience
            </h2>
            <div className="flex-1 border-t border-primary"></div>
          </div>
        </div>
        {experience.map((ex: ExperienceItemProps, idx: number) => (
          <ExperienceItem key={`${ex.company}-${idx}`} {...ex} />
        ))}
      </section>

      {/* Education & Certificate */}
      <section className="bg-black px-6 pb-24">
        <div className="flex items-center gap-6 mb-8">
          <h2 className="font-clash text-white font-semibold text-3xl">
            Education
          </h2>
          <div className="flex-1 border-t border-primary"></div>
        </div>
        <div className="space-y-6">
          <div className="pl-5 border-l-2 border-primary">
            <p className="text-white font-bold">{spec.education.name}</p>
            <p className="text-gray-400 text-sm mt-1">
              {spec.education.year}
            </p>
          </div>
          <div className="pl-5 border-l-2 border-primary">
            <p className="text-white font-bold">{spec.certificate.name}</p>
            <p className="text-gray-400 text-sm mt-1">
              {spec.certificate.year}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
