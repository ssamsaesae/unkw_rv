import React from "react";

export const SectionBgTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <section className="w-full">
      <article className="bg-primary px-6 py-24 w-full flex flex-col justify-between items-start">
        <h2 className="font-bold text-3xl font-clash">{title}</h2>
      </article>
      <article>
        <p>{description}</p>
      </article>
    </section>
  );
};

export default SectionBgTitle;
