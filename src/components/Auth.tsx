import { useState } from 'react';
import { motion } from 'motion/react';
import { Leaf, Mail, Lock, User, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface AuthProps {
  onLogin: (user: any) => void;
}

export function Auth({ onLogin }: AuthProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const rolesRequiringVerification = ['shop', 'restaurant', 'ngo', 'admin', 'volunteer', 'farmer'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'register' && rolesRequiringVerification.includes(role)) {
      setVerificationSent(true);
      setIsVerifying(true);
    } else {
      onLogin({
        name: name || 'User',
        email,
        role,
        points: 150,
        co2Saved: 45,
        mealsRescued: 12
      });
    }
  };

  const handleVerify = () => {
    if (verificationCode === '123456') {
      onLogin({
        name,
        email,
        role,
        points: 0,
        co2Saved: 0,
        mealsRescued: 0
      });
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Password reset link sent to ' + email);
    setForgotPassword(false);
  };

  if (forgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12" style={{ backgroundColor: '#C1E2BE' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <Leaf className="w-12 h-12 text-green-700 mx-auto mb-3" />
              <h2 className="text-2xl text-green-900">Reset Password</h2>
              <p className="text-green-700 mt-2">Enter your email to receive a reset link</p>
            </div>

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <Label htmlFor="reset-email" className="text-green-800">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
                  <Input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/70 border-green-300 rounded-xl"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white rounded-xl py-5">
                Send Reset Link
              </Button>

              <Button 
                type="button"
                onClick={() => setForgotPassword(false)}
                className="w-full bg-transparent hover:bg-green-100 text-green-800 border border-green-300 rounded-xl py-5"
              >
                Back to Login
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12" style={{ backgroundColor: '#C1E2BE' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
            {verificationSent ? (
              <>
                <div className="text-center mb-6">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-green-700" />
                  </div>
                  <h2 className="text-2xl text-green-900">Verify Your Email</h2>
                  <p className="text-green-700 mt-2">We've sent a verification code to</p>
                  <p className="text-green-800 mt-1">{email}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="code" className="text-green-800">Verification Code</Label>
                    <Input
                      id="code"
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Enter 6-digit code"
                      className="mt-1 bg-white/70 border-green-300 rounded-xl text-center text-xl tracking-widest"
                      maxLength={6}
                    />
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-green-800">
                      Email verification is required for {role} accounts to ensure authenticity and trust in our community.
                    </p>
                  </div>

                  <Button 
                    onClick={handleVerify}
                    disabled={verificationCode.length !== 6}
                    className="w-full bg-green-700 hover:bg-green-800 text-white rounded-xl py-5 disabled:opacity-50"
                  >
                    Verify Email
                  </Button>

                  <button 
                    type="button"
                    onClick={() => alert('Verification code resent!')}
                    className="w-full text-green-700 hover:text-green-800 text-sm"
                  >
                    Resend Code
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-center mb-6">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h2 className="text-2xl text-green-900">Verification Successful!</h2>
                  <p className="text-green-700 mt-2">Your account has been verified</p>
                </div>

                <Button 
                  onClick={() => onLogin({ name, email, role })}
                  className="w-full bg-green-700 hover:bg-green-800 text-white rounded-xl py-5"
                >
                  Continue to FoodFlow
                </Button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12" style={{ backgroundColor: '#C1E2BE' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
          {/* Logo and Title */}
          <div className="text-center mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block"
            >
              <Leaf className="w-12 h-12 text-green-700 mx-auto mb-3" />
            </motion.div>
            <h2 className="text-2xl text-green-900">FoodFlow</h2>
            <p className="text-green-700 mt-1">The Circular Food Solution</p>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-2 mb-6 bg-green-100/50 rounded-xl p-1">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                mode === 'login' 
                  ? 'bg-white text-green-900 shadow-sm' 
                  : 'text-green-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                mode === 'register' 
                  ? 'bg-white text-green-900 shadow-sm' 
                  : 'text-green-700'
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <Label htmlFor="name" className="text-green-800">Full Name</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-white/70 border-green-300 rounded-xl"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-green-800">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/70 border-green-300 rounded-xl"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-green-800">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-white/70 border-green-300 rounded-xl"
                  required
                />
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <Label htmlFor="role" className="text-green-800">I am a...</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="mt-1 bg-white/70 border-green-300 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User (Individual)</SelectItem>
                    <SelectItem value="shop">Shop / Store</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="ngo">NGO / Charity</SelectItem>
                    <SelectItem value="volunteer">Volunteer</SelectItem>
                    <SelectItem value="farmer">Farmer</SelectItem>
                    <SelectItem value="buyer">Buyer</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>

                {rolesRequiringVerification.includes(role) && (
                  <div className="mt-2 bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800">
                      Email verification will be required for this role
                    </p>
                  </div>
                )}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-green-700 hover:bg-green-800 text-white rounded-xl py-5"
            >
              {mode === 'login' ? 'Login' : 'Register'}
            </Button>

            {mode === 'login' && (
              <button
                type="button"
                onClick={() => setForgotPassword(true)}
                className="w-full text-green-700 hover:text-green-800 text-sm"
              >
                Forgot Password?
              </button>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
}
