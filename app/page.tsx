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
      <section id="about" className="min-h-screen flex items-center py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">About Me</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              I'm a passionate full-stack developer and UI/UX designer with over 5 years of experience 
              creating digital solutions that combine beautiful design with robust functionality. 
              I specialize in modern web technologies and have a keen eye for detail that ensures 
              every project delivers exceptional user experiences.
            </p>
          </motion.div>
        </div>
      </section>


      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center py-24 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">Featured Projects</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A showcase of my recent work across web development, design, and digital experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100"
              >
                <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="text-4xl font-bold text-gray-300 group-hover:text-yellow-500 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-yellow-600 uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{project.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">{project.tech}</span>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-1 text-gray-900 group-hover:text-yellow-600 transition-colors"
                    >
                      <span className="text-sm font-medium">View</span>
                      <ExternalLink className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">Let's Work Together</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your next project
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                Send Message
              </motion.button>
            </form>

            <div className="flex justify-center gap-6 mt-12 pt-8 border-t border-gray-100">
              {[
                { icon: <Mail className="w-5 h-5" />, label: 'Email', href: 'mailto:hello@example.com' },
                { icon: <Github className="w-5 h-5" />, label: 'GitHub', href: '#' },
                { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', href: '#' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  whileHover={{ y: -2 }}
                  href={social.href}
                  className="w-12 h-12 bg-gray-100 hover:bg-yellow-100 rounded-full flex items-center justify-center text-gray-600 hover:text-yellow-600 transition-all"
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    
    </div>
  );
}
