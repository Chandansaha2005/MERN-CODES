import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../styles/signup.css';

const Signup = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        image: null,
    });
    const [focusedField, setFocusedField] = useState(null);
    const navigate = useNavigate();

    // Track mouse for animated background with smooth interpolation
    useEffect(() => {
        let currentPos = { x: 0, y: 0 };
        let targetPos = { x: 0, y: 0 };
        let animationFrameId;

        const handleMove = (e) => {
            targetPos = { x: e.clientX, y: e.clientY };
        };

        const smoothFollow = () => {
            // Smooth interpolation for trailing effect
            currentPos.x += (targetPos.x - currentPos.x) * 0.1;
            currentPos.y += (targetPos.y - currentPos.y) * 0.1;
            setMousePos({ x: currentPos.x, y: currentPos.y });
            animationFrameId = requestAnimationFrame(smoothFollow);
        };

        window.addEventListener('mousemove', handleMove);
        smoothFollow();

        return () => {
            window.removeEventListener('mousemove', handleMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setForm({ ...form, image: e.target.files[0] });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const data = new FormData();
        data.append('name', form.name);
        data.append('email', form.email);
        data.append('password', form.password);
        data.append('image', form.image);
        
        try {
            const res = await axios.post('http://localhost:8000/api/auth/register', data);
            alert(res.data.message);
            if(res.data.message==='Signup Successfully')
                navigate("/login");
        } catch (err) {
            alert(err.response?.data?.error || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-page">
            {/* Animated Gradient Background Elements */}
            <div className="bg-animation-container">
                <div 
                    className="glow-primary"
                    style={{
                        left: mousePos.x / 8 - 250,
                        top: mousePos.y / 8 - 250,
                    }}
                />
                
                <div 
                    className="glow-secondary"
                    style={{
                        left: mousePos.x / 12 - 200,
                        top: mousePos.y / 12 - 200,
                    }}
                />
                
                <div 
                    className="glow-tertiary"
                    style={{
                        left: mousePos.x / 20 - 300,
                        top: mousePos.y / 20 - 300,
                    }}
                />

                <div 
                    className="glow-accent"
                    style={{
                        left: mousePos.x / 5 - 150,
                        top: mousePos.y / 5 - 150,
                    }}
                />
                
                <div className="glow-static glow-static-1" />
                <div className="glow-static glow-static-2" />
                
                <div className="grid-pattern" />
            </div>

            {/* Main Content */}
            <div className="signup-content">
                
                {/* Header Section */}
                <div className="signup-header">
                    <div className="signup-header-inner">
                        <div className="signup-title">
                            Create Your Account
                        </div>
                    </div>
                </div>

                {/* Form Card with Neon Border */}
                <div className="form-card-group">
                    <div className="form-card-border" />
                    
                    {/* Form Container */}
                    <div className="form-card">
                        
                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="signup-form">
                            {/* Full Name Input */}
                            <div className="form-field">
                                <label className="form-label">Full Name</label>
                                <div className="input-wrapper">
                                    <input 
                                        type="text" 
                                        name="name" 
                                        placeholder="Enter your full name" 
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('name')}
                                        onBlur={() => setFocusedField(null)}
                                        required 
                                        className="form-input"
                                    />
                                    {focusedField === 'name' && <div className="input-check">✓</div>}
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="form-field">
                                <label className="form-label">Email Address</label>
                                <div className="input-wrapper">
                                    <input 
                                        type="email" 
                                        name="email" 
                                        placeholder="your@email.com" 
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
                                        placeholder="••••••••" 
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('password')}
                                        onBlur={() => setFocusedField(null)}
                                        required 
                                        className="form-input"
                                    />
                                    {focusedField === 'password' && <div className="input-check">✓</div>}
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div className="upload-section">
                                <label className="form-label">Profile Picture</label>
                                <label className="upload-label">
                                    <div className={`upload-content ${form.image ? 'with-image' : ''}`}>
                                        {form.image ? (
                                            <>
                                                <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <p className="upload-image-name">{form.image.name}</p>
                                            </>
                                        ) : (
                                            <>
                                                <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                                <p className="upload-text">Upload Image</p>
                                            </>
                                        )}
                                    </div>
                                    <input 
                                        type="file" 
                                        name="image" 
                                        accept="image/*" 
                                        onChange={handleChange} 
                                        required 
                                        className="upload-input" 
                                    />
                                </label>
                            </div>

                            {/* Image Preview */}
                            {form.image && (
                                <div className="image-preview-container">
                                    <div className="image-preview-wrapper">
                                        <div className="image-preview-glow" />
                                        <img 
                                            src={URL.createObjectURL(form.image)} 
                                            alt="Preview" 
                                            className="image-preview"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="submit-container">
                                <div className="submit-glow" />
                                <div className="submit-overlay" />
                                <button 
                                    type="submit"
                                    disabled={isLoading}
                                    className="submit-button"
                                >
                                    <span className="button-text">
                                        {isLoading ? (
                                            <>
                                                <div className="spinner" />
                                                Creating Account...
                                            </>
                                        ) : (
                                            'Create Account'
                                        )}
                                    </span>
                                </button>
                            </div>
                        </form>

                        {/* Login Link */}
                        <div className="login-prompt">
                            Already have an account?{' '}
                            <span 
                                onClick={() => navigate("/login")} 
                                className="login-link"
                            >
                                Login Here
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer Message */}
                <div className="signup-footer">
                    Secure • Fast • Reliable
                </div>
            </div>
        </div>
    );
};

export default Signup;