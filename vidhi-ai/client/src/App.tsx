import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ConsultationProvider } from './context/ConsultationContext';
import { PatientProvider } from './context/PatientContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import DemoMode from './pages/DemoMode';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import PatientProfile from './pages/PatientProfile';
import Consultation from './pages/Consultation';
import WaitingList from './pages/WaitingList';
import Layout from './components/Layout';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Layout>{children}</Layout>;
};

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/demo" element={<DemoMode />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/patients" element={<ProtectedRoute><Patients /></ProtectedRoute>} />
      <Route path="/patients/:id" element={<ProtectedRoute><PatientProfile /></ProtectedRoute>} />
      <Route path="/consultation" element={<ProtectedRoute><Consultation /></ProtectedRoute>} />
      <Route path="/consultation/:id" element={<ProtectedRoute><Consultation /></ProtectedRoute>} />
      <Route path="/schedule" element={<ProtectedRoute><WaitingList /></ProtectedRoute>} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <PatientProvider>
        <ConsultationProvider>
          <Router>
            <AppRoutes />
          </Router>
        </ConsultationProvider>
      </PatientProvider>
    </AuthProvider>
  );
}

export default App;
