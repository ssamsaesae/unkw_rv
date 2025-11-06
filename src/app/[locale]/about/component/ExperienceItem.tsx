import React from "react";

export interface ExperienceItemProps {
  company: string;
  year: string;
  works: Array<{
    title: string;
    skills: string;
    works: Array<string>;
  }>;
}

export const ExperienceItem = ({
  company,
  year,
  works,
}: ExperienceItemProps) => {
  return (
    <section className="w-full">
      <article className="py-4 px-6 flex justify-between items-center border-t border-b border-solid border-primary">
        <p className="font-bold text-primary">{year}</p>
        <p className="font-bold text-primary">{company}</p>
      </article>
      <article className="py-4 px-6 flex justify-between items-center border-t border-b border-solid border-primary">
        {works.map((w: any) => (
          <div key={w}>{w}</div>
        ))}
      </article>
    </section>
  );
};

export default ExperienceItem;
