import './DOMOutputPanel.css';

import classNames from 'classnames';
import { memo } from 'react';
import useHTML from '../data/useHTML';

type DOMOutputPanelProps = { className?: string | undefined };

const DOMOutputPanel = memo(({ className }: DOMOutputPanelProps) => {
  const html = useHTML();

  return (
    <textarea className={classNames('dom-output-panel', className)} readOnly={true}>
      {html}
    </textarea>
  );
});

export default DOMOutputPanel;
