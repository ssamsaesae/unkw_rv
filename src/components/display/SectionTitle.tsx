import React from "react";

export const SectionTitle = ({
  title,
  color,
}: {
  title: string;
  color?: string;
}) => {
  return (
    <section className="flex items-center gap-8">
      <h2
        className={`font-clash font-semibold text-4xl text-[${
          color || "primary"
        }]`}
      >
        {title}
      </h2>
      <div className="w-16 border-t border-solid border-primary" />
    </section>
  );
};

export default SectionTitle;
