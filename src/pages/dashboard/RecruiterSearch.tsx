import React, { useState } from 'react';
import { Search, User, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RecruiterSearch() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-text-primary flex items-center gap-2 mb-1">
            <Search className="text-brand-accent-secondary" /> Global Candidate Search
          </h1>
          <p className="text-sm text-brand-text-secondary">Search the entire SkillForge network for verified talent outside your active requisitions.</p>
        </div>
      </div>

      <div className="glass-card p-8">
         <div className="flex gap-4 mb-8">
           <div className="relative flex-1">
             <Search className="absolute left-4 top-3.5 text-brand-text-secondary" size={20} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by exact skill, university, or name..." 
                className="w-full pl-12 pr-4 py-3 text-sm bg-brand-bg-primary border border-brand-border rounded-xl focus:outline-none focus:border-brand-accent-primary transition-all shadow-inner font-bold" 
              />
           </div>
           <button className="bg-brand-bg-secondary px-6 py-3 rounded-xl font-bold border border-brand-border flex items-center gap-2 hover:bg-brand-card transition-colors">
             <Filter size={18} /> Advanced
           </button>
         </div>

         <div className="py-12 flex flex-col items-center justify-center text-brand-text-secondary opacity-60">
            <User size={48} className="mb-4 opacity-50" />
            <p className="text-lg font-bold">Start typing to search</p>
            <p className="text-sm">Use Advanced Filters to search by specific AI verification scores.</p>
         </div>
      </div>
    </div>
  );
}
