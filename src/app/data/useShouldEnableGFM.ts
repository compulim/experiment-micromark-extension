import { type Dispatch, type SetStateAction } from 'react';

import useAppContext from './private/useAppContext';

export default function useShouldEnableGFM(): readonly [boolean, Dispatch<SetStateAction<boolean>>] {
  const { setShouldEnableGFM, shouldEnableGFM } = useAppContext();

  return Object.freeze([shouldEnableGFM, setShouldEnableGFM]);
}
