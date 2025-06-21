import React, { useState, useRef, useEffect } from 'react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Mirunalini R",
      role: "Data Analyst Intern",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      testimonial: "During my Data Analytics internship at INLIGHT TECH, I learned SQL, Power BI, Tableau, and Data Cleaning. The program focused on real-world business intelligence projects, which helped me understand data-driven decision-making. The mentorship and structured learning approach made a significant impact on my skills.",
      bgColor: "from-teal-600 to-teal-700"
    },
    {
      id: 2,
      name: "Surendra Kumar",
      role: "Data Science Intern",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      testimonial: "Completed my Data Science internship at INLIGHT TECH where I gained hands-on experience in Python, Machine Learning, and Data Visualization. The structured guidance and real-world projects helped me apply theoretical knowledge to solve actual business problems. This experience made me industry-ready.",
      bgColor: "from-blue-600 to-blue-700"
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Web Development Intern",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      testimonial: "My Web Development internship at INLIGHT TECH was transformative. I mastered React, Node.js, and modern web technologies through hands-on projects. The mentorship program and collaborative environment helped me build confidence in full-stack development and prepared me for my career.",
      bgColor: "from-purple-600 to-purple-700"
    },
    {
      id: 4,
      name: "Rahul Patel",
      role: "Machine Learning Intern",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      testimonial: "During my Machine Learning internship at INLIGHT TECH, I worked on cutting-edge AI projects using TensorFlow and PyTorch. The program's focus on practical implementation and industry best practices gave me deep insights into ML algorithms and their real-world applications.",
      bgColor: "from-green-600 to-green-700"
    },
    {
      id: 5,
      name: "Anita Desai",
      role: "UI/UX Design Intern",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      testimonial: "My UI/UX Design internship at INLIGHT TECH enhanced my skills in Figma, Adobe Creative Suite, and user research. The program emphasized design thinking and user-centered approaches, which helped me create intuitive and engaging digital experiences for various projects.",
      bgColor: "from-pink-600 to-pink-700"
    },
    {
      id: 6,
      name: "Vikram Singh",
      role: "Cybersecurity Intern",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      testimonial: "The Cybersecurity internship at INLIGHT TECH provided comprehensive training in ethical hacking, network security, and risk assessment. Working on real security challenges and learning from industry experts made me confident in identifying and mitigating cyber threats.",
      bgColor: "from-red-600 to-red-700"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const offset = e.clientX - dragStartX;
    setDragOffset(offset);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const threshold = 100;
    if (dragOffset > threshold) {
      prevSlide();
    } else if (dragOffset < -threshold) {
      nextSlide();
    }
    
    setIsDragging(false);
    setDragOffset(0);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragStartX, dragOffset]);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isDragging]);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            TESTIMONIALS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            What Our Interns Say
          </h2>
        </div>

        {/* Testimonial Slider */}
        <div className="relative overflow-hidden">
          <div
            ref={containerRef}
            className="flex transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing"
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
            }}
            onMouseDown={handleMouseDown}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="w-full flex-shrink-0 px-4"
              >
                <div className={`relative bg-gradient-to-br ${testimonial.bgColor} rounded-2xl p-8 md:p-12 text-white shadow-2xl mx-auto max-w-4xl`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
                  </div>

                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      <p className="text-lg md:text-xl leading-relaxed mb-6">
                        "{testimonial.testimonial}"
                      </p>
                      
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{testimonial.name}</h3>
                        <p className="text-white/80 font-medium">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Drag Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <span>← DRAG →</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-blue-500 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;