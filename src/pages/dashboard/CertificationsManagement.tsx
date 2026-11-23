import React, { useState } from 'react';
import { useAppStore } from '../../lib/store';
import { Plus, Trash2, ExternalLink, Award, Calendar, ShieldCheck } from 'lucide-react';
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

export default function CertificationsManagement() {
  const { state } = useAppStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newCert, setNewCert] = useState({ name: '', issuer: '', issueDate: '', expiryDate: '', credentialId: '' });

  const [certs, setCerts] = useState(state.certifications);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const cert = { ...newCert, id: Date.now().toString(), verified: false };
    setCerts([...certs, cert]);
    setIsAdding(false);
    setNewCert({ name: '', issuer: '', issueDate: '', expiryDate: '', credentialId: '' });
  };

  const deleteCert = (id: string) => {
    setCerts(certs.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-text-primary mb-1">Certifications</h1>
          <p className="text-sm text-brand-text-secondary">Manage your verified credentials and professional certificates.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="group bg-brand-accent-primary text-brand-bg-primary px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(25,211,174,0.4)] transition-all active:scale-95"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Add Certification
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div initial={{ opacity: 0, height: 0, y: -20 }} animate={{ opacity: 1, height: 'auto', y: 0 }} exit={{ opacity: 0, height: 0, y: -20 }} className="glass-card p-6 border-brand-accent-primary/50 relative overflow-hidden mb-8">
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent-primary"></div>
            <h3 className="text-sm font-bold mb-6 uppercase tracking-wider text-brand-accent-primary">Add New Certification</h3>
            <form onSubmit={handleAdd} className="space-y-5">
              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">Certification Name</label>
                  <input required type="text" className="w-full bg-brand-bg-secondary border border-brand-border rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-brand-accent-primary focus:border-brand-accent-primary transition-all text-brand-text-primary text-sm" value={newCert.name} onChange={e => setNewCert({...newCert, name: e.target.value})} placeholder="e.g. AWS Solutions Architect" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">Issuing Organization</label>
                  <input required type="text" className="w-full bg-brand-bg-secondary border border-brand-border rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-brand-accent-primary focus:border-brand-accent-primary transition-all text-brand-text-primary text-sm" value={newCert.issuer} onChange={e => setNewCert({...newCert, issuer: e.target.value})} placeholder="e.g. Amazon Web Services" />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">Issue Date</label>
                  <CustomMonthYearPicker 
                    value={newCert.issueDate} 
                    onChange={v => setNewCert({...newCert, issueDate: v})} 
                    placeholder="Select issue date"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">Expiry Date (Optional)</label>
                  <CustomMonthYearPicker 
                    value={newCert.expiryDate} 
                    onChange={v => setNewCert({...newCert, expiryDate: v})} 
                    placeholder="Select expiry date"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">Credential ID / URL (Optional)</label>
                <input type="text" className="w-full bg-brand-bg-secondary border border-brand-border rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-brand-accent-primary focus:border-brand-accent-primary transition-all text-brand-text-primary text-sm" value={newCert.credentialId} onChange={e => setNewCert({...newCert, credentialId: e.target.value})} placeholder="https://..." />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsAdding(false)} className="px-5 py-2.5 rounded-xl border border-brand-border hover:bg-brand-bg-secondary text-sm font-medium transition-colors">Cancel</button>
                <button type="submit" className="bg-brand-accent-primary text-brand-bg-primary px-6 py-2.5 rounded-xl font-bold text-sm hover:shadow-[0_0_15px_rgba(25,211,174,0.3)] transition-all active:scale-95">Save Certification</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {certs.map((cert, idx) => (
            <motion.div 
              key={cert.id} 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: idx * 0.05 }}
              className="glass-card p-7 flex flex-col h-full group hover:-translate-y-2 hover:border-brand-success/50 hover:shadow-[0_10px_30px_rgba(46,204,113,0.15)] transition-all duration-300 relative overflow-hidden"
            >
              {/* Decorative Background Blob */}
              <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                <Award size={180} className="text-brand-success rotate-12" />
              </div>

              <div className="flex items-start gap-5 relative z-10">
                <div className="p-3.5 bg-brand-success/10 border border-brand-success/20 rounded-2xl text-brand-success shrink-0 group-hover:scale-110 group-hover:bg-brand-success group-hover:text-brand-bg-primary transition-all duration-300 shadow-[0_0_15px_rgba(46,204,113,0.2)]">
                  <Award size={28} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div className="pr-2">
                      <h3 className="text-lg font-bold text-brand-text-primary leading-tight mb-1 group-hover:text-brand-success transition-colors">{cert.name}</h3>
                      <p className="text-xs text-brand-text-secondary font-bold uppercase tracking-wider">{cert.issuer}</p>
                    </div>
                    <button onClick={() => deleteCert(cert.id)} className="text-brand-text-secondary opacity-0 group-hover:opacity-100 hover:text-brand-danger transition-all p-1.5 rounded-md hover:bg-brand-danger/10" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-brand-border/50 flex-1 relative z-10 flex flex-col justify-end">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-brand-text-secondary font-medium flex items-center gap-1.5"><Calendar size={14}/> Issued</span>
                    <span className="font-bold text-brand-text-primary">{new Date(cert.issueDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</span>
                  </div>
                  {cert.expiryDate && cert.expiryDate !== 'N/A' && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-brand-text-secondary font-medium flex items-center gap-1.5"><Calendar size={14}/> Expires</span>
                      <span className="font-bold text-brand-text-primary">{new Date(cert.expiryDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</span>
                    </div>
                  )}
                </div>

                {cert.credentialId && (
                  <div className="mt-5">
                    <a href={cert.credentialId} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 py-2 bg-brand-bg-secondary border border-brand-border rounded-lg text-xs font-bold text-brand-text-primary hover:border-brand-success hover:text-brand-success transition-all shadow-sm">
                      <ShieldCheck size={14} /> View Credential
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
