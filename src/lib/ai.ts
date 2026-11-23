import Groq from 'groq-sdk';

const apiKey = import.meta.env.VITE_GROQ_API_KEY;

// Only initialize if the key is present to prevent crashes in environments without it
export const groq = apiKey ? new Groq({ apiKey, dangerouslyAllowBrowser: true }) : null;

export async function parseResumeWithAI(resumeText: string) {
  if (!groq) throw new Error("Groq API key not configured.");

  const prompt = `
    You are an expert technical recruiter AI. 
    Extract the candidate's skills and projects from the following resume text.
    Return ONLY a valid JSON object with the following structure, and nothing else:
    {
      "skills": [
        { "name": "React", "category": "Web Development", "proficiency": 80 }
      ],
      "projects": [
        { "name": "Project Name", "description": "Short description", "technologies": ["React", "Node"] }
      ]
    }
    
    Resume Text:
    """
    ${resumeText}
    """
  `;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "openai/gpt-oss-120b",
    temperature: 0.1,
    response_format: { type: "json_object" } // Enforce JSON response
  });

  let content = completion.choices[0]?.message?.content;
  if (!content) throw new Error("Failed to parse resume.");
  
  // Extract JSON if the model included reasoning or markdown blocks
  const jsonMatch = content.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
  if (jsonMatch) {
    content = jsonMatch[1];
  } else {
    const startIndex = content.indexOf('{');
    const endIndex = content.lastIndexOf('}');
    if (startIndex !== -1 && endIndex !== -1) {
       content = content.substring(startIndex, endIndex + 1);
    }
  }

  return JSON.parse(content);
}

export async function generateCandidateComparison(candidateA: any, candidateB: any, jobTitle: string) {
  if (!groq) throw new Error("Groq API key not configured.");

  const prompt = `
    You are an expert Senior Technical Recruiter. You are hiring for the role of: "${jobTitle}".
    Compare these two candidates based on their skills and projects.
    
    Candidate A (${candidateA.name}):
    Skills: ${JSON.stringify(candidateA.skills)}
    Projects: ${JSON.stringify(candidateA.projects)}

    Candidate B (${candidateB.name}):
    Skills: ${JSON.stringify(candidateB.skills)}
    Projects: ${JSON.stringify(candidateB.projects)}

    Return ONLY a valid JSON object with the following structure, and nothing else:
    {
      "winner": "Candidate A or Candidate B",
      "reasoning": "1-2 sentences explaining why they are better suited for the ${jobTitle} role.",
      "loser_strength": "1 sentence explaining a specific technical strength the other candidate has that the winner lacks."
    }
  `;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "openai/gpt-oss-120b",
    temperature: 0.2,
    response_format: { type: "json_object" }
  });

  let content = completion.choices[0]?.message?.content;
  if (!content) throw new Error("Failed to generate comparison.");

  const jsonMatch = content.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
  if (jsonMatch) {
    content = jsonMatch[1];
  } else {
    const startIndex = content.indexOf('{');
    const endIndex = content.lastIndexOf('}');
    if (startIndex !== -1 && endIndex !== -1) {
       content = content.substring(startIndex, endIndex + 1);
    }
  }

  return JSON.parse(content);
}

export async function generateCareerPaths(studentProfile: any) {
  if (!groq) throw new Error("Groq API key not configured.");

  const prompt = `
    You are an expert Career Counselor and Tech Recruiter.
    Analyze the following student profile:
    Skills: ${JSON.stringify(studentProfile.skills)}
    Projects: ${JSON.stringify(studentProfile.projects)}

    Based strictly on their current skills and projects, generate 3 highly specific, realistic career paths for them.
    Return ONLY a valid JSON object with the following structure, and nothing else:
    {
      "careers": [
        {
          "id": "c1",
          "title": "Job Title (e.g., Data Engineer)",
          "description": "2 sentences explaining why this fits their profile.",
          "matchPercentage": 85,
          "salary": "$90k - $120k",
          "demand": "High",
          "requiredSkills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"]
        }
      ]
    }
  `;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "openai/gpt-oss-120b",
    temperature: 0.3,
    response_format: { type: "json_object" }
  });

  let content = completion.choices[0]?.message?.content;
  if (!content) throw new Error("Failed to generate career paths.");

  const jsonMatch = content.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
  if (jsonMatch) {
    content = jsonMatch[1];
  } else {
    const startIndex = content.indexOf('{');
    const endIndex = content.lastIndexOf('}');
    if (startIndex !== -1 && endIndex !== -1) {
       content = content.substring(startIndex, endIndex + 1);
    }
  }

  return JSON.parse(content);
}

