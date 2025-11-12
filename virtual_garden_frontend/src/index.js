import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

/**
 * Basic log level control using REACT_APP_LOG_LEVEL
 * Allowed: 'debug' | 'info' | 'warn' | 'error'
 */
(function configureLogging() {
  const level = (process.env.REACT_APP_LOG_LEVEL || '').toLowerCase();
  const noop = () => {};
  const levels = ['debug', 'info', 'warn', 'error'];
  const currentIdx = Math.max(0, levels.indexOf(level));

  const consoleMap = {
    debug: console.debug ? console.debug.bind(console) : console.log.bind(console),
    info: console.info ? console.info.bind(console) : console.log.bind(console),
    warn: console.warn ? console.warn.bind(console) : console.log.bind(console),
    error: console.error ? console.error.bind(console) : console.log.bind(console),
  };

  // Replace console methods below threshold with noop
  if (currentIdx > -1) {
    if (currentIdx > 0) console.debug = noop;
    if (currentIdx > 1) console.info = noop;
    if (currentIdx > 2) console.warn = noop;
  }

  // Ensure error always logs
  console.error = consoleMap.error;
})();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* PUBLIC_INTERFACE
       Root application shell
    */}
    <div className="app-root">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <App />
    </div>
  </React.StrictMode>
);
