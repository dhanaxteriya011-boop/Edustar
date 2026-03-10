import React, { useState } from 'react';

const Login = ({ setPage }) => {
  const go = (id) => { setPage(id); window.scrollTo({ top: 0 }); };
  const [role, setRole] = useState('admin');
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const roles = [
    { id: 'admin', icon: '👨‍💼', name: 'Admin' },
    { id: 'teacher', icon: '👩‍🏫', name: 'Teacher' },
    { id: 'parent', icon: '👨‍👩‍👧', name: 'Parent' },
    { id: 'student', icon: '👨‍🎓', name: 'Student' },
  ];

  const change = e => { setForm({ ...form, [e.target.name]: e.target.value }); setErr(''); };

  const login = async () => {
    if (!form.email || !form.password) { setErr('Please enter email and password.'); return; }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ ...form, role }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('edustar_token', data.token);
        localStorage.setItem('edustar_role', role);
        alert('Login successful! Dashboard coming soon — connect the Laravel backend.');
      } else {
        setErr(data.message || 'Invalid credentials.');
      }
    } catch {
      setErr('Cannot connect to backend. Ensure Laravel is running on localhost:8000');
    }
    setLoading(false);
  };

  const current = roles.find(r => r.id === role);

  return (
    <div className="login-page">
      <div className="login-left">
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: '3rem', marginBottom: 10 }}>🌟</div>
          <h2>EduStar Portal</h2>
          <p>Select your role and sign in to access your personalised dashboard.</p>
        </div>
        <div className="role-grid">
          {roles.map(r => (
            <div key={r.id} className={`role-btn ${role === r.id ? 'active' : ''}`} onClick={() => setRole(r.id)}>
              <span className="ri">{r.icon}</span>
              <span className="rn">{r.name}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 28, fontSize: '.8rem', color: 'rgba(255,255,255,.45)' }}>
          <a href="#" style={{ color: 'rgba(255,255,255,.65)' }} onClick={e => { e.preventDefault(); go('home'); }}>← Back to Website</a>
        </div>
      </div>

      <div className="login-right">
        <div className="login-box">
          <h3>Welcome Back</h3>
          <p className="ls">Sign in to your account</p>
          <div className="role-badge">{current?.icon} Signing in as {current?.name}</div>
          {err && <div className="err-msg">⚠️ {err}</div>}
          <div className="fgroup">
            <label>Email Address</label>
            <input type="email" name="email" value={form.email} onChange={change} placeholder="your@email.com" />
          </div>
          <div className="fgroup">
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={change} placeholder="••••••••" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '.85rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" style={{ color: 'var(--primary-light)', fontSize: '.85rem', fontWeight: 600 }}>Forgot password?</a>
          </div>
          <button className="btn-submit" onClick={login} disabled={loading}>
            {loading ? '⏳ Signing in…' : '🔐 Sign In'}
          </button>
          <div style={{ textAlign: 'center', marginTop: 20, fontSize: '.82rem', color: 'var(--text-muted)' }}>
            No account?{' '}
            <a href="#" style={{ color: 'var(--primary-light)', fontWeight: 600 }} onClick={e => { e.preventDefault(); go('enquiry'); }}>
              Submit Enquiry
            </a>
          </div>
          <div style={{ marginTop: 28, padding: '14px', background: 'rgba(13,107,84,.06)', borderRadius: 8, fontSize: '.78rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            💡 Login requires the Laravel backend running at <code>localhost:8000</code>. See README for setup.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
