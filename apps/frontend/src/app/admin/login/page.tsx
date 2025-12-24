'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, X } from 'lucide-react';
import { API_ENDPOINTS } from '@/config/api';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [resetStep, setResetStep] = useState<'request' | 'verify'>('request');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');
  const [loginStep, setLoginStep] = useState<'credentials' | '2fa'>('credentials');
  const [loginOtp, setLoginOtp] = useState('');
  const [twoFactorMethod, setTwoFactorMethod] = useState<'app' | 'email'>('app');
  const [twoFactorMessage, setTwoFactorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const body: any = { email, password };
      if (loginStep === '2fa') {
        body.otp = loginOtp;
      }

      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.require2FA) {
          setLoginStep('2fa');
          setTwoFactorMethod(data.method || 'app');
          if (data.message) {
            setTwoFactorMessage(data.message);
          }
        } else {
          // Cookie is set automatically
          router.push('/admin/dashboard');
        }
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection error. Please ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotPasswordMessage('');
    setForgotPasswordLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.FORGOT_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: forgotPasswordEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setForgotPasswordMessage(data.message || 'OTP has been sent to your email.');
        setResetStep('verify');
      } else {
        setForgotPasswordMessage(data.message || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setForgotPasswordMessage('Connection error. Please try again later.');
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotPasswordMessage('');

    if (newPassword !== confirmPassword) {
      setForgotPasswordMessage('Passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setForgotPasswordMessage('Password must be at least 6 characters long.');
      return;
    }

    setForgotPasswordLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.RESET_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: forgotPasswordEmail,
          otp,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setForgotPasswordMessage('Password reset successfully! You can now login.');
        setTimeout(() => {
          setShowForgotPassword(false);
          setResetStep('request');
          setForgotPasswordEmail('');
          setOtp('');
          setNewPassword('');
          setConfirmPassword('');
          setForgotPasswordMessage('');
        }, 2000);
      } else {
        setForgotPasswordMessage(data.message || 'Failed to reset password. Please try again.');
      }
    } catch (err) {
      setForgotPasswordMessage('Connection error. Please try again later.');
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-700 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-teal-100 rounded-full mb-4">
            <Lock className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">UTS Marine LLP</h1>
          <p className="text-gray-600 mt-2">Admin Panel</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {loginStep === 'credentials' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                    placeholder="admin@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </>
          ) : (
            <div>
              <div className="mb-4 bg-blue-50 text-blue-800 p-3 rounded-lg text-sm">
                {twoFactorMethod === 'email'
                  ? (twoFactorMessage || 'Please enter the verification code sent to your email.')
                  : 'Please enter the code from your authenticator app.'}
              </div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Two-Factor Authentication Code
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={loginOtp}
                  onChange={(e) => setLoginOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition text-xl tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                  autoFocus
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? (loginStep === '2fa' ? 'Verifying...' : 'Signing in...') : (loginStep === '2fa' ? 'Verify' : 'Sign In')}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-sm text-teal-600 hover:text-teal-700 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Protected area - Authorized access only
        </p>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
            <button
              onClick={() => {
                setShowForgotPassword(false);
                setResetStep('request');
                setForgotPasswordEmail('');
                setOtp('');
                setNewPassword('');
                setConfirmPassword('');
                setForgotPasswordMessage('');
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Reset Password</h2>

            {resetStep === 'request' ? (
              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                      placeholder="admin@example.com"
                      required
                    />
                  </div>
                </div>

                {forgotPasswordMessage && (
                  <div className={`p-4 rounded-lg ${forgotPasswordMessage.includes('successfully')
                    ? 'bg-green-50 border border-green-200 text-green-700'
                    : 'bg-red-50 border border-red-200 text-red-700'
                    }`}>
                    {forgotPasswordMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={forgotPasswordLoading}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {forgotPasswordLoading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OTP Code
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition text-center text-2xl tracking-widest"
                    placeholder="000000"
                    maxLength={6}
                    required
                  />
                  <p className="mt-2 text-sm text-gray-500">Enter the 6-digit code sent to your email</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                {forgotPasswordMessage && (
                  <div className={`p-4 rounded-lg ${forgotPasswordMessage.includes('successfully')
                    ? 'bg-green-50 border border-green-200 text-green-700'
                    : 'bg-red-50 border border-red-200 text-red-700'
                    }`}>
                    {forgotPasswordMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={forgotPasswordLoading}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {forgotPasswordLoading ? 'Resetting Password...' : 'Reset Password'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setResetStep('request');
                    setOtp('');
                    setNewPassword('');
                    setConfirmPassword('');
                    setForgotPasswordMessage('');
                  }}
                  className="w-full text-teal-600 hover:text-teal-700 text-sm font-medium"
                >
                  Back to email input
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
