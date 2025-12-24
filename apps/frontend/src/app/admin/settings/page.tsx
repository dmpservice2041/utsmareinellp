'use client';

import { useEffect, useState } from 'react';
import { Lock, Shield, Copy, Check, Mail, Edit2, Save, X } from 'lucide-react';
import { API_ENDPOINTS } from '@/config/api';

export default function AdminSettings() {
  const [currentEmail, setCurrentEmail] = useState('');
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editedEmail, setEditedEmail] = useState('');
  const [changeEmailLoading, setChangeEmailLoading] = useState(false);
  const [changeEmailMessage, setChangeEmailMessage] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [changePasswordMessage, setChangePasswordMessage] = useState('');

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorLoading, setTwoFactorLoading] = useState(false);
  const [twoFactorMessage, setTwoFactorMessage] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [manualEntryKey, setManualEntryKey] = useState('');
  const [twoFactorMethod, setTwoFactorMethod] = useState<'app' | 'email'>('app'); // 'app' or 'email'
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [verifyToken, setVerifyToken] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchCurrentUser();
    fetch2FAStatus();
  }, []);

  const decodeJWT = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.GET_CURRENT_USER, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.email) {
          setCurrentEmail(data.email);
        }
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const fetch2FAStatus = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.GET_2FA_STATUS, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setTwoFactorEnabled(data.twoFactorEnabled || false);
        if (data.twoFactorMethod) {
          setTwoFactorMethod(data.twoFactorMethod);
        }
        // If we want to persist the method choice, we would need the backend to return it.
        // For now, we default the toggle to 'app' or 'email' based on something? 
        // Actually the backend doesn't return the method in get2FAStatus yet.
        // We should probably update the backend to return 'twoFactorMethod' as well.
      }
    } catch (error) {
      console.error('Error fetching 2FA status:', error);
    }
  };

  const handleEditEmail = () => {
    setEditedEmail(currentEmail);
    setIsEditingEmail(true);
    setChangeEmailMessage('');
  };

  const handleCancelEditEmail = () => {
    setIsEditingEmail(false);
    setEditedEmail('');
    setChangeEmailMessage('');
  };

  const handleSaveEmail = async () => {
    setChangeEmailMessage('');

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editedEmail)) {
      setChangeEmailMessage('Please enter a valid email address.');
      return;
    }

    if (editedEmail === currentEmail) {
      setChangeEmailMessage('New email must be different from current email.');
      return;
    }

    setChangeEmailLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.CHANGE_EMAIL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          newEmail: editedEmail,
        }),
      });

      if (!response.ok) {
        let errorMessage = `Server error (${response.status}): ${response.statusText || 'Unknown error'}`;
        try {
          const text = await response.text();
          if (text) {
            try {
              const errorData = JSON.parse(text);
              console.error('Backend error response:', errorData);
              // Handle different error response formats
              if (errorData.message) {
                errorMessage = errorData.message;
              } else if (errorData.error) {
                errorMessage = typeof errorData.error === 'string'
                  ? errorData.error
                  : errorData.error.message || errorMessage;
              }
            } catch {
              // If not JSON, use the text as error message
              errorMessage = text || errorMessage;
            }
          }
        } catch (e) {
          console.error('Failed to parse error response:', e);
        }
        setChangeEmailMessage(errorMessage);
        return;
      }

      const data = await response.json();

      // Update token if provided (persists the email change)
      // Update token if provided (persists the email change, now via cookie)
      if (data.token) {
        // Cookie is updated automatically
      }

      setChangeEmailMessage('Email changed successfully!');
      // Update email in state
      setCurrentEmail(data.email || editedEmail);
      setIsEditingEmail(false);
      setEditedEmail('');
    } catch (err: any) {
      setChangeEmailMessage('Connection error. Please ensure the backend server is running and check the backend console for errors.');
      console.error('Change email error:', err);
    } finally {
      setChangeEmailLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangePasswordMessage('');

    if (newPassword !== confirmPassword) {
      setChangePasswordMessage('Passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setChangePasswordMessage('Password must be at least 6 characters long.');
      return;
    }

    setChangePasswordLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.CHANGE_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setChangePasswordMessage('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setChangePasswordMessage(data.message || 'Failed to change password. Please try again.');
      }
    } catch (err) {
      setChangePasswordMessage('Connection error. Please try again later.');
    } finally {
      setChangePasswordLoading(false);
    }
  };

  const handleEnable2FA = async () => {
    setTwoFactorLoading(true);
    setTwoFactorMessage('');

    try {
      const response = await fetch(API_ENDPOINTS.ENABLE_2FA, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ method: twoFactorMethod }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.method === 'email') {
          setTwoFactorMessage(data.message);
        } else {
          setQrCode(data.qrCode);
          setManualEntryKey(data.manualEntryKey);
        }
        setShow2FASetup(true);
      } else {
        setTwoFactorMessage(data.message || 'Failed to enable 2FA. Please try again.');
      }
    } catch (err) {
      setTwoFactorMessage('Connection error. Please try again later.');
    } finally {
      setTwoFactorLoading(false);
    }
  };

  const handleVerify2FASetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setTwoFactorMessage('');

    if (!verifyToken) {
      setTwoFactorMessage('Please enter the verification code.');
      return;
    }

    setTwoFactorLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.VERIFY_2FA_SETUP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ token: verifyToken }),
      });

      const data = await response.json();

      if (response.ok) {
        setTwoFactorMessage('2FA has been enabled successfully!');
        setTwoFactorEnabled(true);
        setShow2FASetup(false);
        setVerifyToken('');
        setQrCode('');
        setManualEntryKey('');
      } else {
        setTwoFactorMessage(data.message || 'Invalid verification code. Please try again.');
      }
    } catch (err) {
      setTwoFactorMessage('Connection error. Please try again later.');
    } finally {
      setTwoFactorLoading(false);
    }
  };

  const handleDisable2FA = async () => {
    if (!confirm('Are you sure you want to disable 2FA? This will make your account less secure.')) {
      return;
    }

    setTwoFactorLoading(true);
    setTwoFactorMessage('');

    try {
      const response = await fetch(API_ENDPOINTS.DISABLE_2FA, {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setTwoFactorMessage('2FA has been disabled successfully!');
        setTwoFactorEnabled(false);
      } else {
        setTwoFactorMessage(data.message || 'Failed to disable 2FA. Please try again.');
      }
    } catch (err) {
      setTwoFactorMessage('Connection error. Please try again later.');
    } finally {
      setTwoFactorLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account security settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Change Email */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Mail className="text-purple-600" size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Email Address</h2>
          </div>

          {!isEditingEmail ? (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Current Email</p>
                <p className="text-lg font-semibold text-gray-900">{currentEmail || ''}</p>
              </div>

              <button
                onClick={handleEditEmail}
                className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                <Edit2 size={18} />
                Edit Email
              </button>

              {changeEmailMessage && (
                <div className={`p-4 rounded-lg ${changeEmailMessage.includes('successfully')
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'bg-red-50 border border-red-200 text-red-700'
                  }`}>
                  {changeEmailMessage}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                  placeholder="Enter email address"
                  autoFocus
                />
              </div>

              {changeEmailMessage && (
                <div className={`p-4 rounded-lg ${changeEmailMessage.includes('successfully')
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'bg-red-50 border border-red-200 text-red-700'
                  }`}>
                  {changeEmailMessage}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={handleSaveEmail}
                  disabled={changeEmailLoading}
                  className="flex-1 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <Save size={18} />
                  {changeEmailLoading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleCancelEditEmail}
                  disabled={changeEmailLoading}
                  className="px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-teal-100 rounded-lg">
              <Lock className="text-teal-600" size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                placeholder="Enter current password"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                placeholder="Enter new password"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                placeholder="Confirm new password"
                required
              />
            </div>

            {changePasswordMessage && (
              <div className={`p-4 rounded-lg ${changePasswordMessage.includes('successfully')
                ? 'bg-green-50 border border-green-200 text-green-700'
                : 'bg-red-50 border border-red-200 text-red-700'
                }`}>
                {changePasswordMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={changePasswordLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {changePasswordLoading ? 'Changing Password...' : 'Change Password'}
            </button>
          </form>
        </div>

      </div>

      <div className="mt-8">
        {/* Two-Factor Authentication */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Shield className="text-blue-600" size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Two-Factor Authentication</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">2FA Status</p>
                <p className="text-sm text-gray-600">
                  {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${twoFactorEnabled
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-200 text-gray-700'
                }`}>
                {twoFactorEnabled ? 'Active' : 'Inactive'}
              </span>
            </div>

            {twoFactorMessage && (
              <div className={`p-4 rounded-lg ${twoFactorMessage.includes('successfully')
                ? 'bg-green-50 border border-green-200 text-green-700'
                : 'bg-red-50 border border-red-200 text-red-700'
                }`}>
                {twoFactorMessage}
              </div>
            )}

            {show2FASetup ? (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  {twoFactorMethod === 'app' ? (
                    <>
                      <p className="text-sm text-gray-700 mb-3">
                        Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.):
                      </p>
                      {qrCode && (
                        <div className="flex justify-center mb-4">
                          <img src={qrCode} alt="2FA QR Code" className="border-2 border-gray-300 rounded-lg" />
                        </div>
                      )}
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">Or enter this code manually:</p>
                        <div className="flex items-center gap-2 p-2 bg-white border border-gray-300 rounded">
                          <code className="flex-1 text-sm font-mono">{manualEntryKey}</code>
                          <button
                            onClick={() => copyToClipboard(manualEntryKey)}
                            className="p-1 hover:bg-gray-100 rounded"
                            title="Copy to clipboard"
                          >
                            {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} className="text-gray-600" />}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                        <Mail className="text-blue-600" size={24} />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">OTP Sent!</h3>
                      <p className="text-sm text-gray-600">
                        We've sent a 6-digit verification code to your email address.
                        Please enter it below to verify and enable 2FA.
                      </p>
                    </div>
                  )}
                </div>

                <form onSubmit={handleVerify2FASetup} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Verification Code
                    </label>
                    <input
                      type="text"
                      value={verifyToken}
                      onChange={(e) => setVerifyToken(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition text-center text-xl tracking-widest"
                      placeholder="000000"
                      maxLength={6}
                      required
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={twoFactorLoading}
                      className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {twoFactorLoading ? 'Verifying...' : 'Verify & Enable'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShow2FASetup(false);
                        setVerifyToken('');
                        setQrCode('');
                        setManualEntryKey('');
                        setTwoFactorMessage('');
                      }}
                      className="px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="space-y-4">
                {!twoFactorEnabled && (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setTwoFactorMethod('app')}
                      className={`p-3 border rounded-lg flex flex-col items-center justify-center gap-2 transition-all ${twoFactorMethod === 'app'
                        ? 'border-teal-500 bg-teal-50 text-teal-700 ring-1 ring-teal-500'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                    >
                      <Shield size={20} />
                      <span className="text-sm font-medium">Authenticator App</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTwoFactorMethod('email')}
                      className={`p-3 border rounded-lg flex flex-col items-center justify-center gap-2 transition-all ${twoFactorMethod === 'email'
                        ? 'border-teal-500 bg-teal-50 text-teal-700 ring-1 ring-teal-500'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                    >
                      <Mail size={20} />
                      <span className="text-sm font-medium">Email OTP</span>
                    </button>
                  </div>
                )}

                {twoFactorEnabled ? (
                  <button
                    onClick={handleDisable2FA}
                    disabled={twoFactorLoading}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {twoFactorLoading ? 'Disabling...' : 'Disable 2FA'}
                  </button>
                ) : (
                  <button
                    onClick={handleEnable2FA}
                    disabled={twoFactorLoading}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {twoFactorLoading ? 'Loading...' : twoFactorMethod === 'email' ? 'Send OTP' : 'Enable 2FA'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

