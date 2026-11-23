import React from 'react';
import { useAppStore } from '../../lib/store';
import { Compass, Target, ChevronRight, CheckCircle2, TrendingUp, DollarSign, ArrowUpRight, Zap, Briefcase, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateCareerPaths } from '../../lib/ai';

const careerDatabase = [
  {
    id: 'c1',
    title: 'Full Stack Developer',
    description: 'Build end-to-end web applications, integrating modern frontends with scalable backend architectures.',
    matchPercentage: 87,
    salary: '$95k - $140k',
    demand: 'High',
    requiredSkills: ['React', 'Node.js', 'SQL', 'JavaScript', 'System Design']
  },
  {
    id: 'c2',
    title: 'Frontend Engineer',
    description: 'Specializes in creating highly interactive, accessible, and performant user interfaces.',
    matchPercentage: 94,
    salary: '$90k - $130k',
    demand: 'Very High',
    requiredSkills: ['React', 'JavaScript', 'Tailwind CSS', 'TypeScript', 'Figma']
  },
  {
    id: 'c3',
    title: 'Data Analyst',
    description: 'Interprets complex datasets to help organizations make better business decisions.',
    matchPercentage: 62,
    salary: '$75k - $115k',
    demand: 'Medium',
    requiredSkills: ['SQL', 'Python', 'Excel', 'Tableau', 'Statistics']
  },
  {
    id: 'c4',
    title: 'Machine Learning Engineer',
    description: 'Designs and deploys scalable AI/ML models into production systems.',
    matchPercentage: 55,
    salary: '$110k - $160k',
    demand: 'High',
    requiredSkills: ['Python', 'TensorFlow', 'SQL', 'Mathematics', 'Docker']
  },
  {
    id: 'c5',
    title: 'Cloud Architect',
    description: 'Designs and manages robust cloud infrastructure across AWS, Azure, or GCP environments.',
    matchPercentage: 40,
    salary: '$140k - $200k',
    demand: 'Very High',
    requiredSkills: ['AWS', 'System Design', 'Kubernetes', 'Networking', 'Security']
  },
  {
    id: 'c6',
    title: 'DevOps Engineer',
    description: 'Bridges the gap between development and operations by automating deployment pipelines.',
    matchPercentage: 58,
    salary: '$120k - $160k',
    demand: 'High',
    requiredSkills: ['Linux', 'Docker', 'CI/CD', 'AWS', 'Python']
  }
];

