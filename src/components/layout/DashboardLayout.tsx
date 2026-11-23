import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { LayoutDashboard, User, BrainCircuit, FolderGit2, Award, Briefcase, TrendingUp, Sparkles, Navigation, FileText, Search, Bell, LogOut, Settings, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../lib/store';
import ThemeToggle from '../ThemeToggle';

export default function DashboardLayout({ role }: { role: 'student' | 'faculty' | 'recruiter' }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useAppStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const studentLinks = [
    { name: 'Overview', path: '/student', icon: LayoutDashboard },
    { name: 'My Profile', path: '/student/profile', icon: User },
    { name: 'Skills', path: '/student/skills', icon: BrainCircuit },
    { name: 'Projects', path: '/student/projects', icon: FolderGit2 },
    { name: 'Certifications', path: '/student/certifications', icon: Award },
    { name: 'Internships', path: '/student/internships', icon: Briefcase },
  ];

  const aiLinks = [
    { name: 'Skill Gap', path: '/student/gap-analysis', icon: TrendingUp },
    { name: 'AI Recommendations', path: '/student/recommendations', icon: Sparkles },
    { name: 'Career Paths', path: '/student/career', icon: Navigation },
    { name: 'Resume', path: '/student/resume', icon: FileText },
  ];

  const facultyLinks = [
    { name: 'Dashboard', path: '/faculty', icon: LayoutDashboard },
    { name: 'Students', path: '/faculty/students', icon: User },
    { name: 'Skill Analytics', path: '/faculty/analytics', icon: TrendingUp },
    { name: 'Departments', path: '/faculty/departments', icon: BrainCircuit },
  ];

  const recruiterLinks = [
    { name: 'Dashboard', path: '/recruiter', icon: LayoutDashboard },
    { name: 'Job Requirements', path: '/recruiter/jobs', icon: Briefcase },
    { name: 'Candidate Search', path: '/recruiter/search', icon: Search },
    { name: 'Compare Candidates', path: '/recruiter/compare', icon: FolderGit2 },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-brand-bg-primary overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-card border-r border-brand-border flex flex-col hidden md:flex shrink-0">
        <div className="p-6 border-b border-brand-border shrink-0">
          <div className="flex items-center gap-2">
            <BrainCircuit className="text-brand-accent-primary" size={24} />
            <span className="text-lg font-bold tracking-tight text-brand-text-primary">SkillForge <span className="text-brand-accent-secondary">AI</span></span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {role === 'student' && (
            <>
              <div>
                <p className="px-3 text-xs font-semibold text-brand-text-secondary uppercase tracking-wider mb-2">Platform</p>
                <nav className="space-y-1">
                  {studentLinks.map((link) => (
                    <NavLink key={link.path} to={link.path} end={link.path === '/student'} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-brand-accent-primary/10 text-brand-accent-primary' : 'text-brand-text-secondary hover:bg-brand-bg-secondary hover:text-brand-text-primary'}`}>
                      <link.icon size={18} />
                      {link.name}
                    </NavLink>
                  ))}
                </nav>
              </div>

              <div>
                <p className="px-3 text-xs font-semibold text-brand-text-secondary uppercase tracking-wider mb-2 flex items-center gap-1"><Sparkles size={12}/> Intelligence</p>
                <nav className="space-y-1">
                  {aiLinks.map((link) => (
                    <NavLink key={link.path} to={link.path} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-brand-accent-secondary/10 text-brand-accent-secondary' : 'text-brand-text-secondary hover:bg-brand-bg-secondary hover:text-brand-text-primary'}`}>
                      <link.icon size={18} />
                      {link.name}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </>
          )}

          {role === 'faculty' && (
            <div>
              <p className="px-3 text-xs font-semibold text-brand-text-secondary uppercase tracking-wider mb-2">Institution</p>
              <nav className="space-y-1">
                {facultyLinks.map((link) => (
                  <NavLink key={link.path} to={link.path} end={link.path === '/faculty'} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-brand-accent-primary/10 text-brand-accent-primary' : 'text-brand-text-secondary hover:bg-brand-bg-secondary hover:text-brand-text-primary'}`}>
                    <link.icon size={18} />
                    {link.name}
                  </NavLink>
                ))}
              </nav>
            </div>
          )}

          {role === 'recruiter' && (
            <div>
              <p className="px-3 text-xs font-semibold text-brand-text-secondary uppercase tracking-wider mb-2">Talent Acquisition</p>
              <nav className="space-y-1">
                {recruiterLinks.map((link) => (
                  <NavLink key={link.path} to={link.path} end={link.path === '/recruiter'} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-brand-accent-primary/10 text-brand-accent-primary' : 'text-brand-text-secondary hover:bg-brand-bg-secondary hover:text-brand-text-primary'}`}>
                    <link.icon size={18} />
                    {link.name}
                  </NavLink>
                ))}
              </nav>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-brand-border shrink-0">
          <button onClick={handleSignOut} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-brand-danger hover:bg-brand-danger/10 w-full transition-colors">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 bg-brand-bg-secondary border-b border-brand-border flex items-center justify-between px-4 md:px-6 shrink-0 relative z-20">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-1 text-brand-text-secondary hover:text-brand-text-primary transition-colors" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center w-96 relative">
              <Search className="absolute left-3 text-brand-text-secondary" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skills, projects, or peers..." 
                className="w-full bg-brand-bg-primary border border-brand-border rounded-lg pl-10 pr-4 py-2 text-sm text-brand-text-primary placeholder-brand-text-secondary focus:outline-none focus:border-brand-accent-primary transition-colors font-bold"
              />
              
              <AnimatePresence>
                {searchQuery.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute top-12 left-0 w-full bg-brand-bg-primary border border-brand-border rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden z-50"
                  >
                    <div className="p-3 bg-brand-bg-secondary border-b border-brand-border flex justify-between items-center text-xs text-brand-text-secondary">
                      <span>Searching for "{searchQuery}"...</span>
                      <button onClick={() => setSearchQuery('')} className="text-brand-accent-primary hover:underline">Clear</button>
                    </div>
                    <div className="p-2 space-y-1">
                      <div className="px-3 py-2 hover:bg-brand-bg-secondary rounded cursor-pointer transition-colors flex justify-between items-center group">
                         <span className="text-sm font-bold text-brand-text-primary">React Native Developer</span>
                         <span className="text-xs text-brand-text-secondary group-hover:text-brand-accent-primary">Job Role</span>
                      </div>
                      <div className="px-3 py-2 hover:bg-brand-bg-secondary rounded cursor-pointer transition-colors flex justify-between items-center group">
                         <span className="text-sm font-bold text-brand-text-primary">Python Advanced</span>
                         <span className="text-xs text-brand-text-secondary group-hover:text-brand-accent-primary">Skill</span>
                      </div>
                      <div className="px-3 py-2 hover:bg-brand-bg-secondary rounded cursor-pointer transition-colors flex justify-between items-center group">
                         <span className="text-sm font-bold text-brand-text-primary">Sarah Chen</span>
                         <span className="text-xs text-brand-text-secondary group-hover:text-brand-accent-primary">Student</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          
          <div className="flex items-center gap-6 relative">
            <ThemeToggle />
            
            {/* Notifications Toggle */}
            <button 
              onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
              className="relative text-brand-text-secondary hover:text-brand-text-primary transition-colors p-1"
            >
              <Bell size={20} />
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-brand-danger border-2 border-brand-bg-secondary"></span>
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="absolute top-12 right-12 w-80 bg-brand-card border border-brand-border rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.5)] overflow-hidden"
                >
                  <div className="p-4 border-b border-brand-border flex justify-between items-center bg-brand-bg-secondary">
                    <h3 className="font-semibold text-sm">Notifications</h3>
                    <button className="text-xs text-brand-accent-primary hover:underline">Mark all as read</button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-4 border-b border-brand-border/50 hover:bg-brand-bg-primary/50 cursor-pointer transition-colors">
                      <p className="text-sm font-medium mb-1">New AI Career Insight</p>
                      <p className="text-xs text-brand-text-secondary">Your React skills match a new Senior Frontend track. Tap to view.</p>
                      <span className="text-[10px] text-brand-accent-secondary mt-2 block">2 hours ago</span>
                    </div>
                    <div className="p-4 hover:bg-brand-bg-primary/50 cursor-pointer transition-colors opacity-70">
                      <p className="text-sm font-medium mb-1">Profile Updated</p>
                      <p className="text-xs text-brand-text-secondary">Your 'AI Retinal Screening' project was saved.</p>
                      <span className="text-[10px] text-brand-text-secondary mt-2 block">1 day ago</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Profile Toggle */}
            <div 
              onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
              className="flex items-center gap-3 pl-6 border-l border-brand-border cursor-pointer select-none"
            >
              <img 
                src={state.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(state.user.name)}&background=19D3AE&color=07111F`} 
                alt="Avatar" 
                className="h-8 w-8 rounded-full object-cover ring-2 ring-brand-border hover:ring-brand-accent-primary transition-all bg-brand-bg-secondary" 
              />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-brand-text-primary leading-tight">{state.user.name}</p>
                <p className="text-xs text-brand-text-secondary capitalize">{state.user.role}</p>
              </div>
            </div>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="absolute top-12 right-0 w-48 bg-brand-card border border-brand-border rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
                >
                  <button onClick={() => { navigate(`/${state.user.role === 'student' ? 'student' : state.user.role}/profile`); setShowProfileMenu(false); }} className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-brand-bg-secondary text-left w-full border-b border-brand-border/50">
                    <User size={16} /> My Profile
                  </button>
                  <button onClick={() => setShowProfileMenu(false)} className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-brand-bg-secondary text-left w-full border-b border-brand-border/50 text-brand-text-secondary">
                    <Settings size={16} /> Preferences
                  </button>
                  <button onClick={handleSignOut} className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-brand-danger/10 text-brand-danger text-left w-full font-medium">
                    <LogOut size={16} /> Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto bg-brand-bg-primary p-4 md:p-6 lg:p-8 scroll-smooth" onClick={() => { setShowNotifications(false); setShowProfileMenu(false); }}>
          <Outlet />
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-brand-card border-r border-brand-border z-50 flex flex-col md:hidden shadow-[20px_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="p-6 border-b border-brand-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="text-brand-accent-primary" size={24} />
                  <span className="text-lg font-bold tracking-tight text-brand-text-primary">SkillForge</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-brand-text-secondary hover:text-brand-text-primary">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
                {role === 'student' && (
                  <>
                    <div>
                      <p className="px-3 text-xs font-semibold text-brand-text-secondary uppercase tracking-wider mb-2">Platform</p>
                      <nav className="space-y-1">
                        {studentLinks.map((link) => (
                          <NavLink onClick={() => setIsMobileMenuOpen(false)} key={link.path} to={link.path} end={link.path === '/student'} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-brand-accent-primary/10 text-brand-accent-primary' : 'text-brand-text-secondary hover:bg-brand-bg-secondary hover:text-brand-text-primary'}`}>
                            <link.icon size={18} />
                            {link.name}
                          </NavLink>
                        ))}
                      </nav>
                    </div>
                    <div>
                      <p className="px-3 text-xs font-semibold text-brand-text-secondary uppercase tracking-wider mb-2 flex items-center gap-1"><Sparkles size={12}/> Intelligence</p>
                      <nav className="space-y-1">
                        {aiLinks.map((link) => (
                          <NavLink onClick={() => setIsMobileMenuOpen(false)} key={link.path} to={link.path} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-brand-accent-secondary/10 text-brand-accent-secondary' : 'text-brand-text-secondary hover:bg-brand-bg-secondary hover:text-brand-text-primary'}`}>
                            <link.icon size={18} />
                            {link.name}
                          </NavLink>
                        ))}
                      </nav>
                    </div>
                  </>
                )}
                {role === 'faculty' && (
                  <div>
                    <nav className="space-y-1">
                      {facultyLinks.map((link) => (
                        <NavLink onClick={() => setIsMobileMenuOpen(false)} key={link.path} to={link.path} end={link.path === '/faculty'} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-brand-accent-primary/10 text-brand-accent-primary' : 'text-brand-text-secondary'}`}>
                          <link.icon size={18} /> {link.name}
                        </NavLink>
                      ))}
                    </nav>
                  </div>
                )}
                {role === 'recruiter' && (
                  <div>
                    <nav className="space-y-1">
                      {recruiterLinks.map((link) => (
                        <NavLink onClick={() => setIsMobileMenuOpen(false)} key={link.path} to={link.path} end={link.path === '/recruiter'} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-brand-accent-primary/10 text-brand-accent-primary' : 'text-brand-text-secondary'}`}>
                          <link.icon size={18} /> {link.name}
                        </NavLink>
                      ))}
                    </nav>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
