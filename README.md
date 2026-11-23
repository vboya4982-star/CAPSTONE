# SkillForge AI

**Student Skill Mapping and Recruitment Platform for Academic-Industry Alignment**

SkillForge AI is an integrated, multi-role web platform designed to bridge the gap between academic curricula and industry recruitment standards. It enables students to build verified technical portfolios, diagnose skill gaps against real industry roles, generate AI-driven learning roadmaps, and produce ATS-compliant resumes. It also empowers faculty with cohort-level placement intelligence and provides corporate recruiters with verified candidate search and AI-assisted candidate comparison.

**Live Application:** https://skillforge-ai-five.vercel.app

---

## The Problem

Traditional academic transcripts evaluate students solely through high-level grades and Cumulative Grade Point Averages (CGPA). These aggregate scores fail to capture practical micro-skills, real-world development projects, and technical certifications. As a result:

1. **Students** lack objective guidance on what specific competencies they are missing for their target career roles.
2. **Faculty** have no centralized, real-time visibility into technical skill distributions across graduating batches to spot at-risk students before campus placements.
3. **Recruiters** spend hours manually screening unverified resumes with no standardized proof of competence.

---

## Platform Modules

### 1. Student Portal
* **Verified Skill Tracking:** Catalog skills across categories (Frontend, Backend, AI/ML, Cloud, Databases) with proficiency ratings (0–100%). Skills backed by project repositories receive a **VERIFIED** badge.
* **AI Skill Gap Analysis:** Select an industry target role (e.g., *Full-Stack Developer*, *AI Engineer*, *Cloud DevOps*) to evaluate existing skills against role requirements and calculate the exact gap.
* **4-Phase Learning Roadmap:** Automatically generates a structured, stage-wise learning plan:
  * **Phase 1:** Core Foundations
  * **Phase 2:** Framework Mastery
  * **Phase 3:** Systems Integration
  * **Phase 4:** Capstone Project Execution
* **ATS Resume Builder:** Generates a standardized, clean, single-column ATS-friendly resume from verified portfolio data.

### 2. Faculty Portal
* **Departmental Analytics:** Real-time visibility into student skill distributions, average cohort readiness, and top technical strengths across batches.
* **Student Monitoring:** Search and filter students by graduation year, degree specialization, and specific skills.
* **At-Risk Identification:** Automatically highlights students who lack verified project work or exhibit critical skill gaps ahead of placement drives.

### 3. Recruiter Portal
* **Candidate Search:** Multi-parameter search by technical skills, minimum proficiency levels, semester cohort, and CGPA.
* **Job Requisitions:** Define custom job requisitions with required skill benchmarks.
* **Dual-Candidate AI Comparison:** Select any two candidates for side-by-side evaluation; the AI engine analyzes their verified proficiencies, project depth, and academic standing to deliver an objective hiring verdict.

---

## Demo Credentials

You can test the live application using the following pre-configured evaluation accounts:

| Role | Email | Password | Access / Purpose |
| :--- | :--- | :--- | :--- |
| **Student** | `vamsi@student.com` | `Vamsi@1234` | Verified portfolio, AI gap analysis, roadmap tracker, ATS resume |
| **Faculty** | `faculty@example.com` | `password123` | Department overview, cohort filters, at-risk student tracking |
| **Recruiter** | `recruiter@example.com` | `password123` | Candidate search, job requisitions, side-by-side AI comparison |

---

## Architecture & Tech Stack

SkillForge AI follows a decoupled three-tier architecture:

```
┌────────────────────────────────────────────────────────┐
│                   Presentation Tier                    │
│             React 19 + TypeScript + Vite               │
│        (Student, Faculty & Recruiter Dashboards)       │
└──────────────┬──────────────────────────┬──────────────┘
               │                          │
        JWT / REST API             LPU Inference
               │                          │
┌──────────────▼─────────────┐   ┌────────▼──────────────┐
│       Database Tier        │   │   AI Intelligence     │
│    Supabase PostgreSQL     │   │    Groq Cloud API     │
│   (Row-Level Security)     │   │  (Structured JSON)    │
└────────────────────────────┘   └───────────────────────┘
```

* **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Framer Motion
* **Backend & Database:** Supabase (PostgreSQL with Row-Level Security, JWT Auth, PostgREST)
* **AI Inference:** Groq Cloud LPU inference API (low-latency structured JSON generation)
* **Hosting:** Vercel Serverless Edge Platform

---

## Database Schema Overview

* **`profiles`:** Stores user identity, assigned role (`student`, `faculty`, `recruiter`), full name, university, and contact links.
* **`skills`:** Global catalog of standardized technical skills and domains.
* **`user_skills`:** Junction table linking students to skills, storing proficiency level (0–100%) and verification status (`is_verified`).
* **`projects`:** Stores student software projects, descriptions, GitHub repository URLs, and live deployment links.
* **`job_requisitions`:** Recruiter job postings with required skill vectors and AI match thresholds.

---

## Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/vboya4982-star/CAPSTONE.git
cd CAPSTONE
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory (refer to `.env.example`):
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GROQ_API_KEY=your_groq_api_key
```

### 4. Run the development server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 5. Build for production
```bash
npm run build
```

---

## Project Team & Academic Credits

**Capstone Project Report**  
Department of Computer Science and Engineering  
School of Computing  
Kalasalingam Academy of Research and Education, Krishnankoil, Tamil Nadu, India

* **B. Vamsi** (Reg. No: `99230040013`)
* **M. Sumanth Reddy** (Reg. No: `99230040036`)
* **K. Vamshi** (Reg. No: `99230040238`)

**Project Supervisor:** Mrs. P. Kalaiarasi, Assistant Professor
