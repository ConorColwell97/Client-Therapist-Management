import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Home from './pages/Home';
import Therapist from './pages/Therapists/Therapist';
import Display from './pages/Therapists/DisplayTherapist';
import Client from './pages/Clients/Client';
import Session from './pages/Sessions/Session';
import './App.css';

const Dashboard = lazy(() => import('./pages/Therapists/TherapistDashboard'));

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/Therapist" element={<Therapist />} />
        <Route path="/TherapistDash" element={<Suspense fallback={<p>Loading...</p>}><Dashboard /></Suspense>} />
        <Route path="/TherapistDis" element={<Display />} />
        <Route path="/Client" element={<Client />} />
        <Route path="/Session" element={<Session />} />
      </Routes>
    </Router>
  );
}

export default App;
