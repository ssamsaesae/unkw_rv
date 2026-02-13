import SectionBgTitle from "@/components/display/SectionBgTitle";
import { createTranslation } from "@/i18n/server";
import { LocaleTypes } from "@/i18n/settings";
import type { Metadata, ResolvingMetadata } from "next";
import { meta } from "@/constants/info";
import SocialShare from "@/components/social/SocialShare";

type Props = { params: { locale: LocaleTypes } };

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { t } = await createTranslation(params.locale, "meta");
  const title = t("contactTitle");
  const description = t("contactDesc");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: params.locale === "ko" ? "ko_KR" : "en_US",
      type: "website",
    },
    twitter: { card: "summary", title, description },
    alternates: {
      canonical:
        params.locale === "en" ? "/contact" : `/${params.locale}/contact`,
      languages: { en: "/contact", ko: "/ko/contact" },
    },
  };
}

export default async function ContactPage({
  params: { locale },
}: {
  params: { locale: LocaleTypes };
}) {
  const isKo = locale === "ko";

  return (
    <main>
      <SectionBgTitle title="Contact" description="" />

      <section className="bg-black px-6 py-16 md:py-24">
        <div className="max-w-4xl">
          <h1 className="sr-only">Contact</h1>

          {/* Intro */}
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl">
            {isKo
              ? "프로젝트 협업, 프론트엔드 개발, UI/UX 디자인 관련 문의는 아래 이메일로 연락해 주세요."
              : "For project collaboration, frontend development, or UI/UX design inquiries, feel free to reach out via email below."}
          </p>

          {/* Email CTA */}
          <div className="mt-12 border-t border-white/[0.08] pt-10">
            <p className="text-white/30 text-[10px] font-mono tracking-[0.2em] uppercase mb-3">
              Email
            </p>
            <a
              href={`mailto:${meta.email}`}
              className="font-clash font-bold text-2xl md:text-4xl text-white hover:text-primary transition-colors"
            >
              {meta.email}
            </a>
          </div>

          {/* Location */}
          <div className="mt-10 border-t border-white/[0.08] pt-10">
            <p className="text-white/30 text-[10px] font-mono tracking-[0.2em] uppercase mb-3">
              {isKo ? "위치" : "Location"}
            </p>
            <p className="text-white font-clash font-semibold text-lg">
              Seoul, South Korea
            </p>
          </div>

          {/* Availability */}
          <div className="mt-10 border-t border-white/[0.08] pt-10">
            <p className="text-white/30 text-[10px] font-mono tracking-[0.2em] uppercase mb-3">
              {isKo ? "가능 업무" : "Available for"}
            </p>
            <ul className="space-y-2">
              {(isKo
                ? [
                    "프론트엔드 개발 (React / Next.js / Vue)",
                    "모바일 앱 개발 (React Native)",
                    "UI/UX 디자인 & 퍼블리싱",
                    "웹 애플리케이션 컨설팅",
                  ]
                : [
                    "Frontend Development (React / Next.js / Vue)",
                    "Mobile App Development (React Native)",
                    "UI/UX Design & Publishing",
                    "Web Application Consulting",
                  ]
              ).map((item) => (
                <li key={item} className="text-gray-400 text-sm flex items-start">
                  <span className="text-primary mr-2 mt-0.5 text-xs shrink-0">
                    &#9656;
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="mt-10 border-t border-white/[0.08] pt-10">
            <p className="text-white/30 text-[10px] font-mono tracking-[0.2em] uppercase mb-4">
              Social
            </p>
            <SocialShare size={28} color="#E94710" />
          </div>
        </div>
      </section>
    </main>
  );
}
