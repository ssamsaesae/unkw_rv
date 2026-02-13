import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { useTranslation } from "react-i18next";

export const LangContext = createContext({ isKorean: true });

export const LangProvider = (props: any) => {
  const { children } = props;
  const { i18n } = useTranslation();
  const [isKorean, setIsKorean] = useState<boolean>(true);

  useEffect(() => {
    i18n.language === "ko" ? setIsKorean(true) : setIsKorean(false);
  }, [i18n, i18n.language]);

  return (
    <LangContext.Provider
      value={{
        isKorean: isKorean,
      }}
    >
      {children}
    </LangContext.Provider>
  );
};
