import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase credentials in .env");
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("Starting seed process...");

  // We will create 3 accounts
  const accounts = [
    { email: 'student@example.com', password: 'password123', role: 'student', full_name: 'Arjun Kumar' },
    { email: 'faculty@example.com', password: 'password123', role: 'faculty', full_name: 'Dr. Sarah Chen' },
    { email: 'recruiter@example.com', password: 'password123', role: 'recruiter', full_name: 'TechCorp HR' }
  ];

  let studentId = null;

  for (const acc of accounts) {
    console.log(`Signing up ${acc.email}...`);
    const { data, error } = await supabase.auth.signUp({
      email: acc.email,
      password: acc.password,
    });

    if (error) {
      console.error(`Error signing up ${acc.email}:`, error.message);
      // If user already exists, let's try to sign in to get their ID
      if (error.message.includes('already registered')) {
        const { data: signInData } = await supabase.auth.signInWithPassword({ email: acc.email, password: acc.password });
        if (signInData?.user) {
            if (acc.role === 'student') studentId = signInData.user.id;
        }
      }
    } else if (data.user) {
      console.log(`Successfully created ${acc.email} with ID ${data.user.id}`);
      
      // Wait for auth trigger to finish if they had one, or insert manually
      console.log(`Inserting profile for ${acc.email}...`);
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        role: acc.role,
        full_name: acc.full_name
      });
      
      if (profileError && !profileError.message.includes('duplicate')) {
         console.error(`Profile insert error:`, profileError.message);
      }

      if (acc.role === 'student') {
        studentId = data.user.id;
      }
    }
  }

  // Seed data for student
  if (studentId) {
    console.log(`Seeding data for student ${studentId}...`);
    // Note: To seed data bypassing RLS if we're not logged in as the student, we normally need the Service Role key.
    // However, since we just signed up/in as the student (or recruiter as the last one), we might not have the student's auth context active.
    // Let's re-authenticate as the student to ensure RLS allows inserts.
    await supabase.auth.signInWithPassword({ email: 'student@example.com', password: 'password123' });

    // Seed Skills
    const skills = ['React', 'JavaScript', 'Node.js', 'PostgreSQL'];
    for (const skill of skills) {
        // First insert into global dictionary if not exists
        let skillRecord;
        const { data: existingSkill } = await supabase.from('skills').select('id').eq('name', skill).single();
        
        if (!existingSkill) {
            const { data: newSkill } = await supabase.from('skills').insert({ name: skill, category: 'Web' }).select().single();
            skillRecord = newSkill;
        } else {
            skillRecord = existingSkill;
        }

        if (skillRecord) {
            await supabase.from('user_skills').insert({
                user_id: studentId,
                skill_id: skillRecord.id,
                proficiency_level: Math.floor(Math.random() * 40) + 50
            });
        }
    }

    // Seed Projects
    await supabase.from('projects').insert([
        {
            user_id: studentId,
            title: 'AI Retinal Screening',
            description: 'Deep learning model to detect retinal diseases using TensorFlow and OpenCV.',
            github_url: 'https://github.com/example/ai-retinal'
        },
        {
            user_id: studentId,
            title: 'Student Skill Platform',
            description: 'Full stack platform for skill tracking using React and Node.',
            github_url: 'https://github.com/example/skillforge'
        }
    ]);
    
    console.log("Successfully seeded student data!");
  }

  console.log("Seeding complete!");
}

seed().catch(console.error);
