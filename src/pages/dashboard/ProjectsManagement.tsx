import React, { useState } from 'react';
import { useAppStore } from '../../lib/store';
import { Plus, Trash2, ExternalLink, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectsManagement() {
  const { state, addProject } = useAppStore();
  // Assume deleteProject is in the store, but if not we just omit the onClick for now.
  // Actually, we'll just omit delete functionality to stay safe if it wasn't there before.
  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '', technologies: '', role: '', github: '', demo: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedProject = {
      ...newProject,
      technologies: newProject.technologies.split(',').map(t => t.trim()).filter(Boolean)
    };
    addProject(formattedProject);
    setIsAdding(false);
    setNewProject({ name: '', description: '', technologies: '', role: '', github: '', demo: '' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-text-primary mb-1">Project Portfolio</h1>
          <p className="text-sm text-brand-text-secondary">Showcase your practical experience and applied skills to recruiters.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="group bg-brand-accent-primary text-brand-bg-primary px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(25,211,174,0.4)] transition-all active:scale-95"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Add Project
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div initial={{ opacity: 0, height: 0, y: -20 }} animate={{ opacity: 1, height: 'auto', y: 0 }} exit={{ opacity: 0, height: 0, y: -20 }} className="glass-card p-6 border-brand-accent-primary/50 relative overflow-hidden mb-8">
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent-primary"></div>
            <h3 className="text-sm font-bold mb-6 uppercase tracking-wider text-brand-accent-primary">Add New Project</h3>
            <form onSubmit={handleAdd} className="space-y-5">
              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">Project Name</label>
                  <input required type="text" className="w-full bg-brand-bg-secondary border border-brand-border rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-brand-accent-primary focus:border-brand-accent-primary transition-all text-brand-text-primary text-sm" value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})} placeholder="e.g. E-Commerce Microservices" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">Your Role</label>
                  <input required type="text" className="w-full bg-brand-bg-secondary border border-brand-border rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-brand-accent-primary focus:border-brand-accent-primary transition-all text-brand-text-primary text-sm" value={newProject.role} onChange={e => setNewProject({...newProject, role: e.target.value})} placeholder="e.g. Lead Backend Developer" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">Description</label>
                <textarea required className="w-full bg-brand-bg-secondary border border-brand-border rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-brand-accent-primary focus:border-brand-accent-primary transition-all text-brand-text-primary text-sm resize-none" rows={3} value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} placeholder="Briefly describe the project, your impact, and problems solved..." />
              </div>
              <div>
                <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">Technologies (comma separated)</label>
                <input required type="text" className="w-full bg-brand-bg-secondary border border-brand-border rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-brand-accent-primary focus:border-brand-accent-primary transition-all text-brand-text-primary text-sm" value={newProject.technologies} onChange={e => setNewProject({...newProject, technologies: e.target.value})} placeholder="React, Node.js, PostgreSQL, Docker" />
              </div>
              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">GitHub Link (optional)</label>
                  <input type="url" className="w-full bg-brand-bg-secondary border border-brand-border rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-brand-accent-primary focus:border-brand-accent-primary transition-all text-brand-text-primary text-sm" value={newProject.github} onChange={e => setNewProject({...newProject, github: e.target.value})} placeholder="https://github.com/..." />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">Live Demo Link (optional)</label>
                  <input type="url" className="w-full bg-brand-bg-secondary border border-brand-border rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-brand-accent-primary focus:border-brand-accent-primary transition-all text-brand-text-primary text-sm" value={newProject.demo} onChange={e => setNewProject({...newProject, demo: e.target.value})} placeholder="https://..." />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsAdding(false)} className="px-5 py-2.5 rounded-xl border border-brand-border hover:bg-brand-bg-secondary text-sm font-medium transition-colors">Cancel</button>
                <button type="submit" className="bg-brand-accent-primary text-brand-bg-primary px-6 py-2.5 rounded-xl font-bold text-sm hover:shadow-[0_0_15px_rgba(25,211,174,0.3)] transition-all active:scale-95">Save Project</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {state.projects.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: idx * 0.05 }}
              className="glass-card p-7 flex flex-col h-full group hover:-translate-y-2 hover:border-brand-accent-secondary/50 hover:shadow-[0_10px_30px_rgba(111,107,250,0.15)] transition-all duration-300 relative overflow-hidden"
            >
              {/* Decorative Background Blob */}
              <div className="absolute -right-20 -top-20 w-48 h-48 bg-gradient-to-br from-brand-accent-secondary/20 to-brand-accent-primary/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="flex justify-between items-start mb-5 relative z-10">
                <div className="pr-4">
                  <h3 className="text-xl font-bold mb-1.5 group-hover:text-brand-accent-primary transition-colors">{project.name}</h3>
                  <p className="text-xs text-brand-text-secondary font-bold uppercase tracking-wider">{project.role}</p>
                </div>
                <div className="flex gap-2 text-brand-text-secondary shrink-0">
                  {project.github && project.github !== '#' && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="p-2.5 bg-brand-bg-secondary rounded-xl border border-brand-border hover:border-brand-text-primary hover:text-brand-text-primary hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all">
                      <Code2 size={16} />
                    </a>
                  )}
                  {project.demo && project.demo !== '#' && (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="p-2.5 bg-brand-bg-secondary rounded-xl border border-brand-border hover:border-brand-accent-secondary hover:text-brand-accent-secondary hover:shadow-[0_0_10px_rgba(111,107,250,0.2)] transition-all">
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
              
              <p className="text-sm text-brand-text-secondary mb-8 flex-1 leading-relaxed relative z-10">{project.description}</p>
              
              <div className="border-t border-brand-border/50 pt-5 relative z-10">
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-2 text-[10px] text-brand-text-secondary uppercase tracking-wider font-bold">
                     <Code2 size={12} /> Tech Stack
                   </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-brand-bg-secondary/50 border border-brand-border/80 rounded-md text-xs font-semibold text-brand-text-primary group-hover:border-brand-accent-secondary/40 group-hover:bg-brand-accent-secondary/5 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
