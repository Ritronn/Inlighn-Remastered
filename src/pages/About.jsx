import React, { useState, useEffect } from 'react';
import AnimatedStatsSection_about from '../components/AnimatedStatsSection_about';
import Benefits from '../components/Benifits';

const About = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* First Section - We Provide */}
      <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating circles */}
          <div 
            className="absolute w-64 h-64 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 rounded-full blur-xl"
            style={{ 
              transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)`,
              top: '10%',
              left: '70%'
            }}
          />
          <div 
            className="absolute w-48 h-48 bg-gradient-to-r from-cyan-200/30 to-blue-200/30 rounded-full blur-xl"
            style={{ 
              transform: `translate(${-scrollY * 0.08}px, ${scrollY * 0.03}px)`,
              top: '60%',
              left: '10%'
            }}
          />
          <div 
            className="absolute w-32 h-32 bg-gradient-to-r from-yellow-200/40 to-orange-200/40 rounded-full blur-lg"
            style={{ 
              transform: `translate(${scrollY * 0.12}px, ${-scrollY * 0.04}px)`,
              top: '80%',
              right: '20%'
            }}
          />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              transform: `translate(${scrollY * 0.02}px, ${scrollY * 0.02}px)`
            }}
          />
        </div>

        <div className="relative z-10 min-h-screen flex flex-col justify-center">
          <div className="container mx-auto px-6 py-16">
            {/* Header Section */}
            <div 
              id="header"
              data-animate
              className={`text-center mb-16 transition-all duration-1000 transform ${
                isVisible.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                We Provide Best{' '}
                <span className="relative">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
                    Industry
                  </span>
                  <div className="absolute -bottom-2 left-0 right-0 h-3 bg-yellow-300/30 -rotate-1 rounded"></div>
                </span>{' '}
                Services For You.
              </h1>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Side - Text Content */}
              <div 
                id="text-content"
                data-animate
                className={`space-y-8 transition-all duration-1000 delay-300 transform ${
                  isVisible['text-content'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
              >
                <div className="prose prose-lg text-gray-600 leading-relaxed">
                  <p className="text-xl mb-6">
                    At <span className="font-bold text-blue-600">INLIGHT TECH</span>, we believe that the future of 
                    education lies in bridging the gap between academic learning and industry needs.
                  </p>
                  
                  <p className="mb-6">
                    Founded with a passion for providing meaningful and immersive learning experiences, 
                    we offer internship programs that equip students and young professionals with 
                    practical skills in:
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 my-8">
                    {[
                      'Cyber Security',
                      'Full Stack Development', 
                      'Data Science',
                      'Project Management'
                    ].map((skill, index) => (
                      <div 
                        key={skill}
                        className={`bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500 transition-all duration-500 transform hover:scale-105 hover:shadow-lg ${
                          isVisible['text-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                        style={{ transitionDelay: `${800 + index * 100}ms` }}
                      >
                        <span className="font-semibold text-gray-800">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div 
                  className={`transition-all duration-1000 delay-1000 transform ${
                    isVisible['text-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <a 
                    href="/"
                    className="group bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform inline-block"
                  >
                    Begin your Journey
                    <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-2">
                      ≫
                    </span>
                  </a>
                </div>
              </div>

              {/* Right Side - Roadmap Image */}
              <div 
                id="roadmap-container"
                data-animate
                className={`relative transition-all duration-1000 delay-500 transform ${
                  isVisible['roadmap-container'] ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-8 scale-95'
                }`}
              >
                <div className="relative">
                  {/* Glow effect behind image */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-3xl blur-2xl transform rotate-3 scale-110"></div>
                  
                  {/* Image container */}
                  <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
                    <img 
                      src="/roadmap.png" 
                      alt="Internship Journey Roadmap"
                      className="w-full h-auto rounded-2xl transition-transform duration-500 hover:scale-105"
                    />
                    
                    {/* Floating elements around image */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500 rounded-full animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 -left-6 w-4 h-4 bg-cyan-400 rounded-full animate-pulse delay-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating orbs */}
          <div 
            className="absolute w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
            style={{ 
              transform: `translate(${scrollY * 0.15}px, ${scrollY * 0.08}px)`,
              top: '20%',
              right: '10%'
            }}
          />
          <div 
            className="absolute w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
            style={{ 
              transform: `translate(${-scrollY * 0.12}px, ${scrollY * 0.06}px)`,
              bottom: '20%',
              left: '15%'
            }}
          />
          
          {/* Animated stars */}
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.8 + 0.2
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-6 py-16 min-h-screen flex items-center">
          <div className="w-full">
            {/* Section Title */}
            <div 
              id="vision-title"
              data-animate
              className={`text-center mb-20 transition-all duration-1000 transform ${
                isVisible['vision-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Vision</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Mission</span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto rounded-full"></div>
            </div>

            {/* Vision & Mission Cards */}
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Vision Card */}
              <div 
                id="vision-card"
                data-animate
                className={`transition-all duration-1000 delay-300 transform ${
                  isVisible['vision-card'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
              >
                <div className="relative group">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  
                  <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 h-full">
                    {/* Icon */}
                    <div className="mb-8 flex justify-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-white mb-6 text-center">Our Vision</h3>
                    <p className="text-lg text-gray-200 leading-relaxed text-center">
                      To be a leading EdTech platform that bridges the gap between academic knowledge and industry demands, 
                      shaping the next generation of tech innovators and leaders through hands-on, practical learning.
                    </p>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-4 left-4 w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-1000"></div>
                  </div>
                </div>
              </div>

              {/* Mission Card */}
              <div 
                id="mission-card"
                data-animate
                className={`transition-all duration-1000 delay-500 transform ${
                  isVisible['mission-card'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
              >
                <div className="relative group">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  
                  <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 h-full">
                    {/* Icon */}
                    <div className="mb-8 flex justify-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-white mb-6 text-center">Our Mission</h3>
                    <p className="text-lg text-gray-200 leading-relaxed text-center">
                      To empower students and young professionals by providing immersive, real-world learning experiences 
                      through tailored internship programs. We aim to equip our participants with the practical skills 
                      and confidence they need to succeed in the fast-evolving tech industry.
                    </p>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-4 left-4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-1000"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom decorative element */}
            <div 
              id="vision-bottom"
              data-animate
              className={`mt-20 text-center transition-all duration-1000 delay-700 transform ${
                isVisible['vision-bottom'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="inline-flex items-center space-x-4 text-white/60">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-white/40"></div>
                <span className="text-sm font-medium">BUILDING THE FUTURE</span>
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-white/40"></div>
              </div>
              <AnimatedStatsSection_about />
              <Benefits/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;