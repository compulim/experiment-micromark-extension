import { useMemo } from 'react';
import useAppContext from './private/useAppContext';

export default function useAST(): readonly [string] {
  const { ast } = useAppContext();

  return useMemo(() => Object.freeze([ast]), [ast]);
}
