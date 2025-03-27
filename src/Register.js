import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        
        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        
        setLoading(true);
        
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await axios.post('http://localhost:5000/register', { email, password });
            alert('User registered successfully!');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            
            // Redirect to timesheet page after successful registration
            navigate('/timesheet');
        } catch (error) {
            setError(error.message);
            console.error('Registration error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleRegister}>
                <h2>Create an Account</h2>
                {error && <div className="error-message">{error}</div>}
                
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
                
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="Create a password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        type="password" 
                        id="confirmPassword"
                        placeholder="Confirm your password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                </div>
                
                <button type="submit" disabled={loading} className="register-button">
                    {loading ? 'Registering...' : 'Register'}
                </button>
                
                <div className="login-link">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;