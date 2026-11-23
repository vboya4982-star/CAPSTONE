import React, { useRef, useState } from 'react';
import { useAppStore } from '../../lib/store';
import { FileText, Download, Printer, CheckCircle2, ShieldCheck, Layout, Sparkles } from 'lucide-react';

export default function ResumeBuilder() {
  const { state } = useAppStore();
  const printRef = useRef<HTMLDivElement>(null);
  const [templateMode, setTemplateMode] = useState<'ats' | 'modern'>('ats');

  const handlePrint = () => {
    window.print();
  };

  // Group skills by category for clean ATS inline text rendering
  const skillCategories = Array.from(new Set(state.skills.map(s => s.category)));
  const uniqueProjects = Array.from(new Map(state.projects.map(p => [p.name.toLowerCase().trim(), p])).values());

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-text-primary flex items-center gap-2">
            <FileText className="text-brand-accent-secondary" /> Resume Builder
          </h1>
          <p className="text-sm text-brand-text-secondary mt-1">
            Auto-populated from your verified profile. Switch templates for online applications or direct networking.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handlePrint} 
            className="bg-brand-bg-secondary border border-brand-border text-brand-text-primary px-4 py-2 rounded-xl font-semibold flex items-center gap-2 hover:bg-brand-card transition-colors active:scale-95 text-sm"
          >
            <Printer size={16} /> Print PDF
          </button>
          <button 
            onClick={handlePrint} 
            className="bg-brand-accent-primary text-brand-bg-primary px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity active:scale-95 text-sm shadow-[0_0_15px_rgba(25,211,174,0.3)]"
          >
            <Download size={16} /> Download
          </button>
        </div>
      </div>

      {/* Template Selection & ATS Readiness Score Banner */}
      <div className="glass-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-brand-card via-brand-bg-secondary/30 to-brand-card border border-brand-border">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-brand-success/10 border border-brand-success/20 text-brand-success rounded-xl shrink-0">
            <ShieldCheck size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-accent-primary bg-brand-accent-primary/10 px-2.5 py-0.5 rounded-md border border-brand-accent-primary/20">
                {templateMode === 'ats' ? 'ATS Standard Layout' : 'Modern Executive Layout'}
              </span>
              <span className="text-xs text-brand-text-secondary font-medium">• Single-Column Format</span>
            </div>
            <p className="text-sm font-bold text-brand-text-primary mt-0.5">
              {templateMode === 'ats' 
                ? 'ATS-Optimized Single-Column Template (Recommended for job applications & web portals)'
                : 'Modern 2-Column Executive Template (Recommended for direct email & networking)'}
            </p>
          </div>
        </div>

        {/* Template Selector Buttons */}
        <div className="flex items-center bg-brand-bg-primary p-1 rounded-xl border border-brand-border shrink-0 self-start md:self-auto">
          <button 
            onClick={() => setTemplateMode('ats')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              templateMode === 'ats' 
                ? 'bg-brand-accent-primary text-brand-bg-primary shadow-md' 
                : 'text-brand-text-secondary hover:text-brand-text-primary'
            }`}
          >
            <CheckCircle2 size={14} /> ATS Friendly (1-Column)
          </button>
          <button 
            onClick={() => setTemplateMode('modern')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              templateMode === 'modern' 
                ? 'bg-brand-accent-primary text-brand-bg-primary shadow-md' 
                : 'text-brand-text-secondary hover:text-brand-text-primary'
            }`}
          >
            <Layout size={14} /> Modern (2-Column)
          </button>
        </div>
      </div>

      {/* Printable Resume Canvas Container */}
      <div className="glass-card p-6 md:p-12 bg-gray-100 text-gray-900 rounded-xl overflow-x-auto shadow-2xl printable-resume">
        <div 
          ref={printRef} 
          className="min-w-[800px] max-w-[850px] mx-auto bg-white p-8 md:p-12 shadow-sm border border-gray-200" 
          style={{ fontFamily: "'Inter', Arial, sans-serif", color: "#1f2937" }}
        >
          
          {/* ========================================================= */}
          {/* TEMPLATE 1: ATS-FRIENDLY SINGLE COLUMN (PARSER-OPTIMIZED) */}
          {/* ========================================================= */}
          {templateMode === 'ats' ? (
            <div className="space-y-6">
              
              {/* ATS Header (Centered, Clear hierarchy, no table cells) */}
              <header className="border-b-2 border-gray-900 pb-5 text-center">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight uppercase mb-1.5">
                  {state.user.name}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-gray-700">
                  <span>{state.user.email}</span>
                  {state.user.phone && <span>| {state.user.phone}</span>}
                  {state.user.location && <span>| {state.user.location}</span>}
                  {state.user.department && <span>| {state.user.department}, {state.user.year}</span>}
                  {state.user.github && (
                    <span>| <a href={state.user.github} target="_blank" rel="noreferrer" className="text-gray-900 underline font-semibold">{state.user.github.replace('https://', '')}</a></span>
                  )}
                  {state.user.linkedin && (
                    <span>| <a href={state.user.linkedin} target="_blank" rel="noreferrer" className="text-gray-900 underline font-semibold">{state.user.linkedin.replace('https://', '')}</a></span>
                  )}
                </div>
              </header>

              {/* ATS Summary */}
              {state.user.bio && (
                <section>
                  <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-400 pb-1 mb-2">
                    PROFESSIONAL SUMMARY
                  </h2>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {state.user.bio}
                  </p>
                </section>
              )}

              {/* ATS Education */}
              <section>
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-400 pb-1 mb-2">
                  EDUCATION
                </h2>
                <div className="flex justify-between items-baseline text-xs">
                  <div>
                    <span className="font-bold text-gray-900">Bachelor of Science in {state.user.department || 'Computer Science'}</span>
                    <span className="text-gray-600 block">University Institute of Technology</span>
                  </div>
                  <span className="font-semibold text-gray-600">Expected 2026 • {state.user.year}</span>
                </div>
              </section>

              {/* ATS Technical Skills (Categorized Plain Text - 100% Parsable) */}
              <section>
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-400 pb-1 mb-2">
                  TECHNICAL SKILLS
                </h2>
                <div className="space-y-1.5 text-xs text-gray-800">
                  {skillCategories.map(cat => {
                    const skillsInCat = state.skills.filter(s => s.category === cat).map(s => s.name).join(', ');
                    return (
                      <div key={cat} className="flex">
                        <span className="font-bold text-gray-900 w-44 shrink-0">• {cat}:</span>
                        <span>{skillsInCat}</span>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* ATS Professional Experience */}
              <section>
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-400 pb-1 mb-3">
                  WORK EXPERIENCE
                </h2>
                <div className="space-y-4">
                  {state.internships.map(intern => (
                    <div key={intern.id} className="space-y-1">
                      <div className="flex justify-between items-baseline text-xs font-bold text-gray-900">
                        <span>{intern.role} — <span className="font-semibold text-gray-700">{intern.company}</span></span>
                        <span className="text-gray-600 font-normal">
                          {new Date(intern.startDate).toLocaleDateString('en-US', {month: 'short', year:'numeric'})} – {intern.endDate ? new Date(intern.endDate).toLocaleDateString('en-US', {month: 'short', year:'numeric'}) : 'Present'}
                        </span>
                      </div>
                      <ul className="list-disc list-inside text-xs text-gray-700 space-y-1 leading-relaxed pl-1">
                        {intern.description.split('. ').filter(Boolean).map((bullet, bIdx) => (
                          <li key={bIdx}>{bullet.endsWith('.') ? bullet : `${bullet}.`}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* ATS Technical Projects */}
              <section>
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-400 pb-1 mb-3">
                  TECHNICAL PROJECTS
                </h2>
                <div className="space-y-4">
                  {uniqueProjects.map(project => (
                    <div key={project.id} className="space-y-1">
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="font-bold text-gray-900">{project.name} <span className="font-normal text-gray-600">| {project.role}</span></span>
                        {project.technologies.length > 0 && (
                          <span className="text-gray-600 font-semibold text-[11px]">
                            Tech: {project.technologies.join(', ')}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        • {project.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ATS Certifications */}
              <section>
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-400 pb-1 mb-2">
                  CERTIFICATIONS & LICENSES
                </h2>
                <ul className="list-disc list-inside text-xs text-gray-800 space-y-1">
                  {state.certifications.map(cert => (
                    <li key={cert.id}>
                      <span className="font-bold text-gray-900">{cert.name}</span> — {cert.issuer} ({new Date(cert.issueDate).getFullYear()})
                    </li>
                  ))}
                </ul>
              </section>

            </div>
          ) : (

            /* ========================================================= */
            /* TEMPLATE 2: MODERN EXECUTIVE 2-COLUMN (DESIGN ORIENTED)   */
            /* ========================================================= */
            <div className="space-y-6">
              {/* Header */}
              <header className="border-b-2 border-gray-900 pb-6 mb-6">
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">{state.user.name}</h1>
                <div className="flex flex-wrap gap-3 text-sm font-medium text-gray-600">
                  <span>{state.user.email}</span>
                  {state.user.phone && <span>• {state.user.phone}</span>}
                  {state.user.location && <span>• {state.user.location}</span>}
                  {state.user.department && <span>• {state.user.department}, {state.user.year}</span>}
                  {state.user.github && (
                    <span>• <a href={state.user.github} target="_blank" rel="noreferrer" className="text-gray-900 underline font-bold">{state.user.github.replace('https://', '')}</a></span>
                  )}
                  {state.user.linkedin && (
                    <span>• <a href={state.user.linkedin} target="_blank" rel="noreferrer" className="text-gray-900 underline font-bold">{state.user.linkedin.replace('https://', '')}</a></span>
                  )}
                </div>
                <p className="mt-4 text-sm text-gray-700 leading-relaxed max-w-3xl">
                  {state.user.bio}
                </p>
              </header>

              <div className="grid grid-cols-12 gap-8">
                {/* Left Column */}
                <div className="col-span-8 space-y-6">
                  
                  {/* Experience */}
                  <section>
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-1">Professional Experience</h2>
                    <div className="space-y-4">
                      {state.internships.map(intern => (
                        <div key={intern.id}>
                          <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-gray-900">{intern.role}</h3>
                            <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
                              {new Date(intern.startDate).toLocaleDateString('en-US', {month: 'short', year:'numeric'})} - {intern.endDate ? new Date(intern.endDate).toLocaleDateString('en-US', {month: 'short', year:'numeric'}) : 'Present'}
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-gray-600 mb-2">{intern.company}</p>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {intern.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Projects */}
                  <section>
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-1">Technical Projects</h2>
                    <div className="space-y-5">
                      {uniqueProjects.map(project => (
                        <div key={project.id}>
                          <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                              {project.name}
                            </h3>
                          </div>
                          <p className="text-xs font-medium text-gray-500 mb-2">Role: {project.role}</p>
                          <p className="text-sm text-gray-700 leading-relaxed mb-2">
                            {project.description}
                          </p>
                          <p className="text-xs text-gray-600"><span className="font-semibold text-gray-900">Technologies:</span> {project.technologies.join(', ')}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                </div>

                {/* Right Column */}
                <div className="col-span-4 space-y-6">
                  
                  {/* Skills */}
                  <section>
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-1">Technical Skills</h2>
                    <div className="space-y-3">
                      {skillCategories.map(cat => (
                        <div key={cat}>
                          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1.5">{cat}</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {state.skills.filter(s => s.category === cat).map(skill => (
                              <span key={skill.id} className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded font-medium border border-gray-200">
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Certifications */}
                  <section>
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-1">Certifications</h2>
                    <div className="space-y-3">
                      {state.certifications.map(cert => (
                        <div key={cert.id} className="text-sm">
                          <h3 className="font-bold text-gray-900 leading-tight mb-0.5">{cert.name}</h3>
                          <p className="text-gray-600 text-xs mb-0.5">{cert.issuer}</p>
                          <p className="text-gray-500 text-[10px] uppercase font-semibold">Issued: {new Date(cert.issueDate).getFullYear()}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                  
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
      
      {/* CSS for printing */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          .printable-resume, .printable-resume * {
            visibility: visible;
          }
          .printable-resume {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            background: white !important;
          }
        }
      `}} />
    </div>
  );
}

