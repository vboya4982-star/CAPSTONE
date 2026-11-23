import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabase';

// --- Types ---
export type Skill = { id: string; name: string; category: string; proficiency: number; verified: boolean };
export type Project = { id: string; name: string; description: string; technologies: string[]; role: string; github: string; demo: string };
export type Certification = { id: string; name: string; issuer: string; issueDate: string; expiryDate: string; credentialId: string; verified: boolean };
export type Internship = { id: string; company: string; role: string; startDate: string; endDate: string; description: string };
export type CareerGoal = { id: string; title: string; matchPercentage: number; requiredSkills: { name: string; required: number }[] };
export type RoadmapItem = { 
  id: string; 
  title: string; 
  description?: string;
  type: 'course' | 'project' | 'certification' | 'topic'; 
  status: 'completed' | 'in-progress' | 'upcoming'; 
  estimatedTime: string; 
  stage?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  skills?: string[];
};

type AppState = {
  user: { 
    id?: string; 
    name: string; 
    email: string; 
    role: 'student' | 'faculty' | 'recruiter'; 
    department?: string; 
    year?: string; 
    bio?: string; 
    avatar?: string;
    github?: string;
    linkedin?: string;
    phone?: string;
    location?: string;
    college?: string;
  };
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  internships: Internship[];
  targetCareer: CareerGoal | null;
  roadmap: RoadmapItem[];
};

