import React, { useState } from 'react';
import axios from 'axios';
import '../styles/form.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login', form);
      alert('Login Successful');
      if (res.data.message === 'Success')
        navigate("/home");
      console.log(res.data);
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="form-container">
      {/* Background Animation Elements */}
      <div className="form-bg-animation">
        <div className="form-glow-primary" style={{ top: '10%', left: '10%' }} />
        <div className="form-glow-secondary" style={{ bottom: '20%', right: '15%' }} />
        <div className="form-glow-static form-glow-static-1" />
        <div className="form-glow-static form-glow-static-2" />
        <div className="grid-pattern" />
      </div>

      {/* Form Wrapper */}
      <div className="form-wrapper">
        <div className="form-card-group">
          <div className="form-card-border" />

          <div className="form-card">
            <h2>Login</h2>

            <form onSubmit={handleSubmit} className="login-form">
              {/* Email Input */}
              <div className="form-field">
                <label className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="form-input"
                  />
                  {focusedField === 'email' && <div className="input-check">✓</div>}
                </div>
              </div>

              {/* Password Input */}
              <div className="form-field">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="form-input"
                  />
                  {focusedField === 'password' && <div className="input-check">✓</div>}
                </div>
              </div>

              {/* Submit Button */}
              <div className="submit-container">
                <div className="submit-glow" />
                <div className="submit-overlay" />
                <button type="submit" className="submit-button">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;