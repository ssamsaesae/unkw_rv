import React from "react";

interface CategoryItem {
  name: string;
  items: string[];
}

interface ProjectItem {
  title: string;
  skills: string;
  description?: string;
  works?: string[];
  categories?: CategoryItem[];
}

export interface ExperienceItemProps {
  company: string;
  year: string;
  role?: string;
  projects: ProjectItem[];
}

export const ExperienceItem = ({
  company,
  year,
  role,
  projects,
}: ExperienceItemProps) => {
  return (
    <section className="w-full mb-12 last:mb-0">
      <div className="border-t-2 border-primary px-6 py-5 flex justify-between items-baseline">
        <div>
          <h3 className="font-clash font-bold text-2xl text-white">
            {company}
          </h3>
          {role && <p className="text-gray-400 text-sm mt-1">{role}</p>}
        </div>
        {year && (
          <span className="font-clash font-semibold text-primary text-lg">
            {year}
          </span>
        )}
      </div>

      <div className="px-6 space-y-8 pt-4 pb-2">
        {projects.map((project, idx) => (
          <div
            key={`${project.title}-${idx}`}
            className="pl-5 border-l border-gray-700"
          >
            <h4 className="font-bold text-white text-lg leading-snug">
              {project.title}
            </h4>
            <p className="text-primary text-xs mt-1.5 font-mono tracking-wide">
              {project.skills}
            </p>
            {project.description && (
              <p className="text-gray-400 text-sm mt-2">
                {project.description}
              </p>
            )}

            {project.categories && (
              <div className="mt-4 space-y-4">
                {project.categories.map((cat, cidx) => (
                  <div key={`cat-${cidx}`}>
                    <h5 className="text-gray-300 font-semibold text-sm mb-2 pl-3 border-l-2 border-primary">
                      {cat.name}
                    </h5>
                    <ul className="space-y-1.5 pl-4">
                      {cat.items.map((item, iidx) => (
                        <li
                          key={`item-${iidx}`}
                          className="text-gray-400 text-sm flex items-start"
                        >
                          <span className="text-primary mr-2 mt-0.5 text-xs shrink-0">
                            &#9656;
                          </span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {project.works && project.works.length > 0 && (
              <ul className="mt-3 space-y-1.5 pl-4">
                {project.works.map((work, widx) => (
                  <li
                    key={`work-${widx}`}
                    className="text-gray-400 text-sm flex items-start"
                  >
                    <span className="text-primary mr-2 mt-0.5 text-xs shrink-0">
                      &#9656;
                    </span>
                    <span className="leading-relaxed">{work}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceItem;
