import React, { useState } from 'react';
import { useAppStore } from '../../lib/store';
import { Target, ChevronRight, CheckCircle2, ChevronDown, AlertTriangle, ShieldCheck, Sparkles, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const CustomSelect = ({ value, onChange, options }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const [customValue, setCustomValue] = useState('');

  if (isCustom) {
    return (
      <form onSubmit={(e) => { e.preventDefault(); if (customValue.trim()) { onChange(customValue.trim()); setIsCustom(false); } }} className="relative z-40 w-full md:w-64 flex items-center gap-2">
        <input 
          autoFocus
          type="text" 
          placeholder="e.g. Prompt Engineer..."
          className="w-full bg-brand-bg-primary border border-brand-accent-primary rounded-xl px-4 py-2.5 font-bold focus:ring-2 focus:ring-brand-accent-primary transition-all text-brand-text-primary text-sm shadow-[0_0_15px_rgba(25,211,174,0.2)]"
          value={customValue}
          onChange={e => setCustomValue(e.target.value)}
        />
        <button type="submit" className="p-2.5 bg-brand-accent-primary text-brand-bg-primary rounded-xl hover:bg-brand-accent-primary/90 transition-colors shrink-0">
          <CheckCircle2 size={16} />
        </button>
      </form>
    );
  }

  return (
    <div className="relative z-40">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full md:w-64 bg-brand-bg-secondary border border-brand-border rounded-xl px-4 py-2.5 font-bold focus:ring-1 focus:ring-brand-accent-primary transition-all text-brand-text-primary text-sm cursor-pointer flex justify-between items-center hover:border-brand-accent-primary/50 shadow-sm"
      >
        <span className="truncate pr-2">{value}</span>
        <ChevronDown size={16} className={`text-brand-accent-primary transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
            className="absolute top-full right-0 mt-2 w-full md:w-64 bg-brand-bg-primary border border-brand-accent-primary/30 shadow-[0_10px_40px_rgba(25,211,174,0.2)] rounded-xl py-2 z-50 overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {options.map((opt: string) => (
                <div 
                  key={opt}
                  onClick={() => {onChange(opt); setIsOpen(false)}}
                  className={`px-4 py-2.5 text-sm cursor-pointer transition-colors flex items-center gap-2 ${value === opt ? 'bg-brand-accent-primary/10 text-brand-accent-primary font-bold border-l-2 border-brand-accent-primary' : 'hover:bg-brand-bg-secondary text-brand-text-primary border-l-2 border-transparent'}`}
                >
                  {opt}
                </div>
              ))}
              <div 
                onClick={() => { setIsCustom(true); setIsOpen(false); }}
                className="px-4 py-2.5 text-sm cursor-pointer transition-colors flex items-center gap-2 hover:bg-brand-bg-secondary text-brand-accent-primary border-t border-brand-border mt-1 pt-3 font-bold"
              >
                <Sparkles size={14} /> Analyze Custom Role...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const CAREER_PROFILES: Record<string, { skills: { name: string, required: number }[], insight: string }> = {
  'Full Stack Developer': {
    skills: [
      { name: 'React', required: 90 }, { name: 'JavaScript', required: 95 }, { name: 'Node.js', required: 85 }, { name: 'System Design', required: 70 }, { name: 'SQL', required: 80 }
    ],
    insight: 'Your frontend foundation is extremely strong. The largest gaps preventing a higher match score are System Design and SQL optimization. Addressing these will push your career readiness above 90%.'
  },
  'Frontend Engineer': {
    skills: [
      { name: 'React', required: 95 }, { name: 'JavaScript', required: 95 }, { name: 'CSS/Tailwind', required: 90 }, { name: 'TypeScript', required: 85 }, { name: 'Web Performance', required: 70 }
    ],
    insight: 'You are highly aligned for Frontend roles. To reach elite tier, focus on mastering TypeScript and Web Performance optimization techniques.'
  },
  'Backend Engineer': {
    skills: [
      { name: 'Node.js', required: 90 }, { name: 'System Design', required: 85 }, { name: 'SQL', required: 90 }, { name: 'Docker', required: 70 }, { name: 'AWS', required: 75 }
    ],
    insight: 'You have a good start, but Backend roles require deep understanding of System Design and Database Architecture. Focus heavily on SQL and cloud deployment (AWS/Docker).'
  },
  'Machine Learning Engineer': {
    skills: [
      { name: 'Python', required: 90 }, { name: 'PyTorch/TensorFlow', required: 85 }, { name: 'Mathematics', required: 80 }, { name: 'SQL', required: 70 }, { name: 'MLOps', required: 65 }
    ],
    insight: 'ML roles demand strong Python and Mathematics. Your current profile lacks specialized ML frameworks. Consider completing a PyTorch or TensorFlow certification.'
  },
  'DevOps Engineer': {
    skills: [
      { name: 'Linux', required: 90 }, { name: 'Docker', required: 95 }, { name: 'Kubernetes', required: 85 }, { name: 'AWS', required: 90 }, { name: 'CI/CD', required: 85 }
    ],
    insight: 'DevOps requires mastery of infrastructure. You need to build foundational skills in Linux administration, container orchestration (Kubernetes), and automated CI/CD pipelines.'
  },
  'Data Scientist': {
    skills: [
      { name: 'Python', required: 95 }, { name: 'SQL', required: 90 }, { name: 'Statistics', required: 85 }, { name: 'Machine Learning', required: 80 }, { name: 'Data Visualization', required: 75 }
    ],
    insight: 'To excel as a Data Scientist, you must bridge the gap in Statistics and Data Visualization. SQL and Python form a good base, but analytical modeling is critical.'
  },
  'Cloud Architect': {
    skills: [
      { name: 'AWS/Azure/GCP', required: 95 }, { name: 'System Design', required: 95 }, { name: 'Networking', required: 85 }, { name: 'Security', required: 80 }, { name: 'Docker/K8s', required: 85 }
    ],
    insight: 'Cloud Architecture is a senior role. It requires massive upskilling in high-level System Design, Networking protocols, and multi-cloud security compliance.'
  },
  'Cyber Security Analyst': {
    skills: [
      { name: 'Networking', required: 90 }, { name: 'Linux', required: 85 }, { name: 'Ethical Hacking', required: 80 }, { name: 'Security Auditing', required: 85 }, { name: 'Python', required: 70 }
    ],
    insight: 'Security roles require a paranoid mindset and deep knowledge of Networking and Linux. Start by exploring Ethical Hacking concepts and foundational security auditing.'
  }
};

export default function SkillGapAnalysis() {
  const { state } = useAppStore();
  const [selectedCareer, setSelectedCareer] = useState('Full Stack Developer');

  const currentProfile = CAREER_PROFILES[selectedCareer] || {
    skills: [
      { name: 'Core Foundations', required: 90 },
      { name: 'Domain Expertise', required: 85 },
      { name: 'Communication', required: 80 },
      { name: 'Problem Solving', required: 95 },
      { name: 'Tooling', required: 70 }
    ],
    insight: `SkillForge AI has analyzed the custom role: "${selectedCareer}". This role requires high adaptability and strong problem-solving skills. Focus on building domain-specific expertise while maintaining strong core foundations.`
  };

  const gaps = currentProfile.skills.map(req => {
    // Flexible matching for demo purposes
    const userSkill = state.skills.find(s => s.name.toLowerCase().includes(req.name.toLowerCase()) || req.name.toLowerCase().includes(s.name.toLowerCase()));
    const current = userSkill ? userSkill.proficiency : 0;
    const gap = Math.max(0, req.required - current);
    const priority = gap > 30 ? 'High' : gap > 0 ? 'Medium' : 'None';
    return { name: req.name, required: req.required, current, gap, priority };
  });

  // Calculate dynamic match percentage based on actual user skills vs requirements
  const totalRequired = currentProfile.skills.reduce((acc, curr) => acc + curr.required, 0);
  const totalCurrent = currentProfile.skills.reduce((acc, curr) => {
    const userSkill = state.skills.find(s => s.name.toLowerCase().includes(curr.name.toLowerCase()) || curr.name.toLowerCase().includes(s.name.toLowerCase()));
    return acc + Math.min(curr.required, userSkill ? userSkill.proficiency : 0);
  }, 0);
  const calculatedMatch = Math.round((totalCurrent / totalRequired) * 100);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-text-primary mb-1">Skill Gap Analysis</h1>
          <p className="text-sm text-brand-text-secondary">Analyze your profile against industry requirements.</p>
        </div>
        <CustomSelect 
          value={selectedCareer}
          onChange={setSelectedCareer}
          options={Object.keys(CAREER_PROFILES)}
        />
      </div>

      {/* AI Match Overview */}
      <div className="glass-card p-8 bg-gradient-to-br from-brand-bg-secondary via-brand-bg-primary to-brand-bg-primary relative overflow-hidden group">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-accent-primary/10 blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="w-32 h-32 shrink-0 relative flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(25,211,174,0.3)]">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#13263A" strokeWidth="8" />
              <motion.circle 
                key={calculatedMatch}
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 283 - (283 * calculatedMatch) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                cx="50" cy="50" r="45" fill="none" stroke="#19D3AE" strokeWidth="8" 
                strokeDasharray="283"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-brand-text-primary">{calculatedMatch}%</span>
              <span className="text-[10px] text-brand-text-secondary uppercase tracking-wider font-bold">Match</span>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-xl font-bold text-brand-text-primary">Readiness for {selectedCareer}</h2>
              <span className="px-2.5 py-1 bg-brand-success/10 border border-brand-success/30 text-brand-success text-[10px] font-bold uppercase tracking-wider rounded-md shadow-[0_0_10px_rgba(46,204,113,0.15)]">On Track</span>
            </div>
            
            <div className="p-5 rounded-xl bg-brand-bg-secondary/50 border border-brand-border shadow-inner">
              <p className="text-sm text-brand-text-primary leading-relaxed flex items-start gap-3">
                <BrainCircuit className="text-brand-accent-primary shrink-0 mt-0.5" size={20} />
                <span>
                  <strong className="text-brand-accent-primary block mb-1">SkillForge AI Analysis:</strong>
                  {currentProfile.insight}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Breakdown List */}
        <div className="lg:col-span-2 glass-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-brand-text-primary flex items-center gap-2">
              <Target className="text-brand-accent-secondary" size={20} /> Required Skills Breakdown
            </h3>
          </div>
          
          <div className="space-y-7">
            {gaps.map((gap, idx) => (
              <motion.div 
                key={gap.name}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                  <div className="font-bold text-sm text-brand-text-primary w-48 truncate">{gap.name}</div>
                  
                  <div className="flex items-center gap-3 w-full md:w-auto flex-1 md:flex-none">
                     <span className="text-xs font-bold text-brand-text-secondary w-20 text-right">Target: {gap.required}%</span>
                     <div className="w-px h-3 bg-brand-border hidden md:block"></div>
                     <span className="text-xs font-bold text-brand-text-primary w-20 text-left">You: {gap.current}%</span>
                  </div>

                  <div className="w-32 flex justify-end shrink-0">
                    {gap.gap > 0 ? (
                      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${gap.priority === 'High' ? 'bg-brand-danger/10 border-brand-danger/30 text-brand-danger' : 'bg-brand-highlight/10 border-brand-highlight/30 text-brand-highlight'}`}>
                        {gap.priority} Gap
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-brand-success/10 border border-brand-success/30 text-brand-success flex items-center gap-1">
                        <CheckCircle2 size={12} /> Met
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="h-2 w-full bg-brand-bg-primary rounded-full overflow-hidden relative border border-brand-border/50">
                  {/* Required Target Marker */}
                  <div className="absolute top-0 bottom-0 border-r-2 border-brand-text-secondary z-10 opacity-50" style={{ left: `${gap.required}%` }}></div>
                  
                  {/* Current Level Fill */}
                  <div 
                    className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ${gap.current >= gap.required ? 'bg-brand-success shadow-[0_0_10px_rgba(46,204,113,0.5)]' : 'bg-gradient-to-r from-brand-accent-secondary to-brand-accent-primary'}`} 
                    style={{ width: `${gap.current}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar Gaps & Strengths */}
        <div className="lg:col-span-1 space-y-6 flex flex-col">
          <div className="glass-card p-6 border-t-4 border-t-brand-danger hover:-translate-y-1 transition-transform shadow-[0_10px_30px_rgba(231,76,60,0.05)] hover:shadow-[0_10px_30px_rgba(231,76,60,0.1)] flex-1">
            <h3 className="text-base font-bold mb-4 flex items-center gap-2 text-brand-danger">
              <AlertTriangle size={18} /> High Priority Gaps
            </h3>
            <ul className="space-y-3">
              {gaps.filter(g => g.priority === 'High').map(g => (
                <li key={g.name} className="flex items-start gap-2 text-sm text-brand-text-secondary bg-brand-danger/5 p-2 rounded-lg border border-brand-danger/10">
                  <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-brand-danger shrink-0"></div>
                  <span className="flex-1 font-medium text-brand-text-primary">{g.name}</span>
                  <span className="text-xs text-brand-danger font-bold">-{g.gap}%</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link to="/student/recommendations" className="w-full inline-flex justify-center items-center gap-2 py-2.5 bg-brand-danger/10 text-brand-danger hover:bg-brand-danger hover:text-white rounded-lg text-xs font-bold transition-colors border border-brand-danger/20">
                <Sparkles size={14} /> Get Recommendations
              </Link>
            </div>
          </div>
          
          <div className="glass-card p-6 border-t-4 border-t-brand-success hover:-translate-y-1 transition-transform shadow-[0_10px_30px_rgba(46,204,113,0.05)] hover:shadow-[0_10px_30px_rgba(46,204,113,0.1)] flex-1">
            <h3 className="text-base font-bold mb-4 flex items-center gap-2 text-brand-success">
              <ShieldCheck size={18} /> Strong Foundations
            </h3>
            <ul className="space-y-3">
              {gaps.filter(g => g.gap === 0).map(g => (
                <li key={g.name} className="flex items-center gap-2 text-sm text-brand-text-secondary bg-brand-success/5 p-2 rounded-lg border border-brand-success/10">
                  <CheckCircle2 size={14} className="text-brand-success shrink-0" />
                  <span className="font-medium text-brand-text-primary">{g.name}</span>
                </li>
              ))}
              {gaps.filter(g => g.gap === 0).length === 0 && (
                <li className="text-xs text-brand-text-secondary italic">Keep working to build your foundational skills.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