export async function generateAIRoadmap(targetRole: string, currentSkills: any[] = [], focus: string = 'Balanced Multi-Phase') {
  if (!groq) {
    return getFallbackRoadmap(targetRole, focus);
  }

  const prompt = `
    You are an expert tech career counselor and senior engineering lead.
    Generate a complete, personalized 4-phase learning roadmap for a student aiming to become a: "${targetRole}".
    Current Student Skills: ${JSON.stringify(currentSkills.map(s => s.name || s))}
    Learning Focus / Goal: ${focus}

    Return ONLY a valid JSON object with the following structure, and nothing else:
    {
      "role": "${targetRole}",
      "summary": "2-sentence strategic career summary explaining the generated roadmap.",
      "totalDuration": "12-16 weeks",
      "items": [
        {
          "id": "1",
          "title": "Module or Step Title",
          "description": "2-3 sentences explaining exact topics, concepts, or project specs.",
          "type": "course",
          "status": "upcoming",
          "estimatedTime": "2 weeks",
          "stage": "Phase 1: Core Fundamentals",
          "difficulty": "Beginner",
          "skills": ["Skill 1", "Skill 2"]
        }
      ]
    }
    Generate 5 to 7 detailed roadmap items grouped across Phase 1, Phase 2, Phase 3, and Phase 4. Use type as 'course', 'project', 'certification', or 'topic'.
  `;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "openai/gpt-oss-120b",
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    let content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("No content received from AI.");

    const jsonMatch = content.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
    if (jsonMatch) content = jsonMatch[1];
    else {
      const startIndex = content.indexOf('{');
      const endIndex = content.lastIndexOf('}');
      if (startIndex !== -1 && endIndex !== -1) {
        content = content.substring(startIndex, endIndex + 1);
      }
    }
    return JSON.parse(content);
  } catch (err) {
    console.warn("Groq API unavailable, using smart template fallback:", err);
    return getFallbackRoadmap(targetRole, focus);
  }
}

