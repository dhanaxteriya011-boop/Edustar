import React, { useState, useEffect, useRef, useContext } from 'react';
import { ToastContext } from '../App';

const Contact = ({ setPage }) => {
  const showToast = useContext(ToastContext);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const go = (id) => { 
    setPage(id); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  // Scroll Reveal & Map Init Logic
  useEffect(() => {
    // 1. Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 2. Leaflet Map Setup
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
      document.head.appendChild(link);
    }

    const LAT = 9.9252;
    const LNG = 78.1198;

    const initMap = () => {
      if (mapInstanceRef.current || !mapRef.current || !window.L) return;
      const L = window.L;
      const map = L.map(mapRef.current, { zoomControl: true, scrollWheelZoom: false }).setView([LAT, LNG], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 19,
      }).addTo(map);

      const icon = L.divIcon({
        html: `<div style="background:linear-gradient(135deg,#0a4a3a,#0d6b54);width:40px;height:40px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid #fff;box-shadow:0 3px 14px rgba(10,74,58,.5);display:flex;align-items:center;justify-content:center;">
                 <span style="transform:rotate(45deg);font-size:1.1rem;">🌟</span>
               </div>`,
        className: '',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      L.marker([LAT, LNG], { icon }).addTo(map)
        .bindPopup(`<strong style="font-family:Outfit;color:#0a4a3a">EduStar Academy</strong><br/>Gandhi Nagar, Madurai`)
        .openPopup();

      mapInstanceRef.current = map;
    };

    if (window.L) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
      script.onload = () => setTimeout(initMap, 200);
      document.head.appendChild(script);
    }

    return () => {
      observer.disconnect();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      showToast('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForm({ name: '', phone: '', email: '', message: '' });
      showToast('Message sent! We will contact you shortly.');
    }, 1500);
  };

  return (
    <>
      <div className="page-hero">
        <div className="breadcrumb">
          <a href="#" onClick={(e) => { e.preventDefault(); go('home'); }}>Home</a>
          <span>/</span>Contact
        </div>
        <h1 className="fade-up">Get In Touch</h1>
        <p className="fade-up delay-1">Have questions? Our team is here to help you.</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-wrap reveal">
            
            {/* LEFT SIDE: Info & Map */}
            <div>
              <div className="section-badge">Contact Details</div>
              <h2 className="section-title">Visit Our Campus</h2>
              <p className="section-sub" style={{ marginBottom: '30px' }}>
                Reach out to us for admissions, course details, or to schedule a campus visit.
              </p>

              <div className="c-info">
                {[
                  { icon: '📍', lbl: 'Location', val: '12, Gandhi Nagar Main Road, Madurai – 625 001' },
                  { icon: '📞', lbl: 'Call Us', val: '+91 95859 49422' },
                  { icon: '📧', lbl: 'Email', val: 'info@edustaracademy.in' },
                  { icon: '⏰', lbl: 'Office Hours', val: 'Mon – Sat: 9 AM – 9 PM' },
                ].map((c, i) => (
                  <div key={i} className="c-item">
                    <div className="c-icon">{c.icon}</div>
                    <div>
                      <div className="c-lbl">{c.lbl}</div>
                      <div className="c-val">{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div id="leaflet-map" ref={mapRef} style={{ marginTop: '30px', height: '300px', borderRadius: '15px' }} />
            </div>

            {/* RIGHT SIDE: Contact Form */}
            <div className="form-card">
              <div className="form-title">Send Message</div>
              <p className="form-sub">Fill out the form below and we'll get back to you shortly.</p>
              
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="fgroup">
                    <label>Full Name *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" required />
                  </div>
                  <div className="fgroup">
                    <label>Phone Number *</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter mobile number" required />
                  </div>
                </div>
                
                <div className="fgroup">
                  <label>Email Address</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="yourname@email.com" />
                </div>

                <div className="fgroup">
                  <label>Your Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="How can we help you?" required />
                </div>

                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Sending...' : '📤 Send Message'}
                </button>
              </form>

              <div style={{ marginTop: '20px' }}>
                <a href="https://wa.me/919585949422" className="btn-whatsapp" target="_blank" rel="noopener noreferrer">
                  💬 Chat on WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <div className="cta-banner reveal">
        <h2>Prefer to Speak Directly?</h2>
        <p>Our admission counselors are available for a call every day from 9 AM to 9 PM.</p>
        <div className="cta-btns">
          <a className="btn-primary" href="tel:+919585949422">📞 Call +91 95859 49422</a>
          <button className="btn-outline" onClick={() => go('services')}>View All Courses</button>
        </div>
      </div>
    </>
  );
};

export default Contact;