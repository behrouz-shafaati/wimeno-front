import { ReactNode, useMemo } from "react";
// @mui
import { CssBaseline, ThemeOptions } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
// hooks
import useSettings from "@/src/hooks/useSettings";
//
import palette from "./palette";
import ComponentsOverrides from "./overrides";
import shadows, { customShadows } from "./shadows";
type Props = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const { themeMode, themeDirection, setColor } = useSettings();
  const isLight = themeMode === "light";
  const pallete = isLight ? palette.light : palette.dark;

  const themeOptions: any = useMemo(
    () => ({
      palette: { ...pallete, primary: setColor },
      shape: { borderRadius: 8 },
      direction: themeDirection,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight, themeDirection, setColor]
  );

  const theme = createTheme(themeOptions);
  theme.components = ComponentsOverrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
