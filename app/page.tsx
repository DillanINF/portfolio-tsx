'use client';

import { LazyMotion, domAnimation, m } from 'framer-motion';
import { Mail, Github, Linkedin, ExternalLink, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import Chatbot from './components/Chatbot';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const splineRef = useRef<any>(null);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  // Render 3D only after first time hero is visible; keep mounted afterwards
  const [shouldRender3D, setShouldRender3D] = useState(false);
  const [showSection, setShowSection] = useState<string | null>(null);

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
      title: 'E-Commerce Platform',
      category: 'Web Development',
      description: 'Modern e-commerce solution with seamless user experience and secure payment integration.',
      tech: 'Next.js, TypeScript, Stripe',
      year: '2024'
    },
    {
      title: 'Dashboard Analytics',
      category: 'UI/UX Design',
      description: 'Comprehensive analytics dashboard with interactive data visualization and real-time insights.',
      tech: 'React, D3.js, Node.js',
      year: '2024'
    },
    {
      title: 'Mobile Banking App',
      category: 'Mobile Design',
      description: 'Intuitive banking application focused on security and user-friendly financial management.',
      tech: 'React Native, Firebase',
      year: '2023'
    },
    {
      title: 'Brand Identity System',
      category: 'Branding',
      description: 'Complete brand identity and design system for a luxury fashion startup.',
      tech: 'Figma, Adobe Creative Suite',
      year: '2023'
    },
    {
      title: 'SaaS Landing Page',
      category: 'Web Development',
      description: 'High-converting landing page with optimized performance and modern animations.',
      tech: 'Next.js, Framer Motion',
      year: '2024'
    },
    {
      title: 'Portfolio Website',
      category: 'Full Stack',
      description: 'Personal portfolio showcasing projects with elegant design and smooth interactions.',
      tech: 'Next.js, Tailwind CSS',
      year: '2024'
    }
  ];

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
          <button onClick={() => setShowSection(null)} className="relative text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors group">
            Home
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan-once transition-opacity"></span>
          </button>
          <button onClick={() => setShowSection('about')} className="relative text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors group">
            About
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan-once transition-opacity"></span>
          </button>
          <button onClick={() => setShowSection('projects')} className="relative text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors group">
            Projects
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan-once transition-opacity"></span>
          </button>
          <button onClick={() => setShowSection('contact')} className="relative text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors group">
            Contact
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan-once transition-opacity"></span>
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
                Web Developer
              </h1>
              <p className="text-sm md:text-base text-gray-700 mb-5 leading-relaxed max-w-sm drop-shadow-sm">
                17-year-old web developer from Bekasi, Indonesia. Student at SMK Telekomunikasi Telesandi Bekasi, passionate about crafting innovative digital solutions and modern web experiences.
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
                  View My Work
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
                <p className="text-xs text-gray-600 uppercase tracking-wider">Years Coding</p>
              </div>
              <div className="w-px h-10 bg-gray-300"></div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-orbitron)' }}>5+</p>
                <p className="text-xs text-gray-600 uppercase tracking-wider">Projects</p>
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
                About Me
              </h2>
              <div className="w-16 h-0.5 bg-gray-900 mx-auto"></div>
            </m.div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
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
                    Web Developer
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    I'm Dillan Ilkham Nur Fazry, a 17-year-old web developer from Bekasi, Indonesia. 
                    Currently studying at SMK Telekomunikasi Telesandi Bekasi, I specialize in creating 
                    modern web applications with clean, efficient code.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    My focus is on building user-friendly interfaces and robust backend systems 
                    that solve real-world problems through technology.
                  </p>
                </div>

                {/* Personal Info */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                    <p className="text-gray-600">Bekasi, Indonesia</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Age</h4>
                    <p className="text-gray-600">17 Years</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Education</h4>
                    <p className="text-gray-600">SMK Telesandi Bekasi</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Experience</h4>
                    <p className="text-gray-600">1+ Years</p>
                  </div>
                </div>
              </m.div>

              {/* Right: Skills & Expertise */}
              <m.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-8"
              >
                {/* Skills */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-orbitron)' }}>
                    Skills & Expertise
                  </h3>
                  <div className="space-y-4">
                    {[
                      { skill: 'Frontend Development', level: 90 },
                      { skill: 'Backend Development', level: 75 },
                      { skill: 'UI/UX Design', level: 80 },
                      { skill: 'Database Management', level: 70 }
                    ].map((item, index) => (
                      <div key={item.skill}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">{item.skill}</span>
                          <span className="text-sm text-gray-600">{item.level}%</span>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-2">
                          <m.div
                            className="bg-gray-900 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${item.level}%` }}
                            transition={{ duration: 1, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Goals */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Current Goals</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Master full-stack development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Build impactful web applications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Contribute to open source projects</span>
                    </li>
                  </ul>
                </div>
              </m.div>
            </div>

            {/* Technologies */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'var(--font-orbitron)' }}>
                Technologies I Work With
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {[
                  { name: 'HTML5', icon: '🌐' },
                  { name: 'CSS3', icon: '🎨' },
                  { name: 'JavaScript', icon: '⚡' },
                  { name: 'React', icon: '⚛️' },
                  { name: 'Laravel', icon: '🚀' },
                  { name: 'Node.js', icon: '🟢' },
                  { name: 'MongoDB', icon: '🍃' },
                  { name: 'Git', icon: '📝' },
                  { name: 'Figma', icon: '🎯' },
                  { name: 'VS Code', icon: '💻' }
                ].map((tech, index) => (
                  <m.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.05 }}
                    className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="text-2xl mb-2">{tech.icon}</div>
                    <span className="text-sm font-medium text-gray-700">{tech.name}</span>
                  </m.div>
                ))}
              </div>
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
                My Projects
              </h2>
              <div className="w-16 h-0.5 bg-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A collection of projects that showcase my skills in web development, 
                from frontend interfaces to full-stack applications.
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
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Technologies</h4>
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
                      View Project
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
                Get In Touch
              </h2>
              <div className="w-16 h-0.5 bg-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Have a project in mind or want to collaborate? I'd love to hear from you. 
                Let's create something amazing together.
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
                    Let's Connect
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    I'm always open to discussing new opportunities, creative projects, 
                    or just having a friendly chat about web development and technology.
                  </p>
                </div>

                {/* Contact Methods */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <p className="text-gray-600">dilaninf6@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.52 3.48a12 12 0 0 0-17.04 0c-3.2 3.2-3.2 8.38 0 11.58l.3.3-.7 2.6 2.66-.7.29.28a8.17 8.17 0 0 0 5.79 2.4h.01c2.2 0 4.26-.86 5.8-2.4a12 12 0 0 0 0-17.06Z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">WhatsApp</h4>
                      <p className="text-gray-600">+62 855-9102-2177</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Instagram</h4>
                      <p className="text-gray-600">@Dlan12_</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-6 border-t border-gray-300">
                  <h4 className="font-semibold text-gray-900 mb-4">Follow Me</h4>
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
                  Send Message
                </h3>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none transition-colors duration-200"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none transition-colors duration-200"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none transition-colors duration-200"
                      placeholder="Project inquiry"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none transition-colors duration-200 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                  >
                    Send Message
                  </button>
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
                Web Developer passionate about creating modern, efficient, and user-friendly digital solutions.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Available for new projects</span>
              </div>
            </m.div>

            {/* Center: Quick Links */}
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
              <div className="space-y-2">
                {[
                  { name: 'Home', action: () => setShowSection(null) },
                  { name: 'About', action: () => setShowSection('about') },
                  { name: 'Projects', action: () => setShowSection('projects') },
                  { name: 'Contact', action: () => setShowSection('contact') }
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
              <h4 className="font-semibold text-gray-900 mb-4">Get In Touch</h4>
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
              © 2024 Dillan Ilkham Nur Fazry. All rights reserved.
            </div>
            <div className="text-sm text-gray-500">
              Built with Next.js & Tailwind CSS
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
