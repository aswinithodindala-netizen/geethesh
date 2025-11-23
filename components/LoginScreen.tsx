import React, { useState } from 'react';
import { Lock, User, ArrowRight, Loader2, Sparkles } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API authentication delay
    setTimeout(() => {
      // For demo purposes, allow any non-empty credentials
      if (email.length > 0 && password.length > 0) {
        setIsLoading(false);
        onLogin();
      } else {
        setIsLoading(false);
        setError('Please enter a valid username and password.');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white relative overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Background Ambient Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />

      <div className="w-full max-w-md p-6 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Header Section */}
        <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mb-6 shadow-2xl shadow-indigo-500/30 transform hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-10 h-10 text-white drop-shadow-md" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-indigo-100 to-slate-400 bg-clip-text text-transparent mb-3 tracking-tight">
                GEETHESH'S AI
            </h1>
            <p className="text-slate-400 text-sm font-medium tracking-wide">AUTHENTICATION REQUIRED</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6 bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/50 shadow-2xl ring-1 ring-white/5">
            
            <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Identity</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors duration-300" />
                    </div>
                    <input 
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-slate-900 transition-all duration-300 sm:text-sm"
                        placeholder="Username or Email"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Passkey</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors duration-300" />
                    </div>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-slate-900 transition-all duration-300 sm:text-sm"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium animate-in fade-in slide-in-from-top-2">
                    {error}
                </div>
            )}

            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full group relative flex justify-center items-center gap-3 py-4 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg shadow-indigo-600/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
            >
                <div className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full duration-[1000ms] transition-transform -skew-x-12 -translate-x-full origin-left" />
                
                {isLoading ? (
                    <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                    <>
                        <span>Access System</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>
        </form>

        <div className="mt-8 text-center space-y-4">
             <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
                <span className="w-12 h-[1px] bg-slate-800"></span>
                <span>SECURE GATEWAY v1.0</span>
                <span className="w-12 h-[1px] bg-slate-800"></span>
             </div>
             <p className="text-[10px] text-slate-600">
                Protected by End-to-End Encryption
             </p>
        </div>

      </div>
    </div>
  );
};

export default LoginScreen;
