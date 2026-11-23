import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Award, Briefcase, Zap, TrendingUp, AlertCircle, ChevronRight, BrainCircuit, Sparkles, X, FileText } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { useAppStore } from '../../lib/store';
import { Link } from 'react-router-dom';
import { parseResumeWithAI } from '../../lib/ai';

const growthData = [
  { name: 'Jan', score: 45 },
  { name: 'Feb', score: 52 },
  { name: 'Mar', score: 58 },
  { name: 'Apr', score: 65 },
  { name: 'May', score: 72 },
  { name: 'Jun', score: 78 },
];

export default function StudentDashboard() {
  const { state, addSkill, addProject } = useAppStore();
  const [showAiImport, setShowAiImport] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  
  const handleParseResume = async () => {
    if (!resumeText.trim()) return;
    setIsParsing(true);
    try {
      const parsedData = await parseResumeWithAI(resumeText);
      
      // Save parsed skills
      if (parsedData.skills && Array.isArray(parsedData.skills)) {
        for (const skill of parsedData.skills) {
          await addSkill({ name: skill.name, category: skill.category || 'Extracted', proficiency: skill.proficiency || 50 });
        }
      }
      
      // Save parsed projects
      if (parsedData.projects && Array.isArray(parsedData.projects)) {
        for (const proj of parsedData.projects) {
          await addProject({ name: proj.name, description: proj.description || '', technologies: proj.technologies || [], role: 'Contributor', github: '#', demo: '#' });
        }
      }
      
      setShowAiImport(false);
      setResumeText('');
    } catch (err) {
      console.error(err);
      alert("Failed to parse resume. Check API key and quota.");
    } finally {
      setIsParsing(false);
    }
  };
  
  // Sort skills by proficiency
  const topSkills = [...state.skills].sort((a, b) => b.proficiency - a.proficiency).slice(0, 5);
  
  // Get critical gaps from target career
  const criticalGaps = state.targetCareer?.requiredSkills.map(req => {
    const reqClean = req.name.toLowerCase().replace('.js', '').trim();
    const userSkill = state.skills.find(s => {
      const sClean = s.name.toLowerCase().replace('.js', '').trim();
      return sClean.includes(reqClean) || reqClean.includes(sClean);
    });
    const current = userSkill ? userSkill.proficiency : 0;
    return { name: req.name, gap: Math.max(0, req.required - current), current };
  }).filter(g => g.gap > 10) || [];
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-text-primary mb-1">
            Good morning, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent-primary to-brand-accent-secondary">{state.user.name.split(' ')[0]}</span>
          </h1>
          <p className="text-brand-text-secondary text-sm">Here's how your skill profile is progressing towards your goals.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button onClick={() => setShowAiImport(true)} className="group flex items-center justify-center gap-2 bg-brand-accent-secondary/10 border border-brand-accent-secondary/30 text-brand-accent-secondary px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-accent-secondary hover:text-brand-bg-primary hover:shadow-[0_0_15px_rgba(111,107,250,0.4)] transition-all duration-300 active:scale-95">
            <Sparkles size={16} /> Auto-fill with AI
          </button>
          <Link to="/student/resume" className="group flex items-center justify-center gap-2 bg-brand-bg-secondary border border-brand-border px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-card hover:border-brand-accent-primary/50 hover:shadow-[0_0_15px_rgba(25,211,174,0.2)] transition-all duration-300 active:scale-95">
            <FileText size={16} className="text-brand-highlight group-hover:scale-110 transition-transform" /> View Resume
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 flex items-start gap-4 group hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(25,211,174,0.1)] hover:border-brand-accent-primary/30 transition-all duration-300">
          <div className="p-3 bg-brand-accent-primary/10 rounded-xl text-brand-accent-primary group-hover:bg-brand-accent-primary group-hover:text-brand-bg-primary transition-colors duration-300">
            <Target size={24} />
          </div>
          <div>
            <p className="text-xs text-brand-text-secondary font-bold uppercase tracking-wider mb-1">Skill Score</p>
            <h3 className="text-2xl font-bold">78<span className="text-sm text-brand-text-secondary font-normal">/100</span></h3>
          </div>
        </div>
        <div className="glass-card p-5 flex items-start gap-4 group hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(111,107,250,0.1)] hover:border-brand-accent-secondary/30 transition-all duration-300">
          <div className="p-3 bg-brand-accent-secondary/10 rounded-xl text-brand-accent-secondary group-hover:bg-brand-accent-secondary group-hover:text-brand-bg-primary transition-colors duration-300">
            <BrainCircuit size={24} />
          </div>
          <div>
            <p className="text-xs text-brand-text-secondary font-bold uppercase tracking-wider mb-1">Verified Skills</p>
            <h3 className="text-2xl font-bold">{state.skills.filter(s => s.verified).length}</h3>
          </div>
        </div>
        <div className="glass-card p-5 flex items-start gap-4 group hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(240,177,50,0.1)] hover:border-brand-highlight/30 transition-all duration-300">
          <div className="p-3 bg-brand-highlight/10 rounded-xl text-brand-highlight group-hover:bg-brand-highlight group-hover:text-brand-bg-primary transition-colors duration-300">
            <Briefcase size={24} />
          </div>
          <div>
            <p className="text-xs text-brand-text-secondary font-bold uppercase tracking-wider mb-1">Projects</p>
            <h3 className="text-2xl font-bold">{state.projects.length}</h3>
          </div>
        </div>
        <div className="glass-card p-5 flex items-start gap-4 group hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(46,204,113,0.1)] hover:border-brand-success/30 transition-all duration-300">
          <div className="p-3 bg-brand-success/10 rounded-xl text-brand-success group-hover:bg-brand-success group-hover:text-brand-bg-primary transition-colors duration-300">
            <Award size={24} />
          </div>
          <div>
            <p className="text-xs text-brand-text-secondary font-bold uppercase tracking-wider mb-1">Certifications</p>
            <h3 className="text-2xl font-bold">{state.certifications.length}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Readiness Score */}
        <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-base font-semibold w-full text-left mb-6">Career Readiness</h3>
          <div className="w-48 h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart 
                cx="50%" cy="50%" 
                innerRadius="80%" outerRadius="100%" 
                barSize={10} data={[{ name: 'Score', value: 78, fill: '#19D3AE' }]}
                startAngle={90} endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar background={{ fill: '#243B53' }} dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold">78</span>
              <span className="text-xs text-brand-text-secondary">/ 100</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-brand-text-secondary">You are in the top 15% of your cohort for the Full Stack Developer track.</p>
        </div>

        {/* Growth Chart */}
        <div className="glass-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold">Skill Progression</h3>
            <span className="text-xs font-medium text-brand-success flex items-center gap-1"><TrendingUp size={14}/> +33% in 6 months</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#243B53" vertical={false} />
                <XAxis dataKey="name" stroke="#94A3B8" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                <YAxis stroke="#94A3B8" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#13263A', borderColor: '#243B53', borderRadius: '8px' }}
                  itemStyle={{ color: '#F1F5F9' }}
                />
                <Area type="monotone" dataKey="score" stroke="#38BDF8" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Skills & Gaps */}
        <div className="glass-card p-6 lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-base font-semibold mb-4">Top Verified Skills</h3>
            <div className="flex flex-wrap gap-2">
              {topSkills.map(skill => (
                <div key={skill.id} className="px-3 py-1.5 bg-brand-bg-secondary border border-brand-border rounded-full flex items-center gap-2">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-xs text-brand-accent-primary font-bold">{skill.proficiency}%</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-4 border-t border-brand-border">
            <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
              <AlertCircle size={18} className="text-brand-danger" /> Critical Skill Gaps
            </h3>
            <div className="space-y-3">
              {criticalGaps.length === 0 ? (
                 <p className="text-sm text-brand-text-secondary">No critical gaps identified for your target career.</p>
              ) : (
                criticalGaps.map(gap => (
                  <div key={gap.name} className="flex items-center justify-between p-3 bg-brand-danger/5 border border-brand-danger/20 rounded-lg">
                    <div>
                      <h4 className="text-sm font-semibold text-brand-danger">{gap.name}</h4>
                      <p className="text-xs text-brand-text-secondary mt-0.5">Required for {state.targetCareer?.title}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold">{gap.current}%</span>
                      <p className="text-[10px] text-brand-text-secondary">Current</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* AI Insight & Match */}
        <div className="space-y-6">
          <div className="glass-card p-6 bg-gradient-to-br from-brand-bg-primary via-brand-card to-brand-bg-primary relative overflow-hidden group hover:border-brand-accent-secondary/50 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent-secondary/10 blur-3xl -z-0"></div>
            <h3 className="text-base font-semibold mb-3 flex items-center gap-2 relative z-10">
              <Sparkles size={18} className="text-brand-accent-secondary group-hover:animate-pulse" /> AI Profile Insight
            </h3>
            <p className="text-sm text-brand-text-secondary leading-relaxed mb-5 relative z-10">
              Your profile is exceptionally strong in frontend development (React). However, improving <strong className="text-brand-text-primary text-brand-accent-primary">SQL</strong> and <strong className="text-brand-text-primary text-brand-accent-primary">backend system design</strong> could increase your Full Stack Developer career match by up to 15%.
            </p>
            <Link to="/student/recommendations" className="inline-flex text-sm font-semibold text-brand-accent-secondary items-center gap-1 hover:gap-2 transition-all relative z-10 bg-brand-accent-secondary/10 px-4 py-2 rounded-lg hover:bg-brand-accent-secondary/20">
              View Recommended Roadmap <ChevronRight size={16} />
            </Link>
          </div>

          <div className="glass-card p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
                <Zap className="text-brand-highlight" size={20} /> Recommendations
              </h3>
              <p className="text-sm text-brand-text-secondary mb-4">Focus on these to boost your readiness.</p>
              <div className="space-y-3">
                <div className="p-3 bg-brand-bg-primary border border-brand-border rounded-lg group hover:border-brand-accent-primary/50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-bold group-hover:text-brand-accent-primary transition-colors">Advanced SQL Queries</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-brand-bg-secondary rounded text-brand-text-secondary">Course</span>
                  </div>
                  <p className="text-xs text-brand-text-secondary">Est. 4 hours to complete</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Resume Import Modal */}
      <AnimatePresence>
        {showAiImport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-brand-bg-primary border border-brand-border rounded-2xl p-6 w-full max-w-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent-primary to-brand-accent-secondary"></div>
              
              <div className="flex justify-between items-center mb-6 mt-2">
                <h3 className="text-xl font-bold text-brand-text-primary flex items-center gap-2">
                  <Sparkles className="text-brand-accent-secondary" size={24} /> AI Resume Import
                </h3>
                <button onClick={() => setShowAiImport(false)} className="text-brand-text-secondary hover:text-brand-text-primary p-1 rounded-lg hover:bg-brand-bg-secondary transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-brand-text-secondary">Paste your plain text resume below. Our AI will instantly extract your skills and projects and automatically insert them into your live profile.</p>
                
                <textarea 
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="John Doe&#10;Software Engineer&#10;&#10;Skills: React, Node.js, Python&#10;&#10;Projects:&#10;- Built a REST API using Node.js..."
                  className="w-full h-64 bg-brand-bg-secondary border border-brand-border rounded-xl p-4 text-sm focus:outline-none focus:border-brand-accent-secondary transition-colors text-brand-text-primary custom-scrollbar resize-none font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button onClick={() => setShowAiImport(false)} className="px-5 py-2.5 rounded-xl font-bold text-sm text-brand-text-secondary hover:bg-brand-bg-secondary transition-colors">
                  Cancel
                </button>
                <button 
                  onClick={handleParseResume} 
                  disabled={isParsing || !resumeText.trim()}
                  className="px-6 py-2.5 rounded-xl font-bold text-sm bg-brand-accent-secondary text-brand-bg-primary hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-[0_0_15px_rgba(111,107,250,0.3)]"
                >
                  {isParsing ? (
                     <><Sparkles size={16} className="animate-spin" /> Processing with AI...</>
                  ) : (
                     <><BrainCircuit size={16} /> Extract & Sync Data</>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
