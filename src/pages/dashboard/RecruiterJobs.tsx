import React, { useState } from 'react';
import { Briefcase, Plus, Settings, X, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RecruiterJobs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewReqModal, setShowNewReqModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState<string | null>(null);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-text-primary flex items-center gap-2 mb-1">
            <Briefcase className="text-brand-accent-secondary" /> Job Requirements
          </h1>
          <p className="text-sm text-brand-text-secondary">Manage your active requisitions and configure AI skill-matching parameters.</p>
        </div>
        <button 
          onClick={() => setShowNewReqModal(true)}
          className="bg-brand-accent-primary text-brand-bg-primary px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:opacity-90 transition-all text-sm shadow-[0_0_15px_rgba(25,211,174,0.3)] active:scale-95"
        >
          <Plus size={16} /> New Requisition
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[
          { title: 'Full Stack Developer', id: 'REQ-1042', status: 'Active', candidates: 24 },
          { title: 'Data Scientist', id: 'REQ-1045', status: 'Active', candidates: 12 },
        ].map((job, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6 flex justify-between items-center group hover:border-brand-accent-primary/40 transition-colors">
            <div>
               <h3 className="font-bold text-lg text-brand-text-primary">{job.title}</h3>
               <p className="text-xs text-brand-text-secondary font-mono mt-1">{job.id}</p>
            </div>
            <div className="flex items-center gap-6">
               <div className="text-center">
                 <p className="text-2xl font-bold text-brand-accent-secondary">{job.candidates}</p>
                 <p className="text-[10px] uppercase font-bold text-brand-text-secondary">Matches</p>
               </div>
               <button onClick={() => setShowSettingsModal(job.id)} className="p-2 bg-brand-bg-secondary rounded-lg border border-brand-border text-brand-text-secondary hover:text-brand-text-primary transition-colors">
                 <Settings size={18} />
               </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showNewReqModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-brand-bg-primary border border-brand-border rounded-2xl p-6 w-full max-w-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent-primary to-brand-accent-secondary"></div>
              
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-brand-text-primary flex items-center gap-2">
                  <Briefcase className="text-brand-accent-primary" size={20} /> Create New Requisition
                </h3>
                <button onClick={() => setShowNewReqModal(false)} className="text-brand-text-secondary hover:text-brand-text-primary p-1 rounded-lg hover:bg-brand-bg-secondary transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-brand-text-secondary uppercase tracking-wider mb-2">Job Title</label>
                  <input type="text" placeholder="e.g., Senior Data Engineer" className="w-full bg-brand-bg-secondary border border-brand-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-accent-primary transition-colors font-bold text-brand-text-primary" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-brand-text-secondary uppercase tracking-wider mb-2">Required Skills (AI Matching)</label>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-3 text-brand-text-secondary" size={16} />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search and add skills..." 
                      className="w-full bg-brand-bg-secondary border border-brand-border rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-accent-primary transition-colors text-brand-text-primary font-bold" 
                    />
                  </div>
                </div>

                <div className="bg-brand-accent-primary/10 border border-brand-accent-primary/30 rounded-lg p-4 flex items-start gap-3 mt-4">
                  <Sparkles className="text-brand-accent-primary shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-sm font-bold text-brand-accent-primary mb-1">AI Match Configuration</p>
                    <p className="text-xs text-brand-text-secondary">The SkillForge AI will automatically scan the global student database and notify candidates who match 85% or higher with these requirements.</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button onClick={() => setShowNewReqModal(false)} className="px-5 py-2.5 rounded-xl font-bold text-sm text-brand-text-secondary hover:bg-brand-bg-secondary transition-colors">
                  Cancel
                </button>
                <button onClick={() => setShowNewReqModal(false)} className="px-5 py-2.5 rounded-xl font-bold text-sm bg-brand-accent-primary text-brand-bg-primary hover:opacity-90 transition-opacity flex items-center gap-2">
                  Launch Requisition
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettingsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-brand-bg-primary border border-brand-border rounded-2xl p-6 w-full max-w-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-brand-text-primary flex items-center gap-2">
                  <Settings className="text-brand-text-secondary" size={20} /> Manage Requisition
                </h3>
                <button onClick={() => setShowSettingsModal(null)} className="text-brand-text-secondary hover:text-brand-text-primary p-1 rounded-lg hover:bg-brand-bg-secondary transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-brand-text-secondary mb-4">Adjust the active parameters for requisition <span className="font-mono text-brand-accent-primary">{showSettingsModal}</span>.</p>
                
                <div className="flex items-center justify-between p-4 bg-brand-bg-secondary border border-brand-border rounded-lg">
                  <div>
                    <p className="text-sm font-bold text-brand-text-primary">Status</p>
                    <p className="text-xs text-brand-text-secondary">Currently accepting applications</p>
                  </div>
                  <div className="w-12 h-6 bg-brand-accent-primary rounded-full relative cursor-pointer shadow-inner">
                     <div className="absolute top-1 left-7 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 p-4 bg-brand-bg-secondary border border-brand-border rounded-lg">
                   <p className="text-sm font-bold text-brand-text-primary">AI Match Threshold</p>
                   <p className="text-xs text-brand-text-secondary mb-2">Minimum required match score to auto-shortlist.</p>
                   <input type="range" min="50" max="100" defaultValue="85" className="w-full accent-brand-accent-primary" />
                   <div className="flex justify-between text-xs font-bold text-brand-text-secondary mt-1">
                     <span>50%</span>
                     <span className="text-brand-accent-primary">85%</span>
                     <span>100%</span>
                   </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-8">
                <button onClick={() => setShowSettingsModal(null)} className="px-4 py-2 rounded-xl font-bold text-sm text-brand-danger hover:bg-brand-danger/10 transition-colors">
                  Delete Job
                </button>
                <div className="flex gap-2">
                  <button onClick={() => setShowSettingsModal(null)} className="px-5 py-2.5 rounded-xl font-bold text-sm text-brand-text-secondary hover:bg-brand-bg-secondary transition-colors">
                    Cancel
                  </button>
                  <button onClick={() => setShowSettingsModal(null)} className="px-5 py-2.5 rounded-xl font-bold text-sm bg-brand-card border border-brand-border text-brand-text-primary hover:border-brand-accent-primary transition-colors">
                    Save Changes
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