export default function CareerPaths() {
  const { state, setTargetCareer } = useAppStore();
  const [careers, setCareers] = React.useState(careerDatabase);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await generateCareerPaths(state);
      setCareers(result.careers);
    } catch (error) {
      console.error(error);
      alert("Failed to generate career paths.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectCareer = (career: typeof careerDatabase[0]) => {
    setTargetCareer({
      id: career.id,
      title: career.title,
      matchPercentage: career.matchPercentage,
      requiredSkills: career.requiredSkills.map(s => ({ name: s, required: 80 }))
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-text-primary flex items-center gap-2 mb-1">
            <Compass className="text-brand-accent-secondary" /> Career Explorer
          </h1>
          <p className="text-sm text-brand-text-secondary">Discover AI-mapped career opportunities based on your exact skill profile.</p>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="bg-brand-accent-secondary text-brand-bg-primary px-4 py-2 rounded-lg font-bold shadow-[0_0_15px_rgba(77,168,218,0.3)] hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isGenerating ? <><Sparkles size={16} className="animate-spin" /> Analyzing Profile...</> : <><Sparkles size={16} /> Generate AI Paths</>}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {careers.map((career, idx) => (
          <motion.div 
            key={career.id} 
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} 
            className={`glass-card flex flex-col h-full transition-all duration-500 group relative overflow-hidden cursor-default ${
              state.targetCareer?.title === career.title 
              ? 'border-brand-success/50 shadow-[0_10px_30px_rgba(46,204,113,0.15)]' 
              : 'hover:border-brand-accent-primary/50 hover:shadow-[0_10px_40px_rgba(25,211,174,0.1)]'
            }`}
          >
            {/* Background Blob */}
            <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none ${
               state.targetCareer?.title === career.title ? 'bg-brand-success opacity-10' : 'bg-brand-accent-primary'
            }`}></div>

            <div className="p-6 md:p-8 flex-1 relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="pr-4">
                  <h3 className={`text-xl font-bold mb-1 transition-colors ${state.targetCareer?.title === career.title ? 'text-brand-success' : 'group-hover:text-brand-accent-primary text-brand-text-primary'}`}>
                    {career.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-text-secondary bg-brand-bg-secondary px-2 py-1 rounded-md border border-brand-border flex items-center gap-1">
                      <Briefcase size={12} className="text-brand-accent-secondary"/> Role Profile
                    </span>
                  </div>
                </div>
                
                {/* Circular Progress Match */}
                <div className="w-14 h-14 shrink-0 relative flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-sm">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#13263A" strokeWidth="10" />
                    <circle 
                      cx="50" cy="50" r="45" fill="none" 
                      stroke={career.matchPercentage >= 80 ? '#19D3AE' : career.matchPercentage >= 60 ? '#F39C12' : '#E74C3C'} 
                      strokeWidth="10" 
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * career.matchPercentage) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-[14px] font-bold text-brand-text-primary leading-none">{career.matchPercentage}%</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-brand-text-secondary mb-6 leading-relaxed line-clamp-3 min-h-[60px]">{career.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-sm">
                <div className="bg-brand-bg-secondary/80 rounded-xl p-3 border border-brand-border/50 group-hover:border-brand-accent-primary/20 transition-colors">
                  <span className="flex items-center gap-1 text-[10px] font-bold text-brand-text-secondary mb-1 uppercase tracking-wider">
                    <DollarSign size={12} className="text-brand-success" /> Est. Salary
                  </span>
                  <span className="font-bold text-brand-text-primary">{career.salary}</span>
                </div>
                <div className="bg-brand-bg-secondary/80 rounded-xl p-3 border border-brand-border/50 group-hover:border-brand-accent-secondary/20 transition-colors">
                  <span className="flex items-center gap-1 text-[10px] font-bold text-brand-text-secondary mb-1 uppercase tracking-wider">
                    <TrendingUp size={12} className="text-brand-accent-secondary" /> Demand
                  </span>
                  <span className="font-bold text-brand-text-primary">{career.demand}</span>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-brand-text-secondary mb-3 uppercase tracking-wider flex items-center gap-1">
                  <Zap size={12} /> Key Requirements
                </p>
                <div className="flex flex-wrap gap-2">
                  {career.requiredSkills.map(skill => {
                    const hasSkill = state.skills.some(s => s.name.toLowerCase().includes(skill.toLowerCase()) && s.proficiency > 30);
                    return (
                      <span key={skill} className={`px-2.5 py-1 text-xs font-bold rounded-lg border flex items-center gap-1.5 transition-colors ${hasSkill ? 'bg-brand-success/10 border-brand-success/30 text-brand-success' : 'bg-brand-bg-secondary border-brand-border text-brand-text-secondary group-hover:border-brand-border/80'}`}>
                        {hasSkill && <CheckCircle2 size={12} />} {skill}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className={`p-5 border-t mt-auto flex justify-between items-center transition-colors relative z-10 ${state.targetCareer?.title === career.title ? 'bg-brand-success/10 border-brand-success/30' : 'bg-brand-bg-secondary/50 border-brand-border'}`}>
              {state.targetCareer?.title === career.title ? (
                <div className="w-full flex items-center justify-center gap-2 text-sm font-bold text-brand-success">
                  <Target size={18} /> Active Target
                </div>
              ) : (
                <button 
                  onClick={() => handleSelectCareer(career)} 
                  className="w-full flex items-center justify-center gap-2 text-sm font-bold text-brand-text-primary hover:text-brand-accent-primary transition-all active:scale-95 group/btn"
                >
                  Set as Target <ArrowUpRight size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
