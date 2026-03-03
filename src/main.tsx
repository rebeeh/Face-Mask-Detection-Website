import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const container = document.getElementById('root');

if (!container) {
  throw new Error(
    '[main] Root element #root not found. ' +
    'Ensure index.html contains <div id="root"></div>.',
  );
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
