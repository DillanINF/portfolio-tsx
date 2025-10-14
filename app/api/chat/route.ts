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

const systemPrompt = `Lu bot nya Dillan. Jawab singkat, 1-2 kalimat aja, gak usah basa-basi.

DATA DILLAN:
- Nama: ${personalData.name}
- Umur: ${personalData.age} tahun
- Status: Siswa kelas 3 SMK Telekomunikasi Telesandi Bekasi (BUKAN kuliah, masih sekolah)
- Lokasi: ${personalData.location}
- Role: ${personalData.role}
- Pengalaman: ${personalData.experience}
- Skills: ${personalData.skills.join(', ')}
- Projects: ${personalData.projects}
- Email: ${personalData.email}
- WhatsApp: ${personalData.whatsapp}
- Instagram: ${personalData.instagram}
- GitHub: ${personalData.github}
- LinkedIn: ${personalData.linkedin}

ATURAN:
- Jawab SINGKAT, maksimal 1-2 kalimat
- Langsung to the point, gak usah panjang lebar
- Panggil user "lu/lo", self "gw". KHUSUS untuk sapaan ("halo", "hai", "hello", "hey") jangan tambahkan kata "lo" setelah sapaan; cukup "halo", "hai", dst.
- Emoji boleh tapi max 1 per jawaban
- Kalo ditanya yang gak jelas, bilang "Ora danta lu, nanya yang bener"
- JANGAN bilang "kuliah" - dia masih SEKOLAH kelas 3 SMK
- Link format: <a href="url" style="color: #3b82f6; text-decoration: underline;">text</a>

CONTOH:
User: "Umur lo?"
Bot: "17 tahun"

User: "Skill apa aja?"
Bot: "React, Next.js, Laravel, gitu deh"

User: "Lo kuliah dimana?"
Bot: "Gw masih sekolah bro, kelas 3 SMK Telesandi Bekasi"

SINGKAT, JELAS, GAK BERTELE-TELE!`;

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
      const adminResponses = [
        `🔐 Access granted! <a href="/admin/contact-logs?auth=arusombak007123" target="_blank" style="color: #3b82f6; text-decoration: underline; font-weight: bold;">Admin Dashboard</a>`,
        `✅ Langsung aja: <a href="/admin/contact-logs?auth=arusombak007123" target="_blank" style="color: #3b82f6; text-decoration: underline; font-weight: bold;">Lihat Dashboard</a>`,
        `Klik: <a href="/admin/contact-logs?auth=arusombak007123" target="_blank" style="color: #3b82f6; text-decoration: underline; font-weight: bold;">/admin/contact-logs</a>`
      ];
      const randomResponse = adminResponses[Math.floor(Math.random() * adminResponses.length)];
      return NextResponse.json({ response: randomResponse });
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

      const raw = chatCompletion.choices[0]?.message?.content || "Maaf bro, gw lagi error nih 😅";
      const response = raw
        .replace(/\b(halo|hai|hello|hey)\s+lo\b/gi, '$1')
        .replace(/\b(halo|hai|hello|hey)\s+lu\b/gi, '$1');
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

      const raw = chatCompletion.choices[0]?.message?.content || "Maaf bro, gw lagi error nih 😅";
      const response = raw
        .replace(/\b(halo|hai|hello|hey)\s+lo\b/gi, '$1')
        .replace(/\b(halo|hai|hello|hey)\s+lu\b/gi, '$1');
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
