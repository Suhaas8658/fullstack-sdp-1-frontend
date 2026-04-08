import React, { useState } from 'react';
import { login, register } from '../api';

const LoginForm = ({ onAuthenticated }) => {
  const [mode, setMode] = useState('login');
  const [role, setRole] = useState('FARMER');
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isLogin = mode === 'login';

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        const res = await login(email, password);
        onAuthenticated(res);
      } else {
        const res = await register({
          fullName,
          email,
          password,
          role,
          location
        });
        onAuthenticated(res);
      }
    } catch (err) {
      setError(err.message ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <div className="card" style={{ marginBottom: '0.8rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            marginBottom: '0.8rem'
          }}
        >
          <div className="chip-logo">🌱</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>AgriConnect</div>
            <div className="text-muted" style={{ fontSize: '0.8rem' }}>
              Connecting local farmers to global markets
            </div>
          </div>
        </div>

        <h2 style={{ marginTop: '0.3rem' }}>
          {isLogin ? 'Welcome Back' : 'Create an account'}
        </h2>
        <p className="text-muted">
          {isLogin
            ? 'Please sign in to your account.'
            : 'Join the global marketplace for farmers and buyers.'}
        </p>

        <form onSubmit={handleSubmit} style={{ marginTop: '1rem', display: 'grid', gap: '0.7rem' }}>
          {!isLogin && (
            <>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button
                  type="button"
                  className="button"
                  style={{
                    flex: 1,
                    padding: '0.55rem 0.9rem',
                    borderRadius: 999,
                    background:
                      role === 'FARMER' ? 'linear-gradient(135deg,#22c55e,#16a34a)' : '#f3f4f6',
                    color: role === 'FARMER' ? '#ecfdf3' : '#4b5563',
                    boxShadow:
                      role === 'FARMER' ? '0 14px 26px rgba(22,163,74,0.35)' : 'none',
                    border: 'none'
                  }}
                  onClick={() => setRole('FARMER')}
                >
                  Farmer
                </button>
                <button
                  type="button"
                  className="button secondary"
                  style={{
                    flex: 1,
                    padding: '0.55rem 0.9rem',
                    borderRadius: 999,
                    background: role === 'BUYER' ? '#e5f9ed' : '#f3f4f6',
                    color: '#4b5563',
                    border: 'none',
                    boxShadow: 'none'
                  }}
                  onClick={() => setRole('BUYER')}
                >
                  Buyer
                </button>
              </div>

              <input
                className="input"
                placeholder="Full name"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
              />
              <input
                className="input"
                placeholder="Village / town / region"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </>
          )}

          <input
            type="email"
            className="input"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          {isLogin && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.8rem',
                color: '#6b7280'
              }}
            >
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                />
                Remember me
              </label>
              <span style={{ color: '#16a34a', cursor: 'pointer' }}>Forgot Password?</span>
            </div>
          )}

          {error && <div className="error">{error}</div>}

          <button className="button" type="submit" disabled={loading}>
            {loading ? 'Please wait…' : isLogin ? 'Sign In' : 'Get Started'}
          </button>
        </form>

        <div
          style={{
            marginTop: '0.9rem',
            fontSize: '0.85rem',
            textAlign: 'center',
            color: '#6b7280'
          }}
        >
          {isLogin ? (
            <>
              Don’t have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                style={{
                  border: 'none',
                  background: 'transparent',
                  padding: 0,
                  color: '#16a34a',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Register as Farmer
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                style={{
                  border: 'none',
                  background: 'transparent',
                  padding: 0,
                  color: '#16a34a',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Log in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
