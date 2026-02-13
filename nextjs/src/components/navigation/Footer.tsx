"use client";
import React from "react";
import Link from "next/link";
import { meta } from "@/constants/info";
import styled from "@emotion/styled";
import SocialShare from "../social/SocialShare";

const FooterWrapper = styled.footer`
  background: linear-gradient(180deg, #320f03 0%, #000000 100%);
  color: #fff;
`;

export const Footer = ({}) => {
  return (
    <FooterWrapper className="flex w-full flex-col justify-center items-center py-16 text-primary">
      <h2 className="font-extrabold font-clash text-3xl">UKWRV</h2>
      <a className="hover:underline text-xl" href={`mailto:${meta.email}`}>
        {meta.email}
      </a>
      <div className="pt-12">
        <SocialShare size={40} color={"#E94710"} />
      </div>
    </FooterWrapper>
  );
};

export default Footer;
