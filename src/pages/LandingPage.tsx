import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, Target, Briefcase, ChevronRight, CheckCircle2, Sparkles, LayoutDashboard, Users, TrendingUp, Code2, FileJson, Palette, Database, Cpu } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-bg-primary text-brand-text-primary overflow-hidden font-sans selection:bg-brand-accent-primary/30">

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-brand-bg-primary/80 backdrop-blur-md border-b border-brand-border/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <BrainCircuit className="text-brand-accent-primary" size={32} />
              <div className="absolute inset-0 bg-brand-accent-primary blur-lg opacity-40"></div>
            </div>
            <span className="text-xl font-bold tracking-tight">SkillForge <span className="text-brand-accent-secondary">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-brand-text-secondary hover:text-brand-text-primary transition-colors">Features</a>
            <a href="#solutions" className="text-sm font-medium text-brand-text-secondary hover:text-brand-text-primary transition-colors">Solutions</a>
            <a href="#impact" className="text-sm font-medium text-brand-text-secondary hover:text-brand-text-primary transition-colors">Impact</a>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/login" className="text-sm font-medium hover:text-brand-accent-primary transition-colors hidden sm:block">Sign In</Link>
            <Link to="/login" className="group bg-brand-text-primary text-brand-bg-primary px-5 py-2.5 rounded-full text-sm font-bold hover:bg-brand-accent-primary transition-all duration-300 shadow-lg hover:shadow-brand-accent-primary/25 active:scale-95 flex items-center gap-1">
              Get Started <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        {/* Premium Tech Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-accent-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto">

            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-accent-primary/30 bg-brand-accent-primary/10 text-brand-accent-primary text-xs font-bold uppercase tracking-wider mb-8">
              <Sparkles size={14} /> The Future of Skill Management
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Bridge the gap between <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent-primary to-brand-accent-secondary">
                learning & mastery
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-brand-text-secondary mb-12 leading-relaxed max-w-2xl mx-auto">
              The AI-driven ecosystem that empowers students to map their skills, analyze knowledge gaps, and discover personalized pathways for ultimate career readiness.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login" className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-accent-primary text-brand-bg-primary px-8 py-4 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(25,211,174,0.4)] hover:-translate-y-1 active:scale-95 transition-all duration-300">
                Build My Skill Profile <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <a href="#features" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold border border-brand-border bg-brand-bg-secondary hover:bg-brand-card hover:border-brand-text-secondary/50 hover:-translate-y-1 active:scale-95 transition-all duration-300">
                Explore Platform
              </a>
            </motion.div>
          </motion.div>

          {/* Dashboard Preview Mockup */}
          <div className="mt-40 relative mx-auto max-w-6xl text-left" style={{ perspective: '1200px' }}>
            <motion.div
              initial={{ opacity: 0, y: 200, rotateX: 25, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-brand-accent-secondary/20 to-transparent blur-3xl -z-10"></div>
              <div className="rounded-2xl border border-brand-border/80 bg-brand-bg-secondary/40 backdrop-blur-sm p-2 shadow-2xl overflow-hidden ring-1 ring-white/10">
                <div className="rounded-xl overflow-hidden bg-brand-card flex border border-brand-border/50">
                  {/* Mock Sidebar */}
                  <div className="w-64 border-r border-brand-border p-6 hidden md:block bg-brand-card/50">
                    <div className="flex items-center gap-2 mb-10">
                      <BrainCircuit className="text-brand-accent-primary" size={24} />
                      <span className="font-black text-brand-text-primary text-xl tracking-tight">SkillForge <span className="text-brand-accent-secondary">AI</span></span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between px-4 py-3 bg-brand-accent-primary/10 text-brand-accent-primary rounded-xl text-sm font-bold border border-brand-accent-primary/20 shadow-sm">
                        <div className="flex items-center gap-3"><LayoutDashboard size={18} /> Dashboard</div>
                      </div>
                      <div className="flex items-center gap-3 px-4 py-3 text-brand-text-secondary hover:text-brand-text-primary hover:bg-brand-bg-primary rounded-xl text-sm font-semibold transition-colors">
                        <Target size={18} /> My Skills
                      </div>
                      <div className="flex items-center gap-3 px-4 py-3 text-brand-text-secondary hover:text-brand-text-primary hover:bg-brand-bg-primary rounded-xl text-sm font-semibold transition-colors">
                        <Briefcase size={18} /> Projects
                      </div>
                      <div className="flex items-center justify-between px-4 py-3 text-brand-text-secondary hover:text-brand-text-primary hover:bg-brand-bg-primary rounded-xl text-sm font-semibold transition-colors">
                        <div className="flex items-center gap-3"><TrendingUp size={18} /> Gap Analysis</div>
                        <span className="w-2 h-2 rounded-full bg-brand-highlight shadow-[0_0_8px_rgba(251,191,36,0.6)]"></span>
                      </div>
                    </div>
                  </div>

                  {/* Mock Content */}
                  <div className="flex-1 p-6 lg:p-10 relative bg-brand-bg-secondary/20">
                    <div className="flex justify-between items-end mb-8">
                      <div>
                        <h2 className="text-3xl font-bold text-brand-text-primary mb-2 tracking-tight">Good morning, Vamsi</h2>
                        <p className="text-sm text-brand-text-secondary">Here's how your skill profile is progressing towards your goals.</p>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 bg-brand-text-primary text-brand-bg-primary px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-black/5 hover:scale-105 transition-transform">
                        <Sparkles size={16} className="text-brand-accent-primary" /> Analyze Profile
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                      <div className="bg-brand-card rounded-2xl border border-brand-border p-6 shadow-sm relative overflow-hidden group hover:border-brand-accent-primary/50 transition-colors">

                        <p className="text-xs text-brand-text-secondary font-bold uppercase tracking-wider mb-3">Overall Readiness</p>
                        <div className="flex items-end gap-3">
                          <h3 className="text-4xl font-black text-brand-text-primary leading-none tracking-tight">85<span className="text-xl text-brand-text-secondary font-bold">%</span></h3>
                          <span className="text-brand-success text-xs font-bold bg-brand-success/10 px-2.5 py-1 rounded-md mb-1 flex items-center gap-1">↑ 12%</span>
                        </div>
                      </div>

                      <div className="bg-brand-card rounded-2xl border border-brand-border p-6 shadow-sm relative overflow-hidden group hover:border-brand-accent-secondary/50 transition-colors">

                        <p className="text-xs text-brand-text-secondary font-bold uppercase tracking-wider mb-3">Career Match</p>
                        <h3 className="text-xl font-bold text-brand-text-primary leading-tight mb-1">Full Stack Dev</h3>
                        <p className="text-sm text-brand-accent-secondary font-bold">94% Alignment</p>
                      </div>

                      <div className="bg-brand-card rounded-2xl border border-brand-border p-6 shadow-sm relative overflow-hidden group hover:border-brand-highlight/50 transition-colors">

                        <p className="text-xs text-brand-text-secondary font-bold uppercase tracking-wider mb-3">Priority Gap</p>
                        <h3 className="text-xl font-bold text-brand-text-primary leading-tight mb-1">System Design</h3>
                        <p className="text-sm text-brand-highlight font-bold">Medium Impact</p>
                      </div>
                    </div>

                    <div className="bg-brand-card rounded-2xl border border-brand-border p-8 shadow-sm">
                      <div className="flex items-center justify-between mb-8">
                        <h4 className="font-bold text-brand-text-primary text-lg">Skill Progression</h4>
                        <span className="text-xs font-bold text-brand-text-secondary bg-brand-bg-primary px-3 py-1.5 rounded-lg border border-brand-border">Last 6 months</span>
                      </div>

                      {/* Sophisticated Bar Chart Mockup */}
                      <div className="flex items-end justify-between h-40 gap-4 mt-4 relative">
                        {/* Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between border-b border-brand-border/50 pb-8 pointer-events-none">
                          <div className="border-t border-brand-border/30 w-full border-dashed"></div>
                          <div className="border-t border-brand-border/30 w-full border-dashed"></div>
                          <div className="border-t border-brand-border/30 w-full border-dashed"></div>
                        </div>

                        {[40, 55, 48, 70, 85, 95].map((h, i) => (
                          <div key={i} className="w-full flex flex-col items-center justify-end h-full z-10 group">
                            <div className="w-full max-w-[48px] bg-brand-accent-primary/10 rounded-t-md group-hover:bg-brand-accent-primary/20 transition-all duration-300 relative overflow-hidden" style={{ height: `${h}%` }}>
                              <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-accent-primary"></div>
                              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-brand-accent-primary/10"></div>
                            </div>
                            <span className="text-xs text-brand-text-secondary mt-3 font-semibold">Mo {i + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Bento Box */}
      <section id="features" className="py-24 bg-brand-bg-secondary/30 border-y border-brand-border/50 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Engineered for Excellence</h2>
            <p className="text-brand-text-secondary text-lg">Under the hood, SkillForge AI leverages cutting-edge technology to provide a seamless, intelligent experience for all users.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[280px]">
            {/* Big Bento 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2 rounded-3xl bg-brand-card border border-brand-border p-8 overflow-hidden relative group shadow-sm hover:shadow-xl hover:border-brand-accent-primary/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent-primary/5 to-transparent"></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-brand-accent-primary/10 flex items-center justify-center text-brand-accent-primary mb-6">
                  <BrainCircuit size={28} />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-brand-text-primary tracking-tight">AI Resume Parsing</h3>
                <p className="text-brand-text-secondary max-w-sm mb-8 text-lg">Our proprietary AI pipeline extracts skills, projects, and experiences with incredible accuracy, instantly mapping them to industry-standard skill ontologies.</p>
                <div className="mt-auto flex-1 rounded-2xl border border-brand-border/50 bg-brand-bg-primary/80 backdrop-blur p-6 relative overflow-hidden shadow-inner">
                  <div className="flex flex-col gap-4">
                    <div className="bg-brand-bg-primary/50 p-4 rounded-xl border border-brand-border text-xs md:text-sm text-brand-text-secondary leading-relaxed relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-brand-bg-primary to-transparent pointer-events-none z-10"></div>
                      <span className="text-brand-text-primary font-bold text-base">Alex Chen</span><br />
                      Full Stack Developer<br />
                      <br />
                      Experience:<br />
                      • Developed a scalable backend REST API using <span className="bg-brand-accent-secondary/20 text-brand-accent-secondary px-1 rounded font-medium">Node.js</span> and Express.<br />
                      • Architected the frontend user interface utilizing <span className="bg-brand-accent-primary/20 text-brand-accent-primary px-1 rounded font-medium">React</span> and Tailwind.<br />
                      • Managed and optimized relational datasets in <span className="bg-brand-highlight/20 text-brand-highlight px-1 rounded font-medium">PostgreSQL</span>.
                    </div>

                    <div className="relative pt-3 border-t border-brand-border/50">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-bg-primary px-3 text-[10px] font-bold text-brand-text-secondary uppercase tracking-wider">AI Extracted Skills</div>
                      <div className="flex flex-wrap gap-2 mt-2 justify-center">
                        <span className="px-3 py-1 bg-brand-accent-primary/10 text-brand-accent-primary rounded-lg text-xs font-bold border border-brand-accent-primary/30">React</span>
                        <span className="px-3 py-1 bg-brand-accent-secondary/10 text-brand-accent-secondary rounded-lg text-xs font-bold border border-brand-accent-secondary/30">Node.js</span>
                        <span className="px-3 py-1 bg-brand-highlight/10 text-brand-highlight rounded-lg text-xs font-bold border border-brand-highlight/30">PostgreSQL</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Small Bento 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="md:col-span-2 rounded-3xl bg-brand-card border border-brand-border p-8 overflow-hidden relative group shadow-sm hover:shadow-xl hover:border-brand-accent-secondary/50 transition-all duration-500 flex flex-col justify-center"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-brand-accent-secondary/10 flex items-center justify-center text-brand-accent-secondary mb-5">
                  <TrendingUp size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-brand-text-primary tracking-tight">Real-time Gap Analysis</h3>
                <p className="text-brand-text-secondary text-base">Compare your current proficiency against market demands instantly. Identify exactly what you need to learn next to land your dream role.</p>
              </div>
            </motion.div>

            {/* Small Bento 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="md:col-span-1 rounded-3xl bg-brand-card border border-brand-border p-8 overflow-hidden relative group shadow-sm hover:shadow-xl hover:border-brand-highlight/50 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-highlight/10 flex items-center justify-center text-brand-highlight mb-5">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-brand-text-primary tracking-tight">Interactive Trees</h3>
              <p className="text-brand-text-secondary text-sm">Visualize dependencies and learning paths clearly and easily.</p>
            </motion.div>

            {/* Small Bento 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="md:col-span-1 rounded-3xl bg-brand-card border border-brand-border p-8 overflow-hidden relative group shadow-sm hover:shadow-xl hover:border-brand-success/50 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-success/10 flex items-center justify-center text-brand-success mb-5">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-brand-text-primary tracking-tight">Verified Proof</h3>
              <p className="text-brand-text-secondary text-sm">Back up your claims with linked GitHub repos and certs.</p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Solutions / Personas */}
      <section id="solutions" className="py-24 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">One ecosystem. <br className="hidden md:block" /> Three powerful perspectives.</h2>
            <p className="text-brand-text-secondary text-lg">SkillForge AI connects the dots between learning and hiring by providing specialized tools for everyone involved in the education lifecycle.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student Card */}
            <motion.div
              whileHover={{ y: -10 }}
              className="glass-card p-10 border-t-2 border-brand-accent-primary relative group overflow-hidden"
            >

              <div className="w-14 h-14 rounded-xl bg-brand-accent-primary/10 flex items-center justify-center text-brand-accent-primary mb-6">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">For Students</h3>
              <p className="text-brand-text-secondary leading-relaxed mb-6">Track your skills, analyze gaps, and get AI-powered roadmaps tailored exactly to your dream career.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 size={16} className="text-brand-accent-primary" /> Automated Resume Builder</li>
                <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 size={16} className="text-brand-accent-primary" /> AI Skill Gap Analysis</li>
                <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 size={16} className="text-brand-accent-primary" /> Verified Portfolios</li>
              </ul>
            </motion.div>

            {/* Faculty Card */}
            <motion.div
              whileHover={{ y: -10 }}
              className="glass-card p-10 border-t-2 border-brand-accent-secondary relative group overflow-hidden"
            >

              <div className="w-14 h-14 rounded-xl bg-brand-accent-secondary/10 flex items-center justify-center text-brand-accent-secondary mb-6">
                <LayoutDashboard size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">For Faculty</h3>
              <p className="text-brand-text-secondary leading-relaxed mb-6">Monitor cohort performance, identify curriculum gaps, and ensure students are industry-ready.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 size={16} className="text-brand-accent-secondary" /> Department Analytics</li>
                <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 size={16} className="text-brand-accent-secondary" /> Placement Tracking</li>
                <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 size={16} className="text-brand-accent-secondary" /> Trend Forecasting</li>
              </ul>
            </motion.div>

            {/* Recruiter Card */}
            <motion.div
              whileHover={{ y: -10 }}
              className="glass-card p-10 border-t-2 border-brand-highlight relative group overflow-hidden"
            >

              <div className="w-14 h-14 rounded-xl bg-brand-highlight/10 flex items-center justify-center text-brand-highlight mb-6">
                <Users size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">For Recruiters</h3>
              <p className="text-brand-text-secondary leading-relaxed mb-6">Cut through the noise. Search and filter candidates based on verified skills and project proof, not just degrees.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 size={16} className="text-brand-highlight" /> Skill-based Sourcing</li>
                <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 size={16} className="text-brand-highlight" /> Instant Shortlisting</li>
                <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 size={16} className="text-brand-highlight" /> Candidate Comparison</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Flowchart */}
      <section id="workflow" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">How SkillForge Works</h2>
            <p className="text-brand-text-secondary text-lg">A seamless pipeline from student input to recruiter matching, powered entirely by our custom AI Engine.</p>
          </motion.div>

          <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-[64px] left-[10%] right-[10%] h-0.5 bg-brand-border z-0">
              <div className="h-full bg-brand-accent-secondary/50 w-full animate-[pulse_3s_ease-in-out_infinite]"></div>
            </div>

            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-brand-card border border-brand-border p-8 rounded-3xl w-full md:w-1/3 relative z-10 text-center shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 mx-auto bg-brand-accent-primary/10 rounded-2xl flex items-center justify-center text-brand-accent-primary mb-6 border border-brand-accent-primary/20 relative">
                <span className="text-2xl font-black">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-brand-text-primary">Input Data</h3>
              <p className="text-brand-text-secondary text-sm">Students sync their GitHub, upload their resumes, and set their dream career goals.</p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-brand-card border-2 border-brand-accent-secondary/50 p-8 rounded-3xl w-full md:w-1/3 relative z-10 text-center shadow-[0_0_30px_rgba(46,204,113,0.15)]"
            >
              <div className="w-16 h-16 mx-auto bg-brand-accent-secondary/10 rounded-2xl flex items-center justify-center text-brand-accent-secondary mb-6 border border-brand-accent-secondary/20 relative">
                <BrainCircuit size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-brand-text-primary">AI Processing</h3>
              <p className="text-brand-text-secondary text-sm">The Engine validates the skills, calculates the gap to the goal, and builds an interactive learning tree.</p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-brand-card border border-brand-border p-8 rounded-3xl w-full md:w-1/3 relative z-10 text-center shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 mx-auto bg-brand-highlight/10 rounded-2xl flex items-center justify-center text-brand-highlight mb-6 border border-brand-highlight/20 relative">
                <span className="text-2xl font-black">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-brand-text-primary">Achieve Mastery</h3>
              <p className="text-brand-text-secondary text-sm">Students unlock personalized learning roadmaps, while faculty gain deep insights into cohort performance.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-brand-bg-secondary/30 border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-accent-primary/30 bg-brand-accent-primary/5 text-brand-accent-primary text-xs font-bold uppercase tracking-wider mb-6">
                  <BrainCircuit size={14} /> Intelligence Engine
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">AI that understands your true potential.</h2>
                <p className="text-lg text-brand-text-secondary mb-8">
                  Our proprietary AI doesn't just read your resume. It analyzes the specific technologies in your projects, the difficulty of your certifications, and the length of your internships to map a perfect mathematical model of your capabilities.
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="mt-1 bg-brand-bg-primary p-2 rounded-lg border border-brand-border text-brand-accent-primary"><TrendingUp size={20} /></div>
                    <div>
                      <h4 className="font-bold text-lg">Skill Gap Analysis</h4>
                      <p className="text-brand-text-secondary text-sm">Instantly know what skills you're missing for your target role.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1 bg-brand-bg-primary p-2 rounded-lg border border-brand-border text-brand-accent-secondary"><Briefcase size={20} /></div>
                    <div>
                      <h4 className="font-bold text-lg">Career Match Scoring</h4>
                      <p className="text-brand-text-secondary text-sm">See exactly how closely you match live job requirements.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:w-1/2 relative w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute inset-0 bg-brand-accent-primary/20 blur-[100px] rounded-full"></div>
                <div className="relative glass-card p-6 border border-brand-border/80">
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-brand-border">
                    <h3 className="font-bold text-xl text-brand-text-primary">Match Analysis</h3>
                    <span className="bg-brand-accent-primary/20 text-brand-accent-primary px-3 py-1 rounded-full text-sm font-bold">94% Match</span>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-sm mb-1.5"><span className="font-medium">React / Frontend</span><span className="text-brand-accent-primary font-bold">Mastered</span></div>
                      <div className="h-2.5 bg-brand-bg-primary rounded-full overflow-hidden shadow-inner"><motion.div initial={{ width: 0 }} whileInView={{ width: '95%' }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-gradient-to-r from-brand-accent-primary/60 to-brand-accent-primary rounded-full shadow-[0_0_10px_rgba(25,211,174,0.5)]"></motion.div></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1.5"><span className="font-medium">System Architecture</span><span className="text-brand-highlight font-bold">Learning</span></div>
                      <div className="h-2.5 bg-brand-bg-primary rounded-full overflow-hidden shadow-inner"><motion.div initial={{ width: 0 }} whileInView={{ width: '40%' }} transition={{ duration: 1, delay: 0.4 }} className="h-full bg-gradient-to-r from-brand-highlight/60 to-brand-highlight rounded-full shadow-[0_0_10px_rgba(243,156,18,0.5)]"></motion.div></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1.5"><span className="font-medium">Database (SQL)</span><span className="text-brand-accent-secondary font-bold">Advanced</span></div>
                      <div className="h-2.5 bg-brand-bg-primary rounded-full overflow-hidden shadow-inner"><motion.div initial={{ width: 0 }} whileInView={{ width: '80%' }} transition={{ duration: 1, delay: 0.6 }} className="h-full bg-gradient-to-r from-brand-accent-secondary/60 to-brand-accent-secondary rounded-full shadow-[0_0_10px_rgba(77,168,218,0.5)]"></motion.div></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-accent-primary/5"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to forge your future?</h2>
          <p className="text-xl text-brand-text-secondary mb-12">
            Join thousands of students building their verified skill portfolios and mastering the technologies of tomorrow.
          </p>
          <Link to="/login" className="inline-flex items-center justify-center gap-2 bg-brand-text-primary text-brand-bg-primary px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-2xl">
            Create Free Account <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-brand-border bg-brand-bg-secondary pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <BrainCircuit className="text-brand-accent-primary" size={24} />
                <span className="text-xl font-bold tracking-tight">SkillForge <span className="text-brand-accent-secondary">AI</span></span>
              </div>
              <p className="text-brand-text-secondary max-w-sm">
                The ultimate platform for bridging the gap between academic learning and industry requirements.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-brand-text-secondary">
                <li><a href="#" className="hover:text-brand-accent-primary transition-colors">For Students</a></li>
                <li><a href="#" className="hover:text-brand-accent-primary transition-colors">For Faculty</a></li>
                <li><a href="#" className="hover:text-brand-accent-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-brand-accent-primary transition-colors">Source Code</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Project</h4>
              <ul className="space-y-2 text-sm text-brand-text-secondary">
                <li><a href="#" className="hover:text-brand-accent-primary transition-colors">Architecture</a></li>
                <li><a href="#" className="hover:text-brand-accent-primary transition-colors">Research Paper</a></li>
                <li><a href="#" className="hover:text-brand-accent-primary transition-colors">Capstone Team</a></li>
                <li><a href="#" className="hover:text-brand-accent-primary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-brand-border/50 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-brand-text-secondary">
            <p>© 2026 SkillForge AI. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-brand-text-primary">Privacy Policy</a>
              <a href="#" className="hover:text-brand-text-primary">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
