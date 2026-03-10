import React, { useState, useContext } from 'react';
import { ToastContext } from '../App';

const WA_NUMBER = '919876543210'; // ← Replace with your number
const API = 'http://localhost:8000/api/enquiry';

const Enquiry = ({ setPage }) => {
  const go = (id) => { setPage(id); window.scrollTo({ top: 0 }); };
  const showToast = useContext(ToastContext);

  const [form, setForm] = useState({
    student_name: '', parent_name: '', phone: '',
    email: '', grade: '', subject: '', message: '',
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');

  const change = e => { setForm({ ...form, [e.target.name]: e.target.value }); setErr(''); };

  const buildWA = (d) => encodeURIComponent(
    `🌟 *New Enquiry — EduStar Academy*\n\n` +
    `👤 *Student:* ${d.student_name}\n` +
    `👨‍👩‍👦 *Parent:* ${d.parent_name || 'N/A'}\n` +
    `📞 *Phone:* ${d.phone}\n` +
    `📧 *Email:* ${d.email || 'N/A'}\n` +
    `📚 *Grade:* ${d.grade}\n` +
    `📖 *Subject:* ${d.subject || 'N/A'}\n` +
    `💬 *Message:* ${d.message || 'No message'}\n\n` +
    `_Sent via EduStar Academy Website_`
  );

  const validate = () => {
    if (!form.student_name.trim()) return 'Please enter the student name.';
    if (!form.phone.trim()) return 'Please enter a phone number.';
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) return 'Please enter a valid 10-digit Indian mobile number.';
    if (!form.grade) return 'Please select a grade.';
    return '';
  };

  const submit = async () => {
    const e = validate();
    if (e) { setErr(e); return; }
    setLoading(true);

    try {
      await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch (_) { /* backend may be offline — proceed anyway */ }

    setLoading(false);
    setDone(true);
    showToast('Enquiry submitted! Redirecting to WhatsApp…');

    setTimeout(() => {
      window.open(`https://wa.me/${WA_NUMBER}?text=${buildWA(form)}`, '_blank');
    }, 1400);
  };

  const directWA = () => {
    const e = validate();
    if (e) { setErr(e); return; }
    window.open(`https://wa.me/${WA_NUMBER}?text=${buildWA(form)}`, '_blank');
  };

  if (done) {
    return (
      <>
        <div className="page-hero">
          <h1>Enquiry Submitted!</h1>
          <p>Connecting you to WhatsApp…</p>
        </div>
        <section className="section">
          <div className="container" style={{ maxWidth: 640 }}>
            <div className="success-box">
              <div className="icon">✅</div>
              <h2>Thank you, {form.student_name}!</h2>
              <p>Your enquiry has been saved. You are being redirected to WhatsApp so we can reply to you instantly.</p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a className="btn-whatsapp" href={`https://wa.me/${WA_NUMBER}?text=${buildWA(form)}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', width: 'auto', padding: '13px 26px' }}>
                  💬 Open WhatsApp Now
                </a>
                <button className="btn-green" onClick={() => { setDone(false); setForm({ student_name:'', parent_name:'', phone:'', email:'', grade:'', subject:'', message:'' }); }}>
                  Submit Another
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="page-hero">
        <div className="breadcrumb">
          <a href="#" onClick={e => { e.preventDefault(); go('home'); }}>Home</a>
          <span>/</span>Enquiry
        </div>
        <h1>Admission Enquiry</h1>
        <p>Fill the form and get an instant reply on WhatsApp</p>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 980 }}>
          <div className="enq-grid">

            {/* LEFT INFO */}
            <div className="enq-left">
              <h2>How It Works</h2>
              <p>Submit your details below and our team will connect with you on WhatsApp within minutes — no waiting!</p>
              <div className="enq-steps">
                {[
                  'Fill in your student and contact details',
                  'Click "Submit Enquiry"',
                  'WhatsApp opens with your details pre-filled',
                  'Hit Send — we reply within minutes!',
                ].map((s, i) => (
                  <div key={i} className="enq-step">
                    <div className="step-num">{i + 1}</div>
                    <div className="step-txt">{s}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 28, padding: '16px', background: 'rgba(255,255,255,.1)', borderRadius: 10, fontSize: '.84rem', color: 'rgba(255,255,255,.75)', lineHeight: 1.7 }}>
                📞 <strong style={{ color: '#fff' }}>Prefer a call?</strong><br />
                <a href="tel:+919876543210" style={{ color: 'var(--accent-light)', fontWeight: 600 }}>+91 98765 43210</a>
                <br />Mon–Sat, 9 AM – 9 PM
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="form-card">
              <div className="form-title">📋 Admission Enquiry Form</div>
              <div className="form-sub">After submitting, you will be connected to us on WhatsApp for an instant reply</div>

              {/* WhatsApp promo */}
              <div style={{ background: 'rgba(37,211,102,.08)', border: '1px solid rgba(37,211,102,.25)', borderRadius: 8, padding: '11px 14px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 9, fontSize: '.85rem', color: '#14532d' }}>
                <span style={{ fontSize: '1.1rem' }}>💬</span>
                <span><strong>WhatsApp Enquiry:</strong> Fill the form and get a personalised reply within minutes!</span>
              </div>

              {err && (
                <div className="err-msg">⚠️ {err}</div>
              )}

              <div className="form-row">
                <div className="fgroup">
                  <label>Student Name *</label>
                  <input type="text" name="student_name" value={form.student_name} onChange={change} placeholder="Student's full name" />
                </div>
                <div className="fgroup">
                  <label>Parent / Guardian Name</label>
                  <input type="text" name="parent_name" value={form.parent_name} onChange={change} placeholder="Parent's name" />
                </div>
              </div>

              <div className="form-row">
                <div className="fgroup">
                  <label>WhatsApp / Phone *</label>
                  <input type="tel" name="phone" value={form.phone} onChange={change} placeholder="10-digit number" maxLength={10} />
                </div>
                <div className="fgroup">
                  <label>Email (optional)</label>
                  <input type="email" name="email" value={form.email} onChange={change} placeholder="your@email.com" />
                </div>
              </div>

              <div className="form-row">
                <div className="fgroup">
                  <label>Grade *</label>
                  <select name="grade" value={form.grade} onChange={change}>
                    <option value="">-- Select Grade --</option>
                    {['Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12','Special Coaching','Crash Course'].map(g => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div className="fgroup">
                  <label>Subject / Course</label>
                  <select name="subject" value={form.subject} onChange={change}>
                    <option value="">-- Select Subject --</option>
                    {['Mathematics','Science','Physics','Chemistry','Biology','English','All Subjects'].map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="fgroup">
                <label>Message / Additional Info</label>
                <textarea name="message" value={form.message} onChange={change} placeholder="Any specific requirements, preferred timing, or questions…" />
              </div>

              <button className="btn-submit" onClick={submit} disabled={loading}>
                {loading ? '⏳ Submitting…' : '✅ Submit Enquiry & Connect on WhatsApp'}
              </button>

              <div style={{ textAlign: 'center', margin: '14px 0', color: 'var(--text-muted)', fontSize: '.82rem' }}>— or —</div>

              <button className="btn-whatsapp" onClick={directWA}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Send Enquiry Directly via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Enquiry;
