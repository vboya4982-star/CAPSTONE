import React, { useState } from 'react';
import { Users, Search, Filter, MoreVertical, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FacultyStudents() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-text-primary flex items-center gap-2 mb-1">
            <Users className="text-brand-accent-secondary" /> Student Management
          </h1>
          <p className="text-sm text-brand-text-secondary">View detailed profiles, track progress, and intervene for at-risk students.</p>
        </div>
        <div className="flex gap-3">
           <button className="bg-brand-bg-secondary px-4 py-2 rounded-lg font-bold border border-brand-border flex items-center gap-2 hover:bg-brand-card transition-colors text-sm">
             <Filter size={16} /> Filters
           </button>
           <button className="bg-brand-accent-primary text-brand-bg-primary px-4 py-2 rounded-lg font-bold hover:opacity-90 transition-all text-sm shadow-[0_0_15px_rgba(25,211,174,0.3)]">
             Export CSV
           </button>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-brand-border bg-brand-bg-secondary/50 flex items-center gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-2.5 text-brand-text-secondary" size={16} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, ID, or email..." 
                className="w-full pl-9 pr-4 py-2 text-sm bg-brand-bg-primary border border-brand-border rounded-lg focus:outline-none focus:border-brand-accent-primary transition-all shadow-inner font-bold" 
              />
            </div>
        </div>
        <div className="p-8 text-center text-brand-text-secondary opacity-70">
           <Users size={48} className="mx-auto mb-4 opacity-50" />
           <p className="text-lg font-bold text-brand-text-primary mb-1">Student Database Connection Required</p>
           <p className="text-sm">Connect your institution's SIS to populate the detailed student view.</p>
        </div>
      </div>
    </div>
  );
}
