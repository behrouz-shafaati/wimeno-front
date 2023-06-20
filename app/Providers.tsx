"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";

// context
import { SettingsProvider } from "@/src/contexts/SettingsContext";
// theme
import ThemeProvider from "@/src/theme";
import NotistackProvider from "@/src/contexts/NotistackProvider";
import { CollapseDrawerProvider } from "@/src/contexts/CollapseDrawerContext";
import Prefech from "@/src/contexts/Prefech";
import { defaultSettings } from "@/src/config";

type Props = {
  children: ReactNode;
};

export function Providers({ children }: Props) {
  return (
    <Provider store={store}>
      <Prefech>
        <CollapseDrawerProvider>
          <SettingsProvider defaultSettings={defaultSettings}>
            <ThemeProvider>
              <NotistackProvider>{children}</NotistackProvider>
            </ThemeProvider>
          </SettingsProvider>
        </CollapseDrawerProvider>
      </Prefech>
    </Provider>
  );
}
