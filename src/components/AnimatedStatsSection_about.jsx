import React, { useEffect, useState, useRef } from 'react';

const AnimatedStatsSection_about = () => {
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
      color: 'from-purple-500 to-violet-500',
      bgColor: 'from-purple-100/30 to-violet-100/30'
    },
    {
      key: 'projects',
      value: finalValues.projects,
      label: 'Projects Completed',
      suffix: '+',
      icon: '🚀',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-100/30 to-purple-100/30'
    },
    {
      key: 'satisfaction',
      value: finalValues.satisfaction,
      label: 'Satisfaction Rate',
      suffix: '%',
      icon: '⭐',
      color: 'from-violet-500 to-fuchsia-500',
      bgColor: 'from-violet-100/30 to-fuchsia-100/30'
    },
    {
      key: 'instructors',
      value: finalValues.instructors,
      label: 'Top Instructors',
      suffix: '+',
      icon: '👨‍💼',
      color: 'from-fuchsia-500 to-pink-500',
      bgColor: 'from-fuchsia-100/30 to-pink-100/30'
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
    <div ref={sectionRef} className="relative z-10 py-20 px-4 overflow-hidden bg-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50/30 to-violet-50/30"></div>
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-300/40 rounded-full animate-pulse"
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
            className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Our Impact in Numbers
          </h2>
          <p 
            className={`text-lg md:text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-1000 transform ${
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
              className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-purple-200/60 hover:border-purple-300/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-300/30 transform shadow-lg ${
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
                <div className="text-gray-700 font-medium text-lg group-hover:text-gray-800 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300`}></div>
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
          <p className="text-gray-600 mb-6 text-lg">
            Ready to be part of our success story?
          </p>
          <a 
            href="/programs" 
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg text-white font-bold hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-400/40"
          >
            Join Our Community
          </a>
        </div>
      </div>
    </div>
  );
};

export default AnimatedStatsSection_about;