import React, { useState } from 'react';
import { 
  FolderGit2, 
  CheckCircle2, 
  AlertTriangle, 
  GitCompare, 
  Trophy, 
  Star, 
  ChevronDown, 
  Zap, 
  X, 
  Search, 
  User, 
  Sparkles,
  Check
} from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { generateCandidateComparison } from '../../lib/ai';

interface CandidateProfile {
  id: string;
  name: string;
  role: string;
  match: number;
  exp: string;
  avatar: string;
  skills: { skill: string; score: number }[];
}

const CANDIDATES_DB: CandidateProfile[] = [
  {
    id: 'u1',
    name: 'Arjun Kumar',
    role: 'Full Stack Developer',
    match: 87,
    exp: '1.5 Yrs',
    avatar: 'https://ui-avatars.com/api/?name=Arjun+Kumar&background=13263A&color=19D3AE&bold=true',
    skills: [
      { skill: 'React', score: 90 },
      { skill: 'Node.js', score: 85 },
      { skill: 'System Design', score: 80 },
      { skill: 'Python', score: 70 },
      { skill: 'AWS', score: 65 },
      { skill: 'SQL', score: 95 },
    ]
  },
  {
    id: 'u2',
    name: 'Sarah Chen',
    role: 'Frontend Engineer',
    match: 94,
    exp: '2.0 Yrs',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=13263A&color=4DA8DA&bold=true',
    skills: [
      { skill: 'React', score: 95 },
      { skill: 'Node.js', score: 60 },
      { skill: 'System Design', score: 75 },
      { skill: 'Python', score: 85 },
      { skill: 'AWS', score: 40 },
      { skill: 'SQL', score: 90 },
    ]
  },
  {
    id: 'u3',
    name: 'David Okafor',
    role: 'Data Scientist',
    match: 72,
    exp: '0 Yrs',
    avatar: 'https://ui-avatars.com/api/?name=David+Okafor&background=13263A&color=A855F7&bold=true',
    skills: [
      { skill: 'React', score: 40 },
      { skill: 'Node.js', score: 55 },
      { skill: 'System Design', score: 65 },
      { skill: 'Python', score: 95 },
      { skill: 'AWS', score: 50 },
      { skill: 'SQL', score: 92 },
    ]
  },
  {
    id: 'u4',
    name: 'Emma Wilson',
    role: 'Backend Developer',
    match: 81,
    exp: '1.0 Yrs',
    avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=13263A&color=F39C12&bold=true',
    skills: [
      { skill: 'React', score: 60 },
      { skill: 'Node.js', score: 92 },
      { skill: 'System Design', score: 88 },
      { skill: 'Python', score: 65 },
      { skill: 'AWS', score: 85 },
      { skill: 'SQL', score: 90 },
    ]
  }
];

const SKILL_PILLARS = ['React', 'Node.js', 'System Design', 'Python', 'AWS', 'SQL'];

