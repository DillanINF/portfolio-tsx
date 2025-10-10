'use client';

import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, ExternalLink, ArrowRight, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { 
  SiHtml5, SiCss3, SiJavascript, SiReact, SiNextdotjs, SiLaravel, SiNodedotjs, SiMongodb, 
  SiMysql, SiGit, SiFigma, SiTailwindcss, SiTypescript, SiXampp, SiWhatsapp 
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Spline from '@splinetool/react-spline';
import Chatbot from './components/Chatbot';
import GithubContributions from './components/GithubContributions';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const splineRef = useRef<any>(null);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  // Render 3D only after first time hero is visible; keep mounted afterwards
  const [shouldRender3D, setShouldRender3D] = useState(false);
  const [showSection, setShowSection] = useState<string | null>(null);
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

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sendingMessage) return;
    setSendingMessage(true);
    setSendStatus('idle');

    try {
      const form = contactFormRef.current;
      if (!form) throw new Error('Form tidak ditemukan');

      // Gunakan sendForm agar EmailJS otomatis membaca field by name
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

  // Restore section from URL hash on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove '#'
    if (hash && ['about', 'skill', 'projects', 'contact'].includes(hash)) {
      setShowSection(hash);
    }
  }, []);

  // Update URL hash when section changes
  useEffect(() => {
    if (showSection) {
      window.history.replaceState(null, '', `#${showSection}`);
    } else {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [showSection]);

  useEffect(() => {
    // Optimized: Run only once after load
    const removeSplineBackground = () => {
      const splineViewer = document.querySelector('spline-viewer');
      if (splineViewer) {
        const shadowRoot = (splineViewer as any).shadowRoot;
        if (shadowRoot) {
          const canvas = shadowRoot.querySelector('canvas');
          if (canvas) {
            canvas.style.background = 'transparent';
            canvas.style.backgroundColor = 'transparent';
          }
        }
        (splineViewer as any).style.background = 'transparent';
        (splineViewer as any).style.backgroundColor = 'transparent';
      }
    };

    // Run only twice: immediately and after 1 second
    removeSplineBackground();
    const timeout = setTimeout(removeSplineBackground, 1000);

    return () => clearTimeout(timeout);
  }, []);

  // Enable Spline once hero is seen; do NOT unmount afterwards to keep state and avoid re-appearing
  useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender3D(true);
        }
      },
      { root: null, threshold: 0.15 }
    );

    io.observe(hero);
    return () => io.disconnect();
  }, []);

  const projects = [
    {
      title: 'Platform E-Commerce',
      category: 'Pengembangan Web',
      description: 'Solusi e-commerce modern dengan pengalaman pengguna mulus dan integrasi pembayaran yang aman.',
      tech: 'Next.js, TypeScript, Stripe',
      year: '2024'
    },
    {
      title: 'Dashboard Analitik',
      category: 'Desain UI/UX',
      description: 'Dashboard analitik komprehensif dengan visualisasi data interaktif dan wawasan real-time.',
      tech: 'React, D3.js, Node.js',
      year: '2024'
    },
    {
      title: 'Aplikasi Mobile Banking',
      category: 'Desain Mobile',
      description: 'Aplikasi perbankan intuitif yang fokus pada keamanan dan kemudahan pengelolaan keuangan.',
      tech: 'React Native, Firebase',
      year: '2023'
    },
    {
      title: 'Sistem Identitas Merek',
      category: 'Branding',
      description: 'Identitas merek lengkap dan sistem desain untuk startup fashion mewah.',
      tech: 'Figma, Adobe Creative Suite',
      year: '2023'
    },
    {
      title: 'Landing Page SaaS',
      category: 'Pengembangan Web',
      description: 'Landing page dengan konversi tinggi, performa optimal, dan animasi modern.',
      tech: 'Next.js, Framer Motion',
      year: '2024'
    },
    {
      title: 'Website Portofolio',
      category: 'Full Stack',
      description: 'Portofolio pribadi yang menampilkan proyek dengan desain elegan dan interaksi halus.',
      tech: 'Next.js, Tailwind CSS',
      year: '2024'
    }
  ];

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
    <div className="min-h-screen bg-gray-200">
      {/* Persistent Navigation */}
      <m.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-8 left-8 right-8 z-50 flex items-center justify-between pointer-events-auto"
      >
        {/* Logo */}
        <button onClick={() => setShowSection(null)} className="text-xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: 'var(--font-orbitron)' }}>
          Dillan not dirman
        </button>

        {/* Navigation Links */}
        <div className="flex items-center gap-8" style={{ fontFamily: 'var(--font-orbitron)' }}>
          <button 
            onClick={() => setShowSection(null)} 
            className={`relative text-sm font-medium transition-colors group ${
              showSection === null ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            Beranda
            <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-900 to-transparent transition-opacity ${
              showSection === null ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}></span>
          </button>
          <button 
            onClick={() => setShowSection('about')} 
            className={`relative text-sm font-medium transition-colors group ${
              showSection === 'about' ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            Tentang
            <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-900 to-transparent transition-opacity ${
              showSection === 'about' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}></span>
          </button>
          <button 
            onClick={() => setShowSection('skill')} 
            className={`relative text-sm font-medium transition-colors group ${
              showSection === 'skill' ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            Keahlian
            <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-900 to-transparent transition-opacity ${
              showSection === 'skill' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}></span>
          </button>
          <button 
            onClick={() => setShowSection('projects')} 
            className={`relative text-sm font-medium transition-colors group ${
              showSection === 'projects' ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            Proyek
            <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-900 to-transparent transition-opacity ${
              showSection === 'projects' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}></span>
          </button>
          <button 
            onClick={() => setShowSection('contact')} 
            className={`relative text-sm font-medium transition-colors group ${
              showSection === 'contact' ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            Kontak
            <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-900 to-transparent transition-opacity ${
              showSection === 'contact' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}></span>
          </button>
        </div>
      </m.div>

      {/* Hero Section - Only show when no section is active */}
      {!showSection && (
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gray-200">
        {/* Background 3D Model - Full screen for cursor interaction */}
        <div className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'auto' }}>
          {shouldRender3D && (
            <Spline
              scene="https://prod.spline.design/HBw11aMipqOqgNEL/scene.splinecode"
              style={{ 
                width: '100%', 
                height: '100%',
                background: '#e5e7eb',
                backgroundColor: '#e5e7eb',
                opacity: isSplineLoaded ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out'
              }}
              onLoad={(spline: any) => {
                setIsSplineLoaded(true);
                // Performance optimizations
                if (spline && spline.renderer) {
                  spline.renderer.setClearColor(0xe5e7eb, 1);
                  // Lower DPR to reduce GPU load while keeping interaction
                  spline.renderer.setPixelRatio(0.75);
                  spline.renderer.shadowMap.enabled = false;
                }
                if (spline && spline.scene) {
                  spline.scene.background = null;
                }
                if (spline && spline.camera) {
                  spline.camera.position.x += 200;
                }
              }}
            />
          )}
        </div>

        {/* Text Content Left - Main info */}
        <div className="relative z-20 w-full px-6 pointer-events-none">
          <div className="max-w-7xl mx-auto">
            <m.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-lg pointer-events-auto"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 tracking-tight leading-tight drop-shadow-sm" style={{ fontFamily: 'var(--font-orbitron)' }}>
                Pengembang Web
              </h1>
              <p className="text-sm md:text-base text-gray-700 mb-5 leading-relaxed max-w-sm drop-shadow-sm">
              Pengembang web berusia 17 tahun dari Bekasi, Indonesia. Siswa di SMK Telekomunikasi Telesandi Bekasi, bersemangat menciptakan solusi digital inovatif dan pengalaman web modern.
              </p>
              <m.button
                onClick={() => setShowSection('projects')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-flex items-center gap-2 px-10 py-4 bg-gray-900 text-white font-medium overflow-hidden group"
                style={{ 
                  transform: 'skewX(-10deg)',
                  clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)'
                }}
              >
                {/* Animated line running through center */}
                <span className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <span 
                    className="absolute h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan"
                    style={{
                      animation: 'scan 2s linear infinite'
                    }}
                  />
                </span>
                
                {/* Button content - unskew text */}
                <span className="relative z-10 flex items-center gap-2" style={{ transform: 'skewX(10deg)' }}>
                  Lihat Karya Saya
                  <ArrowRight className="w-4 h-4" />
                </span>
              </m.button>
            </m.div>
          </div>
        </div>

        {/* Text Content Right Bottom - Stats/Info */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-12 right-12 z-20 pointer-events-none"
        >
          <div className="bg-gray-200/80 backdrop-blur-sm px-6 py-4 rounded-lg shadow-lg border border-gray-300">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-orbitron)' }}>1+</p>
                <p className="text-xs text-gray-600 uppercase tracking-wider">Tahun Coding</p>
              </div>
              <div className="w-px h-10 bg-gray-300"></div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-orbitron)' }}>5+</p>
                <p className="text-xs text-gray-600 uppercase tracking-wider">Proyek</p>
              </div>
              <div className="w-px h-10 bg-gray-300"></div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-orbitron)' }}>100%</p>
                <p className="text-xs text-gray-600 uppercase tracking-wider">Passion</p>
              </div>
            </div>
          </div>
        </m.div>
      </section>
      )}

      {/* Conditional Sections */}
      {showSection === 'about' && (
        <section className="min-h-screen flex items-center justify-center px-6 bg-gray-200 py-20 relative">
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
          <div className="max-w-6xl mx-auto w-full relative z-10">
            {/* Header */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
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
                <div className="grid grid-cols-2 gap-6">
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-orbitron)' }}>
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
                    {['Membangung sebuah website', 'Gitaran', 'Menggambar', 'Main game'].map((interest, i) => (
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
                    "Coding bukan untuk membuat kita menjadi keren, tetapi untuk melampiaskan imajinasi, dan membuat pikiran menjadi kritis."
                  </p>
                  <p>#Dlan12_</p>
                </div>
              </m.div>
            </div>
          </div>
        </section>
      )}

      {showSection === 'skill' && (
        <section className="min-h-screen flex items-center justify-center px-6 bg-gray-200 py-20 relative">
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
          <div className="max-w-6xl mx-auto w-full relative z-10">
            {/* Header */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: 'var(--font-orbitron)' }}>
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
              className="text-center mb-20"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'var(--font-orbitron)' }}>
                Teknologi yang Saya Gunakan
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {techs.map((tech, index) => (
                  <m.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.03 }}
                    className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
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

            {/* GitHub Contributions */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <GithubContributions />
            </m.div>
          </div>
        </section>
      )}

      {showSection === 'projects' && (
        <section className="min-h-screen flex items-center py-20 px-6 bg-gray-200 relative">
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

          <div className="max-w-6xl mx-auto w-full relative z-10">
            {/* Header */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
                Proyek Saya
              </h2>
              <div className="w-16 h-0.5 bg-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Kumpulan proyek yang menampilkan kemampuan saya dalam pengembangan web,
                mulai dari aplikasi frontend hingga aplikasi full-stack.
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  {/* Project Header */}
                  <div className="p-6 border-b border-gray-100">
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
                  <div className="p-6">
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
                    <button className="w-full py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2">
                      Lihat Proyek
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {showSection === 'contact' && (
        <section className="min-h-screen flex items-center py-20 px-6 bg-gray-200 relative">
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

          <div className="max-w-6xl mx-auto w-full relative z-10">
            {/* Header */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
                Hubungi Saya
              </h2>
              <div className="w-16 h-0.5 bg-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Punya ide proyek atau ingin berkolaborasi? Saya senang mendengarnya.
                Mari ciptakan sesuatu yang luar biasa bersama.
              </p>
            </m.div>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Left: Contact Info */}
              <m.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-orbitron)' }}>
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
                className="bg-white rounded-lg shadow-sm p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-orbitron)' }}>
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
          </div>
        </section>
      )}

      {/* Professional Footer - Only show when a section is active */}
      {showSection && (
      <m.footer 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white border-t border-gray-200 py-12 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
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
                  { name: 'Beranda', action: () => setShowSection(null) },
                  { name: 'Tentang', action: () => setShowSection('about') },
                  { name: 'Keahlian', action: () => setShowSection('skill') },
                  { name: 'Proyek', action: () => setShowSection('projects') },
                  { name: 'Kontak', action: () => setShowSection('contact') }
                ].map((link, index) => (
                  <button
                    key={index}
                    onClick={link.action}
                    className="block text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    {link.name}
                  </button>
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
      )}

      {/* Chatbot */}
      <Chatbot />

    </div>
    </LazyMotion>
  );
}
