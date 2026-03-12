import React, { useState, useEffect } from 'react';
import './styles/main.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WaFloat from './components/WaFloat';
import Toast from './components/Toast';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
// Removed: import Enquiry from './pages/Enquiry';

export const ToastContext = React.createContext(null);

function App() {
  const [page, setPage] = useState('home');
  const [toast, setToast] = useState({ show: false, msg: '' });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 3500);
  };

  return (
    <ToastContext.Provider value={showToast}>
      <Navbar page={page} setPage={setPage} />
      {page === 'home'     && <Home     setPage={setPage} />}
      {page === 'about'    && <About    setPage={setPage} />}
      {page === 'services' && <Services setPage={setPage} />}
      {page === 'contact'  && <Contact  setPage={setPage} />}
      {/* Removed: Enquiry page conditional */}
      
      <Footer setPage={setPage} />
      <WaFloat />
      <Toast show={toast.show} msg={toast.msg} />
    </ToastContext.Provider>
  );
}

export default App;