export default function RecruiterCompare() {
  const [showModal, setShowModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState<[string, string]>(['u1', 'u2']);
  const [modalTempSelected, setModalTempSelected] = useState<string[]>(['u1', 'u2']);
  const [modalSearchTerm, setModalSearchTerm] = useState('');
  
  const [jobTitle, setJobTitle] = useState('Frontend Engineer');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [verdict, setVerdict] = useState<{winner: string, reasoning: string, loser_strength: string} | null>(null);

  const candidateA = CANDIDATES_DB.find(c => c.id === selectedIds[0]) || CANDIDATES_DB[0];
  const candidateB = CANDIDATES_DB.find(c => c.id === selectedIds[1]) || CANDIDATES_DB[1];

  const comparisonData = SKILL_PILLARS.map(skillName => {
    const scoreA = candidateA.skills.find(s => s.skill === skillName)?.score || 50;
    const scoreB = candidateB.skills.find(s => s.skill === skillName)?.score || 50;
    return { skill: skillName, candidateA: scoreA, candidateB: scoreB };
  });

  const handleOpenModal = () => {
    setModalTempSelected([...selectedIds]);
    setModalSearchTerm('');
    setShowModal(true);
  };

  const handleToggleCandidate = (id: string) => {
    if (modalTempSelected.includes(id)) {
      if (modalTempSelected.length > 1) {
        setModalTempSelected(modalTempSelected.filter(i => i !== id));
      }
    } else {
      if (modalTempSelected.length < 2) {
        setModalTempSelected([...modalTempSelected, id]);
      } else {
        // Swap out the first element so there are always 2 selected
        setModalTempSelected([modalTempSelected[1], id]);
      }
    }
  };

  const handleRunComparison = () => {
    if (modalTempSelected.length === 2) {
      setSelectedIds([modalTempSelected[0], modalTempSelected[1]]);
      setVerdict(null); // Reset verdict for new comparison
      setShowModal(false);
    }
  };

  const handleGenerateVerdict = async () => {
    if (!jobTitle) return;
    setIsAnalyzing(true);
    try {
      const mockCandidateA = {
        name: candidateA.name,
        skills: candidateA.skills.map(s => ({ name: s.skill, proficiency: s.score })),
        projects: [{ name: `${candidateA.role} Project`, description: `Built core systems for ${candidateA.role}` }]
      };
      const mockCandidateB = {
        name: candidateB.name,
        skills: candidateB.skills.map(s => ({ name: s.skill, proficiency: s.score })),
        projects: [{ name: `${candidateB.role} Project`, description: `Built scalable features for ${candidateB.role}` }]
      };
      
      const result = await generateCandidateComparison(mockCandidateA, mockCandidateB, jobTitle);
      setVerdict(result);
    } catch (err) {
      console.error(err);
      alert("Failed to generate AI verdict.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const filteredModalCandidates = CANDIDATES_DB.filter(c => 
    c.name.toLowerCase().includes(modalSearchTerm.toLowerCase()) ||
    c.role.toLowerCase().includes(modalSearchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2.5 bg-brand-accent-secondary/10 rounded-xl border border-brand-accent-secondary/30 text-brand-accent-secondary">
              <GitCompare size={22} />
            </div>
            <h1 className="text-2xl font-bold text-brand-text-primary">
              Compare Candidates
            </h1>
          </div>
          <p className="text-sm text-brand-text-secondary">Run head-to-head AI comparisons on your shortlisted candidates.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleOpenModal}
            className="bg-brand-bg-secondary px-4 py-2 rounded-lg font-bold border border-brand-border flex items-center gap-2 hover:bg-brand-card hover:border-brand-accent-primary/40 transition-all text-sm active:scale-95 shadow-sm"
          >
             Select Candidates <ChevronDown size={16} className="text-brand-accent-primary" />
          </button>
        </div>
      </div>

      {/* Candidate A vs Candidate B Profile Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Candidate A */}
        <div className="glass-card p-6 border-t-2 border-brand-accent-primary relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent-primary/10 rounded-full blur-3xl pointer-events-none"></div>
           <div className="flex items-center gap-4 mb-6 relative z-10">
              <img src={candidateA.avatar} alt={candidateA.name} className="w-16 h-16 rounded-full ring-2 ring-brand-accent-primary shadow-md" />
              <div>
                 <h3 className="font-bold text-2xl text-brand-text-primary">{candidateA.name}</h3>
                 <p className="text-xs text-brand-accent-primary font-bold uppercase tracking-wider mt-1">{candidateA.role}</p>
              </div>
           </div>
           
           <div className="space-y-4 relative z-10">
              <div className="bg-brand-bg-primary/50 p-4 rounded-xl border border-brand-border flex justify-between items-center">
                 <span className="text-sm font-bold text-brand-text-secondary">AI Match Score</span>
                 <span className="text-2xl font-black text-brand-accent-primary">{candidateA.match}%</span>
              </div>
              <div className="bg-brand-bg-primary/50 p-4 rounded-xl border border-brand-border flex justify-between items-center">
                 <span className="text-sm font-bold text-brand-text-secondary">Years Experience</span>
                 <span className="text-lg font-bold text-brand-text-primary">{candidateA.exp}</span>
              </div>
           </div>
        </div>

        {/* Candidate B */}
        <div className="glass-card p-6 border-t-2 border-brand-accent-secondary relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
           <div className="flex items-center gap-4 mb-6 relative z-10">
              <img src={candidateB.avatar} alt={candidateB.name} className="w-16 h-16 rounded-full ring-2 ring-brand-accent-secondary shadow-md" />
              <div>
                 <h3 className="font-bold text-2xl text-brand-text-primary">{candidateB.name}</h3>
                 <p className="text-xs text-brand-accent-secondary font-bold uppercase tracking-wider mt-1">{candidateB.role}</p>
              </div>
           </div>
           
           <div className="space-y-4 relative z-10">
              <div className="bg-brand-bg-primary/50 p-4 rounded-xl border border-brand-border flex justify-between items-center">
                 <span className="text-sm font-bold text-brand-text-secondary">AI Match Score</span>
                 <span className="text-2xl font-black text-brand-accent-secondary">{candidateB.match}%</span>
              </div>
              <div className="bg-brand-bg-primary/50 p-4 rounded-xl border border-brand-border flex justify-between items-center">
                 <span className="text-sm font-bold text-brand-text-secondary">Years Experience</span>
                 <span className="text-lg font-bold text-brand-text-primary">{candidateB.exp}</span>
              </div>
           </div>
        </div>
      </div>
      
      {/* Skill Overlap Radar & AI Verdict */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6 flex flex-col min-h-[400px]">
           <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-brand-text-primary">
             <Star className="text-brand-highlight" size={18} /> Skill Overlap Analysis
           </h3>
           <div className="flex-1 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={comparisonData}>
                  <PolarGrid stroke="#1E3A5F" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: '#888888', fontSize: 12, fontWeight: 'bold' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(13,27,42,0.95)', backdropFilter: 'blur(10px)', borderColor: '#1E3A5F', borderRadius: '12px', color: '#F1F5F9' }}
                    itemStyle={{ fontWeight: 'bold' }}
                  />
                  <Radar name={candidateA.name} dataKey="candidateA" stroke="#19D3AE" fill="#19D3AE" fillOpacity={0.4} strokeWidth={2} />
                  <Radar name={candidateB.name} dataKey="candidateB" stroke="#4DA8DA" fill="#4DA8DA" fillOpacity={0.4} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
           </div>
           <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-brand-accent-primary"></div>
                 <span className="text-xs font-bold text-brand-text-primary">{candidateA.name}</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-brand-accent-secondary"></div>
                 <span className="text-xs font-bold text-brand-text-primary">{candidateB.name}</span>
              </div>
           </div>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between">
           <div>
             <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-brand-text-primary">
               <Trophy className="text-brand-highlight" size={18} /> AI Verdict
             </h3>
             
             <div className="mb-4">
               <label className="text-xs font-bold text-brand-text-secondary uppercase tracking-wider mb-1 block">Target Role</label>
               <input 
                 type="text" 
                 value={jobTitle} 
                 onChange={(e) => setJobTitle(e.target.value)} 
                 className="w-full bg-brand-bg-primary border border-brand-border rounded-lg px-3 py-2 text-sm text-brand-text-primary focus:outline-none focus:border-brand-accent-primary transition-colors font-semibold"
               />
             </div>

             <div className="space-y-4">
                {!verdict && !isAnalyzing && (
                   <div className="p-6 text-center border border-dashed border-brand-border rounded-xl text-brand-text-secondary">
                      <Zap size={28} className="mx-auto mb-2 opacity-50 text-brand-accent-primary" />
                      <p className="text-sm font-bold text-brand-text-primary">Ready for Head-to-Head Comparison</p>
                      <p className="text-xs mt-1">Comparing {candidateA.name} vs {candidateB.name} for target role "{jobTitle}".</p>
                   </div>
                )}
                
                {isAnalyzing && (
                   <div className="p-6 text-center text-brand-accent-primary">
                      <Sparkles size={32} className="mx-auto mb-3 animate-spin" />
                      <p className="text-sm font-bold animate-pulse">Evaluating Skill Overlap & Project Vectors...</p>
                   </div>
                )}

                {verdict && !isAnalyzing && (
                  <>
                    <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl">
                       <p className="text-sm font-bold text-emerald-400 flex items-center gap-2 mb-2">
                         <CheckCircle2 size={16} /> {verdict.winner} Recommended
                       </p>
                       <p className="text-xs text-brand-text-secondary leading-relaxed">
                         {verdict.reasoning}
                       </p>
                    </div>

                    <div className="bg-brand-bg-primary/50 border border-brand-border p-4 rounded-xl">
                       <p className="text-sm font-bold text-brand-text-primary mb-2 flex items-center gap-2">
                         <AlertTriangle size={14} className="text-amber-400" /> Hidden Trade-off
                       </p>
                       <p className="text-xs text-brand-text-secondary leading-relaxed">
                         {verdict.loser_strength}
                       </p>
                    </div>
                  </>
                )}
             </div>
           </div>
           
           <button 
             onClick={handleGenerateVerdict}
             disabled={isAnalyzing || !jobTitle}
             className="w-full mt-6 bg-brand-accent-primary text-brand-bg-primary py-3 rounded-xl font-bold shadow-[0_0_15px_rgba(25,211,174,0.3)] hover:opacity-90 transition-opacity disabled:opacity-50 flex justify-center items-center gap-2 active:scale-95"
           >
             {isAnalyzing ? "Processing..." : `Generate Verdict (${candidateA.name.split(' ')[0]} vs ${candidateB.name.split(' ')[0]})`}
           </button>
        </div>
      </div>

      {/* Interactive Candidate Selection Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-brand-bg-primary border border-brand-border rounded-2xl p-6 w-full max-w-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-brand-text-primary flex items-center gap-2">
                  <User className="text-brand-accent-primary" size={20} /> Select Candidates for Comparison
                </h3>
                <button onClick={() => setShowModal(false)} className="text-brand-text-secondary hover:text-brand-text-primary p-1 rounded-lg hover:bg-brand-bg-secondary transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-brand-text-secondary">
                  Select exactly two candidates from your shortlist ({modalTempSelected.length} of 2 selected).
                </p>
                
                <div className="relative mb-2">
                  <Search className="absolute left-3 top-3 text-brand-text-secondary" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search shortlist by name or role..." 
                    value={modalSearchTerm}
                    onChange={(e) => setModalSearchTerm(e.target.value)}
                    className="w-full bg-brand-bg-secondary border border-brand-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-accent-primary transition-colors text-brand-text-primary font-semibold" 
                  />
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar pr-1">
                   {filteredModalCandidates.map((cand) => {
                     const isSelected = modalTempSelected.includes(cand.id);
                     return (
                       <div 
                         key={cand.id} 
                         onClick={() => handleToggleCandidate(cand.id)}
                         className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                           isSelected 
                             ? 'border-brand-accent-primary bg-brand-accent-primary/10 shadow-sm' 
                             : 'border-brand-border bg-brand-bg-secondary hover:border-brand-accent-primary/40'
                         }`}
                       >
                          <div className="flex items-center gap-3">
                             <img src={cand.avatar} alt={cand.name} className="w-9 h-9 rounded-full ring-1 ring-brand-border" />
                             <div>
                               <span className="font-bold text-sm text-brand-text-primary block">{cand.name}</span>
                               <span className="text-[10px] text-brand-text-secondary font-semibold">{cand.role} • {cand.match}% AI Match</span>
                             </div>
                          </div>
                          <div className={`w-5 h-5 rounded-lg border transition-colors flex items-center justify-center ${
                            isSelected ? 'bg-brand-accent-primary border-brand-accent-primary text-brand-bg-primary' : 'border-brand-border'
                          }`}>
                             {isSelected && <Check size={14} className="stroke-[3]" />}
                          </div>
                       </div>
                     );
                   })}
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-brand-border">
                <button 
                  onClick={() => setShowModal(false)} 
                  className="px-4 py-2 rounded-xl font-bold text-xs text-brand-text-secondary hover:bg-brand-bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleRunComparison}
                  disabled={modalTempSelected.length !== 2}
                  className="px-5 py-2 rounded-xl font-bold text-xs bg-brand-accent-primary text-brand-bg-primary hover:opacity-90 transition-opacity disabled:opacity-50 shadow-md active:scale-95"
                >
                  Run Head-to-Head Comparison
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
