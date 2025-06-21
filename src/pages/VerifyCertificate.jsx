// File: src/components/VerifyCertificate.jsx
import React, { useState } from 'react';

const VerifyCertificate = () => {
  const [certificateId, setCertificateId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerification = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setVerificationResult({
        isValid: true,
        studentName: "John Doe",
        courseName: "Full Stack Development",
        completionDate: "2024-01-15",
        certificateId: certificateId
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="relative min-h-screen bg-gray-950 text-white overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={`circle-${i}`}
              className="absolute rounded-full opacity-10 animate-float-slow"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                background: 'linear-gradient(45deg, #8affb1, #22d3ee)',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${Math.random() * 10 + 15}s`,
              }}
            />
          ))}
        </div>

       
        <div className="absolute inset-0">
          <div className="absolute w-full h-full bg-gradient-to-r from-transparent via-green-500/5 to-transparent animate-wave-x"></div>
          <div className="absolute w-full h-full bg-gradient-to-b from-transparent via-emerald-400/5 to-transparent animate-wave-y"></div>
          <div className="absolute w-full h-full bg-gradient-to-br from-transparent via-cyan-400/3 to-transparent animate-wave-diagonal"></div>
        </div>

        
        <div 
          className="absolute inset-0 opacity-20 animate-grid-move"
          style={{
            backgroundImage: `
              linear-gradient(rgba(138, 255, 177, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(138, 255, 177, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        ></div>

        
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={`line-${i}`}
              className={`absolute ${i % 2 === 0 ? 'w-px h-full' : 'w-full h-px'} 
                bg-gradient-to-${i % 2 === 0 ? 'b' : 'r'} 
                from-transparent via-green-400/20 to-transparent
                ${i % 2 === 0 ? 'animate-line-vertical' : 'animate-line-horizontal'}`}
              style={{
                [i % 2 === 0 ? 'left' : 'top']: `${20 + (i * 15)}%`,
                animationDelay: `${i * 3}s`,
                animationDuration: `${Math.random() * 5 + 15}s`,
              }}
            />
          ))}
        </div>

        
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-green-400 rounded-full opacity-30 animate-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 8 + 12}s`,
              }}
            />
          ))}
        </div>
      </div>

     
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <br />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent">
            Certificate Verification
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Verify the authenticity of certificates issued by INLIGHN TECH. 
            Enter the certificate ID to check its validity and view details.
          </p>
        </div>

        {/* Verification Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-lg border border-green-400/20 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleVerification} className="space-y-8">
              <div>
                <label htmlFor="certificateId" className="block text-lg font-medium text-green-400 mb-3">
                  Certificate ID
                </label>
                <input
                  type="text"
                  id="certificateId"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="Enter certificate ID (e.g., INTECH-2024-001)"
                  className="w-full px-6 py-4 text-lg bg-gray-800/50 border border-gray-600 rounded-xl 
                           focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none
                           text-white placeholder-gray-400 transition-all duration-300"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-8 text-lg font-semibold text-gray-900 bg-gradient-to-r 
                         from-green-400 to-emerald-500 rounded-xl hover:from-green-500 hover:to-emerald-600
                         transform hover:scale-105 transition-all duration-300 shadow-lg
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  'Verify Certificate'
                )}
              </button>
            </form>
          </div>

          {/* Verification Result */}
          {verificationResult && (
            <div className="mt-8 bg-gray-900/50 backdrop-blur-lg border border-green-400/20 rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-400 mb-2">Certificate Verified</h2>
                <p className="text-gray-300">This certificate is authentic and valid</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Student Name</label>
                    <p className="text-lg font-semibold text-white">{verificationResult.studentName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Course Name</label>
                    <p className="text-lg font-semibold text-white">{verificationResult.courseName}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Completion Date</label>
                    <p className="text-lg font-semibold text-white">{verificationResult.completionDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Certificate ID</label>
                    <p className="text-lg font-semibold text-green-400">{verificationResult.certificateId}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Information Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-xl">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Secure Verification</h3>
              <p className="text-gray-400 text-sm">All certificates are verified using blockchain technology</p>
            </div>

            <div className="text-center p-6 bg-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-xl">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Instant Results</h3>
              <p className="text-gray-400 text-sm">Get verification results in seconds</p>
            </div>

            <div className="text-center p-6 bg-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-xl">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Tamper Proof</h3>
              <p className="text-gray-400 text-sm">Certificates cannot be forged or modified</p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.1;
          }
          25% { 
            transform: translateY(-20px) translateX(10px) rotate(90deg);
            opacity: 0.2;
          }
          50% { 
            transform: translateY(-10px) translateX(-15px) rotate(180deg);
            opacity: 0.15;
          }
          75% { 
            transform: translateY(-30px) translateX(5px) rotate(270deg);
            opacity: 0.25;
          }
        }

        @keyframes wave-x {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes wave-y {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @keyframes wave-diagonal {
          0% { transform: translate(-100%, -100%); }
          100% { transform: translate(100%, 100%); }
        }

        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }

        @keyframes line-vertical {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }

        @keyframes line-horizontal {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }

        @keyframes particle {
          0% { 
            transform: translateY(0px) scale(0);
            opacity: 0;
          }
          10% { 
            opacity: 1;
            transform: scale(1);
          }
          90% { 
            opacity: 1;
          }
          100% { 
            transform: translateY(-100vh) scale(0);
            opacity: 0;
          }
        }

        .animate-float-slow {
          animation: float-slow infinite ease-in-out;
        }

        .animate-wave-x {
          animation: wave-x 20s infinite linear;
        }

        .animate-wave-y {
          animation: wave-y 25s infinite linear;
        }

        .animate-wave-diagonal {
          animation: wave-diagonal 30s infinite linear;
        }

        .animate-grid-move {
          animation: grid-move 40s infinite linear;
        }

        .animate-line-vertical {
          animation: line-vertical infinite linear;
        }

        .animate-line-horizontal {
          animation: line-horizontal infinite linear;
        }

        .animate-particle {
          animation: particle infinite linear;
        }
      `}</style>
    </div>
  );
};

export default VerifyCertificate;