import React, { useState, useEffect, useRef } from 'react';
import './Contact.css';

const Contact = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const observerRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observerRef.current.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach(el => {
      el.style.animationPlayState = 'paused';
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "What makes Inlighn Tech different from other learning platforms?",
      answer: "Inlighn Tech provides top-quality learning modules and projects based on the latest industry technologies and trends."
    },
    {
      question: "How can I register for an internship?",
      answer: "Go to the Internships section and click on Apply Now."
    },
    {
      question: "After filling out the registration form, whom should I contact?",
      answer: "Once you complete your registration, you will receive a WhatsApp group invitation for your batch, where further updates will be shared. You can also contact us via WhatsApp at 9368842663."
    },
    {
      question: "What is the project submission deadline?",
      answer: "Your project submission deadline will be the same as your internship completion date. You must submit your project before the completion date."
    },
    {
      question: "Is it mandatory to submit a project only from the available options on the portal?",
      answer: "No, it is not mandatory to submit a project only from the available options. You can submit your own project as long as it is relevant to your internship domain."
    },
    {
      question: "How can I proceed with signing up at Inlighn Tech?",
      answer: "Once you complete the Apply Now process, you will receive access to your internship portal via email. From there, you can sign up for your account."
    },
    {
      question: "Can I earn a certificate after completing an internship at Inlighn Tech?",
      answer: "Yes, once you complete all the learning modules in your internship portal, you will receive a completion certificate."
    },
    {
      question: "Can I interact with internship mentors for guidance?",
      answer: "Yes, a chat option is available in your internship portal to connect with your mentors."
    },
    {
      question: "What is the difference between a completion letter and an experience letter?",
      answer: "A completion letter is issued when you complete your internship duration and the required learning modules in your portal. However, an experience letter requires you to submit your project work with details. Without a project submission, you will not receive an experience letter."
    }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content fade-in">
            <h1>Get In Touch</h1>
            <p>We're here to help you succeed in your tech journey. Reach out to us anytime!</p>
          </div>
        </div>
      </section>

      {/* Visit Office Section */}
      <section className="visit-office fade-in">
        <div className="container">
          <div className="section-title">
            <h2>Visit Our Office</h2>
          </div>
          <div className="office-card">
            <div className="office-icon">
              📍
            </div>
            <h3>Corporate Office</h3>
            <div className="office-address">
              Office No: VO-301, WeWork Prestige Central,<br />
              Ground Floor, 36, Infantry Rd, Tasker Town,<br />
              Shivaji Nagar, Bengaluru, Karnataka 560001
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section fade-in">
        <div className="container">
          <div className="section-title">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-container">
            {faqData.map((faq, index) => (
              <div key={index} className="faq-item">
                <button 
                  className={`faq-question ${activeFaq === index ? 'active' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                  <span className="faq-icon">
                    {activeFaq === index ? '×' : '+'}
                  </span>
                </button>
                <div className={`faq-answer ${activeFaq === index ? 'active' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get in Touch CTA */}
      <section className="cta-section fade-in">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Journey?</h2>
            <p>Join thousands of students who have transformed their careers with InlighnTech</p>
            <div className="cta-buttons">
              <a href="#" className="cta-btn cta-btn-primary">
                🚀 Apply for Internship
              </a>
              <a href="#" className="cta-btn cta-btn-secondary">
                📞 Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;