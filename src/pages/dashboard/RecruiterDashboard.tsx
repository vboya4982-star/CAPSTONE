import React, { useState } from 'react';
import { useAppStore } from '../../lib/store';
import { 
  Search, 
  Filter, 
  Star, 
  CheckCircle2, 
  ChevronDown, 
  User, 
  Award, 
  ExternalLink, 
  Briefcase, 
  Zap,
  X,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Download,
  Send,
  Code2,
  Check,
  Sparkles,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SkillItem {
  name: string;
  level: number;
}

interface ProjectItem {
  title: string;
  desc: string;
  tech: string[];
}

interface Candidate {
  id: string;
  name: string;
  role: string;
  exp: string;
  location: string;
  email: string;
  phone: string;
  education: string;
  skills: SkillItem[];
  projects: ProjectItem[];
  certifications: string[];
  status: string;
}

interface JobRequisition {
  id: string;
  title: string;
  department: string;
  activeMatches: number;
  targetSkills: string[];
}

// Active Job Requisitions
const JOB_REQUISITIONS: JobRequisition[] = [
  { id: 'REQ-1042', title: 'Full Stack Developer', department: 'Engineering', activeMatches: 24, targetSkills: ['React', 'Node.js', 'JavaScript', 'Python'] },
  { id: 'REQ-1043', title: 'Frontend Engineer', department: 'UI/UX & Web', activeMatches: 18, targetSkills: ['React', 'TypeScript', 'Tailwind', 'Figma'] },
  { id: 'REQ-1045', title: 'Data Scientist', department: 'AI & Data', activeMatches: 12, targetSkills: ['Python', 'SQL', 'Pandas', 'Machine Learning'] },
  { id: 'REQ-1046', title: 'Backend Developer', department: 'Cloud Systems', activeMatches: 15, targetSkills: ['Node.js', 'SQL', 'Docker', 'AWS'] },
];

// Dynamic AI Req Match score mapping per requisition
const CANDIDATE_REQ_MATCHES: Record<string, Record<string, number>> = {
  u1: { 'REQ-1042': 87, 'REQ-1043': 89, 'REQ-1045': 75, 'REQ-1046': 85 }, // Arjun Kumar
  u2: { 'REQ-1042': 94, 'REQ-1043': 98, 'REQ-1045': 50, 'REQ-1046': 70 }, // Sarah Chen
  u3: { 'REQ-1042': 72, 'REQ-1043': 45, 'REQ-1045': 95, 'REQ-1046': 78 }, // David Okafor
  u4: { 'REQ-1042': 81, 'REQ-1043': 60, 'REQ-1045': 68, 'REQ-1046': 92 }, // Emma Wilson
};

// Expanded Mock Candidate Database for Recruiter
const MOCK_CANDIDATES: Candidate[] = [
  { 
    id: 'u1', 
    name: 'Arjun Kumar', 
    role: 'Full Stack Developer', 
    exp: '1.5 yrs', 
    location: 'Bengaluru, India',
    email: 'arjun.kumar@institution.edu',
    phone: '+91 98765 43210',
    education: 'B.Tech CSE, Final Year (CGPA 8.8)',
    skills: [
      { name: 'React', level: 92 },
      { name: 'JavaScript', level: 95 },
      { name: 'Node.js', level: 88 },
      { name: 'Python', level: 82 }
    ], 
    projects: [
      { title: 'DevConnect Platform', desc: 'Real-time collaborative workspace with WebSockets & React.', tech: ['React', 'Node.js', 'MongoDB'] },
      { title: 'AI Skill Parser', desc: 'NLP engine extracting candidate skill taxonomy from PDFs.', tech: ['Python', 'FastAPI', 'SpaCy'] }
    ],
    certifications: ['AWS Certified Cloud Practitioner', 'Meta Front-End Developer'],
    status: 'Available' 
  },
  { 
    id: 'u2', 
    name: 'Sarah Chen', 
    role: 'Frontend Engineer', 
    exp: '2 yrs', 
    location: 'Mumbai, India',
    email: 'sarah.chen@institution.edu',
    phone: '+91 98123 45678',
    education: 'B.Tech IT, Final Year (CGPA 9.2)',
    skills: [
      { name: 'React', level: 96 },
      { name: 'TypeScript', level: 94 },
      { name: 'Tailwind', level: 98 },
      { name: 'Figma', level: 90 }
    ], 
    projects: [
      { title: 'PixelCraft Design System', desc: 'Accessible UI component library used by 10k+ devs.', tech: ['React', 'TypeScript', 'Tailwind'] },
      { title: 'E-Commerce Dashboard', desc: 'High-concurrency analytics portal with real-time data viz.', tech: ['React', 'Recharts', 'Zustand'] }
    ],
    certifications: ['Meta Advanced React', 'Google UX Design Professional'],
    status: 'Interviewing' 
  },
  { 
    id: 'u3', 
    name: 'David Okafor', 
    role: 'Data Scientist', 
    exp: '0 yrs', 
    location: 'Hyderabad, India',
    email: 'david.o@institution.edu',
    phone: '+91 97654 32109',
    education: 'B.Tech AI & DS, Final Year (CGPA 8.5)',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'SQL', level: 85 },
      { name: 'Pandas', level: 92 },
      { name: 'Machine Learning', level: 78 }
    ], 
    projects: [
      { title: 'Customer Churn Predictor', desc: 'Gradient Boosting model predicting user churn with 91% accuracy.', tech: ['Python', 'Scikit-Learn', 'XGBoost'] }
    ],
    certifications: ['TensorFlow Developer Certificate', 'SQL Advanced HackerRank'],
    status: 'Available' 
  },
  { 
    id: 'u4', 
    name: 'Emma Wilson', 
    role: 'Backend Developer', 
    exp: '1 yr', 
    location: 'Pune, India',
    email: 'emma.w@institution.edu',
    phone: '+91 96543 21098',
    education: 'B.Tech CSE, Final Year (CGPA 8.9)',
    skills: [
      { name: 'Node.js', level: 91 },
      { name: 'SQL', level: 89 },
      { name: 'Docker', level: 84 },
      { name: 'AWS', level: 78 }
    ], 
    projects: [
      { title: 'Distributed Microservices Bus', desc: 'Event-driven Kafka message broker handling 50k req/sec.', tech: ['Node.js', 'Docker', 'Redis', 'PostgreSQL'] }
    ],
    certifications: ['AWS Solutions Architect Associate'],
    status: 'Shortlisted' 
  }
];

