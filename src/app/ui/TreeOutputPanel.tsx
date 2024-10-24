import './TreeOutputPanel.css';

import classNames from 'classnames';
import { memo } from 'react';

import useAST from '../data/useAST';

export type TreeOutputPanelProps = { className?: string | undefined };

const TreeOutputPanel = memo(({ className }: TreeOutputPanelProps) => (
  <textarea className={classNames('tree-output-panel', className)} readOnly={true} value={useAST()[0]} />
));

export default TreeOutputPanel;
