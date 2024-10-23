import './HTMLOutputPanel.css';

import classNames from 'classnames';
import { memo } from 'react';
import useHTML from '../data/useHTML';

type HTMLOutputPanelProps = { className?: string | undefined };

const HTMLOutputPanel = memo(({ className }: HTMLOutputPanelProps) => {
  const html = useHTML();

  return <pre className={classNames('markdown-output-panel', className)}>{html}</pre>;
});

export default HTMLOutputPanel;