export default function RecruiterDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [shortlist, setShortlist] = useState<string[]>(['u4']);
  const [activeTab, setActiveTab] = useState<'search' | 'shortlist'>('search');
  const [selectedJobReq, setSelectedJobReq] = useState<JobRequisition>(JOB_REQUISITIONS[0]);
  const [isJobReqMenuOpen, setIsJobReqMenuOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  const toggleShortlist = (id: string) => {
    setShortlist(prev => prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const getMatchScore = (candidateId: string) => {
    return CANDIDATE_REQ_MATCHES[candidateId]?.[selectedJobReq.id] || 75;
  };

  const filteredCandidates = MOCK_CANDIDATES.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.skills.some(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          c.role.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === 'shortlist') return matchesSearch && shortlist.includes(c.id);
    return matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 p-4 bg-brand-accent-primary text-brand-bg-primary rounded-xl font-bold text-sm shadow-2xl flex items-center gap-2"
          >
            <CheckCircle2 size={18} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-text-primary flex items-center gap-2 mb-1">
            <Briefcase className="text-brand-accent-secondary" /> Talent Acquisition
          </h1>
          <p className="text-sm text-brand-text-secondary">Find, filter, and shortlist top student talent based on verified skills and AI readiness scoring.</p>
        </div>
      </div>
      
      {/* KPI Cards Row with Dynamic Job Req Dropdown */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
        <div className="glass-card p-6 border-l-4 border-l-brand-accent-primary relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(25,211,174,0.1)]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent-primary/10 rounded-full blur-2xl group-hover:bg-brand-accent-primary/20 transition-colors pointer-events-none"></div>
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] text-brand-text-secondary uppercase font-bold tracking-wider relative z-10">Active Job Req</p>
            <span className="text-[10px] font-mono font-bold text-brand-accent-primary bg-brand-accent-primary/10 px-2 py-0.5 rounded border border-brand-accent-primary/30">
              {selectedJobReq.id}
            </span>
          </div>
          <h3 className="text-xl font-bold text-brand-text-primary relative z-10">{selectedJobReq.title}</h3>
        </div>

        <div className="glass-card p-6 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(25,211,174,0.05)] border-t border-brand-border">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent-secondary/10 rounded-full blur-2xl group-hover:bg-brand-accent-secondary/20 transition-colors pointer-events-none"></div>
          <p className="text-[10px] text-brand-text-secondary uppercase font-bold tracking-wider mb-2 relative z-10">Total Matches</p>
          <h3 className="text-2xl font-bold text-brand-accent-secondary relative z-10">{selectedJobReq.activeMatches}</h3>
        </div>

        <div className="glass-card p-6 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(243,156,18,0.1)] border-t border-brand-border">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-highlight/10 rounded-full blur-2xl group-hover:bg-brand-highlight/20 transition-colors pointer-events-none"></div>
          <p className="text-[10px] text-brand-text-secondary uppercase font-bold tracking-wider mb-2 relative z-10">Shortlisted</p>
          <h3 className="text-2xl font-bold text-brand-highlight relative z-10">{shortlist.length}</h3>
        </div>

        {/* Change Job Req Interactive Dropdown Trigger */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsJobReqMenuOpen(!isJobReqMenuOpen)}
            className="w-full h-full glass-card p-6 bg-brand-accent-primary/5 border-2 border-brand-accent-primary/20 flex items-center justify-center cursor-pointer hover:bg-brand-accent-primary/10 hover:border-brand-accent-primary/40 transition-all active:scale-95 group"
          >
            <span className="font-bold text-brand-accent-primary text-sm flex items-center gap-2">
              Change Job Req <ChevronDown size={16} className={`group-hover:translate-y-0.5 transition-transform duration-200 ${isJobReqMenuOpen ? 'rotate-180' : ''}`} />
            </span>
          </button>

          {/* Job Requisition Floating Dropdown Menu */}
          <AnimatePresence>
            {isJobReqMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsJobReqMenuOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-brand-accent-primary/30 shadow-2xl z-50 p-2 overflow-hidden backdrop-blur-xl bg-brand-bg-primary/95 text-brand-text-primary"
                >
                  <p className="px-3 py-1.5 text-[10px] font-bold uppercase text-brand-text-secondary tracking-wider">
                    Select Active Requisition
                  </p>
                  <div className="space-y-1">
                    {JOB_REQUISITIONS.map((req) => (
                      <button
                        key={req.id}
                        onClick={() => {
                          setSelectedJobReq(req);
                          setIsJobReqMenuOpen(false);
                          showToast(`Switched active Job Req to: ${req.title}`);
                        }}
                        className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between ${
                          req.id === selectedJobReq.id
                            ? 'bg-brand-accent-primary/15 text-brand-accent-primary border border-brand-accent-primary/30 font-bold'
                            : 'hover:bg-brand-accent-primary/10 text-brand-text-primary border border-transparent'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs">{req.title}</span>
                          </div>
                          <span className="text-[10px] font-mono text-brand-text-secondary">{req.id} • {req.department}</span>
                        </div>
                        {req.id === selectedJobReq.id && <CheckCircle2 size={16} className="text-brand-accent-primary shrink-0" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="glass-card overflow-hidden flex flex-col min-h-[600px] border-t border-brand-border">
        {/* Toolbar */}
        <div className="p-5 border-b border-brand-border bg-brand-bg-secondary/50 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex gap-1.5 bg-brand-bg-primary p-1.5 rounded-xl border border-brand-border w-full md:w-auto shadow-inner">
            <button 
              onClick={() => setActiveTab('search')} 
              className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all flex-1 ${activeTab === 'search' ? 'bg-brand-accent-primary/10 text-brand-accent-primary border border-brand-accent-primary/30 shadow-sm' : 'text-brand-text-secondary hover:text-brand-text-primary hover:bg-brand-bg-secondary border border-transparent'}`}
            >
              Candidate Search
            </button>
            <button 
              onClick={() => setActiveTab('shortlist')} 
              className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all flex-1 flex items-center justify-center gap-2 ${activeTab === 'shortlist' ? 'bg-brand-highlight/10 text-brand-highlight border border-brand-highlight/30 shadow-sm' : 'text-brand-text-secondary hover:text-brand-text-primary hover:bg-brand-bg-secondary border border-transparent'}`}
            >
              Shortlist <span className={`px-2 py-0.5 rounded-md text-[10px] ${activeTab === 'shortlist' ? 'bg-brand-highlight text-brand-bg-primary' : 'bg-brand-bg-secondary border border-brand-border text-brand-text-primary'}`}>{shortlist.length}</span>
            </button>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-3 top-3 text-brand-text-secondary" size={16} />
              <input 
                type="text" 
                placeholder="Search skills, names, roles..." 
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-brand-bg-primary border border-brand-border rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-accent-primary transition-all font-bold shadow-inner"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-3 border border-brand-border rounded-xl bg-brand-bg-primary text-brand-text-secondary hover:text-brand-accent-primary hover:border-brand-accent-primary/50 hover:bg-brand-accent-primary/5 transition-all shadow-sm">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Data Grid */}
        <div className="flex-1 overflow-auto bg-brand-bg-primary/30 p-6 custom-scrollbar">
          {filteredCandidates.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-brand-text-secondary opacity-60">
              <Search size={64} className="mb-6 opacity-30" />
              <p className="font-bold text-lg text-brand-text-primary mb-2">No candidates found.</p>
              <p className="text-sm">Try adjusting your search filters or job requirements.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5">
              <AnimatePresence>
                {filteredCandidates.map((candidate, idx) => {
                  const matchScore = getMatchScore(candidate.id);
                  return (
                    <motion.div 
                      key={candidate.id} 
                      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: idx * 0.05 }}
                      className={`p-6 border rounded-2xl bg-brand-card hover:-translate-y-0.5 transition-all duration-300 flex flex-col md:flex-row gap-6 md:items-center relative overflow-hidden group ${
                        shortlist.includes(candidate.id) ? 'border-brand-highlight/30 shadow-[0_10px_30px_rgba(243,156,18,0.05)]' : 'border-brand-border hover:border-brand-accent-primary/40 hover:shadow-[0_10px_30px_rgba(25,211,174,0.05)]'
                      }`}
                    >
                      {shortlist.includes(candidate.id) && <div className="absolute top-0 right-0 w-32 h-32 bg-brand-highlight/5 rounded-full blur-2xl pointer-events-none"></div>}

                      <div className="flex items-center gap-4 md:w-1/4 relative z-10">
                        <div className="relative">
                          <img src={`https://ui-avatars.com/api/?name=${candidate.name.replace(' ','+')}&background=13263A&color=19D3AE&bold=true`} alt={candidate.name} className="w-14 h-14 rounded-full ring-2 ring-brand-border group-hover:ring-brand-accent-primary/50 transition-colors" />
                          {shortlist.includes(candidate.id) && (
                            <div className="absolute -bottom-1 -right-1 bg-brand-highlight rounded-full p-1 border-2 border-brand-card">
                              <Star size={10} className="text-white" fill="white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-brand-text-primary text-lg group-hover:text-brand-accent-primary transition-colors">{candidate.name}</h4>
                          <p className="text-[10px] text-brand-text-secondary font-bold uppercase tracking-wider mt-0.5 bg-brand-bg-secondary px-2 py-0.5 rounded border border-brand-border inline-block">{candidate.role}</p>
                        </div>
                      </div>

                      <div className="md:w-1/6 relative z-10">
                        <div className="flex items-center gap-3 bg-brand-bg-primary/50 p-3 rounded-xl border border-brand-border/50">
                          <span className={`text-2xl font-black ${matchScore >= 85 ? 'text-brand-accent-primary' : matchScore >= 75 ? 'text-brand-highlight' : 'text-brand-text-primary'}`}>
                            {matchScore}%
                          </span>
                          <div className="flex flex-col">
                             <span className="text-[9px] text-brand-text-secondary leading-tight uppercase font-black">AI Req</span>
                             <span className="text-[9px] text-brand-text-secondary leading-tight uppercase font-black">Match</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 flex flex-wrap gap-2 relative z-10">
                        {candidate.skills.map(skill => (
                          <span key={skill.name} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-brand-bg-secondary/80 border border-brand-border text-brand-text-secondary group-hover:border-brand-border/80 transition-colors flex items-center gap-1.5">
                             <Zap size={10} className={matchScore >= 85 ? 'text-brand-accent-primary' : 'text-brand-text-secondary'} /> {skill.name}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-end gap-3 md:w-1/4 shrink-0 relative z-10">
                        <button 
                          onClick={() => setSelectedCandidate(candidate)}
                          className="text-xs font-bold text-brand-text-primary flex items-center justify-center gap-1.5 bg-brand-bg-secondary px-4 py-2.5 rounded-xl border border-brand-border hover:bg-brand-accent-primary hover:text-brand-bg-primary hover:border-brand-accent-primary transition-all active:scale-95 shadow-sm"
                        >
                          View Profile <ExternalLink size={14} />
                        </button>
                        <button 
                          onClick={() => toggleShortlist(candidate.id)}
                          className={`p-2.5 rounded-xl transition-all active:scale-90 border shadow-sm ${shortlist.includes(candidate.id) ? 'bg-brand-highlight text-white border-brand-highlight hover:bg-brand-highlight/90' : 'bg-brand-bg-secondary border-brand-border text-brand-text-secondary hover:border-brand-highlight hover:text-brand-highlight hover:bg-brand-highlight/10'}`}
                          title={shortlist.includes(candidate.id) ? "Remove from Shortlist" : "Add to Shortlist"}
                        >
                          <Star size={18} fill={shortlist.includes(candidate.id) ? "currentColor" : "none"} />
                        </button>
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Candidate Profile Detailed Inspection Modal */}
      <AnimatePresence>
        {selectedCandidate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-3xl glass-card p-6 md:p-8 my-8 border-brand-accent-primary/30 max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedCandidate(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-brand-bg-primary hover:bg-rose-500/20 text-brand-text-secondary hover:text-rose-400 border border-brand-border transition-colors"
              >
                <X size={18} />
              </button>

              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border-b border-brand-accent-primary/20 pb-6 mb-6">
                <img 
                  src={`https://ui-avatars.com/api/?name=${selectedCandidate.name.replace(' ','+')}&background=13263A&color=19D3AE&bold=true`} 
                  alt={selectedCandidate.name} 
                  className="w-20 h-20 rounded-2xl ring-4 ring-brand-accent-primary/30 shadow-xl shrink-0" 
                />

                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-bold text-brand-text-primary">{selectedCandidate.name}</h2>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {selectedCandidate.status}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-accent-primary/10 text-brand-accent-primary border border-brand-accent-primary/30 flex items-center gap-1">
                      <Sparkles size={12} /> {getMatchScore(selectedCandidate.id)}% Match ({selectedJobReq.title})
                    </span>
                  </div>

                  <p className="text-sm font-bold text-brand-accent-secondary">{selectedCandidate.role}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-brand-text-secondary pt-1">
                    <span className="flex items-center gap-1"><GraduationCap size={14} /> {selectedCandidate.education}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {selectedCandidate.location}</span>
                    <span className="flex items-center gap-1"><Briefcase size={14} /> Exp: {selectedCandidate.exp}</span>
                  </div>
                </div>
              </div>

              {/* Verified Competency Skills */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm uppercase tracking-wider font-bold text-brand-text-secondary mb-3 flex items-center gap-2">
                    <Award className="text-brand-accent-primary" size={16} /> Verified Skill Competencies
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedCandidate.skills.map((skill, i) => (
                      <div key={i} className="p-3 rounded-xl bg-brand-bg-primary/60 border border-brand-accent-primary/20 flex flex-col justify-between space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-brand-text-primary">{skill.name}</span>
                          <span className="font-black text-brand-accent-primary">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-brand-bg-primary h-2 rounded-full overflow-hidden border border-brand-accent-primary/20">
                          <div className="h-full bg-brand-accent-primary rounded-full" style={{ width: `${skill.level}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects Portfolio */}
                <div>
                  <h3 className="text-sm uppercase tracking-wider font-bold text-brand-text-secondary mb-3 flex items-center gap-2">
                    <Code2 className="text-brand-accent-secondary" size={16} /> Portfolio & Demonstrated Projects
                  </h3>
                  <div className="space-y-3">
                    {selectedCandidate.projects.map((proj, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-brand-bg-primary/60 border border-brand-border space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-sm text-brand-text-primary">{proj.title}</h4>
                          <span className="text-xs text-brand-accent-primary font-semibold flex items-center gap-1">
                            Verified Repo <ExternalLink size={12} />
                          </span>
                        </div>
                        <p className="text-xs text-brand-text-secondary leading-relaxed">{proj.desc}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {proj.tech.map((t, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-brand-bg-secondary text-brand-text-primary text-[10px] font-semibold">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h3 className="text-sm uppercase tracking-wider font-bold text-brand-text-secondary mb-3 flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-400" size={16} /> Institutional & Vendor Certifications
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.certifications.map((cert, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                        <Check size={14} /> {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-brand-accent-primary/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-xs text-brand-text-secondary">
                  <span className="flex items-center gap-1"><Mail size={13} /> {selectedCandidate.email}</span>
                  <span className="flex items-center gap-1"><Phone size={13} /> {selectedCandidate.phone}</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button 
                    onClick={() => showToast(`Resume downloaded for ${selectedCandidate.name}`)}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-brand-bg-secondary hover:bg-brand-accent-primary/10 border border-brand-border text-brand-text-primary rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Download size={14} />
                    <span>Download Resume</span>
                  </button>

                  <button 
                    onClick={() => {
                      showToast(`Interview invitation sent to ${selectedCandidate.name} for ${selectedJobReq.title}`);
                      setSelectedCandidate(null);
                    }}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-gradient-to-r from-brand-accent-primary to-brand-accent-secondary text-brand-bg-primary font-bold text-xs rounded-xl hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Send size={14} />
                    <span>Schedule Interview</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
