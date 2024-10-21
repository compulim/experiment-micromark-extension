import './MarkdownOutputPanel.css';

import classNames from 'classnames';
import { micromark } from 'micromark';
import { memo, useMemo } from 'react';
import useValue from '../data/useValue';

type MarkdownOutputPanelProps = { className?: string | undefined };

const MarkdownOutputPanel = memo(({ className }: MarkdownOutputPanelProps) => {
  const [value] = useValue();
  const html = useMemo(() => Object.freeze({ __html: micromark(value) }), [value]);

  return <div className={classNames('markdown-output-panel', className)} dangerouslySetInnerHTML={html} />;
});

export default MarkdownOutputPanel;
