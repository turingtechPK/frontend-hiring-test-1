import { theme as customTheme } from '@/themes';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { Theme } from '@mui/material';

/**
 * `useTheme` hook returns a responsive font-sized theme object based on the user's preferred color scheme.
 * @returns {Theme} `Theme` object with responsive font-sizes.
 * @example
 * const theme = useTheme();
 */
export function useTheme(): Theme {
  const theme = createTheme(customTheme);

  // Makes the font sizes responsive.
  return responsiveFontSizes(theme);
}
