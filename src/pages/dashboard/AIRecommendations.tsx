import React, { useState } from 'react';
import { useAppStore, type RoadmapItem } from '../../lib/store';
import { generateAIRoadmap } from '../../lib/ai';
import { 
  Sparkles, BookOpen, Plus, CheckCircle2, Zap, Target, BrainCircuit, 
  Trash2, Play, RefreshCw, X, Layers, Clock, Award, Filter,
  GitBranch, LayoutGrid, List, Box, ChevronDown, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIRecommendations() {
  const { state, updateRoadmapStatus, addToRoadmap, deleteFromRoadmap, replaceRoadmap } = useAppStore();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  
  // View layout mode: 'pathway' (3D Zig-Zag) | 'grid' (Phase columns) | 'list' (Vertical)
  const [viewMode, setViewMode] = useState<'pathway' | 'grid' | 'list'>('pathway');

  // AI Generator state
  const [targetRole, setTargetRole] = useState(state.targetCareer?.title || 'Full Stack Developer');
  const [focusArea, setFocusArea] = useState('Balanced Multi-Phase');
  const [isFocusDropdownOpen, setIsFocusDropdownOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResultModal, setAiResultModal] = useState<any>(null);
  
  // Custom item state
  const [showAddCustomModal, setShowAddCustomModal] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [customType, setCustomType] = useState<'course' | 'project' | 'certification' | 'topic'>('course');
  const [customTime, setCustomTime] = useState('3 weeks');
  const [customStage, setCustomStage] = useState('Phase 2: Core Skills');
  const [customSkills, setCustomSkills] = useState('');

  // Filter state
  const [filterStatus, setFilterStatus] = useState<'all' | 'in-progress' | 'upcoming' | 'completed'>('all');

  const handleAddToRoadmap = (title: string, type: 'course' | 'project' | 'certification' | 'topic', estimatedTime: string, stage?: string, description?: string) => {
    addToRoadmap({ 
      title, 
      type, 
      estimatedTime, 
      stage: stage || 'Phase 2: Core Skills',
      description: description || 'Recommended module to close skill gap.',
      status: 'upcoming'
    });
    setAddedItems(prev => ({ ...prev, [title]: true }));
  };

  const handleGenerateRoadmap = async () => {
    if (!targetRole.trim()) return;
    setIsGenerating(true);
    try {
      const roadmapData = await generateAIRoadmap(targetRole, state.skills, focusArea);
      setAiResultModal(roadmapData);
    } catch (err) {
      console.error('Failed to generate AI roadmap:', err);
      alert('Could not generate AI roadmap. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyAIRoadmap = (mode: 'replace' | 'append') => {
    if (!aiResultModal || !aiResultModal.items) return;
    
    const formattedItems: RoadmapItem[] = aiResultModal.items.map((item: any, idx: number) => ({
      id: Date.now().toString() + idx,
      title: item.title,
      description: item.description || '',
      type: (['course', 'project', 'certification', 'topic'].includes(item.type) ? item.type : 'course') as any,
      status: (item.status || (idx < 2 ? 'completed' : idx === 2 ? 'in-progress' : 'upcoming')) as any,
      estimatedTime: item.estimatedTime || '2 weeks',
      stage: item.stage || `Phase ${Math.min(idx + 1, 4)}`,
      difficulty: item.difficulty || 'Intermediate',
      skills: item.skills || []
    }));

    if (mode === 'replace') {
      replaceRoadmap(formattedItems);
    } else {
      formattedItems.forEach(item => addToRoadmap(item));
    }

    setAiResultModal(null);
  };

  const handleAddCustomTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    addToRoadmap({
      title: customTitle.trim(),
      description: customDescription.trim(),
      type: customType,
      estimatedTime: customTime || '2 weeks',
      stage: customStage || 'Phase 1: Foundations',
      status: 'upcoming',
      skills: customSkills ? customSkills.split(',').map(s => s.trim()) : []
    });

    setCustomTitle('');
    setCustomDescription('');
    setCustomSkills('');
    setShowAddCustomModal(false);
  };

  // Stats calculation
  const totalItems = state.roadmap.length;
  const completedCount = state.roadmap.filter(r => r.status === 'completed').length;
  const inProgressCount = state.roadmap.filter(r => r.status === 'in-progress').length;
  const upcomingCount = state.roadmap.filter(r => r.status === 'upcoming').length;
  const completionPercent = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  // Filtered items
  const filteredRoadmap = state.roadmap.filter(item => {
    if (filterStatus === 'all') return true;
    return item.status === filterStatus;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-text-primary flex items-center gap-2 mb-1">
            <Sparkles className="text-brand-accent-secondary animate-pulse" /> AI Learning Roadmap
          </h1>
          <p className="text-sm text-brand-text-secondary">Generate, customize, and track step-by-step career milestones to reach your target role.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowAddCustomModal(true)}
            className="flex items-center gap-2 bg-brand-bg-secondary border border-brand-border text-brand-text-primary px-4 py-2 rounded-xl text-sm font-bold hover:border-brand-accent-primary hover:text-brand-accent-primary transition-all active:scale-95"
          >
            <Plus size={16} /> Add Task
          </button>
        </div>
      </div>

      {/* AI Generator Control Banner */}
      <div className="glass-card p-6 border-t-4 border-t-brand-accent-secondary relative z-20 bg-gradient-to-r from-brand-card via-brand-bg-secondary/40 to-brand-card">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-accent-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] font-bold text-brand-accent-secondary bg-brand-accent-secondary/10 border border-brand-accent-secondary/20 px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
              <BrainCircuit size={12} /> AI Roadmap Generator
            </span>
            <h2 className="text-xl font-bold text-brand-text-primary">Generate a Personalized Career Roadmap</h2>
            <p className="text-sm text-brand-text-secondary">
              Input your target goal or role and let SkillForge AI build a multi-phase learning path customized for your skills.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <div className="space-y-1 flex-1 sm:w-64">
              <label className="text-xs font-bold text-brand-text-secondary block">Target Career / Goal</label>
              <input 
                type="text" 
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Full Stack Developer, AI Engineer"
                className="w-full bg-brand-bg-primary border border-brand-border rounded-xl px-3 py-2 text-sm text-brand-text-primary font-medium focus:outline-none focus:border-brand-accent-secondary transition-colors"
              />
            </div>
            
            <div className="space-y-1 sm:w-48 relative">
              <label className="text-xs font-bold text-brand-text-secondary block">Focus Area</label>
              <button 
                type="button"
                onClick={() => setIsFocusDropdownOpen(!isFocusDropdownOpen)}
                className="w-full bg-brand-bg-primary border border-brand-border rounded-xl px-3 py-2 text-sm text-brand-text-primary font-medium focus:outline-none focus:border-brand-accent-secondary flex items-center justify-between transition-colors shadow-sm"
              >
                <span>{
                  focusArea === 'Fast Track Sprint' ? 'Fast Track Sprint' :
                  focusArea === 'Project & Portfolio Driven' ? 'Project Portfolio' : 'Balanced Path'
                }</span>
                <ChevronDown size={16} className={`transition-transform text-brand-text-secondary ${isFocusDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isFocusDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-20" onClick={() => setIsFocusDropdownOpen(false)}></div>
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                      className="absolute left-0 right-0 top-full mt-1 bg-brand-card border border-brand-border rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-50 overflow-hidden py-1"
                    >
                      {[
                        { label: 'Balanced Path', value: 'Balanced Multi-Phase' },
                        { label: 'Fast Track Sprint', value: 'Fast Track Sprint' },
                        { label: 'Project Portfolio', value: 'Project & Portfolio Driven' },
                      ].map((opt) => (
                        <button 
                          key={opt.value}
                          type="button"
                          onClick={() => { setFocusArea(opt.value); setIsFocusDropdownOpen(false); }}
                          className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
                            focusArea === opt.value ? 'bg-brand-accent-secondary/10 text-brand-accent-secondary' : 'text-brand-text-primary hover:bg-brand-bg-secondary'
                          }`}
                        >
                          {opt.label}
                          {focusArea === opt.value && <Check size={14} className="text-brand-accent-secondary" />}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="sm:self-end">
              <button 
                onClick={handleGenerateRoadmap}
                disabled={isGenerating || !targetRole.trim()}
                className="w-full sm:w-auto bg-gradient-to-r from-brand-accent-secondary to-brand-accent-primary text-brand-bg-primary font-bold px-5 py-2.5 rounded-xl text-sm shadow-[0_0_20px_rgba(111,107,250,0.3)] hover:shadow-[0_0_25px_rgba(25,211,174,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
              >
                {isGenerating ? <RefreshCw size={16} className="animate-spin" /> : <Sparkles size={16} />}
                {isGenerating ? 'Generating...' : 'Generate Roadmap'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left Column: SkillForge Suggestions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-brand-text-primary flex items-center gap-2">
              <BrainCircuit size={18} className="text-brand-accent-primary" /> Recommended Modules
            </h2>
          </div>
          
          <div className="space-y-4">
            {/* Card 1 */}
            <div className="glass-card p-5 border-t-4 border-t-brand-accent-primary relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(25,211,174,0.1)] flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold text-brand-accent-primary bg-brand-accent-primary/10 border border-brand-accent-primary/20 px-2.5 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1">
                  <Zap size={10} /> High Priority
                </span>
                <span className="text-xs font-bold text-brand-text-secondary flex items-center gap-1"><Clock size={12}/> 4 weeks</span>
              </div>
              
              <h3 className="text-base font-bold mb-1 text-brand-text-primary group-hover:text-brand-accent-primary transition-colors">Mastering Advanced SQL</h3>
              
              <p className="text-xs text-brand-text-secondary mb-4 leading-relaxed">
                Bridges your 22% database proficiency gap with indexing, window functions, and query plan execution optimization.
              </p>
              
              <div className="flex items-center justify-between pt-2 border-t border-brand-border/50 mt-auto">
                <span className="text-[11px] font-semibold text-brand-text-secondary bg-brand-bg-secondary px-2 py-1 rounded">Phase 2: Database Mastery</span>
                <button 
                  onClick={() => handleAddToRoadmap('Mastering Advanced SQL', 'course', '4 weeks', 'Phase 2: Database Mastery', 'Master PostgreSQL query optimization and indexing.')} 
                  disabled={addedItems['Mastering Advanced SQL']}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    addedItems['Mastering Advanced SQL'] 
                    ? 'bg-brand-bg-secondary text-brand-success border border-brand-success/30 cursor-not-allowed' 
                    : 'bg-brand-accent-primary text-brand-bg-primary hover:shadow-[0_0_12px_rgba(25,211,174,0.4)] active:scale-95'
                  }`}
                >
                  {addedItems['Mastering Advanced SQL'] ? <CheckCircle2 size={14} /> : <Plus size={14} />} 
                  {addedItems['Mastering Advanced SQL'] ? 'Added' : 'Add to Roadmap'}
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="glass-card p-5 border-t-4 border-t-brand-highlight relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(243,156,18,0.1)] flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold text-brand-highlight bg-brand-highlight/10 border border-brand-highlight/20 px-2.5 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1">
                  <Target size={10} /> Architecture Core
                </span>
                <span className="text-xs font-bold text-brand-text-secondary flex items-center gap-1"><Clock size={12}/> 3 weeks</span>
              </div>
              
              <h3 className="text-base font-bold mb-1 text-brand-text-primary group-hover:text-brand-highlight transition-colors">System Design & Microservices</h3>
              
              <p className="text-xs text-brand-text-secondary mb-4 leading-relaxed">
                Learn microservices architecture, load balancers, message queues (RabbitMQ/Kafka), and API gateways.
              </p>
              
              <div className="flex items-center justify-between pt-2 border-t border-brand-border/50 mt-auto">
                <span className="text-[11px] font-semibold text-brand-text-secondary bg-brand-bg-secondary px-2 py-1 rounded">Phase 3: Scale Architecture</span>
                <button 
                  onClick={() => handleAddToRoadmap('System Design & Microservices', 'course', '3 weeks', 'Phase 3: Scale Architecture', 'Microservices design, messaging queues, and caching.')} 
                  disabled={addedItems['System Design & Microservices']}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    addedItems['System Design & Microservices'] 
                    ? 'bg-brand-bg-secondary text-brand-success border border-brand-success/30 cursor-not-allowed' 
                    : 'bg-brand-bg-secondary border border-brand-border text-brand-text-primary hover:border-brand-highlight/50 hover:text-brand-highlight active:scale-95'
                  }`}
                >
                  {addedItems['System Design & Microservices'] ? <CheckCircle2 size={14} /> : <Plus size={14} />} 
                  {addedItems['System Design & Microservices'] ? 'Added' : 'Add to Roadmap'}
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="glass-card p-5 border-t-4 border-t-brand-accent-secondary relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(111,107,250,0.1)] flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold text-brand-accent-secondary bg-brand-accent-secondary/10 border border-brand-accent-secondary/20 px-2.5 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1">
                  <Award size={10} /> Capstone Portfolio
                </span>
                <span className="text-xs font-bold text-brand-text-secondary flex items-center gap-1"><Clock size={12}/> 3 weeks</span>
              </div>
              
              <h3 className="text-base font-bold mb-1 text-brand-text-primary group-hover:text-brand-accent-secondary transition-colors">Full-Stack Cloud SaaS Application</h3>
              
              <p className="text-xs text-brand-text-secondary mb-4 leading-relaxed">
                Build and deploy a complete production-grade SaaS app with CI/CD, Docker containerization, and analytics dashboard.
              </p>
              
              <div className="flex items-center justify-between pt-2 border-t border-brand-border/50 mt-auto">
                <span className="text-[11px] font-semibold text-brand-text-secondary bg-brand-bg-secondary px-2 py-1 rounded">Phase 4: Capstone</span>
                <button 
                  onClick={() => handleAddToRoadmap('Full-Stack Cloud SaaS Application', 'project', '3 weeks', 'Phase 4: Capstone', 'Full stack production application with Docker & CI/CD.')} 
                  disabled={addedItems['Full-Stack Cloud SaaS Application']}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    addedItems['Full-Stack Cloud SaaS Application'] 
                    ? 'bg-brand-bg-secondary text-brand-success border border-brand-success/30 cursor-not-allowed' 
                    : 'bg-brand-bg-secondary border border-brand-border text-brand-text-primary hover:border-brand-accent-secondary/50 hover:text-brand-accent-secondary active:scale-95'
                  }`}
                >
                  {addedItems['Full-Stack Cloud SaaS Application'] ? <CheckCircle2 size={14} /> : <Plus size={14} />} 
                  {addedItems['Full-Stack Cloud SaaS Application'] ? 'Added' : 'Add to Roadmap'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Active Roadmap Timeline */}
        <div className={`${viewMode === 'pathway' ? 'lg:col-span-5' : viewMode === 'grid' ? 'lg:col-span-5' : 'lg:col-span-3'} space-y-6 transition-all duration-500`}>
          
          {/* Timeline Header & View Switcher Bar */}
          <div className="glass-card p-6 border-b border-brand-border space-y-5 bg-gradient-to-r from-brand-card via-brand-bg-secondary/40 to-brand-card">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-brand-text-primary flex items-center gap-2">
                    <Target size={18} className="text-brand-accent-primary" /> Your Active Roadmap
                  </h2>
                  <span className="text-xs font-bold text-brand-accent-secondary bg-brand-accent-secondary/10 px-2.5 py-0.5 rounded-full border border-brand-accent-secondary/20 flex items-center gap-1">
                    <Box size={12} /> 3D Interactive
                  </span>
                </div>
                <p className="text-xs text-brand-text-secondary mt-0.5">
                  {completedCount} of {totalItems} modules completed ({completionPercent}%)
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* 3D View Mode Switcher */}
                <div className="flex items-center bg-brand-bg-primary p-1 rounded-xl border border-brand-border">
                  <button 
                    onClick={() => setViewMode('pathway')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      viewMode === 'pathway' ? 'bg-gradient-to-r from-brand-accent-secondary to-brand-accent-primary text-brand-bg-primary shadow-md' : 'text-brand-text-secondary hover:text-brand-text-primary'
                    }`}
                  >
                    <GitBranch size={14} /> 3D Pathway
                  </button>
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      viewMode === 'grid' ? 'bg-gradient-to-r from-brand-accent-secondary to-brand-accent-primary text-brand-bg-primary shadow-md' : 'text-brand-text-secondary hover:text-brand-text-primary'
                    }`}
                  >
                    <LayoutGrid size={14} /> Phase Board
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      viewMode === 'list' ? 'bg-gradient-to-r from-brand-accent-secondary to-brand-accent-primary text-brand-bg-primary shadow-md' : 'text-brand-text-secondary hover:text-brand-text-primary'
                    }`}
                  >
                    <List size={14} /> Linear List
                  </button>
                </div>

                {/* Status Filter Tabs */}
                <div className="flex items-center bg-brand-bg-primary p-1 rounded-xl border border-brand-border">
                  <button 
                    onClick={() => setFilterStatus('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${filterStatus === 'all' ? 'bg-brand-card text-brand-text-primary shadow-sm border border-brand-border' : 'text-brand-text-secondary hover:text-brand-text-primary'}`}
                  >
                    All ({totalItems})
                  </button>
                  <button 
                    onClick={() => setFilterStatus('in-progress')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${filterStatus === 'in-progress' ? 'bg-brand-card text-brand-accent-primary shadow-sm border border-brand-border' : 'text-brand-text-secondary hover:text-brand-text-primary'}`}
                  >
                    Active ({inProgressCount})
                  </button>
                  <button 
                    onClick={() => setFilterStatus('completed')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${filterStatus === 'completed' ? 'bg-brand-card text-brand-success shadow-sm border border-brand-border' : 'text-brand-text-secondary hover:text-brand-text-primary'}`}
                  >
                    Done ({completedCount})
                  </button>
                </div>
              </div>
            </div>

            {/* Glowing Neon Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full bg-brand-bg-primary h-2.5 rounded-full overflow-hidden p-0.5 border border-brand-border">
                <div 
                  className="bg-gradient-to-r from-brand-accent-secondary via-brand-accent-primary to-brand-success h-full rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(25,211,174,0.6)]"
                  style={{ width: `${completionPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Main Roadmap Container */}
          <div className="glass-card p-6 min-h-[450px]">
            {filteredRoadmap.length === 0 ? (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center space-y-3 opacity-60 py-12">
                <Target size={48} className="text-brand-text-secondary" />
                <p className="text-base font-bold text-brand-text-primary">No roadmap items in this view.</p>
                <p className="text-xs text-brand-text-secondary max-w-xs">
                  Generate a roadmap with AI above or add a task manually to build your career path.
                </p>
                <button 
                  onClick={handleGenerateRoadmap}
                  className="mt-2 text-xs font-bold bg-brand-accent-secondary/10 border border-brand-accent-secondary/30 text-brand-accent-secondary px-4 py-2 rounded-xl hover:bg-brand-accent-secondary hover:text-brand-bg-primary transition-all"
                >
                  Generate AI Roadmap
                </button>
              </div>
            ) : viewMode === 'pathway' ? (
              
              /* ========================================================= */
              /* 3D INTERACTIVE ZIG-ZAG PATHWAY VIEW                       */
              /* ========================================================= */
              <div className="relative py-8 px-2 md:px-6">
                {/* Central 3D Glowing Spine Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-brand-accent-primary via-brand-accent-secondary to-brand-success shadow-[0_0_20px_rgba(25,211,174,0.6)] z-0 hidden md:block"></div>
                <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-accent-primary via-brand-accent-secondary to-brand-success shadow-[0_0_20px_rgba(25,211,174,0.6)] z-0 md:hidden"></div>

                <div className="space-y-12 relative z-10">
                  <AnimatePresence>
                    {filteredRoadmap.map((item, idx) => {
                      const isCompleted = item.status === 'completed';
                      const isInProgress = item.status === 'in-progress';
                      const isEven = idx % 2 === 0;

                      return (
                        <div 
                          key={item.id}
                          className={`flex flex-col md:flex-row items-center ${
                            isEven ? 'md:flex-row-reverse' : ''
                          }`}
                        >
                          {/* Desktop Empty Half */}
                          <div className="hidden md:block w-1/2"></div>

                          {/* Central 3D Node Badge */}
                          <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                            <motion.div 
                              whileHover={{ scale: 1.2, rotate: 180 }}
                              transition={{ duration: 0.3 }}
                              className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center shadow-xl backdrop-blur-md cursor-pointer ${
                                isCompleted 
                                  ? 'bg-brand-success border-white text-brand-bg-primary shadow-[0_0_20px_rgba(46,204,113,0.6)]' 
                                  : isInProgress
                                  ? 'bg-brand-accent-primary border-white text-brand-bg-primary shadow-[0_0_20px_rgba(25,211,174,0.7)] animate-pulse'
                                  : 'bg-brand-card border-brand-border text-brand-text-secondary'
                              }`}
                            >
                              <span className="text-xs font-extrabold">{String(idx + 1).padStart(2, '0')}</span>
                            </motion.div>
                          </div>

                          {/* 3D Glass Floating Card */}
                          <div className={`w-full md:w-1/2 pl-14 md:pl-0 ${isEven ? 'md:pr-10' : 'md:pl-10'}`}>
                            <motion.div
                              initial={{ opacity: 0, y: 30, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              whileHover={{ 
                                scale: 1.02, 
                                y: -6,
                                rotateY: isEven ? -2 : 2,
                                rotateX: 1
                              }}
                              transition={{ type: "spring", stiffness: 250, damping: 20 }}
                              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                              className={`p-6 rounded-2xl border transition-all duration-300 relative shadow-2xl backdrop-blur-xl ${
                                isCompleted 
                                  ? 'bg-gradient-to-br from-brand-success/15 via-brand-bg-secondary/70 to-brand-card border-brand-success/40 shadow-[0_15px_35px_rgba(46,204,113,0.15)]'
                                  : isInProgress
                                  ? 'bg-gradient-to-br from-brand-accent-primary/20 via-brand-bg-secondary/80 to-brand-card border-brand-accent-primary/60 shadow-[0_15px_40px_rgba(25,211,174,0.25)]'
                                  : 'bg-gradient-to-br from-brand-card via-brand-bg-secondary/50 to-brand-card border-brand-border hover:border-brand-accent-primary/40 shadow-[0_15px_35px_rgba(0,0,0,0.25)]'
                              }`}
                            >
                              {/* Glowing Step Tag */}
                              <div className="flex items-center justify-between gap-2 mb-3">
                                <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md border ${
                                  isCompleted ? 'bg-brand-success/20 text-brand-success border-brand-success/30' :
                                  isInProgress ? 'bg-brand-accent-primary/20 text-brand-accent-primary border-brand-accent-primary/30' :
                                  'bg-brand-bg-primary text-brand-text-secondary border-brand-border'
                                }`}>
                                  {item.stage || `STEP ${idx + 1}`}
                                </span>

                                <span className="text-[10px] font-bold text-brand-text-secondary uppercase">
                                  {item.type} • {item.estimatedTime}
                                </span>
                              </div>

                              {/* Card Title */}
                              <h3 className={`text-lg font-extrabold mb-2 leading-snug ${
                                isCompleted ? 'text-brand-text-secondary line-through' : 'text-brand-text-primary'
                              }`}>
                                {item.title}
                              </h3>

                              {/* Description */}
                              {item.description && (
                                <p className="text-xs text-brand-text-secondary leading-relaxed mb-4">
                                  {item.description}
                                </p>
                              )}

                              {/* Skills Pills */}
                              {item.skills && item.skills.length > 0 && (
                                <div className="flex items-center flex-wrap gap-1.5 mb-4">
                                  {item.skills.map((s, sIdx) => (
                                    <span key={sIdx} className="text-[10px] font-bold text-brand-text-secondary bg-brand-bg-primary/80 border border-brand-border px-2 py-0.5 rounded-md">
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {/* Action Footer */}
                              <div className="flex items-center justify-between pt-3 border-t border-brand-border/60">
                                <span className="text-xs font-semibold text-brand-text-secondary flex items-center gap-1">
                                  <Clock size={12} className="text-brand-accent-primary" /> {item.estimatedTime}
                                </span>

                                <div className="flex items-center gap-2">
                                  {isCompleted ? (
                                    <button 
                                      onClick={() => updateRoadmapStatus(item.id, 'in-progress')}
                                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-brand-bg-secondary text-brand-text-secondary hover:text-brand-accent-primary border border-brand-border transition-all"
                                    >
                                      Re-open
                                    </button>
                                  ) : isInProgress ? (
                                    <button 
                                      onClick={() => updateRoadmapStatus(item.id, 'completed')}
                                      className="px-4 py-1.5 rounded-xl text-xs font-bold bg-brand-success text-brand-bg-primary shadow-[0_0_15px_rgba(46,204,113,0.5)] hover:opacity-90 transition-all flex items-center gap-1 active:scale-95"
                                    >
                                      <CheckCircle2 size={14} /> Mark Complete
                                    </button>
                                  ) : (
                                    <button 
                                      onClick={() => updateRoadmapStatus(item.id, 'in-progress')}
                                      className="px-4 py-1.5 rounded-xl text-xs font-bold bg-brand-accent-primary text-brand-bg-primary shadow-[0_0_15px_rgba(25,211,174,0.5)] hover:opacity-90 transition-all flex items-center gap-1 active:scale-95"
                                    >
                                      <Play size={12} fill="currentColor" /> Start Module
                                    </button>
                                  )}

                                  <button 
                                    onClick={() => deleteFromRoadmap(item.id)}
                                    className="p-1.5 rounded-lg text-brand-text-secondary hover:text-brand-danger hover:bg-brand-danger/10 transition-colors"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </div>

                            </motion.div>
                          </div>
                        </div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

            ) : viewMode === 'grid' ? (

              /* ========================================================= */
              /* 3D PHASE BOARD (KANBAN COLUMNS VIEW)                      */
              /* ========================================================= */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {['Phase 1: Foundations', 'Phase 2: Core Skills', 'Phase 3: Advanced', 'Phase 4: Capstone'].map((phaseTitle, pIdx) => {
                  const phaseItems = filteredRoadmap.filter(r => r.stage?.toLowerCase().includes(`phase ${pIdx + 1}`) || (pIdx === 0 && !r.stage));
                  
                  return (
                    <div key={pIdx} className="bg-brand-bg-primary/50 p-4 rounded-2xl border border-brand-border flex flex-col space-y-4 min-h-[400px]">
                      <div className="flex items-center justify-between border-b border-brand-border pb-3">
                        <h3 className="text-xs font-bold text-brand-text-primary uppercase tracking-wider flex items-center gap-1.5">
                          <Layers size={14} className="text-brand-accent-secondary" /> {phaseTitle.split(':')[1] || phaseTitle}
                        </h3>
                        <span className="text-[10px] font-bold bg-brand-bg-secondary px-2 py-0.5 rounded text-brand-text-secondary">
                          {phaseItems.length}
                        </span>
                      </div>

                      <div className="flex-1 space-y-4">
                        {phaseItems.length === 0 ? (
                          <div className="h-full min-h-[200px] flex flex-col items-center justify-center text-center opacity-40">
                            <span className="text-xs font-bold text-brand-text-secondary">No items in this phase</span>
                          </div>
                        ) : (
                          phaseItems.map(item => {
                            const isCompleted = item.status === 'completed';
                            const isInProgress = item.status === 'in-progress';

                            return (
                              <motion.div 
                                key={item.id}
                                whileHover={{ scale: 1.03, y: -4 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className={`p-4 rounded-xl border transition-all relative ${
                                  isCompleted ? 'bg-brand-success/10 border-brand-success/30' :
                                  isInProgress ? 'bg-brand-accent-primary/10 border-brand-accent-primary/40 shadow-[0_0_15px_rgba(25,211,174,0.15)]' :
                                  'bg-brand-card border-brand-border'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2 mb-2">
                                  <span className="text-[9px] font-bold uppercase text-brand-text-secondary">{item.type}</span>
                                  <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                                    isCompleted ? 'bg-brand-success/20 text-brand-success' :
                                    isInProgress ? 'bg-brand-accent-primary/20 text-brand-accent-primary' :
                                    'bg-brand-bg-primary text-brand-text-secondary'
                                  }`}>
                                    {item.status}
                                  </span>
                                </div>
                                <h4 className={`text-sm font-bold mb-2 ${isCompleted ? 'line-through text-brand-text-secondary' : 'text-brand-text-primary'}`}>{item.title}</h4>
                                <p className="text-xs text-brand-text-secondary line-clamp-2 mb-3">{item.description}</p>
                                
                                <div className="flex items-center justify-between pt-2 border-t border-brand-border/50 text-xs">
                                  <span className="text-brand-text-secondary font-medium">{item.estimatedTime}</span>
                                  {isCompleted ? (
                                    <button onClick={() => updateRoadmapStatus(item.id, 'in-progress')} className="text-[10px] font-bold text-brand-text-secondary hover:text-brand-accent-primary">Undo</button>
                                  ) : (
                                    <button onClick={() => updateRoadmapStatus(item.id, 'completed')} className="text-[10px] font-bold text-brand-success hover:underline">Complete</button>
                                  )}
                                </div>
                              </motion.div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            ) : (

              /* ========================================================= */
              /* REFINED LINEAR LIST VIEW                                  */
              /* ========================================================= */
              <div className="relative space-y-6 mt-1">
                <div className="absolute left-[9px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-brand-accent-primary via-brand-accent-secondary to-brand-border/40 z-0"></div>
                
                <AnimatePresence>
                  {filteredRoadmap.map((item, idx) => {
                    const isCompleted = item.status === 'completed';
                    const isInProgress = item.status === 'in-progress';

                    return (
                      <motion.div 
                        key={item.id} 
                        initial={{ opacity: 0, x: -20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ delay: idx * 0.05 }} 
                        className="relative pl-8 group"
                      >
                        <div className={`absolute left-0 top-5 h-5 w-5 rounded-full border-[3px] border-brand-bg-primary z-10 transition-all flex items-center justify-center shadow-md ${
                          isCompleted ? 'bg-brand-success shadow-[0_0_12px_rgba(46,204,113,0.6)] text-brand-bg-primary' : 
                          isInProgress ? 'bg-brand-accent-primary shadow-[0_0_12px_rgba(25,211,174,0.6)] text-brand-bg-primary animate-pulse' : 
                          'bg-brand-card border-brand-border'
                        }`}>
                          {isCompleted && <CheckCircle2 size={12} strokeWidth={3} />}
                          {isInProgress && <Play size={9} fill="currentColor" />}
                        </div>

                        <div className={`bg-brand-bg-secondary/40 p-5 rounded-2xl border transition-all duration-300 relative z-10 ${
                          isCompleted 
                            ? 'border-brand-success/30 bg-brand-success/5' 
                            : isInProgress 
                            ? 'border-brand-accent-primary/40 bg-brand-accent-primary/5 shadow-[0_4px_20px_rgba(25,211,174,0.08)]' 
                            : 'border-brand-border group-hover:border-brand-border/80'
                        }`}>
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1.5 flex-1">
                              <div className="flex items-center flex-wrap gap-2">
                                {item.stage && (
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-accent-secondary bg-brand-accent-secondary/10 px-2 py-0.5 rounded border border-brand-accent-secondary/20">
                                    {item.stage}
                                  </span>
                                )}
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                  isCompleted ? 'bg-brand-success/10 text-brand-success border border-brand-success/20' : 
                                  isInProgress ? 'bg-brand-accent-primary/10 text-brand-accent-primary border border-brand-accent-primary/20' : 
                                  'bg-brand-bg-primary text-brand-text-secondary border border-brand-border'
                                }`}>
                                  {isCompleted ? 'COMPLETED' : isInProgress ? 'IN PROGRESS' : 'UPCOMING'}
                                </span>
                              </div>

                              <h3 className={`text-base font-bold transition-colors ${
                                isCompleted ? 'text-brand-text-secondary line-through' : 'text-brand-text-primary group-hover:text-brand-accent-primary'
                              }`}>
                                {item.title}
                              </h3>

                              {item.description && (
                                <p className="text-xs text-brand-text-secondary leading-relaxed pt-0.5">
                                  {item.description}
                                </p>
                              )}

                              <div className="flex items-center gap-3 pt-1 text-xs text-brand-text-secondary font-medium">
                                <span className="flex items-center gap-1"><Clock size={12} className="text-brand-accent-primary" /> {item.estimatedTime}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              {isCompleted ? (
                                <button 
                                  onClick={() => updateRoadmapStatus(item.id, 'in-progress')}
                                  className="p-2 rounded-xl text-brand-text-secondary hover:text-brand-accent-primary transition-all"
                                >
                                  <RefreshCw size={16} />
                                </button>
                              ) : isInProgress ? (
                                <button 
                                  onClick={() => updateRoadmapStatus(item.id, 'completed')}
                                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-brand-success text-brand-bg-primary hover:shadow-[0_0_12px_rgba(46,204,113,0.4)] transition-all flex items-center gap-1 active:scale-95"
                                >
                                  <CheckCircle2 size={14} /> Complete
                                </button>
                              ) : (
                                <button 
                                  onClick={() => updateRoadmapStatus(item.id, 'in-progress')}
                                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-brand-accent-primary text-brand-bg-primary hover:shadow-[0_0_12px_rgba(25,211,174,0.4)] transition-all flex items-center gap-1 active:scale-95"
                                >
                                  <Play size={12} fill="currentColor" /> Start
                                </button>
                              )}

                              <button 
                                onClick={() => deleteFromRoadmap(item.id)}
                                className="p-2 rounded-xl text-brand-text-secondary hover:text-brand-danger hover:bg-brand-danger/10 transition-all"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* AI Preview Result Modal */}
      <AnimatePresence>
        {aiResultModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 space-y-6 border border-brand-accent-secondary/40 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-brand-border pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-accent-secondary bg-brand-accent-secondary/10 px-2.5 py-1 rounded-md border border-brand-accent-secondary/20">
                    AI Generated Preview
                  </span>
                  <h2 className="text-xl font-bold text-brand-text-primary mt-1 flex items-center gap-2">
                    <Sparkles className="text-brand-accent-secondary" size={20} /> Roadmap for {aiResultModal.role}
                  </h2>
                </div>
                <button onClick={() => setAiResultModal(null)} className="p-2 text-brand-text-secondary hover:text-brand-text-primary">
                  <X size={20} />
                </button>
              </div>

              {aiResultModal.summary && (
                <p className="text-sm text-brand-text-secondary bg-brand-bg-secondary/60 p-4 rounded-xl border border-brand-border leading-relaxed">
                  {aiResultModal.summary}
                </p>
              )}

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-brand-text-primary flex items-center gap-2">
                  <Layers size={16} className="text-brand-accent-primary" /> Generated Modules ({aiResultModal.items?.length || 0})
                </h3>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {aiResultModal.items?.map((item: any, idx: number) => (
                    <div key={idx} className="bg-brand-bg-primary p-3.5 rounded-xl border border-brand-border space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-brand-accent-primary">
                        <span>{item.stage || `Phase ${idx + 1}`}</span>
                        <span className="text-brand-text-secondary font-normal">{item.estimatedTime}</span>
                      </div>
                      <h4 className="text-sm font-bold text-brand-text-primary">{item.title}</h4>
                      <p className="text-xs text-brand-text-secondary">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-brand-border pt-4">
                <button 
                  onClick={() => setAiResultModal(null)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-sm font-bold border border-brand-border text-brand-text-secondary hover:text-brand-text-primary"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleApplyAIRoadmap('append')}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-sm font-bold border border-brand-accent-secondary/50 text-brand-accent-secondary hover:bg-brand-accent-secondary/10 transition-colors"
                >
                  Append to Existing
                </button>
                <button 
                  onClick={() => handleApplyAIRoadmap('replace')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-brand-accent-secondary to-brand-accent-primary text-brand-bg-primary shadow-[0_0_15px_rgba(25,211,174,0.4)] hover:opacity-90 transition-all active:scale-95"
                >
                  Set as Active Roadmap
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Add Custom Task */}
      <AnimatePresence>
        {showAddCustomModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card max-w-lg w-full p-6 space-y-5 border border-brand-border shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-brand-border pb-3">
                <h2 className="text-lg font-bold text-brand-text-primary flex items-center gap-2">
                  <Plus className="text-brand-accent-primary" size={18} /> Add Custom Roadmap Item
                </h2>
                <button onClick={() => setShowAddCustomModal(false)} className="p-1 text-brand-text-secondary hover:text-brand-text-primary">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddCustomTaskSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-text-secondary">Task / Module Title *</label>
                  <input 
                    type="text" 
                    required
                    value={customTitle} 
                    onChange={e => setCustomTitle(e.target.value)} 
                    placeholder="e.g. GraphQL & Apollo Client Integration" 
                    className="w-full bg-brand-bg-primary border border-brand-border rounded-xl px-3 py-2 text-sm text-brand-text-primary focus:outline-none focus:border-brand-accent-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-text-secondary">Description</label>
                  <textarea 
                    rows={2}
                    value={customDescription} 
                    onChange={e => setCustomDescription(e.target.value)} 
                    placeholder="Short summary of what you will learn or build..." 
                    className="w-full bg-brand-bg-primary border border-brand-border rounded-xl px-3 py-2 text-sm text-brand-text-primary focus:outline-none focus:border-brand-accent-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-text-secondary">Type</label>
                    <select 
                      value={customType} 
                      onChange={e => setCustomType(e.target.value as any)} 
                      className="w-full bg-brand-bg-primary border border-brand-border rounded-xl px-3 py-2 text-sm text-brand-text-primary focus:outline-none focus:border-brand-accent-primary"
                    >
                      <option value="course">Course</option>
                      <option value="project">Project</option>
                      <option value="certification">Certification</option>
                      <option value="topic">Self Study Topic</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-text-secondary">Estimated Duration</label>
                    <input 
                      type="text" 
                      value={customTime} 
                      onChange={e => setCustomTime(e.target.value)} 
                      placeholder="e.g. 2 weeks" 
                      className="w-full bg-brand-bg-primary border border-brand-border rounded-xl px-3 py-2 text-sm text-brand-text-primary focus:outline-none focus:border-brand-accent-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-text-secondary">Stage / Phase</label>
                  <input 
                    type="text" 
                    value={customStage} 
                    onChange={e => setCustomStage(e.target.value)} 
                    placeholder="e.g. Phase 2: Core Architecture" 
                    className="w-full bg-brand-bg-primary border border-brand-border rounded-xl px-3 py-2 text-sm text-brand-text-primary focus:outline-none focus:border-brand-accent-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-text-secondary">Skills Targeted (Comma Separated)</label>
                  <input 
                    type="text" 
                    value={customSkills} 
                    onChange={e => setCustomSkills(e.target.value)} 
                    placeholder="e.g. GraphQL, React, Caching" 
                    className="w-full bg-brand-bg-primary border border-brand-border rounded-xl px-3 py-2 text-sm text-brand-text-primary focus:outline-none focus:border-brand-accent-primary"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-brand-border">
                  <button 
                    type="button" 
                    onClick={() => setShowAddCustomModal(false)}
                    className="px-4 py-2 rounded-xl text-sm font-bold text-brand-text-secondary hover:text-brand-text-primary"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2 rounded-xl text-sm font-bold bg-brand-accent-primary text-brand-bg-primary hover:shadow-[0_0_15px_rgba(25,211,174,0.4)] transition-all"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
