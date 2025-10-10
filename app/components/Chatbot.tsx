'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, MessageCircle } from 'lucide-react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  image?: string;
}

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

const responses = {
  greeting: [
    "Halo bro! Gw bot nya Dillan. Ada yang bisa gw bantu? 🤙",
    "Yo! Mau tau apa tentang gw? Tanya bae gausah ragu 😎",
    "Hai! Gw di sini buat jawab semua pertanyaan lo tentang gw (dillan). Gas! 🚀"
  ],
  goodbye: [
    "Oke bro, sampai jumpa lagi!✌️",
    "Dadah! Kapan-kapan chat gw lagi ya 👋",
    "Sip, see you! Jangan lupa balik lagi 🤙",
    "Oke deh, bye bye!"
  ],
  thanks: [
    "Sama-sama bro! Santai bae 😊",
    "ora ngapa! Seneng bisa bantu 🤙",
    "Siap! Kapan bae butuh info tinggal chat gw bae 👍",
    "Oke bro, anytime! 😎"
  ],
  name: [
    `Nama gw ${personalData.name}, tapi panggil Dillan bae bro!`,
    `Gw ${personalData.name}. Nice to meet you! 🤝`
  ],
  age: [
    `Gw ${personalData.age} tahun bro,`,
    `Umur gw baru ${personalData.age} tahun,`
  ],
  location: [
    `Gw tinggal di ${personalData.location} bro.`,
    `Base gw di ${personalData.location} nih 📍`
  ],
  school: [
    `Gw sekolah di ${personalData.school}.`,
    `Lagi sekolah di ${personalData.school} nih, jurusan RPL 🎓`
  ],
  skills: [
    `Skill gw: ${personalData.skills.join(', ')}. Masih gua kembangin? `,
    `Gw cuman bisa ${personalData.skills.slice(0, 4).join(', ')}  💻`
  ],
  experience: [
    `Pengalaman coding gw baru ${personalData.experience} nih!`,
    `Udah ${personalData.experience} gw nge-code, masih terus belajar! 📈`
  ],
  projects: [
    `Gw udah bikin ${personalData.projects} proyek bro!`,
    `Portfolio gw ada ${personalData.projects} proyek yang keren-keren 🔥`
  ],
  contact: [
    `Lo bisa email gw di: ${personalData.email}`,
    `Mau kolaborasi? Email aja ke ${personalData.email} 📧`
  ],
  whatsapp: [
    `Chat gw di WA aja bro: <a href="https://wa.me/6285591022177" target="_blank" style="color: #25D366; text-decoration: underline;">${personalData.whatsapp}</a> 📱`,
    `Mau chat langsung? Klik WA gw: <a href="https://wa.me/6285591022177" target="_blank" style="color: #25D366; text-decoration: underline;">${personalData.whatsapp}</a> 💬`,
    `WA gw aktif kok: <a href="https://wa.me/6285591022177" target="_blank" style="color: #25D366; text-decoration: underline;">${personalData.whatsapp}</a> 🤙`
  ],
  instagram: [
    `Follow IG gw dong: <a href="https://instagram.com/Dlan12_" target="_blank" style="color: #E4405F; text-decoration: underline;">${personalData.instagram}</a> 📸`,
    `Cek story gw di IG: <a href="https://instagram.com/Dlan12_" target="_blank" style="color: #E4405F; text-decoration: underline;">${personalData.instagram}</a> ✨`,
    `IG gw: <a href="https://instagram.com/Dlan12_" target="_blank" style="color: #E4405F; text-decoration: underline;">${personalData.instagram}</a> - follow back! 😎`
  ],
  github: [
    `Liat code gw di GitHub: <a href="${personalData.github}" target="_blank" style="color: #333; text-decoration: underline;">${personalData.github}</a> 👨‍💻`,
    `Repository gw ada di: <a href="${personalData.github}" target="_blank" style="color: #333; text-decoration: underline;">${personalData.github}</a> 🔥`,
    `GitHub gw nih: <a href="${personalData.github}" target="_blank" style="color: #333; text-decoration: underline;">${personalData.github}</a> - star dong! ⭐`
  ],
  linkedin: [
    `Connect LinkedIn gw yuk: <a href="${personalData.linkedin}" target="_blank" style="color: #0077B5; text-decoration: underline;">${personalData.linkedin}</a> 🤝`,
    `LinkedIn gw: <a href="${personalData.linkedin}" target="_blank" style="color: #0077B5; text-decoration: underline;">${personalData.linkedin}</a> - buat networking 💼`,
    `Add LinkedIn gw: <a href="${personalData.linkedin}" target="_blank" style="color: #0077B5; text-decoration: underline;">${personalData.linkedin}</a> 📈`
  ],
  facebook: [
    `FB gw: <a href="${personalData.facebook}" target="_blank" style="color: #1877F2; text-decoration: underline;">${personalData.facebook}</a> 👍`,
    `Add FB gw dong: <a href="${personalData.facebook}" target="_blank" style="color: #1877F2; text-decoration: underline;">${personalData.facebook}</a> 😊`
  ],
  email: [
    `Email gw: <a href="mailto:${personalData.email}" style="color: #EA4335; text-decoration: underline;">${personalData.email}</a> 📧`,
    `Mau email? Ke sini: <a href="mailto:${personalData.email}" style="color: #EA4335; text-decoration: underline;">${personalData.email}</a> ✉️`,
    `Email gw buat kerjaan: <a href="mailto:${personalData.email}" style="color: #EA4335; text-decoration: underline;">${personalData.email}</a> 💼`
  ],
  hobby: [
    `Hobi gw coding, gitaran, gambar, sama emelan 🎮🎵`,
    `Gw suka main game, coding project baru, sama explore tech terbaru 🚀`,
    `Waktu luang gw coding, gaming, atau belajar hal baru 💻`
  ],
  favorite: [
    `Bahasa favorit gw JavaScript sama PHP sih 💛`,
    `Gw paling demen pake React buat frontend, Laravel buat backend 🔥`,
    `Framework andalan: React, Next.js, sama Laravel! 💪`
  ],
  tools: [
    `Tools gw: VS Code, Git, Figma, Chrome DevTools, Terminal 🛠️`,
    `Editor favorit gw VS Code, extension nya banyak banget! 😍`,
    `Gw pake Git buat version control, Figma buat design 🎨`
  ],
  life_motivation: [
    `Motivasi gw bikin solusi digital yang berguna buat banyak orang! 🌟`,
    `Gw pengen jadi developer yang bisa bikin app yang ngubah hidup orang 💫`,
    `Goal gw kontribusi di teknologi yang bikin dunia lebih baik 🌍`
  ],
  learning: [
    `Lagi belajar AI/Machine Learning sama Cloud Computing nih! 🤖`,
    `Fokus belajar React Native buat mobile, Node.js buat backend 📱`,
    `Lagi explore Docker, AWS, sama teknologi AI terbaru 🚀`
  ],
  roasting_dirman_tri: [
    `Eh lu ngomong ortu gw? Daripada lu yatim piatu 😏`,
    `Ortu gw? Mending dari pada lu yatim piatu wkwkwk 🤣`,
    `Ngapain bawa-bawa ortu gw? Lu aja yatim piatu 😂`,
    `Ortu gw baik-baik aja, lu yang yatim piatu 💀`,
    `At least ortu gw ada, lu? Yatim piatu 🗿`,
    `Jangan bawa ortu gw, lu aja yatim piatu 😭`,
    `Ortu gw proud sama gw, lu? Yatim piatu 🤪`,
    `Respect ortu gw dong, daripada lu yatim piatu 💔`,
    `Ortu gw supportive, lu yatim piatu 🙃`,
    `Untung ortu gw ada, lu yatim piatu 😎`
  ],
  roasting_general: [
    `well well well 😂`,
    `Santai bro, jangan toxic 🤙`,
    `Eh ada yang kesel ya? Chill aja 😎`,
    `Wkwkwk lu lucu deh 🤣`,
    `Oke deh kalo lu mau gitu 🗿`,
    `Sabar ya bro, hidup masih panjang 😏`,
    `Gausah emosi dong, peace ✌️`,
    `Lu kenapa sih? Bad mood? 😅`,
    `Oke lah kalo lu bilang gitu 🙄`,
    `nanya yang bener dikit bro, gua ada limitnya 🤖`
  ],
  identity: [
    `Gw bot nya Dillan bro! Asisten virtual yang kece 🤖`,
    `Nama gw Dillan Assistant, gw di sini buat bantuin lo tau tentang Dillan 😎`,
    `Gw Assistant buatan Dillan, siap jawab semua pertanyaan lo! 🚀`
  ],
  origin: [
    `Gw dari Bekasi, Indonesia bro! Kota yang oke punya 📍`,
    `Base gw di Bekasi nih, deket Jakarta tapi lebih adem 🏠`,
    `Gw orang Bekasi asli, tau gak? Kota yang berkembang pesat! 🌆`
  ],
  coding_start: [
    `Gw mulai coding dari SMA, sekitar 2 tahunan lalu sih 💻`,
    `Pertama kali ngoding pas kelas 10, langsung ketagihan! 🔥`,
    `Udah sekitar 2 tahun gw belajar coding, dari HTML sampe framework keren 📈`
  ],
  why_webdev: [
    `Soalnya web development itu keren bro! Bisa bikin sesuatu dari nol 🎨`,
    `Gw suka liat hasil karya gw bisa diakses orang di mana aja 🌍`,
    `Web development tuh creative banget, plus prospek kerjanya bagus! 💰`
  ],
  website_motivation: [
    `Gw bikin website ini buat showcase skill gw ke dunia! 🌟`,
    `Pengen nunjukin ke semua orang kalo gw bisa bikin yang keren-keren 😎`,
    `Website ini portfolio gw buat dapetin project atau kerja yang lebih kece! 🚀`
  ],
  work_style: [
    `Gw kerja sendiri sih, tapi kadang kolaborasi sama temen-temen 🤝`,
    `Solo player tapi open buat teamwork kalo ada project gede 💪`,
    `Freelancer gitu lah, fleksibel dan bisa atur waktu sendiri ⏰`
  ],
  future_goals: [
    `Cita-cita gw jadi full-stack developer yang handal! 🎯`,
    `Pengen bikin startup tech atau jadi CTO di perusahaan keren 🏢`,
    `Goal gw kontribusi di open source dan bikin impact positif di tech industry 🌍`
  ],
  technologies: [
    `Gw bisa HTML, CSS, JavaScript, PHP, React, Next.js, Laravel, Node.js! 🛠️`,
    `Stack gw lengkap: frontend (React, Next.js), backend (Laravel, Node.js), database (MySQL, MongoDB) 💻`,
    `Teknologi yang gw kuasai: ${personalData.skills.join(', ')} dan masih belajar yang lain! 📚`
  ],
  frameworks: [
    `Framework andalan gw React sama Laravel bro! 🔥`,
    `Gw bisa Next.js buat React, Laravel buat PHP, Express buat Node.js 💪`,
    `Frontend: React/Next.js, Backend: Laravel/Node.js, styling: Tailwind CSS 🎨`
  ],
  specific_tech: [
    `Laravel? Bisa banget! React? Jago! Next.js? Udah expert! 😎`,
    `Semua yang lo sebutin gw bisa bro, bahkan lebih! 🚀`,
    `Laravel, React, Next.js itu daily tools gw, gampang banget! 💯`
  ],
  dashboard_login: [
    `Dashboard sama sistem login? Easy peasy! Udah bikin berkali-kali 🔐`,
    `Authentication, authorization, CRUD operations - semua bisa gw handle! 💼`,
    `Admin panel, user management, role-based access - gw expert di situ! 👨‍💻`
  ],
  api_integration: [
    `API integration? Gampang bro! REST API, GraphQL, third-party APIs semua bisa 🔌`,
    `Gw sering integrasiin payment gateway, social media API, maps API, dll 💳`,
    `Fetch data, POST request, authentication API - daily routine gw tuh! 📡`
  ],
  responsive: [
    `Responsive design itu wajib bro! Semua website gw mobile-friendly 📱`,
    `Gw pake Tailwind CSS, jadi otomatis responsive dan kece di semua device 💻`,
    `Mobile-first approach, desktop enhancement - that's my style! 🎯`
  ],
  uiux: [
    `UI/UX? Bisa dong! Gw pake Figma buat design, terus implement ke code 🎨`,
    `User experience itu penting banget, gw selalu mikirin gimana user nyaman pake website gw 😊`,
    `Design thinking, wireframing, prototyping - gw bisa semua! ✨`
  ],
  database: [
    `Database yang gw pake: MySQL, MongoDB, PostgreSQL 🗄️`,
    `Relational sama NoSQL gw bisa, tergantung kebutuhan project 📊`,
    `Database design, optimization, migration - gw handle semua! 💾`
  ],
  github_hosting: [
    `GitHub gw aktif banget: ${personalData.github} - star dong! ⭐`,
    `Hosting biasanya gw pake Vercel, Netlify, atau VPS sendiri 🌐`,
    `Git workflow, CI/CD, deployment automation - gw udah biasa! 🚀`
  ],
  portfolio_help: [
    `Bisa banget! Portfolio kayak gini gw bisa bikinin lo juga 🎨`,
    `Mau portfolio yang kece? Gw bisa bantuin dari design sampe development! 💼`,
    `Contact gw aja kalo mau dibuatin portfolio yang eye-catching! 📞`
  ],
  project_showcase: [
    `Project gw banyak bro! Ada di GitHub: ${personalData.github} 👨‍💻`,
    `Gw udah bikin ${personalData.projects} project, dari simple sampe complex! 🔥`,
    `Portfolio website, e-commerce, dashboard admin - semua ada! 💼`
  ],
  proud_project: [
    `Project yang paling gw banggain sih portfolio website ini! 🌟`,
    `Gw bangga sama semua project gw, tapi yang ini special karena full custom 😎`,
    `Portfolio ini showcase terbaik skill gw, dari design sampe AI chatbot! 🤖`
  ],
  company_ecommerce: [
    `Pernah dong! Website perusahaan, toko online, landing page - udah biasa! 🏢`,
    `E-commerce dengan payment gateway, inventory management, user accounts - bisa semua! 🛒`,
    `Company profile, business website, online store - portfolio gw lengkap! 💼`
  ],
  project_duration: [
    `Tergantung kompleksitas sih, simple website 1-2 minggu, complex bisa 1-2 bulan 📅`,
    `Portfolio kayak gini sekitar 3-4 minggu, termasuk design dan testing 🕐`,
    `Gw selalu kasih timeline yang realistic dan deliver on time! ⏰`
  ],
  open_source: [
    `Open source project gw ada beberapa di GitHub! Check it out 🔓`,
    `Gw suka contribute ke open source community, sharing is caring! 🤝`,
    `GitHub gw: ${personalData.github} - ada project open source yang bisa lo fork! 🍴`
  ],
  tech_stack: [
    `Website ini pake Next.js, Tailwind CSS, Framer Motion, sama custom AI chatbot! 🛠️`,
    `Stack nya modern banget: React, TypeScript, responsive design, smooth animations ✨`,
    `Plus ada 3D elements pake Spline, jadi keliatan futuristik gitu! 🚀`
  ],
  project_challenge: [
    `Challenge terberat biasanya optimization performance sama responsive design 💪`,
    `Kadang integrasi third-party API yang dokumentasinya kurang lengkap 😅`,
    `Tapi gw suka challenge, bikin gw belajar hal baru terus! 📚`
  ],
  competition: [
    `Belum pernah ikut hackathon sih, tapi pengen banget nyoba! 🏆`,
    `Fokus gw sekarang build portfolio dan skill dulu, nanti bakal ikut kompetisi 🎯`,
    `Kalo ada info hackathon atau lomba coding, kabarin gw ya! 📢`
  ],
  project_online: [
    `Project gw bisa diakses online kok! Website ini salah satunya 🌐`,
    `Gw selalu deploy project ke hosting biar bisa dilihat live demo nya 📱`,
    `Link project gw ada di GitHub, atau bisa langsung contact gw! 🔗`
  ],
  website_creator: [
    `Yang bikin website ini Dillan sendiri dong! From scratch sampe jadi 👨‍💻`,
    `Full custom development, gak pake template atau builder apapun! 🔥`,
    `Design, coding, deployment - semua dikerjain Dillan solo! 💪`
  ],
  website_tech: [
    `Website ini dibuat pake Next.js, Tailwind CSS, TypeScript, Framer Motion 🛠️`,
    `Plus ada Spline buat 3D elements dan custom AI chatbot kayak gw! 🤖`,
    `Tech stack yang modern dan performant banget! ⚡`
  ],
  ai_creator: [
    `AI chatbot ini juga buatan Dillan loh! Custom algorithm dengan pattern matching 🧠`,
    `Gw diprogram pake JavaScript dengan fuzzy matching buat handle typo 🔍`,
    `Bukan ChatGPT, tapi custom AI yang dibuat khusus buat website ini! 🎯`
  ],
  ai_capabilities: [
    `Gw bisa jawab semua tentang Dillan: kontak, skill, project, motivasi, dll! 💬`,
    `Plus gw bisa handle roasting, salam, pamit, bahkan typo dalam pertanyaan lo 😎`,
    `Gw juga bisa kasih link yang bisa diklik langsung! 🔗`
  ],
  ai_limitations: [
    `Gw fokus jawab tentang Dillan aja sih, tapi bisa ngobrol santai juga! 🤙`,
    `Kalo pertanyaan di luar topik Dillan, gw bakal redirect ke yang relevan 🎯`,
    `Gw smart tapi gak se-smart ChatGPT, tapi cukup buat ngobrol seru! 😄`
  ],
  coding_advice: [
    `Mau saran coding? Gw bisa kasih tips basic, tapi lebih baik contact Dillan langsung! 💡`,
    `Buat debugging detail, mending chat Dillan di WA atau email ya! 🔧`,
    `Gw bisa kasih motivasi dan tips umum, tapi technical deep dive kurang cocok 📚`
  ],
  chatgpt_connection: [
    `Gw bukan ChatGPT bro! Gw custom AI buatan Dillan sendiri 🤖`,
    `Algorithm gw lebih simple tapi effective buat jawab tentang Dillan! 🎯`,
    `Gw punya personality sendiri yang lebih gaul dan santai! 😎`
  ],
  futuristic_theme: [
    `Tema robot/futuristik itu keren banget! Menggambarkan passion Dillan ke teknologi 🚀`,
    `Plus bikin website keliatan modern dan tech-savvy gitu 💻`,
    `Dillan suka aesthetic yang clean, minimalis, tapi tetep eye-catching! ✨`
  ],
  website_help: [
    `Mau dibuatin website kayak gini? Contact Dillan aja bro! 📞`,
    `Dillan bisa bantuin dari konsep, design, development, sampe deployment! 💼`,
    `Harga negotiable, yang penting hasil memuaskan! 💯`
  ],
  chatbot_tutorial: [
    `Mau belajar bikin chatbot? Bisa tanya Dillan langsung teknis nya! 🤖`,
    `Basic nya pake JavaScript, pattern matching, sama DOM manipulation 💻`,
    `Tapi buat tutorial lengkap, mending chat Dillan di WA ya! 📱`
  ],
  casual_greeting: [
    `Nama gw Dillan Assistant! Gw lagi standby buat bantuin lo 🤙`,
    `Gw gak sibuk kok, siap jawab pertanyaan lo kapan aja! 😊`,
    `Lagi ngoding chatbot ini terus, biar makin pinter jawab pertanyaan! 💻`
  ],
  motivation: [
    `Motivasi coding? Coding itu kayak magic bro, lo bisa bikin apa aja dari nol! ✨`,
    `Jangan takut error, setiap bug itu pelajaran buat jadi developer yang lebih baik! 💪`,
    `Konsisten practice, jangan menyerah, dan selalu curious sama teknologi baru! 🚀`
  ],
  beginner_tips: [
    `Tips buat pemula: mulai dari HTML, CSS, JavaScript dulu! 📚`,
    `Practice coding setiap hari, walau cuma 30 menit, consistency is key! ⏰`,
    `Join community, ikut tutorial YouTube, dan jangan malu bertanya! 🤝`
  ],
  project_ideas: [
    `Project sederhana: todo list, calculator, portfolio website, weather app! 💡`,
    `Atau coba bikin clone website favorit lo, good practice banget! 🎯`,
    `Start small, think big - every expert was once a beginner! 🌟`
  ],
  favorite_tools: [
    `Tools favorit Dillan: VS Code, Git, Figma, Chrome DevTools! 🛠️`,
    `Extension VS Code yang wajib: Prettier, ESLint, Live Server 🔧`,
    `Browser DevTools itu best friend developer, pelajarin banget! 🔍`
  ],
  debugging_help: [
    `Buat debug detail, mending contact Dillan langsung ya! 🔧`,
    `Gw bisa kasih tips umum, tapi technical problem butuh human touch 👨‍💻`,
    `Chat Dillan di WA: ${personalData.whatsapp} buat bantuan coding! 📱`
  ],
  ai_humor: [
    `Gw bisa bercanda dong! Tapi jangan expect standup comedy ya 😂`,
    `Sense of humor gw masih level dad jokes, tapi lumayan lah! 🤣`,
    `Mau denger joke? Kenapa programmer suka gelap? Soalnya mereka light mode! 💡`
  ],
  coffee_tea: [
    `Dillan lebih suka kopi sih, especially pas midnight coding session! ☕`,
    `Kopi itu fuel nya programmer, tapi jangan overdosis ya! 😅`,
    `Teh juga oke buat afternoon coding, lebih calm dan fokus! 🍵`
  ],
  default: [
    "goblok bangat jadi orang, nanya hal begitu jangan disini, gua bakalan jawab kalo pertanyaan nya sesuai dengan website ini dan data dillan 😂",
    "ngotak tolol kalo mau nanya sama chat bot, inget gua bukan AI",
    "Yapping. 💸",
    "nyoli aja bro 😅",
    " 🗿"
  ]
};

