import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BrainCircuit, Mail, Lock, ArrowRight, UserCircle, Briefcase, GraduationCap, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { useAppStore } from '../../lib/store';

export default function Login() {
  const navigate = useNavigate();
  const { setUser, setHydratedData } = useAppStore();
  const [role, setRole] = useState<'student' | 'faculty' | 'recruiter'>('student');
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        
        // Fetch profile to get role
        if (data.user) {
          const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).single();
          if (profile) {
            
            // If student, pull their actual live data from Supabase!
            if (profile.role === 'student') {
              const { data: userSkills } = await supabase.from('user_skills').select('*, skills(*)').eq('user_id', data.user.id);
              const { data: projects } = await supabase.from('projects').select('*').eq('user_id', data.user.id);
              
              if (userSkills || projects) {
                 const formattedSkills = (userSkills || []).map((us: any) => ({
                    id: us.skill_id,
                    name: us.skills.name,
                    category: us.skills.category || 'Other',
                    proficiency: us.proficiency_level || 50,
                    verified: us.is_verified || false
                 }));
                 
                 const formattedProjects = (projects || []).map((p: any) => ({
                    id: p.id,
                    name: p.title,
                    description: p.description || '',
                    technologies: [],
                    role: 'Contributor',
                    github: p.github_url || '#',
                    demo: p.live_url || '#'
                 }));
                 
                 setHydratedData({ skills: formattedSkills, projects: formattedProjects });
              }
            }

            setUser({ 
              id: profile.id, 
              name: profile.full_name || email.split('@')[0], 
              role: profile.role as any, 
              email: data.user.email || email,
              department: profile.department || 'Computer Science & Engineering',
              year: profile.year || '4th Year',
              bio: profile.bio || 'Passionate Full-Stack AI Engineer specializing in React 19, TypeScript, Supabase, and Groq LLM integrations.',
              github: profile.github || 'https://github.com/vamsi-boya',
              linkedin: profile.linkedin || 'https://linkedin.com/in/boya-vamsi',
              phone: profile.phone || '+91 98765 43210',
              location: profile.location || 'Hyderabad, India'
            });
            navigate(`/${profile.role}`);
          } else {
             setUser({ 
               id: data.user.id, 
               name: email.split('@')[0], 
               role, 
               email: data.user.email || email,
               department: 'Computer Science & Engineering',
               year: '4th Year',
               bio: 'Passionate Full-Stack AI Engineer specializing in React 19, TypeScript, Supabase, and Groq LLM integrations.',
               github: 'https://github.com/vamsi-boya',
               linkedin: 'https://linkedin.com/in/boya-vamsi',
               phone: '+91 98765 43210',
               location: 'Hyderabad, India'
             });
             navigate(`/${role}`);
          }
        }
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) throw signUpError;
        
        if (data.user) {
          // Attempt to create profile (Note: requires insert policy on profiles in DB)
          await supabase.from('profiles').insert({
            id: data.user.id,
            role: role,
            full_name: fullName,
          });
          setUser({ id: data.user.id, name: fullName || email.split('@')[0], role, email: data.user.email || email });
          navigate(`/${role}`);
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg-primary flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-accent-primary/10 via-brand-bg-primary to-brand-bg-primary -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="glass-card w-full max-w-md p-8 relative z-10"
      >
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <BrainCircuit className="text-brand-accent-primary" size={32} />
          <span className="text-2xl font-bold tracking-tight text-brand-text-primary">SkillForge <span className="text-brand-accent-secondary">AI</span></span>
        </Link>

        <div className="flex bg-brand-bg-secondary p-1.5 rounded-xl mb-8 border border-brand-border relative">
          {(['student', 'faculty', 'recruiter'] as const).map((r) => (
            <button 
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-colors relative z-10 ${role === r ? 'text-brand-accent-primary' : 'text-brand-text-secondary hover:text-brand-text-primary'}`}
            >
              {role === r && (
                <motion.div
                  layoutId="activeRole"
                  className="absolute inset-0 bg-brand-card shadow-sm rounded-lg border border-brand-border/50 -z-10"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              {r === 'student' && <GraduationCap size={18} />}
              {r === 'faculty' && <UserCircle size={18} />}
              {r === 'recruiter' && <Briefcase size={18} />}
              <span className="capitalize">{r}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-brand-text-secondary mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserCircle className="h-5 w-5 text-brand-text-secondary" />
                </div>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-brand-bg-secondary border border-brand-border rounded-lg text-brand-text-primary placeholder-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent-primary/50 focus:border-brand-accent-primary transition-all" 
                  placeholder="John Doe" 
                  required 
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-brand-text-secondary mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-brand-text-secondary" />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 bg-brand-bg-secondary border border-brand-border rounded-lg text-brand-text-primary placeholder-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent-primary/50 focus:border-brand-accent-primary transition-all" 
                placeholder="you@university.edu" 
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-text-secondary mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-brand-text-secondary" />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 bg-brand-bg-secondary border border-brand-border rounded-lg text-brand-text-primary placeholder-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent-primary/50 focus:border-brand-accent-primary transition-all" 
                placeholder="••••••••" 
                required 
              />
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-brand-text-secondary cursor-pointer">
                <input type="checkbox" className="rounded border-brand-border bg-brand-bg-secondary text-brand-accent-primary focus:ring-brand-accent-primary" />
                Remember me
              </label>
              <a href="#" className="text-brand-accent-secondary hover:text-brand-accent-primary font-medium transition-colors">Forgot password?</a>
            </div>
          )}

          {error && (
            <div className="bg-brand-danger/10 border border-brand-danger text-brand-danger text-sm p-3 rounded-lg flex items-center gap-2">
              <AlertTriangle size={16} />
              {error}
            </div>
          )}

          <button disabled={loading} type="submit" className="group w-full flex items-center justify-center gap-2 bg-brand-accent-primary text-brand-bg-primary py-3.5 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(25,211,174,0.4)] active:scale-95 transition-all mt-8 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'} {!loading && <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-brand-text-secondary">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-brand-accent-primary font-bold hover:underline">
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
