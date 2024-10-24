import { createContext, type Dispatch, type SetStateAction } from 'react';

export type SupportedMarkdownEngine = 'markdown-it' | 'micromark';

export type AppContextType = Readonly<{
  html: string;
  markdownEngine: SupportedMarkdownEngine;
  setMarkdownEngine: Dispatch<SetStateAction<SupportedMarkdownEngine>>;
  setShouldEnableGFM: Dispatch<SetStateAction<boolean>>;
  setShouldSanitize: Dispatch<SetStateAction<boolean>>;
  setValue: Dispatch<SetStateAction<string>>;
  shouldEnableGFM: boolean;
  shouldSanitize: boolean;
  value: string;
}>;

const AppContext = createContext<AppContextType>(
  new Proxy({} as AppContextType, {
    get() {
      throw new Error('This hook can only be used under <AppProvider>.');
    }
  })
);

export default AppContext;
