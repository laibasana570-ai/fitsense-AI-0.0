
import { createContext } from 'react';
import { Language } from './services/translations';

export const ThemeContext = createContext({
  isDark: true,
  toggleTheme: () => {}
});

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (auth: boolean) => {}
});

export const LanguageContext = createContext({
  language: 'en' as Language,
  setLanguage: (lang: Language) => {},
  t: (key: string) => key
});

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

export const ToastContext = createContext({
  showToast: (message: string, type: ToastType) => {}
});