import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebase';
import { Link } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);
        
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Password reset email sent! Check your inbox.');
            setEmail('');
        } catch (error) {
            setError(error.message);
            console.error('Password reset error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-container">
            <form onSubmit={handleResetPassword}>
                <h2>Reset Your Password</h2>
                <p className="reset-instructions">
                    Enter your email address and we'll send you a link to reset your password.
                </p>
                
                {error && <div className="error-message">{error}</div>}
                {message && <div className="success-message">{message}</div>}
                
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email"
                        placeholder="Enter your email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                
                <button type="submit" disabled={loading} className="reset-button">
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
                
                <div className="back-to-login">
                    <Link to="/login">Back to Login</Link>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;
