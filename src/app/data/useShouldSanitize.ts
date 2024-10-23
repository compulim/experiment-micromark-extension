import { type Dispatch, type SetStateAction } from 'react';

import useAppContext from './private/useAppContext';

export default function useShouldSanitize(): readonly [boolean, Dispatch<SetStateAction<boolean>>] {
  const { setShouldSanitize, shouldSanitize } = useAppContext();

  return Object.freeze([shouldSanitize, setShouldSanitize]);
}
