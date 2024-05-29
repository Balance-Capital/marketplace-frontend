import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import shadowRoot from './app/hooks/shadowRoot';

const root = ReactDOM.createRoot(shadowRoot());
root.render(
  <StrictMode>
    <link rel="stylesheet" href={chrome.runtime.getURL('styles.css')} />
    <App />
  </StrictMode>
);
