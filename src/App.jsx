import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Therapist from './pages/Therapists/Therapist';
import Client from './pages/Clients/Client';
import Session from './pages/Sessions/Session';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/Therapist" element={<Therapist />} />
        <Route path="/Client" element={<Client />} />
        <Route path="/Session" element={<Session />} />
      </Routes>
    </Router>
  );
}

export default App;