function getFallbackRoadmap(role: string, focus: string) {
  const normalized = role.toLowerCase();
  
  if (normalized.includes('frontend') || normalized.includes('ui/ux')) {
    return {
      role,
      summary: `Tailored frontend development roadmap focused on modern UI frameworks, responsive design system, state management, and performance optimization.`,
      totalDuration: '12 weeks',
      items: [
        { id: '1', title: 'Modern JavaScript (ES6+) & DOM', description: 'Deep dive into asynchronous JS, promises, Event Loop, closures, and modular architecture.', type: 'course', status: 'completed', estimatedTime: '2 weeks', stage: 'Phase 1: Core Fundamentals', difficulty: 'Beginner', skills: ['JavaScript', 'HTML5/CSS3'] },
        { id: '2', title: 'React 18 & State Architecture', description: 'Master component composition, custom hooks, Context API, and state machines.', type: 'course', status: 'completed', estimatedTime: '3 weeks', stage: 'Phase 1: Core Fundamentals', difficulty: 'Intermediate', skills: ['React', 'TypeScript'] },
        { id: '3', title: 'Tailwind CSS & Design Systems', description: 'Build responsive design systems, accessibility (a11y), dark mode, and reusable component libraries.', type: 'course', status: 'in-progress', estimatedTime: '2 weeks', stage: 'Phase 2: UI Mastery', difficulty: 'Intermediate', skills: ['Tailwind CSS', 'Figma'] },
        { id: '4', title: 'Next.js Server-Side Rendering & App Router', description: 'Build SSR & SSG web applications with server components, dynamic routing, and SEO optimization.', type: 'course', status: 'upcoming', estimatedTime: '3 weeks', stage: 'Phase 3: Full-Stack Integration', difficulty: 'Advanced', skills: ['Next.js', 'SSR'] },
        { id: '5', title: 'Interactive Portfolio Dashboard Project', description: 'Develop a high-performance web dashboard featuring micro-interactions, dark mode, and real-time API integrations.', type: 'project', status: 'upcoming', estimatedTime: '2 weeks', stage: 'Phase 4: Capstone', difficulty: 'Advanced', skills: ['React', 'Tailwind', 'REST API'] }
      ]
    };
  }

  if (normalized.includes('ai') || normalized.includes('machine learning') || normalized.includes('data')) {
    return {
      role,
      summary: `End-to-end AI & Data Science roadmap building strong foundations in Python, mathematical modeling, deep learning architectures, and cloud deployment.`,
      totalDuration: '14 weeks',
      items: [
        { id: '1', title: 'Python for Data Analysis & Pandas', description: 'Data manipulation, NumPy vectorization, data cleaning, and statistical EDA.', type: 'course', status: 'completed', estimatedTime: '2 weeks', stage: 'Phase 1: Mathematical Foundations', difficulty: 'Beginner', skills: ['Python', 'Pandas', 'NumPy'] },
        { id: '2', title: 'Applied Machine Learning Algorithms', description: 'Supervised and unsupervised learning: Regression, Random Forests, XGBoost, and model evaluation.', type: 'course', status: 'completed', estimatedTime: '3 weeks', stage: 'Phase 2: Core ML Models', difficulty: 'Intermediate', skills: ['Scikit-Learn', 'Statistics'] },
        { id: '3', title: 'Deep Learning & Neural Networks', description: 'Train Neural Networks, CNNs for computer vision, and PyTorch/TensorFlow fundamentals.', type: 'course', status: 'in-progress', estimatedTime: '4 weeks', stage: 'Phase 3: Deep Learning', difficulty: 'Advanced', skills: ['PyTorch', 'TensorFlow'] },
        { id: '4', title: 'Large Language Models & RAG Architecture', description: 'Prompt engineering, fine-tuning LLMs, vector database integration (Pinecone/Chroma), and LangChain.', type: 'course', status: 'upcoming', estimatedTime: '3 weeks', stage: 'Phase 4: Generative AI', difficulty: 'Advanced', skills: ['LLMs', 'Vector DB', 'LangChain'] },
        { id: '5', title: 'AI Production Deployment Capstone', description: 'Deploy an end-to-end AI application with Streamlit/FastAPI, Docker containerization, and cloud API endpoints.', type: 'project', status: 'upcoming', estimatedTime: '2 weeks', stage: 'Phase 4: Generative AI', difficulty: 'Advanced', skills: ['FastAPI', 'Docker', 'MLOps'] }
      ]
    };
  }

  // Default Full Stack / Software Engineer Roadmap
  return {
    role,
    summary: `Comprehensive Full-Stack Software Engineering roadmap bridging frontend client architecture, backend API design, database modeling, and DevOps deployment.`,
    totalDuration: '16 weeks',
    items: [
      { id: '1', title: 'JavaScript & Web Fundamentals', description: 'Master core language mechanics, ES6+ standards, DOM manipulation, and asynchronous programming.', type: 'course', status: 'completed', estimatedTime: 'Completed', stage: 'Phase 1: Client Foundations', difficulty: 'Beginner', skills: ['JavaScript', 'HTML/CSS'] },
      { id: '2', title: 'React Advanced Architecture', description: 'Single-page web applications, custom hooks, reusable design tokens, and state management patterns.', type: 'course', status: 'completed', estimatedTime: 'Completed', stage: 'Phase 1: Client Foundations', difficulty: 'Intermediate', skills: ['React', 'State Management'] },
      { id: '3', title: 'SQL & Database Architecture', description: 'Relational database schema design, index optimization, PostgreSQL queries, and transactions.', type: 'course', status: 'completed', estimatedTime: '4 weeks', stage: 'Phase 2: Server Architecture', difficulty: 'Intermediate', skills: ['SQL', 'PostgreSQL'] },
      { id: '4', title: 'Node.js & Express RESTful Services', description: 'Scalable backend services, JWT authorization middleware, input validation, and ORM integrations.', type: 'course', status: 'completed', estimatedTime: '6 weeks', stage: 'Phase 2: Server Architecture', difficulty: 'Intermediate', skills: ['Node.js', 'Express', 'JWT'] },
      { id: '5', title: 'Mastering Advanced SQL & Performance', description: 'Complex analytics, CTEs, query plan execution analysis, indexing strategies, and caching with Redis.', type: 'course', status: 'upcoming', estimatedTime: '4 weeks', stage: 'Phase 3: System Design & Mastery', difficulty: 'Advanced', skills: ['SQL', 'Redis', 'Performance'] },
      { id: '6', title: 'Full Stack Microservices & Cloud Deployment', description: 'Build and deploy a scalable web app using Docker, CI/CD pipelines, and cloud hosting infrastructure.', type: 'project', status: 'upcoming', estimatedTime: '3 weeks', stage: 'Phase 4: Capstone Production', difficulty: 'Advanced', skills: ['Docker', 'CI/CD', 'Cloud'] }
    ]
  };
}
