import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  xxl: "1536px",
};

const theme = extendTheme({
  ...breakpoints,
  fontSize: {
    xxs: "12px",
    xs: "13px",
    sm: "14px",
    base: "16px",
    md: "18px",
    lg: "24px",
  },
  colors: {
    brand: {
      100: "#E4F9FB",
      200: "#CAF4F8",
      300: "#B0EFF4",
      400: "#97EAF1",
      500: "#7FE4ED",
      600: "#68DFE9",
      700: "#53DAE6",
      800: "#3FD4E2",
      900: "#0FD1E1",
    },
    black: "#000",
    dark: "#191a20",
    primary: "#089A3A",
    secondary: "#173A66",
    grey_0: "#f8f9fa",
    grey_1: "#f1f3f5",
    grey_2: "#e9ecef",
    grey_3: "#dee2e6",
    grey_4: "#ced4da",
    grey_5: "#adb5bd",
    grey_6: "#868e96",
    grey_7: "#495057",
    grey_8: "#343a40",
    grey_9: "#212529",
    lca: "#194DFF",
  },
});

export const darkTheme = {
  colors: {
    background: "#1b1c1d",
    backgroundInverse: "#333333",
    positive: "#9fd986",
    negative: "#df987d",
    primary: "#d43369",
    secondary: "#1b8bd0",
    tertiary: "#DDDDDD",
    text: "#FFFFFF",
  },
};

export default theme;
