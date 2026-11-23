import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Users, BrainCircuit, GraduationCap, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_STUDENTS = [
  { id: 's1', name: 'Arjun Kumar', department: 'Computer Science', year: '3rd Year', readiness: 85, topGap: 'System Design', trend: 'up' },
  { id: 's2', name: 'Sarah Chen', department: 'Information Tech', year: '4th Year', readiness: 92, topGap: 'Cloud Architecture', trend: 'up' },
  { id: 's3', name: 'David Okafor', department: 'Computer Science', year: '2nd Year', readiness: 64, topGap: 'Data Structures', trend: 'down' },
  { id: 's4', name: 'Emma Wilson', department: 'Software Eng', year: '3rd Year', readiness: 78, topGap: 'Advanced SQL', trend: 'up' },
  { id: 's5', name: 'Rahul Patel', department: 'Data Science', year: '4th Year', readiness: 88, topGap: 'Machine Learning', trend: 'up' },
];

const analyticsData = [
  { month: 'Jan', averageScore: 65, activeUsers: 400 },
  { month: 'Feb', averageScore: 68, activeUsers: 450 },
  { month: 'Mar', averageScore: 71, activeUsers: 600 },
  { month: 'Apr', averageScore: 75, activeUsers: 800 },
  { month: 'May', averageScore: 79, activeUsers: 950 },
  { month: 'Jun', averageScore: 82, activeUsers: 1100 },
];

export default function FacultyDashboard() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = MOCK_STUDENTS.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-text-primary flex items-center gap-2 mb-1">
            <Activity className="text-brand-accent-secondary" /> Institution Analytics
          </h1>
          <p className="text-sm text-brand-text-secondary">Monitor student performance, departmental readiness, and institution-wide skill gaps.</p>
        </div>
      </div>
      
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Students', value: '1,248', icon: Users, color: 'text-brand-accent-primary', bg: 'bg-brand-accent-primary', border: 'border-brand-accent-primary', subtext: '+12% from last semester', subColor: 'text-brand-success' },
          { title: 'Avg Readiness', value: '78%', icon: TrendingUp, color: 'text-brand-accent-secondary', bg: 'bg-brand-accent-secondary', border: 'border-brand-accent-secondary', subtext: '+5% institution average', subColor: 'text-brand-success' },
          { title: 'Critical Gap', value: 'System Design', icon: BrainCircuit, color: 'text-brand-danger', bg: 'bg-brand-danger', border: 'border-brand-danger', subtext: 'Affects 42% of CS seniors', subColor: 'text-brand-text-secondary' },
          { title: 'Placement Rate', value: '64%', icon: GraduationCap, color: 'text-brand-highlight', bg: 'bg-brand-highlight', border: 'border-brand-highlight', subtext: 'On track for 85% target', subColor: 'text-brand-success' }
        ].map((stat, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className={`glass-card p-6 border-t-2 ${stat.border} relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]`}>
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg}/10 rounded-full blur-2xl group-hover:${stat.bg}/20 transition-colors pointer-events-none`}></div>
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-[10px] text-brand-text-secondary uppercase font-bold tracking-wider mb-2 flex items-center gap-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-brand-text-primary">{stat.value}</h3>
              </div>
              <div className={`p-2.5 ${stat.bg}/10 rounded-xl ${stat.color} border border-${stat.border}/20`}><stat.icon size={20}/></div>
            </div>
            <div className={`mt-4 flex items-center gap-1 text-xs font-bold ${stat.subColor} relative z-10`}>
              {stat.subColor === 'text-brand-success' && <ArrowUpRight size={14} />} {stat.subtext}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts */}
        <div className="lg:col-span-2 glass-card p-6 flex flex-col min-h-[400px]">
          <h3 className="text-lg font-bold mb-6 text-brand-text-primary flex items-center gap-2">
            <TrendingUp className="text-brand-accent-primary" size={18} /> Institution Readiness Growth
          </h3>
          <div className="flex-1 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#19D3AE" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#19D3AE" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" vertical={false} opacity={0.5} />
                <XAxis dataKey="month" stroke="#476282" tick={{ fill: '#476282', fontSize: 12, fontWeight: 'bold' }} axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="#476282" tick={{ fill: '#476282', fontSize: 12, fontWeight: 'bold' }} axisLine={false} tickLine={false} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(13,27,42,0.9)', backdropFilter: 'blur(10px)', borderColor: '#19D3AE', borderRadius: '12px', color: '#F1F5F9', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
                  itemStyle={{ color: '#19D3AE', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="averageScore" stroke="#19D3AE" strokeWidth={4} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performers or At Risk */}
        <div className="glass-card flex flex-col h-[400px]">
          <div className="p-5 border-b border-brand-border bg-brand-bg-secondary/50 flex flex-col gap-4 relative z-10">
            <h3 className="font-bold text-base text-brand-text-primary flex items-center gap-2">
              <Users className="text-brand-accent-secondary" size={18} /> Student Directory
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-brand-text-secondary" size={14} />
              <input 
                type="text" 
                placeholder="Search students..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-brand-bg-primary border border-brand-border rounded-lg focus:outline-none focus:border-brand-accent-primary font-bold transition-all shadow-inner"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 custom-scrollbar relative z-10">
            <AnimatePresence>
              {filteredStudents.map((student, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                  key={student.id} 
                  className="p-4 hover:bg-brand-bg-secondary/80 rounded-xl transition-all duration-300 border border-transparent hover:border-brand-accent-primary/30 mb-2 cursor-pointer group"
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <h4 className="font-bold text-sm text-brand-text-primary group-hover:text-brand-accent-primary transition-colors">{student.name}</h4>
                    <div className="flex items-center gap-2 bg-brand-bg-primary px-2 py-1 rounded-md border border-brand-border group-hover:border-brand-accent-primary/30 transition-colors">
                      <span className={`text-xs font-bold ${student.readiness >= 80 ? 'text-brand-accent-primary' : student.readiness >= 70 ? 'text-brand-highlight' : 'text-brand-danger'}`}>{student.readiness}%</span>
                      {student.trend === 'up' ? <ArrowUpRight size={14} className="text-brand-success" /> : <ArrowDownRight size={14} className="text-brand-danger" />}
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-brand-text-secondary mb-2">
                    {student.department} • {student.year}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-brand-text-secondary tracking-wider flex items-center justify-between">
                    <span>Critical Gap:</span>
                    <span className="text-brand-highlight bg-brand-highlight/10 px-2 py-0.5 rounded border border-brand-highlight/20">{student.topGap}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredStudents.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-50 py-10">
                 <Search size={32} className="mb-2" />
                 <p className="text-xs font-bold text-brand-text-secondary">No students found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
