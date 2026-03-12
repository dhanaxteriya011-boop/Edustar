import React, { useState, useEffect } from 'react';

const Navbar = ({ page, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 22);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
    // Removed: Enquiry link object
  ];

  const go = (id) => { setPage(id); setOpen(false); };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo" onClick={() => go('home')}>
        <div className="logo-mark">🌟</div>
        <div className="logo-text">EduStar <em>Academy</em></div>
      </div>
      <div className={`nav-links ${open ? 'open' : ''}`}>
        {links.map(l => (
          <a 
            key={l.id} 
            className={page === l.id ? 'active' : ''} 
            href="#" 
            onClick={e => { e.preventDefault(); go(l.id); }}
          >
            {l.label}
          </a>
        ))}
      </div>
      <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  );
};

export default Navbar;