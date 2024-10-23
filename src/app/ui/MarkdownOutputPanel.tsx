import './MarkdownOutputPanel.css';

import classNames from 'classnames';
import { memo, useMemo } from 'react';
import useHTML from '../data/useHTML';

type MarkdownOutputPanelProps = { className?: string | undefined };

const MarkdownOutputPanel = memo(({ className }: MarkdownOutputPanelProps) => {
  const [html] = useHTML();
  const dangerouslySetInnerHTML = useMemo<Readonly<{ __html: string }>>(() => Object.freeze({ __html: html }), [html]);

  return (
    <div className={classNames('markdown-output-panel', className)} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
  );
});

export default MarkdownOutputPanel;
