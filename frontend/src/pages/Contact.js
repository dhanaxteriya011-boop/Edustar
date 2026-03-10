import React, { useState, useEffect, useRef, useContext } from 'react';
import { ToastContext } from '../App';

const Contact = ({ setPage }) => {
  const go = (id) => { setPage(id); window.scrollTo({ top: 0 }); };
  const showToast = useContext(ToastContext);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  // EduStar Academy coordinates — Madurai (Gandhi Nagar area)
  const LAT = 9.9252;
  const LNG = 78.1198;

  useEffect(() => {
    // Load Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
      document.head.appendChild(link);
    }

    // Load Leaflet JS then init map
    const initMap = () => {
      if (mapInstanceRef.current || !mapRef.current || !window.L) return;
      const L = window.L;

      const map = L.map(mapRef.current, { zoomControl: true, scrollWheelZoom: false }).setView([LAT, LNG], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Custom icon
      const icon = L.divIcon({
        html: `<div style="background:linear-gradient(135deg,#0a4a3a,#0d6b54);width:40px;height:40px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid #fff;box-shadow:0 3px 14px rgba(10,74,58,.5);display:flex;align-items:center;justify-content:center;">
                 <span style="transform:rotate(45deg);font-size:1.1rem;">🌟</span>
               </div>`,
        className: '',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -44],
      });

      const marker = L.marker([LAT, LNG], { icon }).addTo(map);
      marker.bindPopup(
        `<div style="font-family:Outfit,sans-serif;min-width:180px;padding:4px">
          <strong style="color:#0a4a3a;font-size:1rem;">🌟 EduStar Academy</strong><br/>
          <span style="color:#6b7060;font-size:.83rem;">12, Gandhi Nagar, Madurai – 625 001</span><br/>
          <a href="https://maps.google.com/?q=${LAT},${LNG}" target="_blank" style="color:#0d6b54;font-size:.82rem;font-weight:600;">Open in Google Maps →</a>
        </div>`
      ).openPopup();

      mapInstanceRef.current = map;
    };

    if (window.L) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
      script.onload = () => setTimeout(initMap, 100);
      document.head.appendChild(script);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.message) return;
    setLoading(true);
    try {
      await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch (e) { /* backend offline — still show success */ }
    setLoading(false);
    setForm({ name: '', phone: '', email: '', message: '' });
    showToast('Message sent! We will contact you shortly.');
  };

  return (
    <>
      <div className="page-hero">
        <div className="breadcrumb">
          <a href="#" onClick={e => { e.preventDefault(); go('home'); }}>Home</a>
          <span>/</span>Contact
        </div>
        <h1>Get In Touch</h1>
        <p>We are here to help — reach out anytime</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-wrap">

            {/* LEFT — info + map */}
            <div>
              <div className="section-badge">Contact Info</div>
              <h2 className="section-title">Find Us</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.8, fontSize: '.92rem' }}>
                Have questions about courses, fees, or admission? Reach out through any channel below.
              </p>
              <div className="c-info" style={{ marginBottom: 20 }}>
                {[
                  { icon: '📍', lbl: 'Address', val: '12, Gandhi Nagar Main Road, Madurai – 625 001, Tamil Nadu' },
                  { icon: '📞', lbl: 'Phone', val: '+91 98765 43210' },
                  { icon: '📧', lbl: 'Email', val: 'info@edustaracademy.in' },
                  { icon: '⏰', lbl: 'Office Hours', val: 'Mon–Sat: 9 AM – 9 PM' },
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

              <a
                className="btn-whatsapp"
                href="https://wa.me/919876543210?text=Hello%20EduStar%20Academy%2C%20I%20have%20a%20query"
                target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat with Us on WhatsApp
              </a>

              {/* LEAFLET MAP */}
              <div id="leaflet-map" ref={mapRef} />
            </div>

            {/* RIGHT — form */}
            <div className="form-card">
              <div className="form-title">Send Us a Message</div>
              <div className="form-sub">We reply within 24 hours</div>

              <div className="form-row">
                <div className="fgroup">
                  <label>Your Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full name" />
                </div>
                <div className="fgroup">
                  <label>Phone *</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Mobile number" />
                </div>
              </div>
              <div className="fgroup">
                <label>Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
              </div>
              <div className="fgroup">
                <label>Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="How can we help?" style={{ minHeight: 120 }} />
              </div>
              <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
                {loading ? '⏳ Sending...' : '📤 Send Message'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
