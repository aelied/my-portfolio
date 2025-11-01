import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Menu, X, Mail, Github, Linkedin, ExternalLink, Code, Palette, Zap, Twitter, Facebook, Instagram, Youtube, Globe } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
          
          // Check if section is in viewport for animation
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > 0;
          
          setVisibleSections(prev => ({
            ...prev,
            [section]: isVisible || prev[section]
          }));
        }
      }
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🔵 Form submit started');
    console.log('🔵 Form data:', formData);
    
    setIsSubmitting(true);
    setFormError(false);
    setFormSubmitted(false);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("access_key", "0f277253-bb32-456c-a5d7-3ee5e593ed03");
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("subject", "New Contact Form Submission from Portfolio");

      console.log('🔵 Sending to Web3Forms...');

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      });

      console.log('🔵 Response status:', response.status);
      console.log('🔵 Response ok:', response.ok);

      const data = await response.json();
      console.log('🔵 Response data:', data);

      if (data.success) {
        console.log('✅ SUCCESS! Form submitted');
        setFormSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormSubmitted(false), 5000);
      } else {
        console.log('❌ FAILED! Error from Web3Forms:', data.message);
        setFormError(true);
      }
    } catch (error) {
      console.error('❌ CATCH ERROR:', error);
      setFormError(true);
    } finally {
      setIsSubmitting(false);
      console.log('🔵 Form submit finished');
    }
  };

  const projects = [
    {
      title: 'Restaurant Website (Restorante Delle Signore)',
      image: '/projects/proj1.jpg',
      description: 'An elegant online presence for "Restorante Delle Signore," featuring menu browsing, online reservations, and ordering. The website showcases the restaurant\'s sophisticated ambience and authentic Asian cuisine with seamless digital engagement.',
      tech: ['HTML', 'CSS', 'JavaScript']
    },
    {
      title: 'Online Pharmacy Website',
      image: '/projects/proj2.jpg',
      description: 'A comprehensive pharmacy management system that streamlines inventory tracking, prescription handling, and online ordering. Features real-time stock monitoring, automated processes to reduce errors, and a user-friendly platform for customers to browse and purchase medications conveniently.',
      tech: ['HTML', 'CSS', 'JavaScript']
    },
    {
      title: 'Digital Inventory Management System For Sari-Sari Store',
      image: '/projects/proj3.jpg',
      description: 'A digital inventory solution designed specifically for sari-sari stores to automate stock tracking and enable real-time monitoring. The system reduces operational errors, prevents overstocking, and improves business efficiency while helping local stores stay competitive in evolving markets.',
      tech: ['Java', 'NetBeans']
    },
    {
      title: 'SwiftSeats',
      image: '/projects/proj4.jpg',
      description: 'A digital Reservation System for restaurant booking.',
      tech: ['Java', 'NetBeans']
    },
    {
      title: 'Personal Portfolio',
      image: '/projects/proj5.jpg',
      description: 'A sample of Personal Portfolio I made a few months before',
      tech: ['HTML', 'CSS', 'JavaScript']
    }
  ];

  const skills = [
    { name: 'Frontend Development', icon: Code, items: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'TailwindCSS'] },
    { name: 'Design', icon: Palette, items: ['UI/UX', 'Figma', 'Responsive Design', 'Accessibility'] },
  ];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-600 {
          animation-delay: 0.6s;
        }

        .initial-hidden {
          opacity: 0;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 px-6 py-4 animate-fade-in">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
        <img
          src="/projects/ysa-logo2.png"
          alt="Ysa logo"
          className="h-20 w-auto scale-110"
          style={{ transformOrigin: "center" }}
        />
        </div>


          <div className="hidden lg:flex items-center space-x-8">
            {[
              { name: 'Home', id: 'home' },
              { name: 'About', id: 'about' },
              { name: 'Projects', id: 'projects' },
              { name: 'Skills', id: 'skills' },
              { name: 'Contact', id: 'contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-lg transition-colors ${
                  activeSection === item.id
                    ? 'text-pink-400 font-semibold'
                    : 'text-gray-600 hover:text-pink-400'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <a href="https://www.facebook.com/aeliedd" target="_blank" rel="noopener noreferrer"> 
            <Facebook className="text-gray-400 hover:text-pink-400 cursor-pointer transition-transform hover:scale-110"size={20}/></a>
            <a href="https://www.instagram.com/aeliedd/" target="_blank" rel="noopener noreferrer"> 
            <Instagram className="text-gray-400 hover:text-pink-400 cursor-pointer transition-transform hover:scale-110"size={20}/></a>
            <a href="https://github.com/aelied" target="_blank" rel="noopener noreferrer"> 
            <Github className="text-gray-400 hover:text-pink-400 cursor-pointer transition-transform hover:scale-110"size={20}/></a>
          </div>

          <button
            className="lg:hidden text-pink-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-lg mt-4 rounded-2xl p-6 shadow-lg animate-fade-in-up">
            <div className="space-y-4">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section.toLowerCase())}
                  className="block w-full text-left text-lg text-gray-600 hover:text-pink-400 py-2"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center px-6 pt-24 pb-12 relative overflow-hidden bg-gradient-to-br from-white to-pink-50">
        {/* Subtle decorative elements */}
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-100 rounded-full blur-3xl opacity-30 animate-fade-in delay-300"></div>
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-pink-50 rounded-full blur-3xl opacity-40 animate-fade-in delay-500"></div>

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-6">
            <div className="initial-hidden animate-slide-in-left">
              <p className="text-pink-400 text-lg font-medium mb-2 tracking-wide">
                Welcome to my space
              </p>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                Hello! This is my
                <span className="block text-pink-400">Portfolio</span>
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                I'm a passionate developer dedicated to creating elegant, functional, and user-centered digital experiences. Explore my work and let's build something amazing together.
              </p>
            </div>
            <div className="flex gap-4 initial-hidden animate-slide-in-left delay-200">
              <Button 
                onClick={() => scrollToSection('projects')}
                className="bg-pink-400 hover:bg-pink-500 text-white px-8 py-3 rounded-lg text-base font-medium shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                View Projects
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')}
                variant="outline"
                className="border-2 border-pink-300 text-pink-500 hover:bg-pink-50 px-8 py-3 rounded-lg text-base font-medium transition-all hover:border-pink-400"
              >
                Get in Touch
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end initial-hidden animate-slide-in-right delay-300">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-pink-300 rounded-2xl blur-xl opacity-30"></div>
              <div className="relative w-80 h-96 bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-pink-200">
                <div className="w-full h-full bg-gradient-to-br from-pink-50 to-white flex items-center justify-center">
                  <img 
                    src="/hero-banner.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-5xl font-bold text-center mb-4 text-pink-400 transition-all duration-700 ${
            visibleSections.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            About Me
          </h2>
          <p className={`text-center text-gray-600 mb-16 text-lg transition-all duration-700 delay-100 ${
            visibleSections.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Get to know me better
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className={`border-2 border-pink-200 hover:shadow-xl transition-all duration-700 rounded-3xl ${
              visibleSections.about ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`} style={{ transitionDelay: '200ms' }}>
              <CardHeader>
                <CardTitle className="text-2xl text-pink-400">Background</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 space-y-4 leading-relaxed">
                <p>
                I'm Liezl Sumagui Quelang, a 22-year-old Computer Science student at Cavite State University – Bacoor Campus. 
                I'm passionate about coding, algorithms, and building software solutions that make a real impact on people's lives.
                </p>
                <p>
                I love learning new technologies, reading across different genres, and collaborating with others to share ideas and experiences. My family—with roots from Apayao 
                and Bacolod—has shaped who I am today, blending rich traditions and values that inspire me to continuously grow.
                </p>
                <p>
                I'm excited to explore new opportunities and challenges in the tech industry, constantly
                 pushing myself to improve my skills and make meaningful contributions through technology.
                </p>
              </CardContent>
            </Card>

            <Card className={`border-2 border-pink-200 hover:shadow-xl transition-all duration-700 rounded-3xl ${
              visibleSections.about ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`} style={{ transitionDelay: '300ms' }}>
              <CardHeader>
                <CardTitle className="text-2xl text-pink-400">Education & Achievements</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-pink-400 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-800">BS Computer Science</p>
                    <p className="text-sm text-gray-500">Cavite State University – Bacoor Campus</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-pink-400 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-800">Start Up Competition for IT Students</p>
                    <p className="text-sm text-gray-500">November 2023</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-pink-400 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-800">Intro to Blockchain Technology</p>
                    <p className="text-sm text-gray-500">February 2025</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-pink-400 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-800">BLOKCTIME: EVM Development Part 2</p>
                    <p className="text-sm text-gray-500">February 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-20 px-6 bg-pink-50">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-5xl font-bold text-center mb-4 text-pink-400 transition-all duration-700 ${
            visibleSections.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Featured Projects
          </h2>
          <p className={`text-center text-gray-600 mb-16 text-lg max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            visibleSections.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Here are some of my recent projects that showcase my skills and passion for development.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className={`border-2 border-pink-200 hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 rounded-3xl overflow-hidden ${
                  visibleSections.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="h-2 bg-gradient-to-r from-pink-300 to-pink-400"></div>
                <div className="h-48 overflow-hidden bg-pink-50">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-pink-400">{project.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-pink-100 text-pink-600 text-xs rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

{/* Skills Section */}
<section id="skills" className="min-h-screen py-20 px-6 bg-gradient-to-br from-white via-pink-50/30 to-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-pink-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-20"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className={`text-5xl lg:text-6xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600 transition-all duration-700 ${
            visibleSections.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Skills & Expertise
          </h2>
          <p className={`text-center text-gray-600 mb-20 text-lg max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            visibleSections.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Passionate about cutting-edge technologies and creating beautiful, functional experiences
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <Card 
                  key={index} 
                  className={`group relative border-2 border-pink-200 hover:border-pink-300 hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm ${
                    visibleSections.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  {/* Gradient accent bar */}
                  <div className="h-2 bg-gradient-to-r from-pink-300 via-pink-400 to-pink-500 group-hover:h-3 transition-all duration-300"></div>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-100/0 to-pink-200/0 group-hover:from-pink-100/30 group-hover:to-pink-200/20 transition-all duration-500 pointer-events-none"></div>
                  
                  <CardHeader className="relative">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-md">
                        <Icon className="text-pink-500" size={32} />
                      </div>
                      <CardTitle className="text-2xl text-pink-500 font-bold group-hover:text-pink-600 transition-colors">
                        {skill.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="relative pt-2">
                    <div className="flex flex-wrap gap-3">
                      {skill.items.map((item, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-gradient-to-r from-pink-50 to-pink-100 text-pink-700 text-sm rounded-full font-semibold border-2 border-pink-200 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:border-pink-300 hover:from-pink-100 hover:to-pink-200 cursor-default"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Additional decorative element */}
          <div className={`mt-20 text-center transition-all duration-700 delay-500 ${
            visibleSections.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <p className="text-gray-600 text-lg mb-4">Always learning, always growing</p>
            <div className="flex justify-center gap-2">
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20 px-6 bg-pink-50">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-5xl font-bold text-center mb-4 text-pink-400 transition-all duration-700 ${
            visibleSections.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Get In Touch
          </h2>
          <p className={`text-center text-gray-600 mb-16 text-lg transition-all duration-700 delay-100 ${
            visibleSections.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            I'm always open to discussing new projects, creative ideas, or opportunities.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className={`border-2 border-pink-200 rounded-3xl transition-all duration-700 ${
              visibleSections.contact ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`} style={{ transitionDelay: '200ms' }}>
              <CardHeader>
                <CardTitle className="text-pink-400">Send Me a Message</CardTitle>
                <CardDescription>Fill out the form and I'll get back to you soon.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-pink-200 focus:border-pink-400 rounded-xl transition-all"
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-pink-200 focus:border-pink-400 rounded-xl transition-all"
                  />
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="border-pink-200 focus:border-pink-400 rounded-xl transition-all"
                  />
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                    className="w-full bg-pink-400 hover:bg-pink-500 text-white rounded-xl py-6 transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
                {formSubmitted && (
                  <Alert className="mt-4 bg-green-50 border-green-200 rounded-xl animate-fade-in-up">
                    <AlertDescription className="text-green-800">
                      Thank you for your message! I'll get back to you soon.
                    </AlertDescription>
                  </Alert>
                )}
                {formError && (
                  <Alert className="mt-4 bg-red-50 border-red-200 rounded-xl animate-fade-in-up">
                    <AlertDescription className="text-red-800">
                      Oops! Something went wrong. Please try again or email me directly.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            <div className={`space-y-6 transition-all duration-700 ${
              visibleSections.contact ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`} style={{ transitionDelay: '300ms' }}>
              <Card className="border-2 border-pink-200 rounded-3xl hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-pink-400">Connect With Me</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <a href="mailto:quelangliezl@gmail.com" className="flex items-center gap-3 text-gray-600 hover:text-pink-400 transition-all hover:translate-x-2">
                    <Mail size={20} className="text-pink-400" />
                    <span>quelangliezl@gmail.com</span>
                  </a>
                  <a href="https://github.com/aelied" className="flex items-center gap-3 text-gray-600 hover:text-pink-400 transition-all hover:translate-x-2">
                    <Github size={20} className="text-pink-400" />
                    <span>github/aelied</span>
                  </a>
                  <a href="https://www.instagram.com/aeliedd/" className="flex items-center gap-3 text-gray-600 hover:text-pink-400 transition-all hover:translate-x-2">
                    <Instagram size={20} className="text-pink-400" />
                    <span>instagram.com/aeliedd</span>
                  </a>
                </CardContent>
              </Card>

              <Card className="border-2 border-pink-200 rounded-3xl hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-pink-400">Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Currently available for freelance projects and full-time opportunities.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-semibold">Available for work</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-pink-400 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-3xl font-bold mb-4">Ysa</div>
          <p className="mb-6">Building digital experiences that make a difference</p>
          <div className="flex justify-center gap-6 mb-6">
            <a href="https://www.facebook.com/aeliedd" target="_blank" rel="noopener noreferrer"> 
            <Facebook size={24} className="hover:scale-110 transition-transform cursor-pointer" />
            </a>
            <a href="https://www.instagram.com/aeliedd/" target="_blank" rel="noopener noreferrer"> 
            <Instagram size={24} className="hover:scale-110 transition-transform cursor-pointer" /></a>
            <a href="https://github.com/aelied" target="_blank" rel="noopener noreferrer"> 
            <Github size={24} className="hover:scale-110 transition-transform cursor-pointer" /></a>
          </div>
          <p className="text-pink-100">© 2025 Ysa. Built with React, TailwindCSS & shadcn/UI</p>
        </div>
      </footer>
    </div>
  );
}