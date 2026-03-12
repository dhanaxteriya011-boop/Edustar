import React, { useState, useEffect } from 'react';

const Services = ({ setPage }) => {
  const [tab, setTab] = useState('all');

  const go = (id) => { 
    setPage(id); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  // Scroll Reveal Animation Logic
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const courses = [
    { grade: '6–8', label: 'Foundation', subjects: ['Mathematics','Science','English','Social Studies'], time: '5:00 PM – 6:00 PM', days: 'Mon–Sat', fee: '₹1,200', admission: '₹500', batch: 'June 2, 2025', seats: '8 seats left', desc: 'Build strong fundamentals in core subjects. Perfect for students entering middle school.', tag: 'foundation' },
    { grade: '9–10', label: 'Board Preparation', subjects: ['Mathematics','Science','English','Social Science'], time: '6:00 PM – 7:30 PM', days: 'Mon–Sat', fee: '₹1,500', admission: '₹500', batch: 'June 2, 2025', seats: '5 seats left', desc: 'Intensive SSLC/Class 10 board exam preparation with model tests and full revision.', tag: 'board' },
    { grade: '11–12', label: 'Advanced / HSC', subjects: ['Physics','Chemistry','Mathematics','Biology'], time: '7:30 PM – 9:00 PM', days: 'Mon–Sat', fee: '₹2,000', admission: '₹750', batch: 'June 3, 2025', seats: '3 seats left', desc: 'HSC board + entrance exam preparation (NEET/JEE basics) for Grades 11 and 12.', tag: 'advanced' },
    { grade: 'Special', label: 'Weekend Coaching', subjects: ['All Subjects','Doubt Clearing','Olympiad Prep'], time: '9:00 AM – 12:00 PM', days: 'Sat & Sun', fee: '₹2,500', admission: '₹500', batch: 'Rolling', seats: 'Open', desc: 'Intensive weekend sessions for extra support or competitive exam preparation.', tag: 'special' },
    { grade: 'Crash', label: 'Crash Course', subjects: ['Maths','Science','All Subjects'], time: 'Flexible', days: '2-week intensive', fee: '₹800', admission: 'Nil', batch: 'Pre-exam', seats: 'Open', desc: 'Quick revision crash courses before board exams to boost scores rapidly.', tag: 'special' },
  ];

  const filtered = tab === 'all' ? courses : courses.filter(c => c.tag === tab);

  const tabs = [
    { key: 'all', label: 'All Courses' },
    { key: 'foundation', label: 'Grades 6–8' },
    { key: 'board', label: 'Grades 9–10' },
    { key: 'advanced', label: 'Grades 11–12' },
    { key: 'special', label: 'Special / Crash' },
  ];

  return (
    <>
      {/* ── PAGE HERO ── */}
      <div className="page-hero">
        <div className="breadcrumb">
          <a href="#" onClick={(e) => { e.preventDefault(); go('home'); }}>Home</a>
          <span>/</span>Services
        </div>
        <h1 className="fade-up">Our Courses & Fee Structure</h1>
        <p className="fade-up delay-1">Expert-taught programs designed for academic excellence</p>
      </div>

      {/* ── COURSE TABS ── */}
      <section className="section">
        <div className="container reveal">
          <div className="tab-container" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 40, justifyContent: 'center' }}>
            {tabs.map(t => (
              <button 
                key={t.key} 
                onClick={() => setTab(t.key)}
                className={`btn-tab ${tab === t.key ? 'active' : ''}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {filtered.map((c, i) => (
              <div key={i} className="svc-card">
                <div className="svc-head">
                  <div className="svc-grade">Grade {c.grade}</div>
                  <div className="svc-lbl">{c.label}</div>
                  <span className="seats-badge">{c.seats}</span>
                </div>
                <div className="svc-body">
                  <p className="svc-desc">{c.desc}</p>
                  <div className="svc-tags">
                    {c.subjects.map((s, j) => <span key={j} className="tag">{s}</span>)}
                  </div>
                  <div className="svc-meta">
                    <div className="svc-meta-row"><span>⏰</span><strong>{c.time}</strong></div>
                    <div className="svc-meta-row"><span>📅</span>{c.days}</div>
                    <div className="svc-meta-row"><span>🎫</span>Admission: {c.admission}</div>
                  </div>
                  <div className="svc-fee">{c.fee} <span>/ month</span></div>
                  <button className="btn-enq" onClick={() => go('contact')}>Enrol Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DETAILED TABLE ── */}
      <section className="section section-alt">
        <div className="container reveal">
          <div className="sec-head center">
            <div className="section-badge">Fee Summary</div>
            <h2 className="section-title">Transparent Pricing</h2>
          </div>
          <div className="table-responsive" style={{ overflowX: 'auto', borderRadius: '15px', border: '1px solid var(--border)' }}>
            <table className="fee-table" style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
              <thead>
                <tr style={{ background: 'var(--primary)', color: '#fff' }}>
                  {['Class','Subjects','Timing','Monthly Fee','Admission'].map((h, i) => (
                    <th key={i} style={{ padding: '16px', textAlign: 'left', fontSize: '.85rem' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {courses.map((c, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '15px', fontWeight: 600, color: 'var(--primary)' }}>Grade {c.grade}</td>
                    <td style={{ padding: '15px', fontSize: '.85rem', color: 'var(--text-muted)' }}>{c.subjects.join(', ')}</td>
                    <td style={{ padding: '15px', fontSize: '.85rem' }}>{c.time}</td>
                    <td style={{ padding: '15px', fontWeight: 700, color: 'var(--primary-mid)' }}>{c.fee}</td>
                    <td style={{ padding: '15px', fontSize: '.85rem' }}>{c.admission}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="cta-banner reveal">
        <h2>Ready to Secure a Seat?</h2>
        <p>Contact us today to verify availability and complete the admission process.</p>
        <div className="cta-btns">
          <button className="btn-primary" onClick={() => go('contact')}>📩 Contact Admission Office</button>
          <a className="btn-outline" href="https://wa.me/919876543210">💬 Chat on WhatsApp</a>
        </div>
      </div>
    </>
  );
};

export default Services;