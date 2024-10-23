import './App.css';

import { Fragment, memo, useCallback, type FormEventHandler } from 'react';
import useShouldSanitize from '../data/useShouldSanitize';
import HTMLOutputPanel from './HTMLOutputPanel';
import InputPanel from './InputPanel';
import MarkdownOutputPanel from './MarkdownOutputPanel';
import TreeOutputPanel from './TreeOutputPanel';

export default memo(function App() {
  const [shouldSanitize, setShouldSanitize] = useShouldSanitize();
  const handleShouldSanitizeInput = useCallback<FormEventHandler<HTMLInputElement>>(
    ({ currentTarget: { checked } }) => setShouldSanitize(checked),
    [setShouldSanitize]
  );

  return (
    <Fragment>
      <div className="app">
        <div className="app__title">
          <h1>micromark demo</h1>
          <label>
            <input checked={shouldSanitize} onChange={handleShouldSanitizeInput} type="checkbox" />
            Sanitize
          </label>
        </div>
        <InputPanel className="app__input" />
        <MarkdownOutputPanel className="app__markdown-output" />
        <HTMLOutputPanel className="app__html-output" />
        <TreeOutputPanel className="app__tree-output" />
      </div>
    </Fragment>
  );
});
