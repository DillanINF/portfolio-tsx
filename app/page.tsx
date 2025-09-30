'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ExternalLink, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const splineRef = useRef<any>(null);

  useEffect(() => {
    // Function to remove background from Spline viewer
    const removeSplineBackground = () => {
      const splineViewer = document.querySelector('spline-viewer');
      if (splineViewer) {
        // Try to access shadow DOM
        const shadowRoot = (splineViewer as any).shadowRoot;
        if (shadowRoot) {
          const canvas = shadowRoot.querySelector('canvas');
          const container = shadowRoot.querySelector('#canvas3d');
          const allElements = shadowRoot.querySelectorAll('*');
          
          if (canvas) {
            canvas.style.background = 'transparent';
            canvas.style.backgroundColor = 'transparent';
            canvas.style.backgroundImage = 'none';
            
            // Try to manipulate WebGL context
            try {
              const gl = canvas.getContext('webgl') || canvas.getContext('webgl2') || canvas.getContext('experimental-webgl');
              if (gl) {
                gl.clearColor(0, 0, 0, 0); // Transparent black
                gl.clear(gl.COLOR_BUFFER_BIT);
              }
            } catch (e) {
              console.log('Could not access WebGL context');
            }
          }
          if (container) {
            container.style.background = 'transparent';
            container.style.backgroundColor = 'transparent';
            container.style.backgroundImage = 'none';
          }
          allElements.forEach((el: any) => {
            el.style.background = 'transparent';
            el.style.backgroundColor = 'transparent';
            el.style.backgroundImage = 'none';
          });
        }

        // Set attributes
        splineViewer.setAttribute('background-color', 'transparent');
        (splineViewer as any).style.background = 'transparent';
        (splineViewer as any).style.backgroundColor = 'transparent';
        (splineViewer as any).style.backgroundImage = 'none';

        // Try to access the Spline application instance
        const splineApp = (splineViewer as any).spline;
        if (splineApp) {
          // Try to remove background from scene
          if (splineApp.scene) {
            if (splineApp.scene.background) {
              splineApp.scene.background = null;
            }
            if (splineApp.scene.environment) {
              splineApp.scene.environment = null;
            }
          }
          
          // Try to access renderer
          if (splineApp.renderer) {
            splineApp.renderer.setClearColor(0x000000, 0); // Transparent
            splineApp.renderer.setClearAlpha(0);
          }
        }
      }
    };

    // Run immediately
    removeSplineBackground();

    // Run after delays to catch late-loading elements
    const timeouts = [100, 300, 500, 800, 1000, 1500, 2000, 3000, 4000];
    const timeoutIds: NodeJS.Timeout[] = [];
    timeouts.forEach(delay => {
      const id = setTimeout(removeSplineBackground, delay);
      timeoutIds.push(id);
    });

    // Observer to watch for changes
    const observer = new MutationObserver(removeSplineBackground);
    const splineViewer = document.querySelector('spline-viewer');
    if (splineViewer) {
      observer.observe(splineViewer, { 
        childList: true, 
        subtree: true, 
        attributes: true 
      });
    }

    // Add event listener for spline load
    if (splineViewer) {
      (splineViewer as any).addEventListener('load', removeSplineBackground);
      (splineViewer as any).addEventListener('ready', removeSplineBackground);
    }

    return () => {
      observer.disconnect();
      timeoutIds.forEach(id => clearTimeout(id));
    };
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-white">
        {/* Background 3D Model - Full screen for cursor interaction */}
        <div className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'auto' }}>
          <Spline
            scene="https://prod.spline.design/HBw11aMipqOqgNEL/scene.splinecode"
            style={{ 
              width: '100%', 
              height: '100%',
              background: 'white',
              backgroundColor: 'white'
            }}
            onLoad={(spline: any) => {
              // Performance optimizations
              if (spline && spline.renderer) {
                spline.renderer.setClearColor(0xffffff, 1);
                // Reduce pixel ratio for better performance
                spline.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
              }
              // Remove scene background
              if (spline && spline.scene) {
                spline.scene.background = null;
              }
              
              // Move camera to show robot on the right
              if (spline && spline.camera) {
                spline.camera.position.x += 200; // Shift camera view to right
              }
            }}
          />
        </div>

        {/* Logo/Name - Top Left */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-8 left-8 z-20 pointer-events-auto"
        >
          <a href="#home" className="text-xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: 'var(--font-orbitron)' }}>
            Dillan not dirman
          </a>
        </motion.div>

        {/* Navigation Links - Top Right */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-8 right-8 z-20 flex items-center gap-8 pointer-events-auto"
          style={{ fontFamily: 'var(--font-orbitron)' }}
        >
          <a href="#home" className="relative text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors group">
            Home
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan-once transition-opacity"></span>
          </a>
          <a href="#about" className="relative text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors group">
            About
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan-once transition-opacity"></span>
          </a>
          <a href="#projects" className="relative text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors group">
            Projects
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan-once transition-opacity"></span>
          </a>
          <a href="#contact" className="relative text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors group">
            Contact
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan-once transition-opacity"></span>
          </a>
        </motion.div>

        {/* Text Content Left - Main info */}
        <div className="relative z-20 w-full px-6 pointer-events-none">
          <div className="max-w-7xl mx-auto">
            <motion.div
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
              <motion.a
                href="#projects"
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
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Text Content Right Bottom - Stats/Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-12 right-12 z-20 pointer-events-none"
        >
          <div className="bg-white/80 backdrop-blur-sm px-6 py-4 rounded-lg shadow-lg border border-gray-200">
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
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="h-screen flex items-center py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-gray-100/30 to-gray-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-gray-100/20 to-gray-300/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-center relative z-10">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block relative"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight relative" style={{ fontFamily: 'var(--font-orbitron)' }}>
                About Me
                <motion.div 
                  className="absolute -inset-4 bg-gradient-to-r from-gray-200/20 via-gray-300/30 to-gray-200/20 rounded-2xl -z-10"
                  initial={{ scale: 0, rotate: -5 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                />
              </h2>
            </motion.div>
            <motion.div 
              className="w-20 h-0.5 bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 mx-auto mb-6 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ delay: 0.6, duration: 1 }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto font-medium"
            >
              17-year-old developer crafting digital experiences with precision and innovation
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-10 items-start">
            {/* Left - Profile */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ y: -5 }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-500 relative overflow-hidden group"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-100/40 to-transparent rounded-bl-3xl transition-opacity group-hover:opacity-60"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200/70">
                  <motion.div 
                    className="w-3 h-3 bg-gray-900 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: 'var(--font-orbitron)' }}>
                    Profile
                  </h3>
                  <div className="ml-auto w-8 h-0.5 bg-gray-300 rounded-full"></div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { label: 'Name', value: 'Dillan Ilkham Nur Fazry' },
                    { label: 'Age', value: '17 Years' },
                    { label: 'Location', value: 'Bekasi' },
                    { label: 'Education', value: 'SMK Telekomunikai Telesandi Bekasi' }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="grid grid-cols-[140px_1fr] items-start gap-6 py-2 px-3 rounded-lg hover:bg-gray-50/80 transition-colors"
                    >
                      <span className="text-gray-500 font-medium text-sm uppercase tracking-wider">{item.label}</span>
                      <span className="font-semibold text-gray-900 text-left break-words leading-snug">{item.value}</span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200/70">
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    Passionate about creating innovative web solutions with clean code and intuitive design.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Center - Skills */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-500 relative overflow-hidden group"
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 20px 20px, #374151 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }}></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200/70">
                  <motion.div 
                    className="w-3 h-3 bg-gray-900 rounded-full"
                    animate={{ 
                      boxShadow: ['0 0 0 0 rgba(55, 65, 81, 0.4)', '0 0 0 8px rgba(55, 65, 81, 0)', '0 0 0 0 rgba(55, 65, 81, 0)']
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: 'var(--font-orbitron)' }}>
                    Core Systems
                  </h3>
                  <div className="ml-auto flex gap-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {[
                    { skill: 'Frontend Development', level: '90%', code: 'FE_SYS', color: 'from-blue-600 to-blue-800' },
                    { skill: 'UI/UX Design', level: '85%', code: 'UX_SYS', color: 'from-purple-600 to-purple-800' },
                    { skill: 'Backend Development', level: '75%', code: 'BE_SYS', color: 'from-green-600 to-green-800' },
                    { skill: 'Mobile Development', level: '50%', code: 'MB_SYS', color: 'from-orange-600 to-orange-800' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.4 }}
                      whileHover={{ x: 5 }}
                      className="group/skill"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                          <motion.span 
                            className="text-xs font-mono text-white bg-gray-800 px-3 py-1.5 rounded-md font-semibold tracking-wider"
                            whileHover={{ scale: 1.05 }}
                          >
                            {item.code}
                          </motion.span>
                          <span className="text-sm font-semibold text-gray-900 group-hover/skill:text-gray-700 transition-colors">
                            {item.skill}
                          </span>
                        </div>
                        <motion.span 
                          className="text-sm font-bold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200"
                          whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
                        >
                          {item.level}
                        </motion.span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: item.level }}
                          viewport={{ once: true }}
                          transition={{ duration: 2, delay: index * 0.2 + 0.6, ease: "easeOut" }}
                          className={`bg-gradient-to-r ${item.color} h-2 rounded-full relative shadow-sm`}
                        >
                          <motion.div
                            className="absolute inset-0 bg-white/30 rounded-full"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right - Tech & Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Tech Stack */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="w-2 h-2 bg-gray-900 rounded-full animate-pulse"></div>
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight" style={{ fontFamily: 'var(--font-orbitron)' }}>
                    Tech Stack
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Frontend</h5>
                    <div className="flex flex-wrap gap-1">
                      {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vanilla JS', 'Bootstrap'].map((tech, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Backend</h5>
                    <div className="flex flex-wrap gap-1">
                      {['Node.js', 'MongoDB', 'Firebase', 'PHP', 'Laravel', 'MySQL'].map((tech, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Tools</h5>
                    <div className="flex flex-wrap gap-1">
                      {['Laragon', 'XAMPP', 'GitHub', 'Terminal', 'phpMyAdmin', 'Figma', 'VS Code'].map((tech, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { number: '1+', label: 'Years' },
                  { number: '10+', label: 'Projects' },
                  { number: '5+', label: 'Tech' },
                  { number: '100%', label: 'Passion' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm"
                  >
                    <div className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-orbitron)' }}>
                      {stat.number}
                    </div>
                    <div className="text-xs text-gray-600 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center py-24 px-6 bg-white relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-gray-100/20 to-gray-200/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-tr from-gray-100/15 to-gray-300/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block relative"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight relative" style={{ fontFamily: 'var(--font-orbitron)' }}>
                Featured Projects
                <motion.div 
                  className="absolute -inset-4 bg-gradient-to-r from-gray-200/20 via-gray-300/30 to-gray-200/20 rounded-2xl -z-10"
                  initial={{ scale: 0, rotate: 5 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                />
              </h2>
            </motion.div>
            <motion.div 
              className="w-20 h-0.5 bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 mx-auto mb-6 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ delay: 0.6, duration: 1 }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto font-medium"
            >
              A showcase of innovative digital solutions and modern web experiences
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer border border-gray-200/50 relative"
              >
                {/* Project Header with Number */}
                <div className="h-56 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 30px 30px, #374151 2px, transparent 2px)`,
                      backgroundSize: '60px 60px'
                    }}></div>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700/5 to-gray-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Project Number */}
                  <motion.div 
                    className="text-6xl font-bold text-gray-300 group-hover:text-gray-600 transition-colors duration-500 relative z-10"
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </motion.div>
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gray-200/30 to-transparent rounded-bl-3xl"></div>
                  
                  {/* Status indicator */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <motion.div 
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                    <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                      PROJ_{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <motion.span 
                      className="text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full uppercase tracking-wider border border-gray-200"
                      whileHover={{ scale: 1.05 }}
                    >
                      {project.category}
                    </motion.span>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                      <span className="text-xs text-gray-500 font-mono">{project.year}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors leading-tight" style={{ fontFamily: 'var(--font-orbitron)' }}>
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Tech Stack</span>
                    </div>
                    <span className="text-xs text-gray-600 font-mono bg-gray-50 px-2 py-1 rounded">
                      {project.tech}
                    </span>
                  </div>
                  
                  {/* Action Button */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between pt-4 border-t border-gray-100"
                  >
                    <div className="flex items-center gap-2 text-gray-900 group-hover:text-gray-700 transition-colors">
                      <span className="text-sm font-semibold">View Project</span>
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.div>
                    </div>
                    
                    {/* Progress indicator */}
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center py-24 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-to-br from-gray-100/20 to-gray-200/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-tr from-gray-100/15 to-gray-300/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto w-full relative z-10">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block relative"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight relative" style={{ fontFamily: 'var(--font-orbitron)' }}>
                Let's Connect
                <motion.div 
                  className="absolute -inset-4 bg-gradient-to-r from-gray-200/20 via-gray-300/30 to-gray-200/20 rounded-2xl -z-10"
                  initial={{ scale: 0, rotate: -5 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                />
              </h2>
            </motion.div>
            <motion.div 
              className="w-20 h-0.5 bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 mx-auto mb-6 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ delay: 0.6, duration: 1 }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto font-medium"
            >
              Ready to bring your ideas to life? Let's discuss your next project
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-1 gap-10 items-start max-w-3xl mx-auto">
            {/* Left - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-gray-200/50 relative overflow-hidden group"
            >
              {/* Subtle pattern background */}
              <div className="absolute inset-0 opacity-3">
                <div className="absolute inset-0" style={{
                  backgroundImage: `linear-gradient(45deg, #f3f4f6 25%, transparent 25%), linear-gradient(-45deg, #f3f4f6 25%, transparent 25%)`,
                  backgroundSize: '30px 30px'
                }}></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200/70">
                  <motion.div 
                    className="w-3 h-3 bg-gray-900 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <h3 className="text-2xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: 'var(--font-orbitron)' }}>
                    Send Message
                  </h3>
                  <div className="ml-auto w-8 h-0.5 bg-gray-300 rounded-full"></div>
                </div>

                <form className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Name</label>
                      <input
                        type="text"
                        className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:border-gray-400 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all duration-300 bg-gray-50/50 hover:bg-white"
                        placeholder="Your full name"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Email</label>
                      <input
                        type="email"
                        className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:border-gray-400 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all duration-300 bg-gray-50/50 hover:bg-white"
                        placeholder="your@email.com"
                      />
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Message</label>
                    <textarea
                      rows={6}
                      className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:border-gray-400 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all duration-300 resize-none bg-gray-50/50 hover:bg-white"
                      placeholder="Tell me about your project ideas..."
                    />
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-5 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all duration-300 relative overflow-hidden group/btn"
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                  >
                    <span className="relative z-10">Send Message</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 opacity-0 group-hover/btn:opacity-100 transition-opacity"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Right column removed: socials moved to Footer */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-6 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 40px 40px, #ffffff 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div 
                  className="w-3 h-3 bg-white rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <h3 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-orbitron)' }}>
                  Dillan
                </h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Crafting digital experiences with precision and innovation. 
                Passionate about creating solutions that make a difference.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">Available for new projects</span>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-lg font-bold mb-6 tracking-tight" style={{ fontFamily: 'var(--font-orbitron)' }}>
                Navigation
              </h4>
              <div className="space-y-3">
                {['Home', 'About', 'Projects', 'Contact'].map((link, index) => (
                  <motion.a
                    key={index}
                    href={`#${link.toLowerCase()}`}
                    whileHover={{ x: 5 }}
                    className="block text-gray-400 hover:text-white transition-colors font-medium"
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Connect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-lg font-bold mb-6 tracking-tight" style={{ fontFamily: 'var(--font-orbitron)' }}>
                Connect
              </h4>
              <div className="space-y-4">
                {[
                  { icon: <Mail className="w-5 h-5" />, label: 'dilaninf6@gmail.com', href: 'mailto:dilaninf6@gmail.com' },
                  { icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48a12 12 0 0 0-17.04 0c-3.2 3.2-3.2 8.38 0 11.58l.3.3-.7 2.6 2.66-.7.29.28a8.17 8.17 0 0 0 5.79 2.4h.01c2.2 0 4.26-.86 5.8-2.4a12 12 0 0 0 0-17.06Z"/></svg>, label: 'WhatsApp: 085591022177', href: 'https://wa.me/6285591022177' },
                  { icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Z"/></svg>, label: 'Instagram: Dlan12_', href: 'https://instagram.com/Dlan12_' },
                  { icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.88 3.8-3.88 1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.25 0-1.64.78-1.64 1.58V12h2.79l-.45 2.89h-2.34v6.99A10 10 0 0 0 22 12Z"/></svg>, label: 'Facebook: Dlaan', href: 'https://facebook.com/Dlaan' },
                  { icon: <Github className="w-5 h-5" />, label: 'GitHub: DillanINF', href: 'https://github.com/DillanINF' },
                  { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn: Dillan Inf', href: 'https://www.linkedin.com/in/dillan-inf' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                  >
                    {social.icon}
                    <span className="font-medium">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>© 2024 Dillan. All rights reserved.</span>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <span className="font-mono">v2.0.1</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Built with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-red-400"
              >
                ❤️
              </motion.div>
              <span>using Next.js & Tailwind CSS</span>
            </div>
          </motion.div>
        </div>
      </footer>

    </div>
  );
}
