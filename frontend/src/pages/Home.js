import React from 'react';

const Home = ({ setPage }) => {
  const go = (id) => { setPage(id); window.scrollTo({ top: 0 }); };

  const features = [
    { icon: '👨‍🏫', title: 'Experienced Faculty', desc: 'All teachers hold postgraduate degrees with 8–15 years of teaching experience.' },
    { icon: '👥', title: 'Small Batches', desc: 'Max 15 students per batch for focused, distraction-free learning.' },
    { icon: '🎯', title: 'Individual Attention', desc: 'Personalised mentoring and dedicated doubt-clearing sessions every week.' },
    { icon: '📝', title: 'Weekly Tests', desc: 'Regular assessments to track progress and prepare for board exams.' },
    { icon: '📊', title: 'Progress Reports', desc: 'Monthly performance reports shared directly with parents.' },
    { icon: '🏆', title: 'Proven Results', desc: '96% of our students score above 85% in their board exams annually.' },
  ];

  const testimonials = [
    { text: 'My daughter went from 58% to 92% in one year. The teachers at EduStar are truly dedicated to every student.', name: 'Mrs. Kavitha Rajan', role: 'Parent, Grade 10', initials: 'K' },
    { text: 'The weekly tests kept me consistent throughout the year. I cleared my boards with distinction, thanks to EduStar!', name: 'Dinesh Kumar', role: 'Grade 12 Student', initials: 'D' },
    { text: 'Small batches meant my son finally got the attention he needed. His self-confidence has grown enormously.', name: 'Mr. Murugan', role: 'Parent, Grade 9', initials: 'M' },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-wrap">
          <div className="fade-up">
            <div className="hero-tag">⭐ #1 Rated Tuition in Madurai</div>
            <h1>Shape Your Child's <em>Academic Future</em></h1>
            <p className="hero-desc">EduStar Academy delivers expert coaching for Grades 6–12 with experienced teachers, small batches, and a 16-year track record of excellence in Madurai.</p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => go('enquiry')}>📋 Enquire Now</button>
              <button className="btn-outline" onClick={() => go('services')}>View Services →</button>
            </div>
            <div className="hero-stats">
              <div><div className="stat-num">600+</div><div className="stat-lbl">Students Enrolled</div></div>
              <div><div className="stat-num">16+</div><div className="stat-lbl">Years Experience</div></div>
              <div><div className="stat-num">96%</div><div className="stat-lbl">Pass Rate</div></div>
              <div><div className="stat-num">12</div><div className="stat-lbl">Expert Teachers</div></div>
            </div>
          </div>

          <div className="hero-card fade-up delay-2">
            <div className="hero-card-title">📚 Our Classes</div>
            {[
              { grade: 'Grade 6 – 8', badge: 'Foundation' },
              { grade: 'Grade 9 – 10', badge: 'Board Prep' },
              { grade: 'Grade 11 – 12', badge: 'Advanced' },
              { grade: 'Special Coaching', badge: 'Intensive' },
            ].map((c, i) => (
              <div key={i} className="pill">
                <span className="pill-name">{c.grade}</span>
                <span className="pill-tag">{c.badge}</span>
              </div>
            ))}
            <button className="btn-enq" onClick={() => go('enquiry')}>📋 Enquire for Admission</button>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="sec-head">
            <div className="section-badge">Why Choose Us</div>
            <h2 className="section-title">What Makes EduStar Different</h2>
            <p className="section-sub">We don't just teach — we mentor, inspire, and guide every student to reach their highest potential.</p>
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
        <div className="container">
          <div className="sec-head center">
            <div className="section-badge">Our Services</div>
            <h2 className="section-title">Courses & Batches Available</h2>
            <p className="section-sub">Structured programs designed for every grade level with focused subject coverage.</p>
          </div>
          <div className="g4">
            {[
              { grade: '6–8', label: 'Foundation', subjects: 'Maths, Science, English', time: '5 PM – 6 PM', fee: '₹1,200' },
              { grade: '9–10', label: 'Board Prep', subjects: 'Maths, Science, Social', time: '6 PM – 7:30 PM', fee: '₹1,500' },
              { grade: '11–12', label: 'Advanced', subjects: 'Physics, Chemistry, Maths', time: '7:30 PM – 9 PM', fee: '₹2,000' },
              { grade: 'Special', label: 'Intensive', subjects: 'All Subjects', time: 'Weekends', fee: '₹2,500' },
            ].map((c, i) => (
              <div key={i} className="svc-card">
                <div className="svc-head">
                  <div className="svc-grade">Grade {c.grade}</div>
                  <div className="svc-lbl">{c.subjects}</div>
                </div>
                <div className="svc-body">
                  <div className="svc-meta">
                    <div className="svc-meta-row"><span>⏰</span>{c.time}</div>
                    <div className="svc-meta-row"><span>📅</span>Batch: June 2025</div>
                  </div>
                  <div className="svc-fee">{c.fee} <span>/ month</span></div>
                  <button className="btn-enq" onClick={() => go('enquiry')}>Enquire Now</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <button className="btn-green" onClick={() => go('services')}>View All Services & Fee Details →</button>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="sec-head center">
            <div className="section-badge">Gallery</div>
            <h2 className="section-title">Life at EduStar Academy</h2>
          </div>
          <div className="gal-grid">
            {[
              { icon: '📖', lbl: 'Classroom Sessions' },
              { icon: '🏆', lbl: 'Award Ceremony' },
              { icon: '📝', lbl: 'Exam Preparation' },
              { icon: '🎉', lbl: 'Student Activities' },
              { icon: '👨‍🏫', lbl: 'Teacher Mentoring' },
            ].map((g, i) => (
              <div key={i} className="gal-item">
                {g.icon}
                <div className="gal-ov">{g.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section">
        <div className="container">
          <div className="sec-head center">
            <div className="section-badge">Testimonials</div>
            <h2 className="section-title">What Parents & Students Say</h2>
          </div>
          <div className="g3">
            {testimonials.map((t, i) => (
              <div key={i} className="testi">
                <div className="testi-stars">★★★★★</div>
                <p className="testi-txt">"{t.text}"</p>
                <div className="testi-author">
                  <div className="testi-av">{t.initials}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="cta-banner">
        <h2>Ready to Join EduStar Academy?</h2>
        <p>Fill in your enquiry and our team will contact you within 24 hours.</p>
        <div className="cta-btns">
          <button className="btn-primary" onClick={() => go('enquiry')}>📋 Submit Enquiry</button>
          <a className="btn-outline" href="https://wa.me/919876543210?text=Hello%20EduStar%2C%20I%20want%20to%20enquire%20about%20admission" target="_blank" rel="noopener noreferrer">💬 WhatsApp Us</a>
        </div>
      </div>
    </>
  );
};

export default Home;
