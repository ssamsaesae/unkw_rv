import React from "react";
import { snsList } from "@/constants/info";
import Image from "next/image";
import LinkedIn from "../../../public/linkedin.svg";
import Instagram from "../../../public/instagram.svg";
import Github from "../../../public/github.svg";

export const SocialShare = ({
  color,
  size,
}: {
  color: string;
  size?: number;
}) => {
  return (
    <section className="flex gap-2">
      {snsList.map((el, idx: number) => (
        <div key={el.label}>
          {idx === 0 && (
            <LinkedIn width={size} height={size} fill={color || "#e94710"} />
          )}
          {idx === 1 && (
            <Instagram width={size} height={size} fill={color || "#e94710"} />
          )}
          {idx === 2 && (
            <Github width={size} height={size} fill={color || "#e94710"} />
          )}
        </div>
      ))}
    </section>
  );
};

export default SocialShare;
