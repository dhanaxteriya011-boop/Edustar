import React, { useEffect } from 'react';

const Home = ({ setPage }) => {
  const go = (id) => { 
    setPage(id); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const features = [
    { icon: '👨‍🏫', title: 'Experienced Faculty', desc: 'All teachers hold postgraduate degrees with 8–15 years of teaching experience.' },
    { icon: '👥', title: 'Small Batches', desc: 'Max 15 students per batch for focused, distraction-free learning.' },
    { icon: '🎯', title: 'Individual Attention', desc: 'Personalised mentoring and dedicated doubt-clearing sessions every week.' },
    { icon: '📝', title: 'Weekly Tests', desc: 'Regular assessments to track progress and prepare for board exams.' },
    { icon: '📊', title: 'Progress Reports', desc: 'Monthly performance reports shared directly with parents.' },
    { icon: '🏆', title: 'Proven Results', desc: '96% of our students score above 85% in their board exams annually.' },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-shape" />
        <div className="hero-wrap">
          <div className="fade-up">
            <div className="hero-tag">⭐ #1 Rated Tuition in Madurai</div>
            <h1>Shape Your Child's <br/><em>Academic Future</em></h1>
            <p className="hero-desc">EduStar Academy delivers expert coaching for Grades 6–12 with a 16-year track record of excellence in Madurai.</p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => go('contact')}>📩 Contact Us</button>
              <button className="btn-outline" onClick={() => go('services')}>Our Courses →</button>
            </div>
            <div className="hero-stats">
              <div><div className="stat-num">600+</div><div className="stat-lbl">Students</div></div>
              <div><div className="stat-num">16+</div><div className="stat-lbl">Years</div></div>
              <div><div className="stat-num">96%</div><div className="stat-lbl">Pass Rate</div></div>
            </div>
          </div>

          <div className="hero-card fade-up delay-2">
            <div className="hero-card-title">📚 Available Batches</div>
            {[
              { grade: 'Grade 6 – 8', badge: 'Foundation' },
              { grade: 'Grade 9 – 10', badge: 'Board Prep' },
              { grade: 'Grade 11 – 12', badge: 'Advanced' },
            ].map((c, i) => (
              <div key={i} className="pill">
                <span className="pill-name">{c.grade}</span>
                <span className="pill-tag">{c.badge}</span>
              </div>
            ))}
            <button className="btn-enq" onClick={() => go('contact')}>Join Now</button>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="section section-alt">
        <div className="container reveal">
          <div className="sec-head center">
            <div className="section-badge">Why Choose Us</div>
            <h2 className="section-title">What Makes EduStar Different</h2>
          </div>
          <div className="g3">
            {features.map((f, i) => (
              <div key={i} className="card">
                <div className="card-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section className="section">
        <div className="container reveal">
          <div className="sec-head center">
            <div className="section-badge">Our Services</div>
            <h2 className="section-title">Courses & Fees</h2>
          </div>
          <div className="g4">
            {[
              { grade: '6–8', subjects: 'Maths, Science', time: '5 PM – 6 PM', fee: '₹1,200' },
              { grade: '9–10', subjects: 'All Subjects', time: '6 PM – 7:30 PM', fee: '₹1,500' },
              { grade: '11–12', subjects: 'Physics, Chemistry', time: '7:30 PM – 9 PM', fee: '₹2,000' },
              { grade: 'Special', subjects: 'Intensive Coaching', time: 'Weekends', fee: '₹2,500' },
            ].map((c, i) => (
              <div key={i} className="svc-card">
                <div className="svc-head">
                  <div className="svc-grade">Grade {c.grade}</div>
                  <div className="svc-lbl">{c.subjects}</div>
                </div>
                <div className="svc-body">
                  <div className="svc-meta">
                    <div className="svc-meta-row"><span>⏰</span>{c.time}</div>
                  </div>
                  <div className="svc-fee">{c.fee} <span>/ month</span></div>
                  <button className="btn-enq" onClick={() => go('contact')}>Contact to Enroll</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="cta-banner reveal">
        <h2>Ready to Join EduStar Academy?</h2>
        <p>Get in touch with us today to secure your seat for the upcoming session.</p>
        <div className="cta-btns">
          <button className="btn-primary" onClick={() => go('contact')}>📩 Send Message</button>
          <a className="btn-outline" href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">💬 WhatsApp Us</a>
        </div>
      </div>
    </>
  );
};

export default Home;