// --- Initial Demo Data (Boya Vamsi) ---
const initialData: AppState = {
  user: {
    name: 'Boya Vamsi',
    email: 'vamsi@student.com',
    role: 'student',
    department: 'Computer Science & Engineering',
    college: 'Kalasalingam University',
    year: '4th Year',
    bio: 'Passionate Full-Stack AI Engineer specializing in React 19, TypeScript, Supabase, and Groq LLM integrations.',
    github: 'https://github.com/vamsi-boya',
    linkedin: 'https://linkedin.com/in/boya-vamsi',
    phone: '+91 98765 43210',
    location: 'Hyderabad, India'
  },
  skills: [
    { id: '1', name: 'React', category: 'Frontend', proficiency: 90, verified: true },
    { id: '2', name: 'TypeScript', category: 'Frontend', proficiency: 85, verified: true },
    { id: '3', name: 'Node.js', category: 'Backend', proficiency: 82, verified: true },
    { id: '4', name: 'Python', category: 'AI & Machine Learning', proficiency: 88, verified: true },
    { id: '5', name: 'SQL', category: 'Databases', proficiency: 75, verified: false },
    { id: '6', name: 'System Design', category: 'Architecture', proficiency: 68, verified: false },
    { id: '7', name: 'Tailwind CSS', category: 'Frontend', proficiency: 92, verified: false },
  ],
  projects: [
    { id: '1', name: 'AI Retinal Screening', description: 'Deep learning model to detect retinal diseases.', technologies: ['Python', 'TensorFlow', 'OpenCV'], role: 'Lead ML Engineer', github: '#', demo: '#' },
    { id: '2', name: 'Student Skill Platform', description: 'Full stack platform for skill tracking.', technologies: ['React', 'Node.js', 'PostgreSQL'], role: 'Full Stack Developer', github: '#', demo: '#' },
  ],
  certifications: [
    { id: '1', name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', issueDate: '2023-05-12', expiryDate: '2026-05-12', credentialId: 'AWS-12345', verified: true },
    { id: '2', name: 'Python Certification', issuer: 'HackerRank', issueDate: '2023-01-10', expiryDate: 'N/A', credentialId: 'HR-9876', verified: true },
  ],
  internships: [
    { id: '1', company: 'TechCorp Solutions', role: 'Full Stack Developer Intern', startDate: '2023-06-01', endDate: '2023-08-30', description: 'Developed internal tools using React and Node.js. Improved API response times by 20%.' },
  ],
  targetCareer: {
    id: 'c1', title: 'Full Stack Developer', matchPercentage: 76,
    requiredSkills: [
      { name: 'React', required: 80 }, { name: 'JavaScript', required: 80 },
      { name: 'Node.js', required: 75 }, { name: 'SQL', required: 80 },
      { name: 'System Design', required: 70 }
    ]
  },
  roadmap: [
    { id: '1', title: 'JavaScript Fundamentals', description: 'Master ES6+, async/await, closures, and modern DOM patterns.', type: 'course', status: 'completed', estimatedTime: 'Completed', stage: 'Phase 1: Foundations', difficulty: 'Beginner', skills: ['JavaScript', 'ES6+'] },
    { id: '2', title: 'React Advanced Patterns', description: 'Deep dive into custom hooks, context state management, and performance tuning.', type: 'course', status: 'completed', estimatedTime: 'Completed', stage: 'Phase 1: Foundations', difficulty: 'Intermediate', skills: ['React', 'Hooks', 'Context API'] },
    { id: '3', title: 'SQL & Database Design', description: 'Database normalization, indexing, complex query execution, and PostgreSQL joins.', type: 'course', status: 'completed', estimatedTime: '4 weeks', stage: 'Phase 2: Backend Architecture', difficulty: 'Intermediate', skills: ['SQL', 'PostgreSQL'] },
    { id: '4', title: 'Node.js Backend Architecture', description: 'Build REST APIs, JWT authentication middleware, and microservice communication.', type: 'course', status: 'completed', estimatedTime: '6 weeks', stage: 'Phase 2: Backend Architecture', difficulty: 'Intermediate', skills: ['Node.js', 'Express', 'JWT'] },
    { id: '5', title: 'Mastering Advanced SQL', description: 'Window functions, CTEs, query optimization, and partitioning for scale.', type: 'course', status: 'upcoming', estimatedTime: '4 weeks', stage: 'Phase 3: Deep Mastery', difficulty: 'Advanced', skills: ['SQL', 'Optimization'] },
  ]
};

// --- Context Setup ---
type AppContextType = {
  state: AppState;
  setUser: (user: AppState['user']) => void;
  setHydratedData: (data: Partial<AppState>) => void;
  addSkill: (skill: Omit<Skill, 'id' | 'verified'>) => Promise<void>;
  updateSkill: (id: string, proficiency: number) => void;
  deleteSkill: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateRoadmapStatus: (id: string, status: RoadmapItem['status']) => void;
  addToRoadmap: (item: Omit<RoadmapItem, 'id' | 'status'> & { status?: RoadmapItem['status'] }) => void;
  deleteFromRoadmap: (id: string) => void;
  replaceRoadmap: (items: RoadmapItem[]) => void;
  setTargetCareer: (career: CareerGoal) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('skillforge_data');
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem('skillforge_data', JSON.stringify(state));
  }, [state]);

  const setHydratedData = (data: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...data }));
  };

  const setUser = (user: AppState['user']) => {
    setState(prev => ({ ...prev, user: { ...prev.user, ...user } }));
  };

  const addSkill = async (skill: Omit<Skill, 'id' | 'verified'>) => {
    // 1. Optimistic UI update
    const tempId = Date.now().toString();
    const newSkill: Skill = { ...skill, id: tempId, verified: false };
    setState(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));

    // 2. Save to Supabase
    if (state.user.id) {
       // Check if skill exists in global dictionary
       let skillId;
       const { data: existing } = await supabase.from('skills').select('id').eq('name', skill.name).maybeSingle();
       if (existing) {
         skillId = existing.id;
       } else {
         const { data: created, error } = await supabase.from('skills').insert({ name: skill.name, category: skill.category }).select().maybeSingle();
         if (created) skillId = created.id;
         if (error) console.error("Error creating skill (check RLS):", error.message);
       }

       if (skillId) {
          const { data: userSkill } = await supabase.from('user_skills').insert({
            user_id: state.user.id,
            skill_id: skillId,
            proficiency_level: skill.proficiency
          }).select('skill_id').single();
          
          // Update the temp ID with the real database ID if needed
          if (userSkill) {
            setState(prev => ({
              ...prev,
              skills: prev.skills.map(s => s.id === tempId ? { ...s, id: userSkill.skill_id } : s)
            }));
          }
       }
    }
  };

  const updateSkill = (id: string, proficiency: number) => {
    setState(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === id ? { ...s, proficiency } : s)
    }));
  };

  const deleteSkill = (id: string) => {
    setState(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== id) }));
  };

  const addProject = async (project: Omit<Project, 'id'>) => {
    const tempId = Date.now().toString();
    const newProject: Project = { ...project, id: tempId };
    setState(prev => ({ ...prev, projects: [...prev.projects, newProject] }));

    if (state.user.id) {
       const { data } = await supabase.from('projects').insert({
         user_id: state.user.id,
         title: project.name,
         description: project.description,
         github_url: project.github,
         live_url: project.demo
       }).select('id').single();

       if (data) {
         setState(prev => ({
           ...prev,
           projects: prev.projects.map(p => p.id === tempId ? { ...p, id: data.id } : p)
         }));
       }
    }
  };
  
  const updateRoadmapStatus = (id: string, status: RoadmapItem['status']) => {
    setState(prev => ({
      ...prev,
      roadmap: prev.roadmap.map(r => r.id === id ? { ...r, status } : r)
    }));
  };

  const addToRoadmap = (item: Omit<RoadmapItem, 'id' | 'status'> & { status?: RoadmapItem['status'] }) => {
    const newItem: RoadmapItem = { 
      ...item, 
      id: Date.now().toString() + Math.random().toString(36).substring(2, 5), 
      status: item.status || 'upcoming' 
    };
    setState(prev => ({ ...prev, roadmap: [...prev.roadmap, newItem] }));
  };

  const deleteFromRoadmap = (id: string) => {
    setState(prev => ({
      ...prev,
      roadmap: prev.roadmap.filter(r => r.id !== id)
    }));
  };

  const replaceRoadmap = (items: RoadmapItem[]) => {
    setState(prev => ({
      ...prev,
      roadmap: items
    }));
  };

  const setTargetCareer = (career: CareerGoal) => {
    setState(prev => ({ ...prev, targetCareer: career }));
  };

  return (
    <AppContext.Provider value={{ 
      state, setUser, setHydratedData, addSkill, updateSkill, deleteSkill, 
      addProject, updateRoadmapStatus, addToRoadmap, deleteFromRoadmap, 
      replaceRoadmap, setTargetCareer 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error('useAppStore must be used within an AppProvider');
  return context;
};
