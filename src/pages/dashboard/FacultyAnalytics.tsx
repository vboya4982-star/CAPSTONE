import React, { useState } from 'react';
import { 
  TrendingUp, 
  GraduationCap, 
  Users, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  Briefcase, 
  ChevronRight, 
  ChevronDown,
  Download, 
  Code2, 
  Cloud, 
  Database, 
  BrainCircuit, 
  Sparkles,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomDropdownProps {
  label?: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (val: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ label, value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(o => o.value === value) || options[0];

  return (
    <div className="relative inline-block text-left z-30">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2 bg-brand-bg-primary hover:bg-brand-accent-primary/10 border border-brand-accent-primary/30 rounded-xl text-xs font-bold text-brand-text-primary transition-all shadow-sm"
      >
        {label && <span className="text-brand-text-secondary font-medium">{label}</span>}
        <span>{selectedOption?.label}</span>
        <ChevronDown size={14} className={`text-brand-accent-primary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-56 rounded-xl border border-brand-accent-primary/30 shadow-2xl z-20 py-1.5 backdrop-blur-xl bg-brand-bg-primary/95 text-brand-text-primary"
            >
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
                    opt.value === value
                      ? 'bg-brand-accent-primary/15 text-brand-accent-primary font-bold'
                      : 'text-brand-text-primary hover:bg-brand-accent-primary/10'
                  }`}
                >
                  <span>{opt.label}</span>
                  {opt.value === value && <CheckCircle2 size={13} className="text-brand-accent-primary" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// SVG Circular Gauge Component for Department Skill Health
const CircularScoreGauge = ({ score, color }: { score: number; color: string }) => {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const strokeColor = color === 'emerald' ? '#10b981' : color === 'cyan' ? '#06b6d4' : color === 'amber' ? '#f59e0b' : '#a855f7';

  return (
    <div className="relative flex items-center justify-center shrink-0">
      <svg className="w-14 h-14 transform -rotate-90">
        <circle
          cx="28"
          cy="28"
          r={radius}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="4"
          fill="transparent"
        />
        <circle
          cx="28"
          cy="28"
          r={radius}
          stroke={strokeColor}
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span className="absolute text-xs font-black text-brand-text-primary">
        {score}%
      </span>
    </div>
  );
};

const departments = [
  { name: 'Computer Science & Eng', code: 'CSE', students: 180, readiness: 88, focus: 'Web & Distributed Systems', topSkills: ['Data Structures', 'Full-Stack Web', 'SQL'], color: 'emerald' },
  { name: 'AI & Data Science', code: 'AI & DS', students: 120, readiness: 84, focus: 'Machine Learning Pipelines', topSkills: ['Python & PyTorch', 'MLOps', 'Pandas'], color: 'cyan' },
  { name: 'Information Technology', code: 'IT', students: 140, readiness: 79, focus: 'Frontend & Cloud Services', topSkills: ['React', 'REST APIs', 'AWS'], color: 'amber' },
  { name: 'Electronics & Comm', code: 'ECE', students: 90, readiness: 72, focus: 'Embedded & C++ Systems', topSkills: ['C++ Systems', 'Embedded SW', 'Python'], color: 'purple' },
];

const skillDistribution = [
  { track: 'Full-Stack Web', pct: 40, icon: Code2, students: 165 },
  { track: 'AI & Machine Learning', pct: 28, icon: BrainCircuit, students: 115 },
  { track: 'Cloud & Infrastructure', pct: 18, icon: Cloud, students: 75 },
  { track: 'Core Backend Systems', pct: 14, icon: Database, students: 65 },
];

const focusAreas = [
  { title: 'System Design & Redis Caching', dept: 'CSE & IT', impact: 'High Priority', action: 'Assign Lab' },
  { title: 'Model Serving with FastAPI', dept: 'AI & DS', impact: 'Medium Priority', action: 'Schedule Workshop' },
  { title: 'Kubernetes Cluster Basics', dept: 'All Batches', impact: 'Suggested', action: 'Add Assignment' },
];

const batchOptions = [
  { label: 'Batch of 2026 (Final Year)', value: '2026' },
  { label: 'Batch of 2025 (Third Year)', value: '2025' },
  { label: 'Batch of 2024 (Alumni)', value: '2024' },
];

export default function FacultyAnalytics() {
  const [selectedBatch, setSelectedBatch] = useState('2026');
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 border-brand-accent-primary/20">
        <div>
          <h1 className="text-2xl font-bold text-brand-text-primary flex items-center gap-2">
            <TrendingUp className="text-brand-accent-primary" size={24} />
            Skill Analytics
          </h1>
          <p className="text-sm text-brand-text-secondary mt-1">
            Departmental performance overview and student skill distribution.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <CustomDropdown 
            label="Batch:"
            value={selectedBatch}
            options={batchOptions}
            onChange={(val) => setSelectedBatch(val)}
          />

          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-accent-primary to-brand-accent-secondary text-brand-bg-primary font-bold text-xs rounded-xl hover:opacity-90 transition-all shadow-md active:scale-95 shrink-0"
          >
            <Download size={14} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {exported && (
        <motion.div 
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-semibold flex items-center gap-2"
        >
          <CheckCircle2 size={16} />
          <span>Analytics report downloaded successfully for Batch of {selectedBatch}.</span>
        </motion.div>
      )}

      {/* Top 3 High-Level Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 border-l-4 border-l-brand-accent-primary">
          <span className="text-xs font-semibold text-brand-text-secondary uppercase">Average Readiness</span>
          <div className="text-2xl font-black text-brand-text-primary mt-1">84%</div>
          <span className="text-[11px] text-emerald-400 font-semibold mt-1 inline-block">+4.2% from last term</span>
        </div>

        <div className="glass-card p-5 border-l-4 border-l-brand-accent-secondary">
          <span className="text-xs font-semibold text-brand-text-secondary uppercase">Verified Skill Badges</span>
          <div className="text-2xl font-black text-brand-text-primary mt-1">1,248</div>
          <span className="text-[11px] text-brand-text-secondary mt-1 inline-block">Across all 4 departments</span>
        </div>

        <div className="glass-card p-5 border-l-4 border-l-purple-500">
          <span className="text-xs font-semibold text-brand-text-secondary uppercase">Active Students</span>
          <div className="text-2xl font-black text-brand-text-primary mt-1">530</div>
          <span className="text-[11px] text-brand-text-secondary mt-1 inline-block">Tracked in Batch of {selectedBatch}</span>
        </div>
      </div>

      {/* Main Grid: Departments & Skill Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Department Skill Health */}
        <div className="lg:col-span-7 glass-card p-6">
          <h2 className="text-base font-bold text-brand-text-primary mb-4 flex items-center justify-between">
            <span>Department Skill Health</span>
            <span className="text-xs font-normal text-brand-text-secondary">Readiness Score</span>
          </h2>

          <div className="space-y-4">
            {departments.map((dept, i) => (
              <div 
                key={i} 
                className="p-4 rounded-xl bg-brand-bg-primary/50 border border-brand-accent-primary/15 hover:border-brand-accent-primary/40 transition-all flex items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-brand-accent-primary/10 text-brand-accent-primary font-bold text-[10px]">
                      {dept.code}
                    </span>
                    <h3 className="font-bold text-sm text-brand-text-primary">{dept.name}</h3>
                  </div>

                  <p className="text-xs text-brand-text-secondary font-medium">
                    {dept.focus} • <span className="text-brand-text-primary font-semibold">{dept.students} Students</span>
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {dept.topSkills.map((sk, sIdx) => (
                      <span key={sIdx} className="px-2 py-0.5 rounded bg-brand-bg-primary text-brand-text-secondary text-[10px] font-semibold border border-brand-accent-primary/10">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* SVG Radial Score Gauge */}
                <CircularScoreGauge score={dept.readiness} color={dept.color} />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Track Skill Distribution */}
        <div className="lg:col-span-5 glass-card p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-brand-text-primary mb-4">Skill Track Distribution</h2>

            <div className="space-y-3">
              {skillDistribution.map((track, idx) => {
                const IconComponent = track.icon;
                return (
                  <div key={idx} className="p-3.5 rounded-xl bg-brand-bg-primary/50 border border-brand-accent-primary/15 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-brand-accent-primary/10 text-brand-accent-primary">
                        <IconComponent size={18} />
                      </div>
                      <div>
                        <span className="font-bold text-xs text-brand-text-primary block">{track.track}</span>
                        <span className="text-[11px] text-brand-text-secondary">{track.students} Students</span>
                      </div>
                    </div>
                    <span className="font-extrabold text-sm text-brand-accent-secondary">{track.pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-brand-accent-primary/10 text-center">
            <p className="text-xs text-brand-text-secondary">
              Highest concentration in <span className="font-bold text-brand-accent-primary">Full-Stack Web (40%)</span>
            </p>
          </div>
        </div>
      </div>

      {/* Curriculum Action Area */}
      <div className="glass-card p-6">
        <h2 className="text-base font-bold text-brand-text-primary mb-1">Curriculum Focus Areas</h2>
        <p className="text-xs text-brand-text-secondary mb-4">Recommended syllabus adjustments based on student evaluation trends.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {focusAreas.map((area, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-brand-bg-primary/50 border border-brand-accent-primary/15 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-brand-accent-primary/10 text-brand-accent-primary">
                    {area.dept}
                  </span>
                  <span className="text-[10px] font-semibold text-amber-400">{area.impact}</span>
                </div>
                <h3 className="font-bold text-xs text-brand-text-primary mt-2">{area.title}</h3>
              </div>

              <button className="w-full py-1.5 bg-brand-accent-primary/10 hover:bg-brand-accent-primary text-brand-accent-primary border border-brand-accent-primary/30 hover:text-brand-bg-primary rounded-lg text-xs font-bold transition-all">
                {area.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
