import './InputPanel.css';

import classNames from 'classnames';
import { type FormEventHandler, memo, useCallback } from 'react';
import useValue from '../data/useValue';

export type InputPanelProps = { className?: string | undefined };

const InputPanel = memo(({ className }: InputPanelProps) => {
  const [value, setValue] = useValue();
  const handleInput = useCallback<FormEventHandler<HTMLTextAreaElement>>(
    ({ currentTarget: { value } }) => setValue(value),
    [setValue]
  );

  return <textarea className={classNames('input-panel', className)} onInput={handleInput} value={value} />;
});

export default InputPanel;
