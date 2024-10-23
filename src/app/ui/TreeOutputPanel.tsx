import './TreeOutputPanel.css';

import classNames from 'classnames';
import { memo, useMemo } from 'react';

import { fromMarkdown } from 'mdast-util-from-markdown';

import useValue from '../data/useValue';

export type TreeOutputPanelProps = { className?: string | undefined };

const TreeOutputPanel = memo(({ className }: TreeOutputPanelProps) => {
  const [value] = useValue();

  const tree = useMemo(() => {
    try {
      return JSON.stringify(fromMarkdown(value), null, 2);
    } catch {
      return '<Failed to parse Markdown>';
    }
  }, [value]);

  return <textarea className={classNames('tree-output-panel', className)} readOnly={true} value={tree} />;
});

export default TreeOutputPanel;
