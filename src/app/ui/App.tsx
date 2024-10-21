import './App.css';

import { Fragment, memo } from 'react';
import InputPanel from './InputPanel';
import MarkdownOutputPanel from './MarkdownOutputPanel';
import TreeOutputPanel from './TreeOutputPanel';

export default memo(function App() {
  return (
    <Fragment>
      <div className="app">
        <h1 className="app__title">micromark demo</h1>
        <InputPanel className="app__input" />
        <MarkdownOutputPanel className="app__markdown-output" />
        <TreeOutputPanel className="app__tree-output" />
      </div>
    </Fragment>
  );
});
