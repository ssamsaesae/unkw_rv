import Image from "next/image";
import SectionBgTitle from "@/components/display/SectionBgTitle";
import { createTranslation } from "@/i18n/server";
import { LocaleTypes } from "@/i18n/settings";
import {
  ExperienceItemProps,
  ExperienceItem,
} from "./component/ExperienceItem";

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: LocaleTypes };
}) {
  const { t } = await createTranslation(locale, "about");
  const EXPERIENCE = t("experience", {
    returnObjects: true,
  }) as Array<ExperienceItemProps>;
  return (
    <main className="">
      <SectionBgTitle title="About" description="" />
      <section className="bg-black">
        {EXPERIENCE.map((ex: ExperienceItemProps, idx: number) => (
          <div key={`${ex.company}-${idx}`}>
            <ExperienceItem {...ex} />
          </div>
        ))}
      </section>
      <p>{JSON.stringify(t("experience", { returnObjects: true }))}</p>
    </main>
  );
}
