type ColorPreset = "blue" | "green" | "indigo" | "purple";

type Contrast = "normal" | "high";

type Direction = "ltr" | "rtl";

type PaletteMode = "dark" | "light";

interface ThemeConfig {
  colorPreset?: ColorPreset;
  contrast?: Contrast;
  direction?: Direction;
  paletteMode?: PaletteMode;
  responsiveFontSizes?: boolean;
}
