'use client';

import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, ExternalLink, ArrowRight, CheckCircle2, XCircle, Loader2, Menu, X } from 'lucide-react';
import { 
  SiHtml5, SiCss3, SiJavascript, SiReact, SiNextdotjs, SiLaravel, SiNodedotjs, SiMongodb, 
  SiMysql, SiGit, SiFigma, SiTailwindcss, SiTypescript, SiXampp, SiWhatsapp 
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Chatbot from './components/Chatbot';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProjectImage, setSelectedProjectImage] = useState<string | null>(null);
  // Responsive helpers
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // EmailJS
  const contactFormRef = useRef<HTMLFormElement | null>(null);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle'|'success'|'error'>('idle');

  const SERVICE_ID = 'service_nj947y5';
  const TEMPLATE_ID = 'template_k28jkce';
  const PUBLIC_KEY = 'Z7mhNLfOSIFuaF2Z6';

  // Init EmailJS once on mount
  useEffect(() => {
    try {
      emailjs.init({ publicKey: PUBLIC_KEY });
    } catch (e) {
      console.error('EmailJS init error:', e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Detect small screens for responsive tweaks
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sendingMessage) return;
    setSendingMessage(true);
    setSendStatus('idle');

    try {
      const form = contactFormRef.current;
      if (!form) throw new Error('Form tidak ditemukan');

      // Ambil data form
      const formData = new FormData(form);
      const contactData = {
        name: formData.get('user_name') as string,
        email: formData.get('user_email') as string,
        subject: formData.get('subject') as string,
        message: formData.get('message') as string,
      };

      // 1. Simpan data pengirim ke log terlebih dahulu
      try {
        await fetch('/api/contact-log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contactData),
        });
        console.log('✅ Data pengirim berhasil disimpan');
      } catch (logError) {
        console.warn('⚠️ Gagal menyimpan log, tetap lanjut kirim email:', logError);
        // Tidak throw error, tetap lanjut kirim email
      }

      // 2. Kirim email via EmailJS
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        form,
        { publicKey: PUBLIC_KEY }
      );

      setSendStatus('success');
      form.reset();
    } catch (err: any) {
      setSendStatus('error');
      console.error('EmailJS error details:', {
        text: err?.text,
        status: err?.status,
        message: err?.message,
        fullError: err
      });
      alert(`Gagal mengirim email. Error: ${err?.text || err?.message || 'Unknown error'}. Cek console untuk detail.`);
    } finally {
      setSendingMessage(false);
    }
  };

  // Single-page layout; URL hash handled via anchor links (smooth scroll enabled in globals.css)
  // Scrollspy with IntersectionObserver to highlight active nav link
  useEffect(() => {
    const sections = ['home', 'about', 'skill', 'projects', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
      observer.disconnect();
    };
  }, []);

  const projects = [
    {
      title: 'Manajemen Perusahaan',
      category: 'Website',
      description: 'Solusi memanajemen perusahaan dengan fitur-fitur yang lengkap.',
      tech: 'Laravel, PHP, MySQL, Tailwind CSS, Alpine.js',
      year: '2025'
    },
    {
      title: 'Game-Store',
      category: 'Website',
      description: 'Aplikasi berbasis website game store yang memungkinkan pengguna untuk membeli game digital.',
      tech: 'React, Vite, TypeScript, Tailwind, Express, Prisma',
      year: '2025'
    },
    {
   title: 'Pemesanan Makanan',
   category: 'Website',
   description: 'Website pemesanan Mie Ayam & Bakso dengan form pesanan dan daftar order.',
   tech: 'PHP, MySQL, Tailwind CSS',
   year: '2024'
     },
     {
       title: 'Music',
       category: 'Website',
       description: 'Website musik dengan fitur-fitur yang lengkap.',
       tech: 'Next.js 15, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide, Next/Image, Jamendo API',
       year: '2025'
     },
    {
      title: 'Payroll System',
      category: 'Desktop',
      description: 'Aplikasi desktop penggajian karyawan berbasis Python & SQLite dengan CRUD, absensi, komponen gaji, dan slip gaji (PDF).',
      tech: 'Python, PyQt6, SQLite, bcrypt, pandas, reportlab, qt-material',
      year: '2025'
    },
    {
      title: 'Kalkulator',
      category: 'Mobile',
      description: 'Aplikasi mobile kalkulator sederhana yang dapat melakukan perhitungan matematika.',
      tech: 'MIT App Inventor',
      year: '2024'
    }
  ];

  const projectImages = [
    '/images/1.png',
    '/images/2.png',
    '/images/3.png',
    '/images/4.png',
    '/images/5.png',
    '/images/6.png',
  ];

  const getProjectImage = (i: number) => projectImages[i % projectImages.length];

  // Ikon teknologi menggunakan react-icons (stabil, tidak tergantung CDN)
  const techs = [
    { name: 'HTML5', Icon: SiHtml5, color: '#E34F26' },
    { name: 'CSS3', Icon: SiCss3, color: '#1572B6' },
    { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
    { name: 'React', Icon: SiReact, color: '#61DAFB' },
    { name: 'Next.js', Icon: SiNextdotjs, color: '#000000' },
    { name: 'Laravel', Icon: SiLaravel, color: '#FF2D20' },
    { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
    { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
    { name: 'MySQL', Icon: SiMysql, color: '#4479A1' },
    { name: 'Git', Icon: SiGit, color: '#F05032' },
    { name: 'Figma', Icon: SiFigma, color: '#F24E1E' },
    { name: 'VS Code', Icon: VscVscode, color: '#007ACC' },
    { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
    { name: 'XAMPP', Icon: SiXampp, color: '#FB7A24' }
  ] as const;

  return (
    <LazyMotion features={domAnimation} strict>
    <div className="min-h-screen bg-gray-200 snap-y snap-mandatory">
      {/* Persistent Navigation */}
      <m.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: selectedProjectImage ? 0 : 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-4 md:top-8 left-4 md:left-8 right-4 md:right-8 z-40 flex items-center justify-between pointer-events-auto"
        style={{ display: selectedProjectImage ? 'none' : 'flex' }}
      >
        {/* Logo */}
        <a href="#home" className="text-base md:text-xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: 'var(--font-orbitron)' }}>
          Dillan not dirman
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8" style={{ fontFamily: 'var(--font-orbitron)' }}>
          <a href="#home" className={`relative text-sm font-medium transition-colors group ${activeSection === 'home' ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'}`}>
            Beranda
            <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-gray-900 transition-transform duration-300 origin-left ${activeSection === 'home' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
          </a>
          <a href="#about" className={`relative text-sm font-medium transition-colors group ${activeSection === 'about' ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'}`}>
            Tentang
            <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-gray-900 transition-transform duration-300 origin-left ${activeSection === 'about' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
          </a>
          <a href="#skill" className={`relative text-sm font-medium transition-colors group ${activeSection === 'skill' ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'}`}>
            Keahlian
            <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-gray-900 transition-transform duration-300 origin-left ${activeSection === 'skill' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
          </a>
          <a href="#projects" className={`relative text-sm font-medium transition-colors group ${activeSection === 'projects' ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'}`}>
            Proyek
            <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-gray-900 transition-transform duration-300 origin-left ${activeSection === 'projects' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
          </a>
          <a href="#contact" className={`relative text-sm font-medium transition-colors group ${activeSection === 'contact' ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'}`}>
            Kontak
            <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-gray-900 transition-transform duration-300 origin-left ${activeSection === 'contact' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </m.div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-35 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <m.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-white shadow-2xl z-45 md:hidden"
            >
              <div className="flex flex-col h-full pt-20 px-6" style={{ fontFamily: 'var(--font-orbitron)' }}>
                <nav className="flex flex-col gap-6">
                  <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="text-left text-lg font-medium transition-colors text-gray-700">Beranda</a>
                  <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-left text-lg font-medium transition-colors text-gray-700">Tentang</a>
                  <a href="#skill" onClick={() => setIsMobileMenuOpen(false)} className="text-left text-lg font-medium transition-colors text-gray-700">Keahlian</a>
                  <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="text-left text-lg font-medium transition-colors text-gray-700">Proyek</a>
                  <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-left text-lg font-medium transition-colors text-gray-700">Kontak</a>
                </nav>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-gray-200 snap-start p-6">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #374151 1px, transparent 1px), linear-gradient(to bottom, #374151 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        {/* Scan overlay */}
        <m.div
          initial={{ y: '-100%', opacity: 0 }}
          whileInView={{ y: '100%', opacity: [0, 0.35, 0] }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-0 right-0 h-32 md:h-40 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
        </m.div>

        {/* Main content */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: 'var(--font-orbitron)' }}>
            Pengembang Web
          </h1>
          <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
            Pengembang web berusia 17 tahun dari Bekasi, Indonesia. Siswa di SMK Telekomunikasi Telesandi Bekasi, bersemangat menciptakan solusi digital inovatif dan pengalaman web modern.
          </p>

          {/* Integrated stats */}
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-6 md:gap-10 bg-gray-200/60 border border-gray-300 rounded-xl px-6 py-4 mb-10 shadow-sm"
          >
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-orbitron)' }}>1+</p>
              <p className="text-xs md:text-sm text-gray-600 uppercase tracking-wider">Tahun Coding</p>
            </div>
            <div className="w-px h-10 bg-gray-300" />
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-orbitron)' }}>5+</p>
              <p className="text-xs md:text-sm text-gray-600 uppercase tracking-wider">Proyek</p>
            </div>
            <div className="w-px h-10 bg-gray-300" />
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-orbitron)' }}>100%</p>
              <p className="text-xs md:text-sm text-gray-600 uppercase tracking-wider">Passionate</p>
            </div>
          </m.div>

          {/* CTA */}
          
        </m.div>
      </section>

      {/* About Section */}
        <section id="about" className="min-h-screen flex items-center justify-center px-6 bg-gray-200 py-20 relative snap-start">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(to right, #374151 1px, transparent 1px),
                linear-gradient(to bottom, #374151 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          {/* Scan overlay */}
          <m.div
            initial={{ y: '-100%', opacity: 0 }}
            whileInView={{ y: '100%', opacity: [0, 0.35, 0] }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute left-0 right-0 h-32 md:h-40 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
          </m.div>
          <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }} className="max-w-6xl mx-auto w-full relative z-10">
            {/* Header */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
                Tentang Saya
              </h2>
              <div className="w-16 h-0.5 bg-gray-900 mx-auto"></div>
            </m.div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left: Profile Info */}
              <m.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Introduction */}
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
                    web developer
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Saya Dillan Ilkham Nur Fazry, web developer berusia 17 tahun dari Bekasi, Indonesia. 
                    Saat ini belajar di SMK Telekomunikasi Telesandi Bekasi, saya fokus membuat 
                    aplikasi web modern dengan kode yang bersih dan efisien.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    saya berfokus pada bidang front end dengan design yang minimalis.
                  </p>
                </div>

                {/* Personal Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Lokasi</h4>
                    <p className="text-gray-600">Bekasi, Indonesia</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Usia</h4>
                    <p className="text-gray-600">17 Tahun</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Pendidikan</h4>
                    <p className="text-gray-600">SMK Telesandi Bekasi</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Pengalaman</h4>
                    <p className="text-gray-600">1+ Tahun</p>
                  </div>
                </div>
              </m.div>

              {/* Right: Goals & Interests */}
              <m.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-8"
              >
                {/* Goals */}
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-orbitron)' }}>
                    Tujuan Saat Ini
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Menguasai pengembangan aplikasi full-stack</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Membangun aplikasi web yang berdampak</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Berkontribusi ke proyek open source</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Mempelajari teknologi dan framework baru</span>
                    </li>
                  </ul>
                </div>

                {/* Interests */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Hobby</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Ngoding', 'Gitaran', 'Menggambar', 'Main game'].map((interest, i) => (
                      <span key={i} className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 shadow-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Philosophy */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-3">Filosofi Saya</h4>
                  <p className="text-gray-600 italic leading-relaxed">
                    "Coding bukan hanya sekedar membuat aplikasi, tetapi untuk melampiaskan imajinasi."
                  </p>
                  <p>#Dlan12_</p>
                </div>
              </m.div>
            </div>
          </m.div>
        </section>

      {/* Skill Section */}
        <section id="skill" className="min-h-screen flex items-center justify-center px-6 bg-gray-200 py-20 relative snap-start">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(to right, #374151 1px, transparent 1px),
                linear-gradient(to bottom, #374151 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }} className="max-w-6xl mx-auto w-full relative z-10">
            {/* Header */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
                Keahlian & Keunggulan
              </h2>
              <div className="w-16 h-0.5 bg-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Gambaran ringkas tentang keahlian teknis dan teknologi yang saya gunakan.
              </p>
            </m.div>

            {/* Skills Progress Bars */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-20"
            >
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: 'var(--font-orbitron)' }}>
                Kompetensi Inti
              </h3>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {[
                  { skill: 'Pengembangan Frontend', level: 90 },
                  { skill: 'Pengembangan Backend', level: 75 },
                  { skill: 'Desain UI/UX', level: 80 },
                  { skill: 'Manajemen Basis Data', level: 70 },
                  { skill: 'Pengembangan API', level: 85 },
                  { skill: 'Version Control (Git)', level: 88 }
                ].map((item, index) => (
                  <div key={item.skill}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{item.skill}</span>
                      <span className="text-sm text-gray-600">{item.level}%</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2.5">
                      <m.div
                        className="bg-gray-900 h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.level}%` }}
                        transition={{ duration: 1, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </m.div>

            {/* Technologies */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mb-8"
            >
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: 'var(--font-orbitron)' }}>
                Teknologi yang Saya Gunakan
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4 md:gap-6">
                {techs.map((tech, index) => (
                  <m.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.03 }}
                    className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="h-8 w-8 mb-2 flex items-center justify-center">
                      {(() => {
                        const IconComp = (tech as any).Icon;
                        return IconComp ? (
                          <IconComp color={tech.color} size={32} />
                        ) : (
                          <span className="text-sm font-semibold">{tech.name[0]}</span>
                        );
                      })()}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{tech.name}</span>
                  </m.div>
                ))}
              </div>
            </m.div>

          </m.div>
        </section>
      

      {/* Projects Section */}
        <section id="projects" className="min-h-screen flex items-center py-20 px-6 bg-gray-200 relative snap-start">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(to right, #374151 1px, transparent 1px),
                linear-gradient(to bottom, #374151 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }} className="max-w-6xl mx-auto w-full relative z-10">
            {/* Header */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
                Proyek Saya
              </h2>
              <div className="w-16 h-0.5 bg-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Kumpulan proyek yang menampilkan kemampuan saya dalam pengembangan web,
                mulai dari aplikasi frontend hingga aplikasi full-stack.
              </p>
            </m.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {projects.map((project, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group h-full flex flex-col"
                >
                  {/* Project Header */}
                  <div className="p-6 border-b border-gray-100 min-h-48">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {project.category}
                      </span>
                      <span className="text-xs text-gray-400">{project.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-orbitron)' }}>
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="p-6 flex flex-col flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Teknologi</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.split(', ').map((tech, i) => (
                        <span 
                          key={i} 
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Action Button */}
                    <button onClick={() => setSelectedProjectImage(
                      project.title === 'Pemesanan Makanan'
                        ? '/images/4.png'
                        : project.title === 'Music'
                          ? '/images/5.png'
                          : project.title === 'Payroll System'
                            ? '/images/3.png'
                            : getProjectImage(index)
                    )} className="w-full py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2 mt-auto">
                      Lihat Proyek
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </m.div>
              ))}
            </div>
            <AnimatePresence>
              {selectedProjectImage && (
                <m.div
                  key="project-modal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70"
                  onClick={() => setSelectedProjectImage(null)}
                >
                  <m.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative max-w-4xl w-[92%] sm:w-[90%] bg-white rounded-lg overflow-hidden shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-white">
                      <span className="text-sm font-medium text-gray-700">Pratinjau Proyek</span>
                      <button
                        onClick={() => setSelectedProjectImage(null)}
                        className="px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Tutup
                      </button>
                    </div>
                    <div className="p-3 bg-gray-50">
                      <div className="max-h-[70vh] sm:max-h-[75vh] overflow-auto">
                        <img src={selectedProjectImage} alt="Project Image" className="w-full h-auto object-contain rounded-md" />
                      </div>
                    </div>
                  </m.div>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>
        </section>
      

      {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center py-20 px-6 bg-gray-200 relative snap-start">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(to right, #374151 1px, transparent 1px),
                linear-gradient(to bottom, #374151 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }} className="max-w-6xl mx-auto w-full relative z-10">
            {/* Header */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
                Hubungi Saya
              </h2>
              <div className="w-16 h-0.5 bg-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Punya ide proyek atau ingin berkolaborasi? Saya senang mendengarnya.
                Mari ciptakan sesuatu yang luar biasa bersama.
              </p>
            </m.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Left: Contact Info */}
              <m.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8 bg-white rounded-lg shadow-sm p-6 md:bg-transparent md:shadow-none md:p-0"
              >
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-orbitron)' }}>
                    Mari Terhubung
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    Saya selalu terbuka untuk berdiskusi tentang peluang baru, proyek kreatif,
                    atau sekadar mengobrol santai seputar pengembangan web dan teknologi.
                  </p>
                </div>

                {/* Contact Methods */}
                <div className="space-y-6">
                  {/* Email */}
                  <a href="mailto:dilaninf6@gmail.com" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <p className="text-gray-600 group-hover:underline">dilaninf6@gmail.com</p>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a href="https://wa.me/6285591022177" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                      <SiWhatsapp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">WhatsApp</h4>
                      <p className="text-gray-600 group-hover:underline">+62 855-9102-2177</p>
                    </div>
                  </a>

                  {/* Instagram */}
                  <a href="https://instagram.com/Dlan12_" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Instagram</h4>
                      <p className="text-gray-600 group-hover:underline">@Dlan12_</p>
                    </div>
                  </a>
                </div>

                {/* Social Links */}
                <div className="pt-6 border-t border-gray-300">
                  <h4 className="font-semibold text-gray-900 mb-4">Ikuti Saya</h4>
                  <div className="flex gap-4">
                    {[
                      { icon: <Github className="w-5 h-5" />, href: 'https://github.com/DillanINF', label: 'GitHub' },
                      { icon: <Linkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/in/dillan-inf', label: 'LinkedIn' }
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-900 hover:bg-gray-800 text-white rounded-lg flex items-center justify-center transition-colors duration-200"
                        title={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </m.div>

              {/* Right: Contact Form */}
              <m.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white rounded-lg shadow-sm p-6 md:p-8"
              >
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-orbitron)' }}>
                  Kirim Pesan
                </h3>
                
                <form ref={contactFormRef} onSubmit={handleSendMessage} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nama</label>
                      <input
                        type="text"
                        name="user_name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none transition-colors duration-200"
                        placeholder="Nama lengkap Anda"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="user_email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none transition-colors duration-200"
                        placeholder="email@anda.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subjek</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none transition-colors duration-200"
                      placeholder="Permintaan proyek"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Pesan</label>
                    <textarea
                      rows={5}
                      name="message"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none transition-colors duration-200 resize-none"
                      placeholder="Ceritakan tentang proyek Anda..."
                    />
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={sendingMessage}
                      className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                      style={{ fontFamily: 'var(--font-orbitron)' }}
                    >
                      {sendingMessage ? 'Mengirim...' : 'Kirim Pesan'}
                    </button>

                    {/* Robotic Notification */}
                    <AnimatePresence mode="wait">
                      {sendingMessage && (
                        <m.div
                          key="loading"
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="mt-4 relative overflow-hidden bg-blue-50 border-2 border-blue-500 px-4 py-3"
                          style={{ 
                            clipPath: 'polygon(6px 0%, 100% 0%, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0% 100%, 0% 6px)',
                            fontFamily: 'var(--font-orbitron)'
                          }}
                        >
                          {/* Scanning line */}
                          <m.div
                            className="absolute inset-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"
                            animate={{ y: [0, 48, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          />
                          <div className="relative flex items-center gap-3">
                            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                            <span className="text-sm font-medium text-blue-900 tracking-wide">
                              TRANSMITTING DATA...
                            </span>
                          </div>
                        </m.div>
                      )}

                      {sendStatus === 'success' && !sendingMessage && (
                        <m.div
                          key="success"
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="mt-4 relative overflow-hidden bg-green-50 border-2 border-green-500 px-4 py-3"
                          style={{ 
                            clipPath: 'polygon(6px 0%, 100% 0%, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0% 100%, 0% 6px)',
                            fontFamily: 'var(--font-orbitron)'
                          }}
                        >
                          {/* Success pulse */}
                          <m.div
                            className="absolute inset-0 bg-green-500 opacity-10"
                            animate={{ opacity: [0.1, 0.3, 0.1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          <div className="relative flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-medium text-green-900 tracking-wide">
                              MESSAGE TRANSMITTED SUCCESSFULLY
                            </span>
                          </div>
                          {/* Progress bar */}
                          <m.div
                            className="absolute bottom-0 left-0 h-[2px] bg-green-600"
                            initial={{ width: '100%' }}
                            animate={{ width: '0%' }}
                            transition={{ duration: 4, ease: 'linear' }}
                          />
                        </m.div>
                      )}

                      {sendStatus === 'error' && !sendingMessage && (
                        <m.div
                          key="error"
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="mt-4 relative overflow-hidden bg-red-50 border-2 border-red-500 px-4 py-3"
                          style={{ 
                            clipPath: 'polygon(6px 0%, 100% 0%, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0% 100%, 0% 6px)',
                            fontFamily: 'var(--font-orbitron)'
                          }}
                        >
                          {/* Error glitch */}
                          <m.div
                            className="absolute inset-0 bg-red-500 opacity-10"
                            animate={{ opacity: [0.1, 0.2, 0.1, 0.2, 0.1] }}
                            transition={{ duration: 0.5, repeat: 3 }}
                          />
                          <div className="relative flex items-center gap-3">
                            <XCircle className="w-5 h-5 text-red-600" />
                            <span className="text-sm font-medium text-red-900 tracking-wide">
                              TRANSMISSION FAILED - RETRY
                            </span>
                          </div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                </form>
              </m.div>
            </div>
          </m.div>
        </section>
      

      {/* Professional Footer */}
      <m.footer 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white border-t border-gray-200 py-10 px-6 min-h-0 h-auto snap-none"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Left: Brand */}
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-orbitron)' }}>
                Dillan Ilkham
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
              just student who love to make website
              </p>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Tersedia untuk proyek baru</span>
              </div>
            </m.div>

            {/* Center: Quick Links */}
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="font-semibold text-gray-900 mb-4">Tautan Cepat</h4>
              <div className="space-y-2">
                {[
                  { name: 'Beranda', href: '#home' },
                  { name: 'Tentang', href: '#about' },
                  { name: 'Keahlian', href: '#skill' },
                  { name: 'Proyek', href: '#projects' },
                  { name: 'Kontak', href: '#contact' }
                ].map((link, index) => (
                  <a
                    key={index}
                    href={(link as any).href}
                    className="block text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </m.div>

            {/* Right: Contact Info */}
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="font-semibold text-gray-900 mb-4">Hubungi Saya</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>dilaninf6@gmail.com</p>
                <p>Bekasi, Indonesia</p>
              </div>
              <div className="flex gap-3 mt-4">
                {[
                  { icon: <Mail className="w-4 h-4" />, href: 'mailto:dilaninf6@gmail.com', label: 'Email' },
                  { icon: <Github className="w-4 h-4" />, href: 'https://github.com/DillanINF', label: 'GitHub' },
                  { icon: <Linkedin className="w-4 h-4" />, href: 'https://www.linkedin.com/in/dillan-inf', label: 'LinkedIn' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gray-100 hover:bg-gray-900 hover:text-white text-gray-600 rounded-lg flex items-center justify-center transition-all duration-200"
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </m.div>
          </div>

          {/* Bottom */}
          <m.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div className="text-sm text-gray-600">
              © 2024 Dillan Ilkham Nur Fazry.
            </div>
            <div className="text-sm text-gray-500">
              Dibangun dengan Next.js & Tailwind CSS
            </div>
          </m.div>
        </div>
      </m.footer>

      {/* Chatbot */}
      <Chatbot />

    </div>
    </LazyMotion>
  );
}
