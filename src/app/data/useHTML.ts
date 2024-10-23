import { useMemo } from 'react';
import useAppContext from './private/useAppContext';

export default function useHTML(): readonly [string] {
  const { html } = useAppContext();

  return useMemo(() => Object.freeze([html]), [html]);
}
