import { LightDarkToggle } from '@mintlify/components';
import { useEffect, useRef, useContext, useCallback } from 'react';
import create from 'zustand';

import { ConfigContext } from '@/context/ConfigContext';
import { useColors } from '@/hooks/useColors';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

const useSetting = create((set: any) => ({
  setting: 'system',
  setSetting: (setting: string) => set({ setting }),
})) as any;

function useTheme() {
  const { config } = useContext(ConfigContext);
  let { setting, setSetting } = useSetting();
  let initial = useRef(true);

  const update = useCallback(() => {
    if (isDarkModeEnabled(config?.modeToggle?.default)) {
      document.documentElement.classList.add('dark', 'changing-theme');
    } else {
      document.documentElement.classList.remove('dark', 'changing-theme');
    }
    window.setTimeout(() => {
      document.documentElement.classList.remove('changing-theme');
    });
  }, [config?.modeToggle?.default]);

  useIsomorphicLayoutEffect(() => {
    let theme = localStorage.theme;
    if (theme === 'light' || theme === 'dark') {
      setSetting(theme);
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (setting === 'system') {
      localStorage.removeItem('theme');
    } else if (setting === 'light' || setting === 'dark') {
      localStorage.theme = setting;
    }
    if (initial.current) {
      initial.current = false;
    } else {
      update();
    }
  }, [setting]);

  useEffect(() => {
    let mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    if (mediaQuery?.addEventListener) {
      mediaQuery.addEventListener('change', update);
    } else {
      mediaQuery.addListener(update);
    }

    function onStorage() {
      update();
      let theme = localStorage.theme;
      if (theme === 'light' || theme === 'dark') {
        setSetting(theme);
      } else {
        setSetting('system');
      }
    }
    window.addEventListener('storage', onStorage);

    return () => {
      if (mediaQuery?.removeEventListener) {
        mediaQuery.removeEventListener('change', update);
      } else {
        mediaQuery.removeListener(update);
      }

      window.removeEventListener('storage', onStorage);
    };
  }, [setSetting, update]);

  return [setting, setSetting];
}

export function ThemeToggle() {
  const { config } = useContext(ConfigContext);
  const colors = useColors();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let [setting, setSetting] = useTheme();

  if (config?.modeToggle?.isHidden) {
    return null;
  }

  const isDark = isDarkModeEnabled(config?.modeToggle?.default);

  return (
    <LightDarkToggle
      defaultChecked={isDark ?? false}
      onChange={(enabled: boolean) => setSetting(enabled ? 'dark' : 'light')}
      colors={{
        brandColor: colors.primaryDark,
        lightBackground: colors.backgroundLight,
        darkBackground: colors.backgroundDark,
      }}
    />
  );
}

function isDarkModeEnabled(modeToggleDefault: string | undefined) {
  if (typeof window === 'undefined') {
    return undefined;
  }

  return (
    localStorage.theme === 'dark' ||
    (modeToggleDefault == null &&
      !('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches) ||
    modeToggleDefault === 'dark'
  );
}
