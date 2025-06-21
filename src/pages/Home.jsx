import React, { useEffect, useState } from 'react';
import WhoWeAre from '../components/whoarewe';
import AnimatedStatsSection from '../components/AnimatedStatsSection';


const SciFiAnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Matrix-style Falling Code */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 bg-gradient-to-b from-green-400 via-green-300/60 to-transparent animate-matrix-rain"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${Math.random() * 300 + 100}px`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 8 + 6}s`,
            }}
          />
        ))}
      </div>

      {/* Hexagonal Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-16 gap-2 h-full animate-pulse-slow">
          {[...Array(320)].map((_, i) => (
            <div
              key={i}
              className="border border-green-400/30 transform rotate-45 animate-hex-glow"
              style={{
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Data Particles */}
      <div className="absolute inset-0">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400/80 rounded-full animate-data-stream shadow-sm shadow-green-400/50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${Math.random() * 12 + 8}s`,
            }}
          />
        ))}
      </div>

      {/* Scanning Lines */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-green-400/60 to-transparent animate-scan-line"
            style={{
              animationDelay: `${i * 8}s`,
              animationDuration: '12s',
            }}
          />
        ))}
      </div>

      {/* Circuit Board Lines */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          {[...Array(15)].map((_, i) => (
            <g key={i}>
              <path
                d={`M${Math.random() * 1000},${Math.random() * 1000} L${Math.random() * 1000},${Math.random() * 1000} L${Math.random() * 1000},${Math.random() * 1000}`}
                stroke="rgb(34, 197, 94)"
                strokeWidth="1"
                fill="none"
                className="animate-circuit-pulse"
                style={{
                  animationDelay: `${i * 0.8}s`,
                }}
              />
              <circle
                cx={Math.random() * 1000}
                cy={Math.random() * 1000}
                r="3"
                fill="rgb(34, 197, 94)"
                className="animate-circuit-node"
                style={{
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

// SIMPLIFIED KINETIC TYPOGRAPHY COMPONENT WITHOUT ELASTIC EFFECT
const KineticHeroText = () => {
  const [wordsVisible, setWordsVisible] = useState({
    transform: false,
    your: false,
    career: false,
    with: false,
    inlighn: false,
    tech: false
  });

  useEffect(() => {
    // Sequence the word reveals
    const timeouts = [
      setTimeout(() => setWordsVisible(prev => ({ ...prev, transform: true })), 300),
      setTimeout(() => setWordsVisible(prev => ({ ...prev, your: true })), 600),
      setTimeout(() => setWordsVisible(prev => ({ ...prev, career: true })), 900),
      setTimeout(() => setWordsVisible(prev => ({ ...prev, with: true })), 1200),
      setTimeout(() => setWordsVisible(prev => ({ ...prev, inlighn: true })), 1500),
      setTimeout(() => setWordsVisible(prev => ({ ...prev, tech: true })), 1800)
    ];

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const wordAnimations = {
    transform: 'translate-x-[-100px]', // from left
    your: 'translate-y-[-60px]',       // from top
    career: 'translate-x-[100px]',     // from right
    with: 'translate-x-[-80px]',       // from left
    inlighn: 'translate-y-[60px]',     // from bottom
    tech: 'translate-x-[80px]'         // from right
  };

  const renderWord = (word, wordKey, colorClass) => {
    return (
      <span 
        className={`inline-block transition-all duration-1000 ease-out transform ${colorClass} ${
          wordsVisible[wordKey] 
            ? 'opacity-100 translate-x-0 translate-y-0' 
            : `opacity-0 ${wordAnimations[wordKey]}`
        }`}
      >
        {word}
      </span>
    );
  };

  return (
    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 relative overflow-hidden">
      {/* First Line */}
      <div className="mb-4 relative">
        {renderWord('Transform', 'transform', 'text-green-400')}
        <span className="mx-4"></span>
        {renderWord('Your', 'your', 'text-green-400')}
        <span className="mx-4"></span>
        {renderWord('Career', 'career', 'text-green-400')}
      </div>

      {/* Second Line */}
      <div className="relative">
        {renderWord('with', 'with', 'text-green-400')}
        <span className="mx-4"></span>
        {renderWord('INLIGHN', 'inlighn', 'text-orange-400')}
        <span className="mx-4"></span>
        {renderWord('TECH', 'tech', 'text-orange-400')}
      </div>
    </h1>
  );
};



const AboutSection = () => {
  const [imageVisible, setImageVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight * 0.5; // Much earlier trigger
      
      if (scrollY > triggerPoint && !imageVisible) {
        setImageVisible(true);
        setTimeout(() => setTextVisible(true), 300); // Reduced delay
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [imageVisible]);

  return (
    <div className="relative z-10 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div 
            className={`transition-all duration-1000 transform ${
              imageVisible 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-10 scale-95'
            }`}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-2 border border-green-400/20 hover:border-green-400/40 transition-all duration-300 animate-float-gentle">
                <img
                  src="/hand.jpg"
                  alt="Collaborative Learning Environment"
                  className="w-full h-auto rounded-2xl object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-64 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-2xl hidden items-center justify-center text-green-400 font-semibold text-lg">
                  Collaborative Learning Environment
                </div>
              </div>
            </div>
          </div>

          {/* Text Section */}
          <div className="space-y-6">
            <h2 
              className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent transition-all duration-1000 transform ${
                textVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: textVisible ? '0ms' : '0ms' }}
            >
              We Provide Best Internship For You
            </h2>
            
            <p 
              className={`text-lg md:text-xl text-gray-300 leading-relaxed transition-all duration-1000 transform ${
                textVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: textVisible ? '200ms' : '0ms' }}
            >
              At INLIGHN TECH, we believe that the future of education lies in bridging the gap between academic learning and industry needs. Founded with a passion for providing meaningful and immersive learning experiences, we offer internship programs that equip students and young professionals with practical skills in Full Stack Development, Data Science, Cyber Security, Data Analysis and Project Management.
            </p>
            
            <div 
              className={`transition-all duration-1000 transform ${
                textVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: textVisible ? '400ms' : '0ms' }}
            >
              <a 
                href="/about" 
                className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg text-black font-bold hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-400/40"
              >
                Know More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScrollImages = () => {
  const [allVisible, setAllVisible] = useState(false);
  
  const images = [
    { src: '/m.jpg', alt: 'Ministry of Corporate Affairs', name: 'ministry' },
    { src: '/iso.jpg', alt: 'ISO Certification', name: 'iso' },
    { src: '/start.jpg', alt: 'Startup India', name: 'startup' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight * 0.7;
      
      if (scrollY > triggerPoint && !allVisible) {
        setAllVisible(true);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [allVisible]);

  return (
    <div className="relative z-10 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent">
          Recognized & Certified
        </h2>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-16">
          {images.map((image, index) => (
            <div
              key={image.name}
              className={`transition-all duration-1000 transform ${
                allVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-10 scale-90'
              }`}
              style={{
                transitionDelay: allVisible ? `${index * 200}ms` : '0ms'
              }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-green-400/20 hover:border-green-400/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-400/20">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-32 h-32 md:w-40 md:h-40 object-contain mx-auto rounded-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-lg mx-auto hidden items-center justify-center text-green-400 font-semibold text-sm text-center">
                  {image.alt}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="relative text-white bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950">
      {/* Sci-Fi Animated Background */}
      <SciFiAnimatedBackground />
      
      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4">
        <div className="max-w-4xl">
          {/* UPDATED: KineticHeroText component without elastic stretch animation */}
          <KineticHeroText />
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-4xl mx-auto animate-fade-in-up">
            Gain real-world experience with our immersive internship programs in Cyber Security, Full Stack Development, Data Science, Data Analyst and in various tech domains. Learn today, lead tomorrow.
          </p>
          <div className="flex justify-center animate-fade-in-button">
            <a href="/programs" className="group px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-black font-bold hover:scale-105 transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-green-400/40">
              <span className="group-hover:animate-pulse">Explore Internships</span>
            </a>
          </div>
        </div>
      </div>

      
      <ScrollImages />

      <AboutSection />
      
      <WhoWeAre />
      <AnimatedStatsSection />

      {/* Custom Animations - UPDATED WITH SLOWER ELASTIC STRETCH ANIMATION */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-30px) rotate(180deg) scale(1.1); 
            opacity: 0.8;
          }
        }
        
        @keyframes matrix-rain {
          0% { 
            transform: translateY(-100vh);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        
        @keyframes hex-glow {
          0%, 100% { 
            opacity: 0.1;
            box-shadow: 0 0 5px rgba(34, 197, 94, 0.1);
          }
          50% { 
            opacity: 0.4;
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.3);
          }
        }
        
        @keyframes data-stream {
          0% { 
            transform: translate(0, 100vh) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translate(50px, -100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes scan-line {
          0% { 
            top: -2px;
            opacity: 0;
          }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { 
            top: 100%;
            opacity: 0;
          }
        }
        
        @keyframes circuit-pulse {
          0%, 100% { 
            stroke-opacity: 0.2;
            stroke-width: 1;
          }
          50% { 
            stroke-opacity: 0.8;
            stroke-width: 2;
          }
        }
        
        @keyframes circuit-node {
          0%, 100% { 
            fill-opacity: 0.3;
            r: 3;
          }
          50% { 
            fill-opacity: 1;
            r: 5;
          }
        }
        
        @keyframes text-glow-subtle {
          0%, 100% { 
            text-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
          }
          50% { 
            text-shadow: 0 0 20px rgba(34, 197, 94, 0.5), 0 0 30px rgba(34, 197, 94, 0.2);
          }
        }
        
        @keyframes float-in {
          0% { 
            opacity: 0;
            transform: translateY(-30px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          0% { 
            opacity: 0;
            transform: translateY(20px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-button {
          0% { 
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          100% { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.15; }
        }
        
        @keyframes float-gentle {
          0%, 100% { 
            transform: translateY(0px);
          }
          50% { 
            transform: translateY(-15px);
          }
        }

        /* SLOWER AND LESS BOUNCY ELASTIC STRETCH ANIMATION */
        @keyframes elastic-stretch-slow {
          0% {
            transform: scaleY(1) scaleX(1);
          }
          25% {
            transform: scaleY(1.3) scaleX(0.8);
          }
          50% {
            transform: scaleY(0.8) scaleX(1.2);
          }
          75% {
            transform: scaleY(1.1) scaleX(0.95);
          }
          100% {
            transform: scaleY(1) scaleX(1);
          }
        }
        
        .animate-float {
          animation: float infinite ease-in-out;
        }
        
        .animate-matrix-rain {
          animation: matrix-rain infinite linear;
        }
        
        .animate-hex-glow {
          animation: hex-glow infinite ease-in-out;
        }
        
        .animate-data-stream {
          animation: data-stream infinite linear;
        }
        
        .animate-scan-line {
          animation: scan-line infinite linear;
        }
        
        .animate-circuit-pulse {
          animation: circuit-pulse infinite ease-in-out;
        }
        
        .animate-circuit-node {
          animation: circuit-node infinite ease-in-out;
        }
        
        .animate-text-glow-subtle {
          animation: text-glow-subtle infinite ease-in-out 3s;
        }
        
        .animate-float-in {
          animation: float-in 1.2s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.6s forwards;
          opacity: 0;
        }
        
        .animate-fade-in-button {
          animation: fade-in-button 1s ease-out 1.2s forwards;
          opacity: 0;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow infinite ease-in-out 4s;
        }
        
        .animate-float-gentle {
          animation: float-gentle 4s ease-in-out infinite;
        }

        /* SLOWER ELASTIC STRETCH ANIMATION CLASS */
        .animate-elastic-stretch-slow {
          animation: elastic-stretch-slow 1.5s ease-out;
          transform-origin: center;
        }
      `}</style>
    </div>
  );
}