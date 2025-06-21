import React, { useRef, useEffect, useState } from 'react';

// Magnetic Text Component
function MagneticText({ text, className }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!textRef.current) return;
      
      const rect = textRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );
      
      // Set hover threshold (adjust this value to change sensitivity)
      const hoverThreshold = 150;
      
      if (distance < hoverThreshold) {
        setIsHovering(true);
        setMousePosition({
          x: e.clientX - centerX,
          y: e.clientY - centerY
        });
      } else {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getLetterStyle = (index, letter) => {
    if (!isHovering || letter === ' ') {
      return {
        transform: 'translate(0px, 0px) scale(1)',
        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        display: 'inline-block'
      };
    }

    // Calculate magnetic pull based on mouse position
    const pullStrength = 0.15; // Reduced pull strength
    const scaleEffect = 1.05; // Reduced scale effect
    
    // Add some randomness to make it more organic
    const randomOffset = (index * 0.05) % 0.5;
    const pullX = mousePosition.x * (pullStrength + randomOffset);
    const pullY = mousePosition.y * (pullStrength + randomOffset);

    return {
      transform: `translate(${pullX}px, ${pullY}px) scale(${scaleEffect})`,
      transition: 'all 0.2s cubic-bezier(0.23, 1, 0.32, 1)',
      display: 'inline-block'
    };
  };

  return (
    <div ref={textRef} className="relative inline-block">
      <h2 className={className}>
        {text.split('').map((char, index) => (
          <span
            key={index}
            className="relative inline-block bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent"
            style={getLetterStyle(index, char)}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>
    </div>
  );
}

// Card data
const cardData = [
  {
    id: 1,
    title: "About INLIGHN TECH",
    content: "At INLIGHN TECH, we believe that the future of education lies in bridging the gap between academic learning and industry needs. Founded with a passion for providing meaningful and immersive learning experiences, we offer internship programs that equip students and young professionals with practical skills in Full Stack Development, Data Science, and Project Management.",
    icon: "📊",
    color: "#8affb1"
  },
  {
    id: 2,
    title: "Our Mission",
    content: "To empower students and young professionals by providing immersive, real-world learning experiences through tailored internship programs. We aim to equip our participants with the practical skills and confidence they need to succeed in the fast-evolving tech industry.",
    icon: "🎯",
    color: "#8affb1"
  },
  {
    id: 3,
    title: "Our Vision",
    content: "To become a leading platform that transforms education by creating seamless pathways between academic knowledge and industry expertise, fostering innovation and excellence in the next generation of tech professionals.",
    icon: "👁️",
    color: "#8affb1"
  },
  {
    id: 4,
    title: "Our Values",
    content: "We are committed to excellence in education, innovation in learning methodologies, and integrity in all our interactions. We believe in empowering individuals to reach their full potential through practical, hands-on experiences.",
    icon: "📈",
    color: "#8affb1"
  }
];

// Individual Card Component
function Card({ card, index, isVisible, isSpread }) {
  const [isHovered, setIsHovered] = useState(false);

  const getCardStyle = () => {
    if (!isVisible) {
      return {
        transform: 'translateY(100px) scale(0.8)',
        opacity: 0,
      };
    }

    if (!isSpread) {
      // Stacked state
      return {
        transform: `translateX(${index * 8}px) translateY(${index * 4}px) rotate(${index * 2 - 3}deg)`,
        opacity: 1,
        zIndex: 10 - index,
      };
    } else {
      // Spread state - horizontal row perfectly centered
      const cardWidth = 280; // Further reduced for better fit
      const totalWidth = cardWidth * (cardData.length - 1);
      const startX = -totalWidth / 2;
      const xPosition = startX + (index * cardWidth);
      
      return {
        transform: `translateX(${xPosition}px) translateY(0px) rotate(0deg) ${isHovered ? 'scale(1.05)' : 'scale(1)'}`,
        opacity: 1,
        zIndex: isHovered ? 20 : 10,
      };
    }
  };

  return (
    <div
      className="absolute top-1/2 left-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out cursor-pointer"
      style={getCardStyle()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Background */}
      <div className="relative w-full h-full">
        {/* Main card */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-500/20 backdrop-blur-md border border-green-400/30 rounded-2xl shadow-xl">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-500/10 rounded-2xl blur-sm -z-10 scale-105"></div>
          
          {/* Card content */}
          <div className="relative z-10 p-6 h-full flex flex-col">
            {/* Icon */}
            <div className="text-center mb-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
                {card.icon}
              </div>
            </div>
            
            {/* Title */}
            <h3 className="text-lg font-bold text-green-400 mb-3 text-center">
              {card.title}
            </h3>
            
            {/* Content - visible when spread */}
            <div className={`flex-1 transition-all duration-500 ${isSpread ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-white/90 text-xs leading-relaxed text-justify">
                {card.content}
              </p>
            </div>
          </div>
        </div>
        
        {/* Hover glow */}
        {isHovered && (
          <div className="absolute inset-0 bg-green-400/20 rounded-2xl blur-xl scale-110 -z-10 animate-pulse"></div>
        )}
      </div>
    </div>
  );
}

// Main WhoWeAre Component
export default function WhoWeAre() {
  const [cardsVisible, setCardsVisible] = useState(false);
  const [cardsSpread, setCardsSpread] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
      
      if (scrollProgress > 0.2 && !cardsVisible) {
        // Show cards in stacked position
        setCardsVisible(true);
        
        // Spread cards after a delay
        setTimeout(() => {
          setCardsSpread(true);
        }, 1000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [cardsVisible]);

  return (
    <div 
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 py-20 overflow-hidden"
    >
      {/* Section Title with Magnetic Effect */}
      <div className="text-center mb-8 relative z-10">
        <MagneticText 
          text="WHO WE ARE"
          className="text-5xl md:text-6xl font-bold"
        />
        <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto mt-4 rounded-full"></div>
        {cardsVisible && !cardsSpread && (
          <p className="text-white/60 mt-6 text-lg animate-pulse">
            Cards are preparing to spread...
          </p>
        )}
      </div>

      {/* Cards Container */}
      <div className="relative w-full h-[800px] flex items-center justify-center overflow-hidden">
        {cardData.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            index={index}
            isVisible={cardsVisible}
            isSpread={cardsSpread}
          />
        ))}
      </div>

      {/* Click to spread hint */}
      {cardsVisible && !cardsSpread && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
          <button
            onClick={() => setCardsSpread(true)}
            className="px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            Click to Spread Cards
          </button>
        </div>
      )}

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Simple floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400/20 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 2 + 3}s`,
            }}
          />
        ))}
      </div>

      {/* Progress indicator */}
      {cardsVisible && !cardsSpread && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-2">
            {[0, 1, 2, 3].map((dot) => (
              <div
                key={dot}
                className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                style={{ animationDelay: `${dot * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}