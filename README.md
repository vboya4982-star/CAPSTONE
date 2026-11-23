# SkillForge AI

> **Student Skill Mapping and Recruitment Platform for Academic-Industry Alignment**  
> *A unified, multi-role web platform designed to bridge the gap between collegiate academic preparation and corporate recruitment standards through verified portfolio evidence and low-latency GenAI intelligence.*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-skillforge--ai--five.vercel.app-brightgreen?style=for-the-badge&logo=vercel)](https://skillforge-ai-five.vercel.app)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Groq](https://img.shields.io/badge/Groq-LPU%20Inference-F05032?style=for-the-badge)](https://groq.com/)

---

## 📌 Project Overview

In conventional higher education ecosystems, student competencies are evaluated strictly through cumulative grade point averages (CGPA) and formal examination marks. These aggregate figures fail to reflect granular technical micro-skills, real-world project development, code repositories, and industry certifications. 

**SkillForge AI** solves this information asymmetry by bringing **Students**, **Faculty Mentors**, and **Corporate Recruiters** into a single interconnected, role-governed platform:
* **Students** audit their current technical proficiencies against target market roles, receive diagnostic gap scores, and follow structured 4-phase learning roadmaps.
* **Faculty** track departmental skill distributions, monitor cohort readiness, and spot at-risk students before placement drives.
* **Recruiters** search verified candidate profiles, filter by exact technical proficiencies, and run side-by-side comparative evaluations powered by AI verdicts.

---

## 🚀 Key Features

### 🎓 1. Student Module
* **Verified Skill Catalog:** Track proficiency (0–100%) across frontend, backend, AI/ML, cloud, and core CS skills. Link projects and credentials to earn objective **VERIFIED** badges.
* **AI Skill Gap Diagnostics:** Select target industry roles (e.g., *Full-Stack Developer*, *AI Engineer*, *Cloud DevOps*) to instantly calculate skill alignment percentages and missing competencies.
* **4-Phase Learning Roadmaps:** Automated curriculum generator decomposing skill deficits into:
  * **Phase 1:** Core Foundations
  * **Phase 2:** Framework Mastery
  * **Phase 3:** Systems Integration
  * **Phase 4:** Capstone Project Realization
* **ATS-Compliant Resume Builder:** Compile verified technical skills, project links, and educational credentials directly into standardized, single-click downloadable PDF resumes.

### 🏫 2. Faculty Module
* **Departmental Skill Analytics:** Live macro-level visibility into technical competency distributions across graduating batches.
* **Cohort Filtering:** Filter candidate pools by academic year, degree specialization, and specific programming languages or frameworks.
* **Early Warning System:** Proactively flag students lacking baseline project evidence or exhibiting critical skill deficits prior to campus recruitment seasons.

### 💼 3. Recruiter Module
* **Multi-Criteria Candidate Search:** Filter student profiles using granular criteria (skill tags, minimum proficiency thresholds, CGPA).
* **Job Requisition Benchmarking:** Define technical benchmarks and custom skill weights for open hiring roles.
* **Dual-Candidate AI Comparison:** Select any two candidate profiles for side-by-side vector comparison; the AI evaluates project depth, skill alignment, and GPA to deliver an objective hiring verdict.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite 5, Tailwind CSS, Lucide Icons, Framer Motion |
| **Backend & Storage** | Supabase (Managed PostgreSQL, PostgREST API, JWT Authentication) |
| **Security** | PostgreSQL Row-Level Security (RLS) policies for complete role-based data isolation |
| **AI Inference** | Groq Cloud API (Hardware-accelerated LPU inference engine with strict JSON schemas) |
| **Deployment** | Vercel Serverless Edge Platform |

---

## 🏗️ System Architecture

```
┌────────────────────────────────────────────────────────┐
│                   Client Layer                         │
│           React 19 + TypeScript + Vite                 │
│      (Student / Faculty / Recruiter Dashboards)        │
└──────────────┬──────────────────────────┬──────────────┘
               │                          │
        JWT / REST API             LPU Inference
               │                          │
┌──────────────▼─────────────┐   ┌────────▼──────────────┐
│       Database Layer       │   │   AI Intelligence     │
│    Supabase PostgreSQL     │   │    Groq Cloud API     │
│   (Tables, RLS Policies)   │   │  (Llama-3.1 / GPT-OSS)│
└────────────────────────────┘   └───────────────────────┘
```

---

## 💻 Local Development Setup

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18.0 or higher)
* [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
* Git

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/SkillForge-AI.git
   cd SkillForge-AI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the project root directory and add your credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GROQ_API_KEY=your_groq_api_key
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 👥 Project Team & Academic Credits

Developed as a **B.Tech Capstone Project** in the **Department of Computer Science and Engineering**, **School of Computing**, **Kalasalingam Academy of Research and Education**, Krishnankoil, Tamil Nadu, India.

### 👨‍💻 Student Contributors
* **B. Vamsi** – `99230040013`
* **M. Sumanth Reddy** – `99230040036`
* **K. Vamshi** – `99230040238`

### 👩‍🏫 Project Supervisor
* **Mrs. P. Kalaiarasi**, Assistant Professor  
  *Department of Computer Science and Engineering*

---

## 📄 License
This project is developed for academic research and evaluation purposes.
