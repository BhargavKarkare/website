import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Stethoscope, ShieldCheck, Sparkles, Baby, AlertCircle, ArrowLeft } from 'lucide-react';
import { getApiUrl } from '../config/api';

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
            const body = isLogin
                ? { email, password }
                : { email, password, fullName: name, role: 'doctor' };

            // Use centralized API configuration
            const response = await fetch(getApiUrl(endpoint), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Authentication failed');
            }

        } catch (err: any) {
            console.error('Auth Error:', err);
            // Fallback to Offline Mode if server is unreachable
            if (err.message === 'Failed to fetch' || err.message.includes('NetworkError')) {
                console.log('Server unreachable. Switching to Offline Demo Mode.');

                // Extract name from email or use the name field
                let userName = name || 'Dr. Demo';
                if (!name && email) {
                    // Extract name from email (e.g., "bhalerao@example.com" -> "Dr. Bhalerao")
                    const emailName = email.split('@')[0];
                    userName = `Dr. ${emailName.charAt(0).toUpperCase() + emailName.slice(1)}`;
                }

                const demoUser = {
                    id: 'offline-demo',
                    email: email || 'demo@vidhi.ai',
                    name: userName,
                    role: 'doctor'
                };

                // Simulate a small delay for realism
                setTimeout(() => {
                    login('offline-demo-token', demoUser);
                    navigate('/dashboard');
                }, 500);
                return;
            }

            setError(err.message);
        } finally {
            // Only stop loading if we didn't navigate away (in the success case we navigate)
            // But here we navigate in the timeout, so we should probably keep loading true to prevent flickering
            // However, for the error case, we must stop loading.
            // Simplified:
            if (!window.location.pathname.includes('dashboard')) {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen flex bg-white">
            {/* Left Side - Marketing / Hero */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-500 to-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 pattern-grid-lg opacity-20"></div>

                <div className="relative z-10 flex flex-col justify-between p-12 text-white h-full">
                    <div>
                        <div className="flex items-center space-x-2 mb-8">
                            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                                <Stethoscope className="h-8 w-8 text-white" />
                            </div>
                            <span className="text-2xl font-bold tracking-wide">VIDHI AI</span>
                        </div>

                        <h1 className="text-5xl font-bold leading-tight mb-6">
                            The AI Assistant <br />
                            <span className="text-teal-200">Built for Pediatricians</span>
                        </h1>
                        <p className="text-lg text-blue-100 max-w-md leading-relaxed">
                            Spend less time on paperwork and more time with your little patients.
                            Vidhi AI automates your SOAP notes, coding, and administrative tasks with
                            clinical precision.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="bg-white/20 p-3 rounded-full">
                                <Sparkles className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">AI-Powered SOAP Notes</h3>
                                <p className="text-sm text-blue-100">Generate comprehensive notes from voice or shorthand.</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-white/20 p-3 rounded-full">
                                <Baby className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Pediatric Specific</h3>
                                <p className="text-sm text-blue-100">Growth charts, vaccination tracking, and age-specific norms.</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-white/20 p-3 rounded-full">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Enterprise Security</h3>
                                <p className="text-sm text-blue-100">HIPAA compliant encryption and role-based access.</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-sm text-blue-200">
                        &copy; 2024 Vidhi AI Healthcare Solutions.
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-gray-50">
                <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                    {/* Back Button */}
                    <Link
                        to="/"
                        className="inline-flex items-center text-sm text-gray-600 hover:text-teal-600 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Home
                    </Link>

                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-gray-900">
                            {isLogin ? 'Welcome Back, Doctor' : 'Create Account'}
                        </h2>
                        <p className="mt-2 text-gray-500">
                            {isLogin ? 'Please sign in to access your dashboard.' : 'Get started with Vidhi AI today.'}
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center">
                                <AlertCircle className="h-4 w-4 mr-2" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-5">
                            {!isLogin && (
                                <Input
                                    label="Full Name"
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Dr. Jane Doe"
                                    className="h-12"
                                />
                            )}
                            <Input
                                label="Email address"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="doctor@hospital.com"
                                className="h-12"
                            />
                            <div className="relative">
                                <Input
                                    label="Password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="h-12"
                                />
                                {isLogin && (
                                    <div className="text-right mt-1">
                                        <a href="#" className="text-sm font-medium text-teal-600 hover:text-teal-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 text-lg bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-200"
                            isLoading={isLoading}
                        >
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    {isLogin ? 'New to Vidhi AI?' : 'Already have an account?'}
                                </span>
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="font-medium text-teal-600 hover:text-teal-500"
                            >
                                {isLogin ? 'Create an account' : 'Sign in instead'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
