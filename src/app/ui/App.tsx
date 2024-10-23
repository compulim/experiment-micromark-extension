import './App.css';

import { Fragment, memo, useCallback, type FormEventHandler } from 'react';
import useMarkdownEngine from '../data/useMarkdownEngine';
import useShouldSanitize from '../data/useShouldSanitize';
import DOMOutputPanel from './DOMOutputPanel';
import InputPanel from './InputPanel';
import MarkdownOutputPanel from './MarkdownOutputPanel';
import TreeOutputPanel from './TreeOutputPanel';

export default memo(function App() {
  const [markdownEngine, setMarkdownEngine] = useMarkdownEngine();
  const [shouldSanitize, setShouldSanitize] = useShouldSanitize();

  const handleMarkdownEngineChange = useCallback<FormEventHandler<HTMLInputElement>>(
    ({ currentTarget: { value } }) => setMarkdownEngine(value === 'markdown-it' ? value : 'micromark'),
    [setMarkdownEngine]
  );

  const handleShouldSanitizeInput = useCallback<FormEventHandler<HTMLInputElement>>(
    ({ currentTarget: { checked } }) => setShouldSanitize(checked),
    [setShouldSanitize]
  );

  return (
    <Fragment>
      <div className="app">
        <div className="app__title">
          <h1 className="app__title__header">micromark demo</h1>
          <div className="app__title__button-bar">
            <label>
              <input
                checked={markdownEngine === 'markdown-it'}
                onClick={handleMarkdownEngineChange}
                type="radio"
                value="markdown-it"
              />
              <code>markdown-it</code>
            </label>
            <label>
              <input
                checked={markdownEngine === 'micromark'}
                onClick={handleMarkdownEngineChange}
                type="radio"
                value="micromark"
              />
              <code>micromark</code>
            </label>
            <label>
              <input checked={shouldSanitize} onChange={handleShouldSanitizeInput} type="checkbox" />
              Sanitize
            </label>
          </div>
        </div>
        <InputPanel className="app__input" />
        <MarkdownOutputPanel className="app__markdown-output" />
        <DOMOutputPanel className="app__dom-output" />
        <TreeOutputPanel className="app__tree-output" />
      </div>
    </Fragment>
  );
});
