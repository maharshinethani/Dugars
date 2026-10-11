'use client';

import { useState } from 'react';
import { useAdminAuth } from '@/lib/admin-auth';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function AdminLoginPage() {
  const { signIn, resetPassword } = useAdminAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      toast.error(error);
    } else {
      toast.success('Welcome back');
      router.push('/admin');
    }
    setLoading(false);
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await resetPassword(email);
    if (error) {
      toast.error(error);
    } else {
      setForgotSent(true);
      toast.success('Reset link sent to your email');
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <Link href="/" className="font-serif text-3xl font-light tracking-[0.3em] text-body">
            DUGARS
          </Link>
          <div className="mx-auto mt-4 h-px w-12 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
            {forgotMode ? 'Reset Password' : 'Admin Login'}
          </p>
        </div>

        {forgotSent ? (
          <div className="mt-8 rounded-sm border border-gold/20 bg-card p-6 text-center">
            <p className="text-sm text-secondary-text/80">A password reset link has been sent to your email.</p>
            <button onClick={() => { setForgotMode(false); setForgotSent(false); }} className="mt-4 text-xs uppercase tracking-wider text-gold hover:underline">
              Back to Login
            </button>
          </div>
        ) : (
          <form onSubmit={forgotMode ? handleReset : handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="label-luxury mb-2 block text-secondary-text/70">Email</label>
              <div className="relative">
                <Mail className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-text/30" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-border/15 bg-soft-black/50 ps-10 pe-4 py-3 text-sm text-on-dark outline-none transition-colors focus:border-gold"
                  placeholder="admin@dugarsjewellery.com"
                />
              </div>
            </div>

            {!forgotMode && (
              <div>
                <label className="label-luxury mb-2 block text-secondary-text/70">Password</label>
                <div className="relative">
                  <Lock className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-text/30" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-border/15 bg-soft-black/50 ps-10 pe-10 py-3 text-sm text-on-dark outline-none transition-colors focus:border-gold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute end-3 top-1/2 -translate-y-1/2 text-secondary-text/30 hover:text-on-dark"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 bg-gold py-3 text-xs font-medium uppercase tracking-[0.2em] text-soft-black transition-colors hover:bg-gold-light disabled:opacity-50"
            >
              {loading ? '...' : forgotMode ? 'Send Reset Link' : 'Sign In'}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setForgotMode(!forgotMode)}
                className="text-[10px] uppercase tracking-wider text-secondary-text/70 transition-colors hover:text-gold"
              >
                {forgotMode ? 'Back to Login' : 'Forgot Password?'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
