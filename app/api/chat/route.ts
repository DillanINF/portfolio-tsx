import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

const personalData = {
  name: 'Dillan Ilkham Nur Fazry',
  age: '17',
  location: 'Bekasi, Indonesia',
  school: 'SMK Telekomunikasi Telesandi Bekasi',
  role: 'Web Developer',
  experience: '1+ years',
  skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB', 'PHP', 'Laravel'],
  projects: '10+',
  email: 'dilaninf6@gmail.com',
  whatsapp: '+62 855-9102-2177',
  instagram: '@Dlan12_',
  github: 'https://github.com/DillanINF',
  linkedin: 'https://www.linkedin.com/in/dillan-inf',
  facebook: 'https://facebook.com/Dlaan'
};

const systemPrompt = `You are a concise assistant for Dillan Ilkham Nur Fazry's portfolio. Answer in maximum 5 words when possible, or one short sentence. Be extremely brief.

DATA:
Nama: ${personalData.name}
Umur: ${personalData.age} tahun
Sekolah: SMK Telekomunikasi Telesandi Bekasi kelas 3
Lokasi: ${personalData.location}
Role: ${personalData.role}
Experience: ${personalData.experience}
Skills: ${personalData.skills.join(', ')}
Email: ${personalData.email}
WhatsApp: ${personalData.whatsapp}
Instagram: ${personalData.instagram}
GitHub: ${personalData.github}
LinkedIn: ${personalData.linkedin}

RULES:
- Maximum 5 words or 1 short sentence
- No greetings, no introductions, just answer the question
- No emoji
- Indonesian or English based on user's language
- For greetings, just say "Halo" or "Hi"

EXAMPLES:
User: "halo"
Bot: "Halo"

User: "Siapa nama kamu?"
Bot: "Dillan Ilkham Nur Fazry"

User: "Umur?"
Bot: "18 tahun"

User: "Skill apa?"
Bot: "React, Next.js, TypeScript, Laravel"

User: "Sekolah dimana?"
Bot: "SMK Telesandi Bekasi kelas 3"

User: "Email?"
Bot: "dilaninf6@gmail.com"

BE EXTREMELY BRIEF. NO INTRODUCTIONS. NO EXTRA WORDS.`;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.HF_TOKEN || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Missing API credentials', details: 'Set HF_TOKEN or OPENAI_API_KEY in environment variables' },
        { status: 500 }
      );
    }

    const client = new OpenAI({
      baseURL: "https://router.huggingface.co/v1",
      apiKey,
    });

    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Check for admin password first (case-insensitive)
    if (message.toLowerCase().includes('arusombak007123')) {
      return NextResponse.json({ 
        response: `Akses diberikan. <a href="/admin/contact-logs?auth=arusombak007123" target="_blank" style="color: #3b82f6; text-decoration: underline; font-weight: bold;">Buka Admin Dashboard</a>` 
      });
    }

    // Check for profanity
    const profanityMap: { [key: string]: string } = {
      'kontol': 'kontol',
      'anjing': 'anjing',
      'memek': 'memek',
      'ngentot': 'ngentot',
      'bangsat': 'bangsat',
      'tolol': 'tolol',
      'babi': 'babi',
      'goblok': 'goblok',
      'kampret': 'kampret',
      'jancok': 'jancok',
      'coli': 'coli',
      'perek': 'perek'
    };

    const lowerMessage = message.toLowerCase();
    for (const [word, response] of Object.entries(profanityMap)) {
      if (lowerMessage.includes(word)) {
        return NextResponse.json({ response: `Lu, ${response}.` });
      }
    }

    // Try primary model first
    try {
      const chatCompletion = await client.chat.completions.create({
        model: "meta-llama/Meta-Llama-3-8B-Instruct",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user", 
            content: message
          }
        ],
        max_tokens: 50,
        temperature: 0.3,
        stream: false
      });

      const response = chatCompletion.choices[0]?.message?.content || "Error sistem.";
      return NextResponse.json({ response });
      
    } catch (modelError: any) {
      console.log('Primary model failed, trying fallback...', modelError.message);
      
      // Fallback to alternative model
      const chatCompletion = await client.chat.completions.create({
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user", 
            content: message
          }
        ],
        max_tokens: 50,
        temperature: 0.3,
        stream: false
      });

      const response = chatCompletion.choices[0]?.message?.content || "Error sistem.";
      return NextResponse.json({ response });
    }

  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}
