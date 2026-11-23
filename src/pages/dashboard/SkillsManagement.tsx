import React, { useState, useMemo } from 'react';
import { useAppStore } from '../../lib/store';
import { Plus, Trash2, CheckCircle2, ShieldAlert, BrainCircuit, Target, Trophy, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const autoCategorize = (skillName: string) => {
  const name = skillName.toLowerCase().trim();
  if (!name) return null;
  if (['react', 'html', 'css', 'javascript', 'node', 'express', 'next', 'vue', 'tailwind', 'frontend', 'backend', 'php', 'django'].some(k => name.includes(k))) return 'Web Development';
  if (name === 'c' || name === 'c++' || ['python', 'java', 'rust', 'go', 'ruby', 'swift', 'kotlin', 'c#'].some(k => name.includes(k))) return 'Programming';
  if (['sql', 'mongo', 'postgres', 'data', 'machine learning', 'ai', 'pandas', 'tensor', 'pytorch', 'mysql'].some(k => name.includes(k))) return 'Data & AI';
  if (['aws', 'docker', 'kubernetes', 'azure', 'cloud', 'gcp', 'ci/cd', 'linux'].some(k => name.includes(k))) return 'Cloud & DevOps';
  return null;
};

const CustomSlider = ({ value, onChange, colorClass = "from-brand-accent-primary to-brand-accent-secondary" }: { value: number, onChange: (e: any) => void, colorClass?: string }) => {
  return (
    <div className="relative w-full h-2 bg-brand-bg-primary rounded-full group">
      <div 
        className={`absolute top-0 left-0 h-full bg-gradient-to-r ${colorClass} rounded-full`}
        style={{ width: `${value}%` }}
      ></div>
      <div 
        className="absolute top-1/2 -mt-2.5 w-5 h-5 bg-brand-bg-secondary rounded-full border-2 border-brand-accent-secondary shadow-[0_0_10px_rgba(111,107,250,0.5)] group-hover:scale-125 group-active:scale-95 transition-transform pointer-events-none"
        style={{ left: `calc(${value}% - 10px)` }}
      ></div>
      <input 
        type="range" min="10" max="100" step="5"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        value={value} 
        onChange={onChange}
      />
    </div>
  );
};

export default function SkillsManagement() {
  const { state, addSkill, updateSkill, deleteSkill } = useAppStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Web Development', proficiency: 50 });

  const categories = Array.from(new Set(state.skills.map(s => s.category)));
  if (!categories.includes('Web Development')) categories.push('Web Development');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addSkill(newSkill);
    setIsAdding(false);
    setNewSkill({ name: '', category: 'Web Development', proficiency: 50 });
  };

  // Prepare data for Radar Chart (averages per category)
  const radarData = useMemo(() => {
    const data = categories.map(cat => {
      const skillsInCat = state.skills.filter(s => s.category === cat);
      const avg = skillsInCat.length > 0 
        ? skillsInCat.reduce((acc, curr) => acc + curr.proficiency, 0) / skillsInCat.length
        : 0;
      return {
        subject: cat,
        A: Math.round(avg),
        fullMark: 100,
      };
    }).filter(d => d.A > 0);
    return data;
  }, [state.skills, categories]);

  const verifiedCount = state.skills.filter(s => s.verified).length;
  const totalProficiency = state.skills.reduce((acc, s) => acc + s.proficiency, 0);
  const averageProficiency = state.skills.length > 0 ? Math.round(totalProficiency / state.skills.length) : 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-text-primary mb-1">Skill Matrix</h1>
          <p className="text-sm text-brand-text-secondary">Quantify, verify, and visualize your technical capabilities.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="group bg-brand-accent-primary text-brand-bg-primary px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(25,211,174,0.4)] transition-all active:scale-95"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Add New Skill
        </button>
      </div>

      {/* Top Metrics & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Radar Chart */}
        <div className="glass-card p-6 lg:col-span-1 flex flex-col items-center justify-center relative overflow-hidden group hover:border-brand-accent-secondary/50 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent-secondary/10 blur-3xl -z-0"></div>
          <h3 className="text-base font-semibold w-full text-left flex items-center gap-2 relative z-10">
            <Target size={18} className="text-brand-accent-secondary group-hover:scale-110 transition-transform" /> Capability Radar
          </h3>
          <div className="w-full h-56 relative z-10 mt-2">
            {radarData.length >= 3 ? (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#243B53" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Proficiency" dataKey="A" stroke="#19D3AE" strokeWidth={2} fill="#19D3AE" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-brand-text-secondary text-center px-4">
                Add skills in at least 3 categories to unlock your capability radar.
              </div>
            )}
          </div>
        </div>

        {/* Stats & Adding */}
        <div className="lg:col-span-2 space-y-6 flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            <div className="glass-card p-6 flex flex-col justify-center relative overflow-hidden group hover:-translate-y-1 hover:border-brand-success/50 hover:shadow-[0_0_20px_rgba(46,204,113,0.15)] transition-all duration-300">
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Trophy size={100} className="text-brand-success" />
              </div>
              <p className="text-xs text-brand-text-secondary font-bold uppercase tracking-wider mb-2 relative z-10">Verified Badges</p>
              <h3 className="text-4xl font-bold text-brand-text-primary mb-1 relative z-10">{verifiedCount}</h3>
              <p className="text-xs text-brand-success flex items-center gap-1 font-medium relative z-10"><CheckCircle2 size={12}/> Project & Certificate Verified</p>
            </div>
            
            <div className="glass-card p-6 flex flex-col justify-center relative overflow-hidden group hover:-translate-y-1 hover:border-brand-accent-primary/50 hover:shadow-[0_0_20px_rgba(25,211,174,0.15)] transition-all duration-300">
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <BrainCircuit size={100} className="text-brand-accent-primary" />
              </div>
              <p className="text-xs text-brand-text-secondary font-bold uppercase tracking-wider mb-2 relative z-10">Avg. Proficiency</p>
              <h3 className="text-4xl font-bold text-brand-text-primary mb-1 relative z-10">{averageProficiency}%</h3>
              <p className="text-xs text-brand-accent-primary flex items-center gap-1 font-medium relative z-10"><Sparkles size={12}/> Overall Score</p>
            </div>
          </div>

          <AnimatePresence>
            {isAdding && (
              <motion.div initial={{ opacity: 0, y: -20, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -20, height: 0 }} className="glass-card p-6 border-brand-accent-primary/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent-primary"></div>
                <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-brand-accent-primary">Add New Skill</h3>
                <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-5 items-end">
                  <div className="flex-1 w-full">
                    <label className="block text-xs font-medium text-brand-text-secondary mb-1.5 flex justify-between">
                      <span>Skill Name</span>
                      <span className="text-[10px] text-brand-accent-primary flex items-center gap-1"><Sparkles size={10} /> AI Categorized</span>
                    </label>
                    <input 
                      type="text" required
                      className="w-full bg-brand-bg-secondary border border-brand-border rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-brand-accent-primary focus:border-brand-accent-primary transition-all text-brand-text-primary text-sm"
                      value={newSkill.name} 
                      onChange={e => {
                        const val = e.target.value;
                        const suggested = autoCategorize(val);
                        setNewSkill({
                          ...newSkill, 
                          name: val,
                          ...(suggested && newSkill.category !== 'Other_Custom' ? { category: suggested } : {})
                        });
                      }}
                      placeholder="e.g. GraphQL, AWS, Python"
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">Category</label>
                    {newSkill.category === 'Other_Custom' ? (
                      <input 
                        type="text" required autoFocus
                        className="w-full bg-brand-bg-secondary border border-brand-accent-primary rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-brand-accent-primary focus:outline-none transition-all text-brand-text-primary text-sm shadow-[0_0_10px_rgba(25,211,174,0.1)]"
                        onChange={e => setNewSkill({...newSkill, category: e.target.value})}
                        placeholder="Custom Category..."
                      />
                    ) : (
                      <select 
                        className="w-full bg-brand-bg-secondary border border-brand-border rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-brand-accent-primary focus:border-brand-accent-primary transition-all text-brand-text-primary text-sm appearance-none"
                        value={categories.includes(newSkill.category) ? newSkill.category : (newSkill.category ? newSkill.category : 'Web Development')} 
                        onChange={e => setNewSkill({...newSkill, category: e.target.value})}
                      >
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        {!categories.includes(newSkill.category) && newSkill.category !== 'Other_Custom' && (
                           <option value={newSkill.category}>{newSkill.category}</option>
                        )}
                        <option value="Other_Custom">Other (Create New)...</option>
                      </select>
                    )}
                  </div>
                  <div className="flex-1 w-full">
                    <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">Proficiency ({newSkill.proficiency}%)</label>
                    <CustomSlider 
                      value={newSkill.proficiency} 
                      onChange={e => setNewSkill({...newSkill, proficiency: parseInt(e.target.value)})} 
                      colorClass="from-brand-accent-primary to-brand-accent-secondary"
                    />
                  </div>
                  <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
                    <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2.5 rounded-lg border border-brand-border hover:bg-brand-bg-secondary text-sm font-medium transition-colors w-full md:w-auto">Cancel</button>
                    <button type="submit" className="bg-brand-accent-primary text-brand-bg-primary px-6 py-2.5 rounded-lg font-bold text-sm hover:shadow-[0_0_15px_rgba(25,211,174,0.3)] transition-all active:scale-95 w-full md:w-auto">Save</button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
        {categories.map(category => {
          const categorySkills = state.skills.filter(s => s.category === category);
          if (categorySkills.length === 0) return null;

          return (
            <div key={category} className="glass-card p-6 group hover:border-brand-border/80 transition-colors h-fit">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-brand-border">
                <h2 className="text-base font-bold text-brand-text-primary flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-accent-primary"></div>
                  {category}
                </h2>
                <span className="text-xs font-bold px-2 py-1 bg-brand-bg-secondary rounded-md text-brand-text-secondary border border-brand-border">
                  {categorySkills.length}
                </span>
              </div>
              <div className="space-y-5">
                <AnimatePresence>
                  {categorySkills.map(skill => (
                    <motion.div 
                      key={skill.id}
                      initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                      className="group/item relative"
                    >
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-brand-text-primary group-hover/item:text-brand-accent-primary transition-colors">{skill.name}</span>
                          {skill.verified ? 
                            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-brand-success/30 bg-brand-success/10 text-brand-success shadow-[0_0_10px_rgba(46,204,113,0.1)]">
                              <CheckCircle2 size={12} />
                              <span className="text-[9px] font-bold uppercase tracking-wider">Verified</span>
                            </div> : 
                            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-brand-text-secondary/20 bg-brand-bg-secondary text-brand-text-secondary">
                              <ShieldAlert size={12} />
                              <span className="text-[9px] font-bold uppercase tracking-wider">Self</span>
                            </div>
                          }
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-brand-text-primary bg-brand-bg-secondary px-1.5 py-0.5 rounded border border-brand-border">{skill.proficiency}%</span>
                          <button 
                            onClick={() => deleteSkill(skill.id)}
                            className="text-brand-text-secondary opacity-0 group-hover/item:opacity-100 hover:text-brand-danger transition-all p-1 rounded hover:bg-brand-danger/10 -mr-1"
                            title="Remove Skill"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <CustomSlider 
                        value={skill.proficiency} 
                        onChange={e => updateSkill(skill.id, parseInt(e.target.value))}
                        colorClass={skill.verified ? "from-brand-success to-brand-accent-primary" : "from-brand-text-secondary/50 to-brand-text-secondary"}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
