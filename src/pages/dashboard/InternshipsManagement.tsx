import React, { useState } from 'react';
import { useAppStore } from '../../lib/store';
import { Plus, Trash2, Building, Calendar, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomMonthYearPicker = ({ value, onChange, placeholder }: { value: string, onChange: (v: string) => void, placeholder: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 15}, (_, i) => currentYear - i);

  const selectedMonth = value ? parseInt(value.split('-')[1]) - 1 : -1;
  const selectedYear = value ? parseInt(value.split('-')[0]) : -1;

  const handleSelect = (m: number, y: number) => {
    if (m !== -1 && y !== -1) {
      const formattedMonth = (m + 1).toString().padStart(2, '0');
      onChange(`${y}-${formattedMonth}-01`);
      setIsOpen(false);
    } else if (m !== -1) {
      const formattedMonth = (m + 1).toString().padStart(2, '0');
      onChange(`${currentYear}-${formattedMonth}-01`);
    } else if (y !== -1) {
      onChange(`${y}-01-01`);
    }
  };

  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-brand-bg-secondary border border-brand-border rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-brand-accent-primary focus:border-brand-accent-primary transition-all text-brand-text-primary text-sm cursor-pointer flex justify-between items-center hover:border-brand-accent-primary/50"
      >
        <span className={value ? "text-brand-text-primary" : "text-brand-text-secondary"}>
          {value && selectedMonth >= 0 ? `${months[selectedMonth]} ${selectedYear}` : placeholder}
        </span>
        <Calendar size={14} className="text-brand-accent-primary" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
            className="absolute top-full left-0 mt-2 w-72 bg-brand-bg-primary border border-brand-accent-primary/30 shadow-[0_10px_40px_rgba(25,211,174,0.2)] rounded-xl p-4 z-50 flex gap-4"
          >
            <div className="flex-1">
               <div className="text-[10px] font-bold text-brand-text-secondary uppercase mb-2 tracking-wider">Month</div>
               <div className="grid grid-cols-2 gap-1.5">
                 {months.map((m, i) => (
                   <div 
                     key={m} 
                     onClick={() => handleSelect(i, selectedYear !== -1 ? selectedYear : currentYear)}
                     className={`px-2 py-1.5 text-xs text-center rounded-md cursor-pointer transition-all ${selectedMonth === i ? 'bg-brand-accent-primary text-brand-bg-primary font-bold shadow-[0_0_10px_rgba(25,211,174,0.3)]' : 'hover:bg-brand-bg-secondary text-brand-text-secondary hover:text-brand-text-primary'}`}
                   >
                     {m}
                   </div>
                 ))}
               </div>
            </div>
            <div className="flex-1 border-l border-brand-border/50 pl-4">
               <div className="text-[10px] font-bold text-brand-text-secondary uppercase mb-2 tracking-wider">Year</div>
               <div className="flex flex-col gap-1.5 max-h-[180px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#19D3AE transparent' }}>
                 {years.map(y => (
                   <div 
                     key={y} 
                     onClick={() => handleSelect(selectedMonth !== -1 ? selectedMonth : 0, y)}
                     className={`px-2 py-1.5 text-xs text-center rounded-md cursor-pointer transition-all ${selectedYear === y ? 'bg-brand-accent-primary text-brand-bg-primary font-bold shadow-[0_0_10px_rgba(25,211,174,0.3)]' : 'hover:bg-brand-bg-secondary text-brand-text-secondary hover:text-brand-text-primary'}`}
                   >
                     {y}
                   </div>
                 ))}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function InternshipsManagement() {
  const { state } = useAppStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newInternship, setNewInternship] = useState({ company: '', role: '', startDate: '', endDate: '', description: '' });

  const [internships, setInternships] = useState(state.internships);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const internship = { ...newInternship, id: Date.now().toString() };
    setInternships([internship, ...internships]); // Add to top
    setIsAdding(false);
    setNewInternship({ company: '', role: '', startDate: '', endDate: '', description: '' });
  };

  const deleteInternship = (id: string) => {
    setInternships(internships.filter(i => i.id !== id));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="text-2xl font-bold text-brand-text-primary mb-1">Experience Portfolio</h1>
          <p className="text-sm text-brand-text-secondary">Chronicle your professional journey and internships.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="group bg-brand-accent-primary text-brand-bg-primary px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(25,211,174,0.4)] transition-all active:scale-95"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Add Experience
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div initial={{ opacity: 0, height: 0, y: -20 }} animate={{ opacity: 1, height: 'auto', y: 0 }} exit={{ opacity: 0, height: 0, y: -20 }} className="glass-card p-6 border-brand-accent-primary/50 relative overflow-hidden mb-12">
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent-primary"></div>
            <h3 className="text-sm font-bold mb-6 uppercase tracking-wider text-brand-accent-primary">Log New Experience</h3>
            <form onSubmit={handleAdd} className="space-y-5">
              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">Company Name</label>
                  <input required type="text" className="w-full bg-brand-bg-secondary border border-brand-border rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-brand-accent-primary focus:border-brand-accent-primary transition-all text-brand-text-primary text-sm" value={newInternship.company} onChange={e => setNewInternship({...newInternship, company: e.target.value})} placeholder="e.g. Google, Stripe" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">Role / Job Title</label>
                  <input required type="text" className="w-full bg-brand-bg-secondary border border-brand-border rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-brand-accent-primary focus:border-brand-accent-primary transition-all text-brand-text-primary text-sm" value={newInternship.role} onChange={e => setNewInternship({...newInternship, role: e.target.value})} placeholder="e.g. SWE Intern" />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">Start Date</label>
                  <CustomMonthYearPicker 
                    value={newInternship.startDate} 
                    onChange={v => setNewInternship({...newInternship, startDate: v})} 
                    placeholder="Select start date"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">End Date (Leave blank if present)</label>
                  <CustomMonthYearPicker 
                    value={newInternship.endDate} 
                    onChange={v => setNewInternship({...newInternship, endDate: v})} 
                    placeholder="Select end date"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">Description & Impact</label>
                <textarea required rows={4} className="w-full bg-brand-bg-secondary border border-brand-border rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-brand-accent-primary focus:border-brand-accent-primary transition-all text-brand-text-primary text-sm resize-none" value={newInternship.description} onChange={e => setNewInternship({...newInternship, description: e.target.value})} placeholder="Highlight your measurable impact, tools used, and key accomplishments..." />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsAdding(false)} className="px-5 py-2.5 rounded-xl border border-brand-border hover:bg-brand-bg-secondary text-sm font-medium transition-colors">Cancel</button>
                <button type="submit" className="bg-brand-accent-primary text-brand-bg-primary px-6 py-2.5 rounded-xl font-bold text-sm hover:shadow-[0_0_15px_rgba(25,211,174,0.3)] transition-all active:scale-95">Save Experience</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative pl-4 md:pl-8">
        {/* Timeline Line */}
        <div className="absolute left-[27px] md:left-[43px] top-4 bottom-4 w-px bg-brand-border/80"></div>
        
        <div className="space-y-10">
          <AnimatePresence>
            {internships.map((internship, idx) => (
              <motion.div 
                key={internship.id} 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: idx * 0.1 }}
                className="relative group"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-8 md:-left-[23px] top-8 w-4 h-4 rounded-full bg-brand-bg-primary border-2 border-brand-accent-primary group-hover:bg-brand-accent-primary transition-colors group-hover:shadow-[0_0_15px_rgba(25,211,174,0.5)] z-10"></div>
                
                <div className="glass-card p-6 md:p-8 ml-6 md:ml-8 relative overflow-hidden hover:border-brand-accent-secondary/50 hover:shadow-[0_10px_30px_rgba(111,107,250,0.1)] transition-all duration-300">
                  {/* Decorative Gradient Background */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-brand-accent-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full blur-3xl z-0"></div>

                  <div className="flex flex-col md:flex-row md:items-start gap-6 relative z-10">
                    <div className="hidden md:flex p-4 bg-brand-bg-secondary/80 border border-brand-border rounded-2xl text-brand-accent-secondary shrink-0 group-hover:border-brand-accent-secondary/50 group-hover:text-brand-accent-primary transition-all duration-300 shadow-sm group-hover:shadow-[0_0_20px_rgba(111,107,250,0.15)]">
                      <Briefcase size={32} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <h3 className="text-xl font-bold text-brand-text-primary mb-1 group-hover:text-brand-accent-primary transition-colors">{internship.role}</h3>
                          <div className="flex items-center gap-2 text-sm font-bold text-brand-accent-secondary">
                            <Building size={14} />
                            {internship.company}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 self-start md:self-auto">
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-bg-secondary border border-brand-border rounded-lg text-xs font-semibold text-brand-text-secondary whitespace-nowrap group-hover:border-brand-accent-primary/30 transition-colors">
                            <Calendar size={12} className="text-brand-accent-primary" />
                            <span>{new Date(internship.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                            <span className="text-brand-text-secondary/50">-</span>
                            <span className={!internship.endDate ? "text-brand-success" : ""}>
                              {internship.endDate ? new Date(internship.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                            </span>
                          </div>
                          <button onClick={() => deleteInternship(internship.id)} className="text-brand-text-secondary opacity-0 group-hover:opacity-100 hover:text-brand-danger transition-all p-1.5 rounded-md hover:bg-brand-danger/10" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-sm text-brand-text-secondary leading-relaxed pl-1 md:pl-0">
                        {/* Format line breaks natively if they exist */}
                        {internship.description.split('\n').map((line, i) => (
                          <p key={i} className="mb-2 last:mb-0">{line}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
