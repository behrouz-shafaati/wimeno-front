"use client";

import Cookies from "js-cookie";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
// utils
import getColorPresets, {
  colorPresets,
  defaultPreset,
} from "@/src/utils/getColorPresets";
// config
import { defaultSettings, cookiesKey, cookiesExpires } from "@/src/config";
import { string } from "yup";
import { PalleteType } from "@/public/types";

// ----------------------------------------------------------------------

type DefaultSettingType = {
  themeMode: string;
  themeDirection: string;
  themeColorPresets: string;
  themeLayout: string;
  themeStretch: boolean;
};
type SettingType = {
  themeMode: string;
  themeDirection: string;
  themeColorPresets: string;
  themeLayout: string;
  themeStretch: boolean;
  onChangeMode: (event: any) => void;
  onToggleMode: (event: any) => void;
  onChangeDirection: (event: any) => void;
  onChangeColor: (event: any) => void;
  onToggleStretch: (event: any) => void;
  onChangeLayout: (event: any) => void;
  onResetSetting: (event: any) => void;
  setColor: PalleteType;
  colorOption: { name: string; value: string }[];
};

const initialState: SettingType = {
  ...defaultSettings,
  onChangeMode: () => {},
  onToggleMode: () => {},
  onChangeDirection: () => {},
  onChangeColor: () => {},
  onToggleStretch: () => {},
  onChangeLayout: () => {},
  onResetSetting: () => {},
  setColor: defaultPreset,
  colorOption: [],
};

const SettingsContext = createContext<SettingType>(initialState);

// ----------------------------------------------------------------------

type SettingsProviderType = {
  children: ReactNode;
  defaultSettings: DefaultSettingType;
};

function SettingsProvider({ children, defaultSettings }: SettingsProviderType) {
  const [settings, setSettings] = useSettingCookies(defaultSettings);

  const onChangeMode = (event: any) => {
    setSettings({
      ...settings,
      themeMode: event.target.value,
    });
  };

  const onToggleMode = () => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === "light" ? "dark" : "light",
    });
  };

  const onChangeDirection = (event: any) => {
    setSettings({
      ...settings,
      themeDirection: event.target.value,
    });
  };

  const onChangeColor = (event: any) => {
    setSettings({
      ...settings,
      themeColorPresets: event.target.value,
    });
  };

  const onChangeLayout = (event: any) => {
    setSettings({
      ...settings,
      themeLayout: event.target.value,
    });
  };

  const onToggleStretch = () => {
    setSettings({
      ...settings,
      themeStretch: !settings.themeStretch,
    });
  };

  const onResetSetting = () => {
    setSettings({
      themeMode: initialState.themeMode,
      themeLayout: initialState.themeLayout,
      themeStretch: initialState.themeStretch,
      themeDirection: initialState.themeDirection,
      themeColorPresets: initialState.themeColorPresets,
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        // Mode
        onChangeMode,
        onToggleMode,
        // Direction
        onChangeDirection,
        // Color
        onChangeColor,
        setColor: getColorPresets(settings.themeColorPresets),
        colorOption: colorPresets.map((color) => ({
          name: color.name,
          value: color.main,
        })),
        // Stretch
        onToggleStretch,
        // Navbar Horizontal
        onChangeLayout,
        // Reset Setting
        onResetSetting,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
export { SettingsProvider, SettingsContext };
// ----------------------------------------------------------------------

function useSettingCookies(
  defaultSettings: DefaultSettingType
): [
  settings: DefaultSettingType,
  setSettings: Dispatch<SetStateAction<DefaultSettingType>>
] {
  const [settings, setSettings] = useState<DefaultSettingType>(defaultSettings);

  const onChangeSetting = () => {
    Cookies.set(cookiesKey.themeMode, settings.themeMode, {
      expires: cookiesExpires,
    });

    Cookies.set(cookiesKey.themeDirection, settings.themeDirection, {
      expires: cookiesExpires,
    });

    Cookies.set(cookiesKey.themeColorPresets, settings.themeColorPresets, {
      expires: cookiesExpires,
    });

    Cookies.set(cookiesKey.themeLayout, settings.themeLayout, {
      expires: cookiesExpires,
    });

    Cookies.set(
      cookiesKey.themeStretch,
      JSON.stringify(settings.themeStretch),
      {
        expires: cookiesExpires,
      }
    );
  };
  useEffect(() => {
    onChangeSetting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  return [settings, setSettings];
}
