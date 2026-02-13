import SectionBgTitle from "@/components/display/SectionBgTitle";
import { createTranslation } from "@/i18n/server";
import { LocaleTypes } from "@/i18n/settings";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";

type Props = { params: { locale: LocaleTypes } };

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { t } = await createTranslation(params.locale, "meta");
  const title = t("projectTitle");
  const description = t("projectDesc");

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
        params.locale === "en" ? "/project" : `/${params.locale}/project`,
      languages: { en: "/project", ko: "/ko/project" },
    },
  };
}

interface Project {
  title: string;
  company: string;
  year: string;
  description: string;
  skills: string[];
  highlights: string[];
  type: string;
}

const projectsKo: Project[] = [
  {
    title: "LCA/LCCI 플랫폼",
    company: "Greenery",
    year: "2023 — Present",
    description:
      "전과정평가(LCA) 생성·분석·관리 통합 플랫폼. 공정흐름도 에디터, 대용량 데이터 그리드, LCI DB 연동, 결과 시각화 및 리포트 다운로드까지 전 과정 Frontend 설계 및 구현.",
    skills: ["React", "Redux-Toolkit", "React-Flow", "MUI", "Data Grid Pro", "Storybook"],
    highlights: [
      "Canvas 기반 공정흐름도 에디터 전체 개발",
      "Data Grid Pro 기반 대용량 입력·검증 시스템 구축",
      "Storybook 디자인 시스템 및 FE 환경 초기 세팅",
    ],
    type: "Enterprise Platform",
  },
  {
    title: "POPLE Carbon Credit·Marketplace·Registry",
    company: "Greenery",
    year: "2022 — 2023",
    description:
      "탄소 크레딧 발행·거래·레지스트리 통합 플랫폼. 전체 API 전환, 회원가입/결제/크레딧 발행 등 핵심 프로세스 리팩토링, 다국어(i18n) 환경 구축, Admin/Front 전면 개편.",
    skills: ["React", "Next.js", "Nest.js", "MUI", "Chakra UI", "Google Maps", "i18next"],
    highlights: [
      "Marketplace·Credit·Registry 등 전체 API 전환 FE 전담",
      "크레딧 상세 페이지, Excel Export, PDF Viewer 등 핵심 기능 개발",
      "다국어(i18n) 인프라 전면 구축 및 영문화 처리",
    ],
    type: "Carbon Credit Platform",
  },
  {
    title: "Web3 기반 자산 관리 서비스",
    company: "Greenery",
    year: "2022 — 2023",
    description:
      "Metamask 연동 기반 Web3 자산 관리 서비스. 지갑 연결/검증, 폴링 기반 트랜잭션 알림, 자산·거래내역·세금 페이지 및 Admin 기능 개발.",
    skills: ["React", "Next.js", "Metamask", "Web3.js", "Amplitude"],
    highlights: [
      "Metamask 연결 및 지갑 주소 유효성 검증 로직 구현",
      "내 자산·연결·거래내역·세금 페이지 UI 개발",
      "Amplitude 이벤트 트래킹 및 Event Mapping 설계",
    ],
    type: "Web3 / Blockchain",
  },
  {
    title: "STO 거래 플랫폼",
    company: "Greenery",
    year: "2022",
    description:
      "STO(Security Token Offering) 거래 플랫폼 프론트엔드 개발. NextAuth 기반 인증, CRUD API 연동, 반응형 UI 및 인터랙션 이펙트 적용.",
    skills: ["React", "Next.js", "NextAuth", "Redux-Toolkit", "Chakra UI", "Storybook"],
    highlights: [
      "NextAuth로 일반·기업회원 로그인 구현",
      "Slider, Text Animation 이펙트 적용",
      "반응형 UI 및 CRUD API 연동",
    ],
    type: "Fintech / STO",
  },
  {
    title: "공유옥상 투자 플랫폼",
    company: "H-Energy",
    year: "2020 — 2022",
    description:
      "옥상 태양광 발전 공유 투자 플랫폼. 통계 그래프, 지도 기반 위치 표시, 소셜 공유 기능 등 전체 서비스 UI 개발.",
    skills: ["Vue", "Quasar", "Pug", "Stylus", "Chart.js", "Kakao Map"],
    highlights: [
      "Chart.js로 출자수량, 전력량, 발전량 통계 그래프 개발",
      "Kakao Map API + SVG 그래픽 지도 표시",
      "Pug, Stylus로 전체 서비스 UI 구축",
    ],
    type: "Energy / Investment",
  },
  {
    title: "에너지 IoT APP",
    company: "Greenery",
    year: "2022",
    description:
      "에너지 IoT 앱의 가전기기 API 연동 및 EV 앱 연결. React Native + Expo 기반 크로스 플랫폼 모바일 앱 개발.",
    skills: ["React Native", "Expo", "Redux", "Redux-Saga"],
    highlights: [
      "유저 소유 전자기기 목록 API 연동",
      "ENode 플랫폼 기반 EV APP 연동",
    ],
    type: "IoT / Mobile",
  },
];

