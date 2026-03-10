import React from 'react';

const About = ({ setPage }) => {
  const go = (id) => { setPage(id); window.scrollTo({ top: 0 }); };

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
      <div className="page-hero">
        <div className="breadcrumb"><a href="#" onClick={() => go('home')}>Home</a><span>/</span>About</div>
        <h1>About EduStar Academy</h1>
        <p>16+ years of nurturing academic excellence in Madurai</p>
      </div>

      {/* STORY */}
      <section className="section">
        <div className="container">
          <div className="why-wrap">
            <div className="why-visual">
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.9rem', color: '#fff', marginBottom: 10 }}>Our Story</h2>
              <p style={{ color: 'rgba(255,255,255,.78)', lineHeight: 1.8, fontSize: '.92rem' }}>
                Founded in 2009, EduStar Academy began with a simple mission: quality education that is accessible, personalised, and results-driven. Today, we serve 600+ students with a team of 12 dedicated educators.
              </p>
              <div className="why-mini">
                <div className="why-box"><div className="n">600+</div><p>Students Enrolled</p></div>
                <div className="why-box"><div className="n">16+</div><p>Years Experience</p></div>
                <div className="why-box"><div className="n">12+</div><p>Expert Teachers</p></div>
                <div className="why-box"><div className="n">96%</div><p>Pass Rate</p></div>
              </div>
            </div>
            <div>
              <div className="section-badge">Our Values</div>
              <h2 className="section-title">Shaping Tomorrow's Leaders</h2>
              <p className="section-sub" style={{ marginBottom: 22 }}>Every child has the potential to excel. Our role is to provide the right environment and support.</p>
              <div className="why-points">
                {[
                  { icon: '🎯', title: 'Our Mission', desc: 'Deliver exceptional academic coaching that builds both knowledge and confidence.' },
                  { icon: '👁️', title: 'Our Vision', desc: 'Be the most trusted education partner for families across Tamil Nadu.' },
                  { icon: '💡', title: 'Our Values', desc: 'Integrity, dedication, innovation, and genuine care for every student.' },
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

      {/* MILESTONES */}
      <section className="section section-alt">
        <div className="container">
          <div className="sec-head center">
            <div className="section-badge">Our Journey</div>
            <h2 className="section-title">Key Milestones</h2>
          </div>
          <div className="g4">
            {[
              { year: '2009', title: 'Founded', desc: 'Started with 25 students and 2 teachers in a small classroom.' },
              { year: '2014', title: 'Expansion', desc: 'Moved to larger premises accommodating 200+ students.' },
              { year: '2019', title: 'Recognition', desc: 'Awarded Best Tuition Centre in Madurai by Education Forum.' },
              { year: '2023', title: '600 Students', desc: 'Crossed 600 enrolled students with a 12-member faculty.' },
            ].map((m, i) => (
              <div key={i} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.7rem', fontWeight: 700, color: 'var(--accent)', marginBottom: 8 }}>{m.year}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEACHERS */}
      <section className="section">
        <div className="container">
          <div className="sec-head center">
            <div className="section-badge">Our Team</div>
            <h2 className="section-title">Meet Our Teachers</h2>
            <p className="section-sub">Highly qualified educators dedicated to your child's success.</p>
          </div>
          <div className="g3">
            {teachers.map((t, i) => (
              <div key={i} className="teacher-card">
                <div className="t-avatar">{t.initials}</div>
                <div className="t-name">{t.name}</div>
                <div className="t-subject">{t.subject}</div>
                <div className="t-qual">{t.qual}</div>
                <span className="t-exp">⏱ {t.exp} Experience</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cta-banner">
        <h2>Want to Know More?</h2>
        <p>Visit us or fill an enquiry and we'll be in touch.</p>
        <div className="cta-btns">
          <button className="btn-primary" onClick={() => go('enquiry')}>📋 Enquire Now</button>
          <button className="btn-outline" onClick={() => go('contact')}>📍 Find Us</button>
        </div>
      </div>
    </>
  );
};

export default About;
