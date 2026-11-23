import React from 'react';
import { BrainCircuit, BookOpen, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FacultyDepartments() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-text-primary flex items-center gap-2 mb-1">
            <BrainCircuit className="text-brand-accent-secondary" /> Departmental Overview
          </h1>
          <p className="text-sm text-brand-text-secondary">Compare readiness and skill gaps across different academic departments.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'Computer Science', students: 450, readiness: '82%', icon: BookOpen },
          { name: 'Information Tech', students: 380, readiness: '79%', icon: BrainCircuit },
          { name: 'Software Eng', students: 418, readiness: '85%', icon: GraduationCap },
        ].map((dept, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6 border-t-2 border-brand-accent-primary relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent-primary/10 rounded-full blur-2xl group-hover:bg-brand-accent-primary/20 transition-colors pointer-events-none"></div>
            <dept.icon size={24} className="text-brand-accent-primary mb-4" />
            <h3 className="font-bold text-xl mb-1">{dept.name}</h3>
            <div className="flex justify-between mt-4 text-sm font-semibold">
              <span className="text-brand-text-secondary">{dept.students} Students</span>
              <span className="text-brand-success">{dept.readiness} Ready</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
