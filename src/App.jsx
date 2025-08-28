import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Home from './pages/Home';
import Therapist from './pages/Therapists/Therapist';
import DisplayTherapist from './pages/Therapists/DisplayTherapist';
import Client from './pages/Clients/Client';
import DisplayClient from './pages/Clients/DisplayClient';
import Session from './pages/Sessions/Session';
import DisplaySession from './pages/Sessions/DisplaySession';
import './App.css';

const TherapistDashboard = lazy(() => import('./pages/Therapists/TherapistDashboard'));
const ClientDashboard = lazy(() => import('./pages/Clients/ClientDashboard'));
const SessionDashboard = lazy(() => import('./pages/Sessions/SessionDashboard'));

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/Therapist" element={<Therapist />} />
        <Route path="/TherapistDash" element={<Suspense fallback={<p>Loading...</p>}><TherapistDashboard /></Suspense>} />
        <Route path="/TherapistDis" element={<DisplayTherapist />} />
        <Route path="/Client" element={<Client />} />
        <Route path="/ClientDash" element={<Suspense fallback={<p>Loading...</p>}><ClientDashboard /></Suspense>} />
        <Route path="/ClientDis" element={<DisplayClient />} />
        <Route path="/Session" element={<Session />} />
        <Route path="/SessionDash" element={<Suspense fallback={<p>Loading...</p>}><SessionDashboard /></Suspense>} />
        <Route path="/SessionDis" element={<DisplaySession />} />
      </Routes>
    </Router>
  );
}

export default App;