const projectsEn: Project[] = [
  {
    title: "LCA/LCCI Platform",
    company: "Greenery",
    year: "2023 — Present",
    description:
      "Integrated Life Cycle Assessment (LCA) creation, analysis, and management platform. Built process flow diagram editor, high-volume data grids, LCI DB integration, result visualization and report downloads — full frontend architecture.",
    skills: ["React", "Redux-Toolkit", "React-Flow", "MUI", "Data Grid Pro", "Storybook"],
    highlights: [
      "Built canvas-based process flow diagram editor from scratch",
      "Developed large-scale input/validation system with Data Grid Pro",
      "Established Storybook design system and FE project infrastructure",
    ],
    type: "Enterprise Platform",
  },
  {
    title: "POPLE Carbon Credit·Marketplace·Registry",
    company: "Greenery",
    year: "2022 — 2023",
    description:
      "Integrated carbon credit issuance, trading, and registry platform. Led full API migration, refactored core processes (sign-up, payment, credit issuance), built i18n infrastructure, and rebuilt Admin/Front entirely.",
    skills: ["React", "Next.js", "Nest.js", "MUI", "Chakra UI", "Google Maps", "i18next"],
    highlights: [
      "Led FE for full API migration across Marketplace, Credit, Registry, User, Payment",
      "Built credit detail page, Excel export, PDF viewer and core features",
      "Established full i18n infrastructure and English localization",
    ],
    type: "Carbon Credit Platform",
  },
  {
    title: "Web3 Asset Management Service",
    company: "Greenery",
    year: "2022 — 2023",
    description:
      "Web3 wallet-based asset management service. Built Metamask integration, wallet validation, polling-based transaction notifications, asset/transaction/tax pages and admin features.",
    skills: ["React", "Next.js", "Metamask", "Web3.js", "Amplitude"],
    highlights: [
      "Implemented Metamask connection and wallet address validation",
      "Developed My Assets, Connection, Transaction History, Tax pages",
      "Applied Amplitude event tracking with custom event mapping",
    ],
    type: "Web3 / Blockchain",
  },
  {
    title: "STO Trading Platform",
    company: "Greenery",
    year: "2022",
    description:
      "Security Token Offering (STO) trading platform frontend. Implemented NextAuth-based authentication, CRUD API integration, responsive UI with interaction effects.",
    skills: ["React", "Next.js", "NextAuth", "Redux-Toolkit", "Chakra UI", "Storybook"],
    highlights: [
      "Implemented general and corporate member login with NextAuth",
      "Applied slider and text animation effects",
      "Built responsive UI with CRUD API integration",
    ],
    type: "Fintech / STO",
  },
  {
    title: "Rooftop Investment Platform",
    company: "H-Energy",
    year: "2020 — 2022",
    description:
      "Solar rooftop shared investment platform. Built statistical graphs, map-based location display, social sharing features, and full service UI.",
    skills: ["Vue", "Quasar", "Pug", "Stylus", "Chart.js", "Kakao Map"],
    highlights: [
      "Created statistical graphs for investments, power output with Chart.js",
      "Integrated Kakao Map API with SVG map visualization",
      "Built entire service UI with Pug and Stylus",
    ],
    type: "Energy / Investment",
  },
  {
    title: "Energy IoT App",
    company: "Greenery",
    year: "2022",
    description:
      "Energy IoT app device API integration and EV app connection. Cross-platform mobile development with React Native and Expo.",
    skills: ["React Native", "Expo", "Redux", "Redux-Saga"],
    highlights: [
      "Integrated APIs for user-owned device listing",
      "Connected EV app with ENode platform",
    ],
    type: "IoT / Mobile",
  },
];

export default async function ProjectPage({
  params: { locale },
}: {
  params: { locale: LocaleTypes };
}) {
  const projects = locale === "ko" ? projectsKo : projectsEn;

  return (
    <main>
      <SectionBgTitle title="Projects" description="" />

      <section className="bg-black px-6 py-16">
        <div className="max-w-5xl">
          <h1 className="sr-only">Selected Projects</h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
            {locale === "ko"
              ? "LCA 플랫폼, 탄소 크레딧 마켓플레이스, Web3 서비스 등 다양한 도메인에서 수행한 주요 프론트엔드 프로젝트입니다."
              : "Selected frontend projects across diverse domains including LCA platforms, carbon credit marketplaces, Web3 services, and more."}
          </p>
        </div>
      </section>

      <section className="bg-black pb-24">
        <div className="space-y-0">
          {projects.map((project, idx) => (
            <article
              key={project.title}
              className="border-t border-white/[0.08] px-6 py-10 md:py-14"
            >
              <div className="max-w-5xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-4">
                  <div className="flex items-baseline gap-3 md:gap-5">
                    <span className="text-white/15 font-mono text-xs">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-clash font-bold text-xl md:text-2xl text-white">
                      {project.title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 pl-8 md:pl-0">
                    <span className="text-primary text-xs font-mono">
                      {project.type}
                    </span>
                    <span className="text-white/20 text-xs">|</span>
                    <span className="text-white/30 font-mono text-xs">
                      {project.company}
                    </span>
                    <span className="text-white/30 font-mono text-xs">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl mb-5 pl-8 md:pl-12">
                  {project.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-5 pl-8 md:pl-12">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-mono text-primary/80 bg-primary/[0.08] px-2.5 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Highlights */}
                <ul className="space-y-1.5 pl-8 md:pl-12">
                  {project.highlights.map((hl, i) => (
                    <li
                      key={i}
                      className="text-gray-400 text-sm flex items-start"
                    >
                      <span className="text-primary mr-2 mt-0.5 text-xs shrink-0">
                        &#9656;
                      </span>
                      <span className="leading-relaxed">{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
          <div className="border-t border-white/[0.08]" />
        </div>

        {/* Link to full career */}
        <div className="px-6 mt-10">
          <Link
            href={`/${locale}/about`}
            className="inline-flex items-center gap-3 text-primary font-mono text-sm border-b border-primary/30 pb-1 hover:border-primary transition-colors"
          >
            {locale === "ko"
              ? "전체 경력 보기 →"
              : "VIEW FULL CAREER →"}
          </Link>
        </div>
      </section>
    </main>
  );
}
