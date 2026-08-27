import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ReportIncident } from './pages/ReportIncident';
import { SafeRoutes } from './pages/SafeRoutes';
import { AdminDashboard } from './pages/AdminDashboard';
import { IncidentProvider } from './context/IncidentContext';

export function App() {
  return (
    <IncidentProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
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
        </div>
      </Router>
    </IncidentProvider>
  );
}

export default App;
