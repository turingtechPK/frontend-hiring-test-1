import { ThemeConfig } from "antd/es/config-provider";

export const COLORS: { [key: string]: string } = {
  primary: "hsl(243, 93%, 62%)",
  white: "#FFFFFF",
  red: "hsl(348, 76%, 45%)",
  green: "hsl(173, 70%, 47%)",
  lighterGreen: "hsl(176, 64%, 96%)",
  blue: "hsl(227, 79%, 61%)",
  gray: "hsl(0, 0%, 51%)",
  lighterGray: "hsl(0, 0%, 93%)",
};

export const THEME: ThemeConfig = {
  components: {
    Button: {
      colorPrimary: COLORS.primary,
      colorBgContainer: COLORS.primary,
      colorText: COLORS.white,
      colorPrimaryTextHover: COLORS.white,
      colorPrimaryText: COLORS.white,
      borderRadiusOuter: 0,
      borderRadiusLG: 0,
      borderRadiusSM: 0,
      borderRadius: 0,
      colorPrimaryHover: COLORS.primary,
      colorPrimaryBorder: COLORS.primary,
    },
    Pagination: {
      colorBgContainer: COLORS.primary,
      colorPrimary: COLORS.white,
      colorPrimaryHover: COLORS.white,
      borderRadius: 0,
    },
    Spin: {
      colorPrimary: COLORS.primary,
    },
  },
};

export const PUSHER_CHANNEL_NAME = "private-aircall";

export const callTypeColorMap: {
  [key: string]: string;
} = {
  missed: COLORS.red,
  voicemail: COLORS.blue,
  answered: COLORS.green,
};
