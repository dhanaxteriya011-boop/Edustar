import React, { useState } from 'react';

const Services = ({ setPage }) => {
  const go = (id) => { setPage(id); window.scrollTo({ top: 0 }); };
  const [tab, setTab] = useState('all');

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
    { key: 'foundation', label: 'Foundation (6–8)' },
    { key: 'board', label: 'Board Prep (9–10)' },
    { key: 'advanced', label: 'Advanced (11–12)' },
    { key: 'special', label: 'Special / Crash' },
  ];

  const tabStyle = (key) => ({
    padding: '9px 20px', borderRadius: 50, fontWeight: 600, fontSize: '.85rem',
    border: '2px solid var(--primary-mid)',
    background: tab === key ? 'var(--primary)' : 'transparent',
    color: tab === key ? '#fff' : 'var(--primary)',
    cursor: 'pointer', transition: '.2s', fontFamily: 'Outfit, sans-serif',
  });

  return (
    <>
      <div className="page-hero">
        <div className="breadcrumb">
          <a href="#" onClick={(e) => { e.preventDefault(); go('home'); }}>Home</a>
          <span>/</span>Services
        </div>
        <h1>Our Services &amp; Courses</h1>
        <p>Structured programs for every grade — expert-taught and results-proven</p>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 40, justifyContent: 'center' }}>
            {tabs.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)} style={tabStyle(t.key)}>{t.label}</button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 24 }}>
            {filtered.map((c, i) => (
              <div key={i} className="svc-card" style={{ position: 'relative' }}>
                <div className="svc-head">
                  <div className="svc-grade">Grade {c.grade}</div>
                  <div className="svc-lbl">{c.label}</div>
                  <span style={{ position:'absolute', top:14, right:14, background:'rgba(232,160,32,.9)', color:'#061f18', fontSize:'.7rem', fontWeight:700, padding:'3px 10px', borderRadius:50 }}>{c.seats}</span>
                </div>
                <div className="svc-body">
                  <p style={{ color: 'var(--text-muted)', fontSize: '.86rem', marginBottom: 14, lineHeight: 1.7 }}>{c.desc}</p>
                  <div className="svc-tags">{c.subjects.map((s, j) => <span key={j} className="tag">{s}</span>)}</div>
                  <div className="svc-meta">
                    <div className="svc-meta-row"><span>⏰</span><strong>{c.time}</strong></div>
                    <div className="svc-meta-row"><span>📅</span>{c.days}</div>
                    <div className="svc-meta-row"><span>🚀</span>Batch: {c.batch}</div>
                    <div className="svc-meta-row"><span>🎫</span>Admission fee: {c.admission}</div>
                  </div>
                  <div className="svc-fee" style={{ marginTop: 12 }}>{c.fee} <span>/ month</span></div>
                  <button className="btn-enq" onClick={() => go('enquiry')}>📋 Enquire &amp; Enrol</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="sec-head center">
            <div className="section-badge">Fee Structure</div>
            <h2 className="section-title">Complete Fee Summary</h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: 'var(--sh-sm)' }}>
              <thead>
                <tr style={{ background: 'var(--primary)', color: '#fff' }}>
                  {['Class','Subjects','Timing','Days','Monthly Fee','Admission Fee'].map((h, i) => (
                    <th key={i} style={{ padding: '14px 18px', textAlign: 'left', fontSize: '.84rem', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Grade 6–8','Maths, Science, English, Social','5 PM – 6 PM','Mon–Sat','₹1,200','₹500'],
                  ['Grade 9–10','Maths, Science, English, Social','6 PM – 7:30 PM','Mon–Sat','₹1,500','₹500'],
                  ['Grade 11–12','Physics, Chemistry, Maths, Bio','7:30 PM – 9 PM','Mon–Sat','₹2,000','₹750'],
                  ['Special Coaching','All Subjects + Doubt Clearing','9 AM – 12 PM','Sat & Sun','₹2,500','₹500'],
                  ['Crash Course','Maths, Science, All Subjects','Flexible','2 Weeks','₹800','Nil'],
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? '#fff' : 'rgba(245,242,235,.6)' }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: '13px 18px', fontSize: '.86rem', color: j === 0 ? 'var(--primary)' : 'var(--text-muted)', fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="cta-banner">
        <h2>Ready to Enrol Your Child?</h2>
        <p>Submit an enquiry and we will confirm seat availability within 24 hours.</p>
        <div className="cta-btns">
          <button className="btn-primary" onClick={() => go('enquiry')}>📋 Submit Enquiry</button>
          <a className="btn-outline" href="https://wa.me/919876543210?text=Hello%2C%20I%20want%20to%20enquire%20about%20EduStar%20courses" target="_blank" rel="noopener noreferrer">💬 WhatsApp Us</a>
        </div>
      </div>
    </>
  );
};

export default Services;