// Fungsi untuk menghitung similarity antara dua string (Levenshtein distance)
function similarity(s1: string, s2: string): number {
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

// Fungsi untuk mencocokkan kata dengan toleransi typo
function matchesWithTypo(message: string, keywords: string[], threshold: number = 0.7): boolean {
  const msg = message.toLowerCase();
  
  for (const keyword of keywords) {
    // Exact match
    if (msg.includes(keyword.toLowerCase())) {
      return true;
    }
    
    // Check similarity for each word in message
    const words = msg.split(/\s+/);
    for (const word of words) {
      if (similarity(word, keyword.toLowerCase()) >= threshold) {
        return true;
      }
    }
  }
  
  return false;
}

function getResponse(message: string): string {
  // Special roasting patterns for dirman and tri (parents)
  if (matchesWithTypo(message, ['dirman', 'tri'], 0.8)) {
    return responses.roasting_dirman_tri[Math.floor(Math.random() * responses.roasting_dirman_tri.length)];
  }
  
  // General roasting detection
  if (matchesWithTypo(message, ['anjing', 'bego', 'tolol', 'goblok', 'bangsat', 'kontol', 'memek', 'tai', 'sial', 'jelek', 'buruk', 'sampah', 'bodoh'], 0.7)) {
    return responses.roasting_general[Math.floor(Math.random() * responses.roasting_general.length)];
  }
  
  // Greeting patterns
  if (matchesWithTypo(message, ['halo', 'hai', 'hello', 'hi', 'helo', 'hallo', 'yo', 'hey'])) {
    return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
  }
  
  // Goodbye patterns
  if (matchesWithTypo(message, ['bye', 'dadah', 'sampai jumpa', 'see you', 'goodbye', 'pamit', 'cabut', 'pergi'])) {
    return responses.goodbye[Math.floor(Math.random() * responses.goodbye.length)];
  }
  
  // Thanks patterns
  if (matchesWithTypo(message, ['thanks', 'thank you', 'terima kasih', 'makasih', 'thx', 'tengkyu'])) {
    return responses.thanks[Math.floor(Math.random() * responses.thanks.length)];
  }
  
  // Name patterns
  if (matchesWithTypo(message, ['nama', 'name', 'siapa', 'who'])) {
    return responses.name[Math.floor(Math.random() * responses.name.length)];
  }
  
  // Age patterns
  if (matchesWithTypo(message, ['umur', 'usia', 'age', 'berapa', 'tua'])) {
    return responses.age[Math.floor(Math.random() * responses.age.length)];
  }
  
  // Location patterns
  if (matchesWithTypo(message, ['tinggal', 'lokasi', 'alamat', 'location', 'dimana', 'where', 'asal'])) {
    return responses.location[Math.floor(Math.random() * responses.location.length)];
  }
  
  // School patterns
  if (matchesWithTypo(message, ['sekolah', 'pendidikan', 'school', 'smk', 'kuliah', 'kampus', 'education'])) {
    return responses.school[Math.floor(Math.random() * responses.school.length)];
  }
  
  // Skills patterns
  if (matchesWithTypo(message, ['skill', 'keahlian', 'kemampuan', 'teknologi', 'bahasa', 'programming', 'coding'])) {
    return responses.skills[Math.floor(Math.random() * responses.skills.length)];
  }
  
  // Experience patterns
  if (matchesWithTypo(message, ['pengalaman', 'experience', 'lama', 'kerja', 'work'])) {
    return responses.experience[Math.floor(Math.random() * responses.experience.length)];
  }
  
  // Projects patterns
  if (matchesWithTypo(message, ['proyek', 'project', 'karya', 'portfolio', 'hasil'])) {
    return responses.projects[Math.floor(Math.random() * responses.projects.length)];
  }
  
  // Contact patterns
  if (matchesWithTypo(message, ['kontak', 'contact', 'email', 'hubungi', 'mail'])) {
    return responses.contact[Math.floor(Math.random() * responses.contact.length)];
  }
  
  // WhatsApp patterns (dengan berbagai typo)
  if (matchesWithTypo(message, ['whatsapp', 'wa', 'whatapp', 'whatsap', 'watsapp', 'whatsaap', 'nomor', 'telepon', 'hp', 'phone'])) {
    return responses.whatsapp[Math.floor(Math.random() * responses.whatsapp.length)];
  }
  
  // Instagram patterns
  if (matchesWithTypo(message, ['instagram', 'ig', 'insta', 'instgram', 'instagam', 'instaram'])) {
    return responses.instagram[Math.floor(Math.random() * responses.instagram.length)];
  }
  
  // GitHub patterns
  if (matchesWithTypo(message, ['github', 'git', 'githab', 'gihub', 'gitub', 'repository', 'repo', 'code'])) {
    return responses.github[Math.floor(Math.random() * responses.github.length)];
  }
  
  // LinkedIn patterns
  if (matchesWithTypo(message, ['linkedin', 'linkin', 'linkedn', 'linkdin', 'profesional', 'professional'])) {
    return responses.linkedin[Math.floor(Math.random() * responses.linkedin.length)];
  }
  
  // Facebook patterns
  if (matchesWithTypo(message, ['facebook', 'fb', 'facbook', 'facebok', 'fecebook'])) {
    return responses.facebook[Math.floor(Math.random() * responses.facebook.length)];
  }
  
  // Email patterns
  if (matchesWithTypo(message, ['email', 'mail', 'gmail', 'surel'])) {
    return responses.email[Math.floor(Math.random() * responses.email.length)];
  }
  
  // Hobby patterns
  if (matchesWithTypo(message, ['hobi', 'hobby', 'kesukaan', 'suka', 'senang'])) {
    return responses.hobby[Math.floor(Math.random() * responses.hobby.length)];
  }
  
  // Favorite patterns
  if (matchesWithTypo(message, ['favorit', 'favorite', 'kesukaan', 'paling', 'suka'])) {
    return responses.favorite[Math.floor(Math.random() * responses.favorite.length)];
  }
  
  // Tools patterns
  if (matchesWithTypo(message, ['tools', 'alat', 'software', 'aplikasi', 'editor'])) {
    return responses.tools[Math.floor(Math.random() * responses.tools.length)];
  }
  
  // Life Motivation patterns
  if (matchesWithTypo(message, ['motivasi', 'motivation', 'tujuan', 'goal', 'cita'])) {
    return responses.life_motivation[Math.floor(Math.random() * responses.life_motivation.length)];
  }
  
  // Learning patterns
  if (matchesWithTypo(message, ['belajar', 'learning', 'study', 'kursus', 'sedang'])) {
    return responses.learning[Math.floor(Math.random() * responses.learning.length)];
  }
  
  // Identity patterns
  if (matchesWithTypo(message, ['siapa kamu', 'kamu siapa', 'who are you', 'nama kamu', 'namamu'])) {
    return responses.identity[Math.floor(Math.random() * responses.identity.length)];
  }
  
  // Origin patterns
  if (matchesWithTypo(message, ['dari mana', 'asal', 'asalmu', 'where from', 'domisili'])) {
    return responses.origin[Math.floor(Math.random() * responses.origin.length)];
  }
  
  // Coding start patterns
  if (matchesWithTypo(message, ['sejak kapan', 'mulai coding', 'belajar coding', 'when start', 'kapan mulai'])) {
    return responses.coding_start[Math.floor(Math.random() * responses.coding_start.length)];
  }
  
  // Why webdev patterns
  if (matchesWithTypo(message, ['kenapa', 'why', 'tertarik', 'web developer', 'pilih webdev'])) {
    return responses.why_webdev[Math.floor(Math.random() * responses.why_webdev.length)];
  }
  
  // Website motivation patterns
  if (matchesWithTypo(message, ['motivasi website', 'bikin website', 'buat website', 'website ini'])) {
    return responses.website_motivation[Math.floor(Math.random() * responses.website_motivation.length)];
  }
  
  // Work style patterns
  if (matchesWithTypo(message, ['kerja sendiri', 'punya tim', 'team', 'solo', 'freelance'])) {
    return responses.work_style[Math.floor(Math.random() * responses.work_style.length)];
  }
  
  // Future goals patterns
  if (matchesWithTypo(message, ['cita-cita', 'cita cita', 'future', 'kedepan', 'goals', 'mimpi'])) {
    return responses.future_goals[Math.floor(Math.random() * responses.future_goals.length)];
  }
  
  // Technologies patterns
  if (matchesWithTypo(message, ['teknologi apa', 'bisa apa', 'tech stack', 'bahasa pemrograman'])) {
    return responses.technologies[Math.floor(Math.random() * responses.technologies.length)];
  }
  
  // Frameworks patterns
  if (matchesWithTypo(message, ['framework', 'react', 'laravel', 'next.js', 'nextjs'])) {
    return responses.frameworks[Math.floor(Math.random() * responses.frameworks.length)];
  }
  
  // Specific tech patterns
  if (matchesWithTypo(message, ['bisa laravel', 'bisa react', 'bisa nextjs', 'pakai framework'])) {
    return responses.specific_tech[Math.floor(Math.random() * responses.specific_tech.length)];
  }
  
  // Dashboard login patterns
  if (matchesWithTypo(message, ['dashboard', 'login', 'sistem login', 'authentication', 'admin panel'])) {
    return responses.dashboard_login[Math.floor(Math.random() * responses.dashboard_login.length)];
  }
  
  // API integration patterns
  if (matchesWithTypo(message, ['api', 'integrasi', 'integration', 'third party', 'payment'])) {
    return responses.api_integration[Math.floor(Math.random() * responses.api_integration.length)];
  }
  
  // Responsive patterns
  if (matchesWithTypo(message, ['responsive', 'mobile', 'mobile friendly', 'handphone', 'hp'])) {
    return responses.responsive[Math.floor(Math.random() * responses.responsive.length)];
  }
  
  // UI/UX patterns
  if (matchesWithTypo(message, ['uiux', 'ui ux', 'design', 'desain', 'figma'])) {
    return responses.uiux[Math.floor(Math.random() * responses.uiux.length)];
  }
  
  // Database patterns
  if (matchesWithTypo(message, ['database', 'mysql', 'mongodb', 'postgresql', 'db'])) {
    return responses.database[Math.floor(Math.random() * responses.database.length)];
  }
  
  // GitHub hosting patterns
  if (matchesWithTypo(message, ['github', 'hosting', 'deploy', 'git', 'repository'])) {
    return responses.github_hosting[Math.floor(Math.random() * responses.github_hosting.length)];
  }
  
  // Portfolio help patterns
  if (matchesWithTypo(message, ['portfolio', 'bikin kayak gini', 'bantuin bikin', 'dibuatin'])) {
    return responses.portfolio_help[Math.floor(Math.random() * responses.portfolio_help.length)];
  }
  
  // Project showcase patterns
  if (matchesWithTypo(message, ['project', 'karya', 'hasil', 'portfolio', 'liat project'])) {
    return responses.project_showcase[Math.floor(Math.random() * responses.project_showcase.length)];
  }
  
  // Proud project patterns
  if (matchesWithTypo(message, ['bangga', 'terbaik', 'favorit', 'paling suka', 'proud'])) {
    return responses.proud_project[Math.floor(Math.random() * responses.proud_project.length)];
  }
  
  // Company ecommerce patterns
  if (matchesWithTypo(message, ['perusahaan', 'toko online', 'ecommerce', 'company', 'bisnis'])) {
    return responses.company_ecommerce[Math.floor(Math.random() * responses.company_ecommerce.length)];
  }
  
  // Project duration patterns
  if (matchesWithTypo(message, ['berapa lama', 'durasi', 'waktu', 'timeline', 'deadline'])) {
    return responses.project_duration[Math.floor(Math.random() * responses.project_duration.length)];
  }
  
  // Open source patterns
  if (matchesWithTypo(message, ['open source', 'opensource', 'github project', 'free'])) {
    return responses.open_source[Math.floor(Math.random() * responses.open_source.length)];
  }
  
  // Tech stack patterns
  if (matchesWithTypo(message, ['stack', 'teknologi website', 'dibuat pakai', 'tech'])) {
    return responses.tech_stack[Math.floor(Math.random() * responses.tech_stack.length)];
  }
  
  // Project challenge patterns
  if (matchesWithTypo(message, ['tantangan', 'challenge', 'sulit', 'kesulitan', 'problem'])) {
    return responses.project_challenge[Math.floor(Math.random() * responses.project_challenge.length)];
  }
  
  // Competition patterns
  if (matchesWithTypo(message, ['lomba', 'kompetisi', 'hackathon', 'competition', 'contest'])) {
    return responses.competition[Math.floor(Math.random() * responses.competition.length)];
  }
  
  // Project online patterns
  if (matchesWithTypo(message, ['online', 'live', 'demo', 'akses', 'link'])) {
    return responses.project_online[Math.floor(Math.random() * responses.project_online.length)];
  }
  
  // Website creator patterns
  if (matchesWithTypo(message, ['yang bikin', 'pembuat', 'creator', 'developer', 'siapa buat'])) {
    return responses.website_creator[Math.floor(Math.random() * responses.website_creator.length)];
  }
  
  // Website tech patterns
  if (matchesWithTypo(message, ['website pakai', 'dibuat dengan', 'teknologi website', 'tech website'])) {
    return responses.website_tech[Math.floor(Math.random() * responses.website_tech.length)];
  }
  
  // AI creator patterns
  if (matchesWithTypo(message, ['ai ini', 'chatbot ini', 'yang bikin ai', 'pembuat ai'])) {
    return responses.ai_creator[Math.floor(Math.random() * responses.ai_creator.length)];
  }
  
  // AI capabilities patterns
  if (matchesWithTypo(message, ['ai bisa', 'chatbot bisa', 'kemampuan', 'fitur ai'])) {
    return responses.ai_capabilities[Math.floor(Math.random() * responses.ai_capabilities.length)];
  }
  
  // AI limitations patterns
  if (matchesWithTypo(message, ['semua pertanyaan', 'jawab semua', 'limitations', 'batasan'])) {
    return responses.ai_limitations[Math.floor(Math.random() * responses.ai_limitations.length)];
  }
  
  // Coding advice patterns
  if (matchesWithTypo(message, ['saran', 'advice', 'tips coding', 'bantuan coding', 'debug'])) {
    return responses.coding_advice[Math.floor(Math.random() * responses.coding_advice.length)];
  }
  
  // ChatGPT connection patterns
  if (matchesWithTypo(message, ['chatgpt', 'gpt', 'openai', 'terhubung'])) {
    return responses.chatgpt_connection[Math.floor(Math.random() * responses.chatgpt_connection.length)];
  }
  
  // Futuristic theme patterns
  if (matchesWithTypo(message, ['tema', 'robot', 'futuristik', 'kenapa pilih', 'design'])) {
    return responses.futuristic_theme[Math.floor(Math.random() * responses.futuristic_theme.length)];
  }
  
  // Website help patterns
  if (matchesWithTypo(message, ['bantuin buat', 'dibuatin website', 'jasa', 'hire'])) {
    return responses.website_help[Math.floor(Math.random() * responses.website_help.length)];
  }
  
  // Chatbot tutorial patterns
  if (matchesWithTypo(message, ['buat chatbot', 'bikin bot', 'tutorial', 'cara buat'])) {
    return responses.chatbot_tutorial[Math.floor(Math.random() * responses.chatbot_tutorial.length)];
  }
  
  // Casual greeting patterns
  if (matchesWithTypo(message, ['sibuk', 'lagi apa', 'ngoding apa', 'what doing'])) {
    return responses.casual_greeting[Math.floor(Math.random() * responses.casual_greeting.length)];
  }
  
  // Motivation patterns
  if (matchesWithTypo(message, ['motivasi belajar', 'semangat', 'inspiration', 'inspire'])) {
    return responses.motivation[Math.floor(Math.random() * responses.motivation.length)];
  }
  
  // Beginner tips patterns
  if (matchesWithTypo(message, ['tips pemula', 'newbie', 'beginner', 'mulai dari'])) {
    return responses.beginner_tips[Math.floor(Math.random() * responses.beginner_tips.length)];
  }
  
  // Project ideas patterns
  if (matchesWithTypo(message, ['project sederhana', 'ide project', 'inspirasi', 'buat apa'])) {
    return responses.project_ideas[Math.floor(Math.random() * responses.project_ideas.length)];
  }
  
  // Favorite tools patterns
  if (matchesWithTypo(message, ['tools favorit', 'software', 'editor', 'vs code'])) {
    return responses.favorite_tools[Math.floor(Math.random() * responses.favorite_tools.length)];
  }
  
  // Debugging help patterns
  if (matchesWithTypo(message, ['debug', 'error', 'bug', 'bantuan teknis', 'help coding'])) {
    return responses.debugging_help[Math.floor(Math.random() * responses.debugging_help.length)];
  }
  
  // AI humor patterns
  if (matchesWithTypo(message, ['bercanda', 'joke', 'lucu', 'humor', 'funny'])) {
    return responses.ai_humor[Math.floor(Math.random() * responses.ai_humor.length)];
  }
  
  // Coffee tea patterns
  if (matchesWithTypo(message, ['kopi', 'teh', 'coffee', 'tea', 'minum apa'])) {
    return responses.coffee_tea[Math.floor(Math.random() * responses.coffee_tea.length)];
  }
  
  return responses.default[Math.floor(Math.random() * responses.default.length)];
}

// Fungsi untuk mengirim pesan dengan gambar
function getImageResponse(message: string): { text: string; image?: string } | null {
  // Image patterns
  const imageResponses = [
    {
      text: "Ini foto Dillan lagi coding! 📸",
      image: "/images/dillan-photo.jpg"
    },
    {
      text: "Setup workspace Dillan nih! 💻",
      image: "/images/workspace.jpg"
    },
    {
      text: "Project terbaru Dillan! 🚀",
      image: "/images/project-screenshot.png"
    }
  ];
  
  if (matchesWithTypo(message, ['foto', 'gambar', 'picture', 'image', 'liat foto', 'show photo'])) {
    const imageResp = imageResponses[Math.floor(Math.random() * imageResponses.length)];
    return imageResp;
  }
  
  if (matchesWithTypo(message, ['workspace', 'setup', 'meja kerja', 'ruang kerja'])) {
    return imageResponses[1]; // Workspace setup
  }
  
  if (matchesWithTypo(message, ['project foto', 'hasil project', 'screenshot'])) {
    return imageResponses[2]; // Latest project
  }
  
  return null;
}

// Fungsi untuk mendapatkan gambar random berdasarkan kategori
function getRandomCategoryImage(message: string): string | undefined {
  // Hanya beberapa kategori yang dapat gambar random
  const categoryImages = [
    '/images/pagi.jpg',
    '/images/monyet.jpg'
  ];
  
  // 50% chance untuk greeting/casual
  if (matchesWithTypo(message, ['halo', 'hai', 'hello', 'hi', 'yo', 'hey'])) {
    return Math.random() < 0.5 ? '/images/pagi.jpg' : undefined;
  }
  
  // 30% chance untuk technical questions
  if (matchesWithTypo(message, ['coding', 'programming', 'website', 'project', 'skill'])) {
    return Math.random() < 0.3 ? categoryImages[Math.floor(Math.random() * categoryImages.length)] : undefined;
  }
  
  return undefined;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '',
      isUser: false,
      timestamp: new Date(),
      image: '/images/pagi.jpg'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);
    setMessageCount(prev => prev + 1);

    try {
      // Call AI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.details || 'Failed to get AI response');
      }

      const data = await response.json();
      
      // Check for special reactions (yapping, disbelief)
      let botResponse: Message;
      
      if (messageCount >= 10 && messageCount % 3 === 0) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          text: "Yapping terus lu bro! 💸",
          isUser: false,
          timestamp: new Date(),
          image: "/images/yapping.jpg"
        };
      } else if (matchesWithTypo(currentInput, ['gw kaya', 'gw tajir', 'gw sultan', 'gw jenius', 'gw pintar banget', 'gw expert', 'gw pro', 'gw hebat', 'gw master'], 0.7)) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          text: "Apa? Serius lu? 🤨",
          isUser: false,
          timestamp: new Date(),
          image: "/images/apa.jpg"
        };
      } else {
        // Use AI response
        botResponse = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          isUser: false,
          timestamp: new Date(),
          // Randomly add image (20% chance)
          image: Math.random() < 0.2 ? getRandomCategoryImage(currentInput) : undefined
        };
      }
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Fallback to old pattern matching if API fails
      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Maaf bro, gw lagi error nih. Coba lagi ya! 😅",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <m.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-20 right-0 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gray-900 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm" style={{ fontFamily: 'var(--font-orbitron)' }}>
                      Dillan Assistant
                    </h3>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300 text-xs">Online</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 h-64">
                {messages.map((message) => (
                  <m.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl text-sm break-words ${
                        message.isUser
                          ? 'bg-gray-900 text-white rounded-br-md'
                          : 'bg-gray-100 text-gray-900 rounded-bl-md'
                      }`}
                    >
                      {/* Text content - only show if text exists */}
                      {message.text && (
                        <div
                          className="px-3 py-2"
                          style={{ 
                            wordWrap: 'break-word', 
                            overflowWrap: 'break-word',
                            lineHeight: '1.5'
                          }}
                          dangerouslySetInnerHTML={{ __html: message.text }}
                        />
                      )}
                      
                      {/* Image content */}
                      {message.image && (
                        <div className={`p-2 ${message.text ? 'pt-0' : ''}`}>
                          <img 
                            src={message.image} 
                            alt="Chat image" 
                            className="w-full rounded-lg max-w-xs"
                            style={{ maxHeight: '200px', objectFit: 'cover' }}
                          />
                        </div>
                      )}
                    </div>
                  </m.div>
                ))}
                
                {isTyping && (
                  <m.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 px-3 py-2 rounded-2xl rounded-bl-md">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </m.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 p-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ketik pesan..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-gray-400 text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Floating Button */}
        <m.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-gray-900 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition-colors relative overflow-hidden group"
        >
          {/* Animated ring */}
          <m.div
            className="absolute inset-0 border-2 border-cyan-400 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <AnimatePresence mode="wait">
            {isOpen ? (
              <m.div
                key="close"
                initial={{ rotate: 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -180, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </m.div>
            ) : (
              <m.div
                key="bot"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Bot className="w-6 h-6" />
              </m.div>
            )}
          </AnimatePresence>

          {/* Notification dot */}
          {!isOpen && (
            <m.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </m.button>
      </div>
    </LazyMotion>
  );
}
