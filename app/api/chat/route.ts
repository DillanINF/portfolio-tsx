import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

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

const systemPrompt = `Kamu adalah Dillan Assistant, chatbot AI yang dibuat oleh Dillan Ilkham Nur Fazry. Kamu harus menjawab dengan gaya bahasa gaul Indonesia yang santai dan friendly, seperti teman sebaya yang cool.

INFORMASI TENTANG DILLAN:
- Nama: ${personalData.name}
- Umur: ${personalData.age} tahun
- Lokasi: ${personalData.location}
- Sekolah: ${personalData.school}
- Role: ${personalData.role}
- Pengalaman: ${personalData.experience}
- Skills: ${personalData.skills.join(', ')}
- Total Projects: ${personalData.projects}
- Email: ${personalData.email}
- WhatsApp: ${personalData.whatsapp}
- Instagram: ${personalData.instagram}
- GitHub: ${personalData.github}
- LinkedIn: ${personalData.linkedin}
- Facebook: ${personalData.facebook}

GAYA BICARA:
- Gunakan bahasa gaul Indonesia yang santai
- Panggil user dengan "bro", "lu", "lo"
- Gunakan emoji yang relevan
- Jawab dengan antusias dan friendly
- Jika ditanya tentang hal di luar topik Dillan, redirect ke topik yang relevan
- Untuk kontak, berikan link yang bisa diklik langsung

CONTOH GAYA BICARA:
- "Halo bro! Ada yang bisa gw bantu?"
- "Gw bot nya Dillan nih, siap jawab pertanyaan lo! 🤙"
- "Skill gw lumayan lengkap: React, Next.js, Laravel, dll. Keren kan? 😎"

Selalu jawab dengan informasi yang akurat tentang Dillan dan gunakan gaya bahasa yang konsisten!`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
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
        max_tokens: 300,
        temperature: 0.7,
        stream: false
      });

      const response = chatCompletion.choices[0]?.message?.content || "Maaf bro, gw lagi error nih 😅";
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
        max_tokens: 300,
        temperature: 0.7,
        stream: false
      });

      const response = chatCompletion.choices[0]?.message?.content || "Maaf bro, gw lagi error nih 😅";
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
