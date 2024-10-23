import { type Dispatch, type SetStateAction } from 'react';

import type { SupportedMarkdownEngine } from './private/AppContext';
import useAppContext from './private/useAppContext';

export default function useMarkdownEngine(): readonly [
  SupportedMarkdownEngine,
  Dispatch<SetStateAction<SupportedMarkdownEngine>>
] {
  const { setMarkdownEngine, markdownEngine } = useAppContext();

  return Object.freeze([markdownEngine, setMarkdownEngine]);
}
