import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './index.css';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import DesignerPage from './pages/DesignerPage';
import GalleryPage from './pages/GalleryPage';
import HelpPage from './pages/HelpPage';

/**
 * PUBLIC_INTERFACE
 * App
 * The main application component that sets up theming, simple navigation, and page rendering.
 * - Applies/persists data-theme on <html>
 * - Shows an Experimental badge if REACT_APP_FEATURE_FLAGS or REACT_APP_EXPERIMENTS_ENABLED indicate enabled
 * - Provides a simple tab-based navigation (router-ready structure for later replacement)
 */
function App() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('vga-theme');
    return stored || 'light';
  });

  const [activePage, setActivePage] = useState('designer');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vga-theme', theme);
  }, [theme]);

  const experimentalEnabled = useMemo(() => {
    const flags = (process.env.REACT_APP_FEATURE_FLAGS || '').toLowerCase();
    const experiments = (process.env.REACT_APP_EXPERIMENTS_ENABLED || '').toLowerCase();
    return flags.includes('experimental') || experiments === 'true';
  }, []);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };

  // PUBLIC_INTERFACE
  const navigate = (pageKey) => {
    setActivePage(pageKey);
  };

  const mainContent = useMemo(() => {
    switch (activePage) {
      case 'designer':
        return <DesignerPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'help':
        return <HelpPage />;
      default:
        return <DesignerPage />;
    }
  }, [activePage]);

  return (
    <div className="app-shell" style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <Header
        activePage={activePage}
        onNavigate={navigate}
        onToggleTheme={toggleTheme}
        theme={theme}
        experimental={experimentalEnabled}
      />
      <main id="main-content" role="main" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {mainContent}
      </main>
      <Footer />
    </div>
  );
}

export default App;
