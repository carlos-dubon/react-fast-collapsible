import { useState } from 'react';
import { Collapsible } from 'react-fast-collapsible';

export function App() {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '64px 24px' }}>
      <h1>react-fast-collapsible</h1>
      <p>A minimal React component for smoothly revealing and hiding content.</p>

      <button onClick={() => setOpen((v) => !v)}>{open ? 'Collapse' : 'Expand'}</button>

      <Collapsible open={open} innerStyle={{ paddingTop: 12 }}>
        <p>
          The panel grows and shrinks smoothly regardless of how much content lives inside it.
          The height is resolved by CSS grid, so nothing is measured in JavaScript.
        </p>
      </Collapsible>
    </div>
  );
}
