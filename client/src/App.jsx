import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ReportIncident } from './pages/ReportIncident';
import { SafeRoutes } from './pages/SafeRoutes';
import { AdminDashboard } from './pages/AdminDashboard';
import { IncidentProvider } from './context/IncidentContext';
import { LanguageProvider } from './context/LanguageContext';
import LanguageSelector from './components/LanguageSelector';

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let pageKey = 'home';
    if (path.startsWith('/report')) pageKey = 'report';
    else if (path.startsWith('/safe-routes')) pageKey = 'routes';
    else if (path.startsWith('/admin')) pageKey = 'admin';
    document.body.dataset.page = pageKey;
  }, [location]);

  return (
    <IncidentProvider>
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<ReportIncident />} />
            <Route path="/safe-routes" element={<SafeRoutes />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        
        {/* Floating Draggable Language Selector Widget */}
        <LanguageSelector mode="floating" />
      </div>
    </IncidentProvider>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;
