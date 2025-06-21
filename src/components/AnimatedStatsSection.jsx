import React, { useEffect, useState, useRef } from 'react';

const AnimatedStatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    interns: 0,
    projects: 0,
    satisfaction: 0,
    instructors: 0
  });
  
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  const finalValues = {
    interns: 5000,
    projects: 9000,
    satisfaction: 93,
    instructors: 30
  };

  const statsData = [
    {
      key: 'interns',
      value: finalValues.interns,
      label: 'Interns Enrolled',
      suffix: '+',
      icon: '👨‍🎓',
      color: 'from-blue-400 to-cyan-400',
      bgColor: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      key: 'projects',
      value: finalValues.projects,
      label: 'Projects Completed',
      suffix: '+',
      icon: '🚀',
      color: 'from-purple-400 to-pink-400',
      bgColor: 'from-purple-500/20 to-pink-500/20'
    },
    {
      key: 'satisfaction',
      value: finalValues.satisfaction,
      label: 'Satisfaction Rate',
      suffix: '%',
      icon: '⭐',
      color: 'from-yellow-400 to-orange-400',
      bgColor: 'from-yellow-500/20 to-orange-500/20'
    },
    {
      key: 'instructors',
      value: finalValues.instructors,
      label: 'Top Instructors',
      suffix: '+',
      icon: '👨‍💼',
      color: 'from-green-400 to-emerald-400',
      bgColor: 'from-green-500/20 to-emerald-500/20'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
          startCountingAnimation();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const startCountingAnimation = () => {
    const duration = 2500; // 2.5 seconds
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for speedometer-like effect (fast start, slow end)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setCounters({
        interns: Math.floor(finalValues.interns * easeOutQuart),
        projects: Math.floor(finalValues.projects * easeOutQuart),
        satisfaction: Math.floor(finalValues.satisfaction * easeOutQuart),
        instructors: Math.floor(finalValues.instructors * easeOutQuart)
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    // Small delay before starting animation
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, 500);
  };

  return (
    <div ref={sectionRef} className="relative z-10 py-20 px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-gray-900/50 backdrop-blur-sm"></div>
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-green-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 
            className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Our Impact in Numbers
          </h2>
          <p 
            className={`text-lg md:text-xl text-gray-300 max-w-2xl mx-auto transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Transforming careers and building the next generation of tech professionals
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div
              key={stat.key}
              className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-green-400/20 hover:border-green-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-400/20 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${index * 150 + 400}ms` : '0ms'
              }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Icon */}
                <div className="text-4xl md:text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                
                {/* Number */}
                <div className={`text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                  {counters[stat.key]}{stat.suffix}
                </div>
                
                {/* Label */}
                <div className="text-gray-300 font-medium text-lg group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div 
          className={`text-center mt-16 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <p className="text-gray-300 mb-6 text-lg">
            Ready to be part of our success story?
          </p>
          <a 
            href="/programs" 
            className="inline-block px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-black font-bold hover:scale-105 transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-green-400/40"
          >
            Join Our Community
          </a>
        </div>
      </div>
    </div>
  );
};

export default AnimatedStatsSection;