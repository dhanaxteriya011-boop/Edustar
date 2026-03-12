import React, { useEffect } from 'react';

const About = ({ setPage }) => {
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

  const teachers = [
    { name: 'Mr. Rajesh Kumar', subject: 'Mathematics', exp: '12 Yrs', initials: 'R', qual: 'M.Sc Maths, B.Ed' },
    { name: 'Ms. Priya Sharma', subject: 'Science', exp: '9 Yrs', initials: 'P', qual: 'M.Sc Chemistry, B.Ed' },
    { name: 'Mr. Suresh Babu', subject: 'Physics', exp: '14 Yrs', initials: 'S', qual: 'M.Sc Physics, M.Ed' },
    { name: 'Ms. Anitha Devi', subject: 'English', exp: '8 Yrs', initials: 'A', qual: 'M.A English, B.Ed' },
    { name: 'Mr. Karthik Rajan', subject: 'Chemistry', exp: '11 Yrs', initials: 'K', qual: 'M.Sc Chemistry, B.Ed' },
    { name: 'Ms. Deepa Nair', subject: 'Biology', exp: '7 Yrs', initials: 'D', qual: 'M.Sc Biology, B.Ed' },
  ];

  return (
    <>
      {/* ── PAGE HERO ── */}
      <div className="page-hero">
        <div className="breadcrumb">
          <a href="#" onClick={(e) => { e.preventDefault(); go('home'); }}>Home</a>
          <span>/</span>
          About
        </div>
        <h1 className="fade-up">About EduStar Academy</h1>
        <p className="fade-up delay-1">16+ years of nurturing academic excellence in Madurai</p>
      </div>

      {/* ── STORY & VALUES ── */}
      <section className="section">
        <div className="container reveal">
          <div className="why-wrap">
            <div className="why-visual">
              <h2 className="section-title" style={{ color: '#fff', fontSize: '2.2rem' }}>Our Story</h2>
              <p style={{ color: 'rgba(255,255,255,.8)', lineHeight: 1.8, marginBottom: '30px' }}>
                Founded in 2009, EduStar Academy began with a simple mission: quality education that is accessible, personalised, and results-driven. Today, we are a leading institution serving over 600 students.
              </p>
              <div className="why-mini">
                <div className="why-box"><div className="n">600+</div><p>Students</p></div>
                <div className="why-box"><div className="n">16+</div><p>Years</p></div>
                <div className="why-box"><div className="n">12+</div><p>Teachers</p></div>
                <div className="why-box"><div className="n">96%</div><p>Pass Rate</p></div>
              </div>
            </div>
            
            <div>
              <div className="section-badge">Our Values</div>
              <h2 className="section-title">Shaping Tomorrow's Leaders</h2>
              <p className="section-sub" style={{ marginBottom: 30 }}>Every child has the potential to excel. Our role is to provide the right environment and support.</p>
              <div className="why-points">
                {[
                  { icon: '🎯', title: 'Our Mission', desc: 'Deliver exceptional academic coaching that builds both knowledge and confidence.' },
                  { icon: '👁️', title: 'Our Vision', desc: 'Be the most trusted education partner for families across Tamil Nadu.' },
                  { icon: '💡', title: 'Core Values', desc: 'Integrity, dedication, innovation, and genuine care for every student.' },
                ].map((v, i) => (
                  <div key={i} className="why-pt">
                    <div className="why-pt-icon">{v.icon}</div>
                    <div><h4>{v.title}</h4><p>{v.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MILESTONES ── */}
      <section className="section section-alt">
        <div className="container reveal">
          <div className="sec-head center">
            <div className="section-badge">Our Journey</div>
            <h2 className="section-title">Key Milestones</h2>
          </div>
          <div className="g4">
            {[
              { year: '2009', title: 'Founded', desc: 'Started with 25 students and 2 teachers.' },
              { year: '2014', title: 'Expansion', desc: 'Moved to a larger facility for 200+ students.' },
              { year: '2019', title: 'Recognition', desc: 'Awarded Best Tuition Centre in Madurai.' },
              { year: '2023', title: '600 Students', desc: 'Crossed 600 students with a 12-member faculty.' },
            ].map((m, i) => (
              <div key={i} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent)', marginBottom: 8 }}>{m.year}</div>
                <h3>{m.title}</h3>
                <p style={{ fontSize: '0.85rem' }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEACHERS ── */}
      <section className="section">
        <div className="container reveal">
          <div className="sec-head center">
            <div className="section-badge">Our Team</div>
            <h2 className="section-title">Meet Our Experts</h2>
            <p className="section-sub">Highly qualified educators dedicated to student success.</p>
          </div>
          <div className="g3">
            {teachers.map((t, i) => (
              <div key={i} className="teacher-card">
                <div className="t-avatar">{t.initials}</div>
                <div className="t-name">{t.name}</div>
                <div className="t-subject">{t.subject}</div>
                <div className="t-qual">{t.qual}</div>
                <span className="t-exp">⏱ {t.exp} Exp.</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="cta-banner reveal">
        <h2>Want to learn more?</h2>
        <p>Visit our academy or contact us to discuss your child's academic needs.</p>
        <div className="cta-btns">
          <button className="btn-primary" onClick={() => go('contact')}>📩 Get in Touch</button>
          <a className="btn-outline" href="tel:+919876543210">📞 Call Now</a>
        </div>
      </div>
    </>
  );
};

export default About;