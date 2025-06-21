import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const programs = [
  {
    title: "Full Stack Development Internship",
    desc: "Master web development from the ground up with modern frameworks and technologies.",
    image: "/images/fullstack.jpg",
    icon: "💻",
    duration: "12 weeks",
    level: "Beginner to Advanced",
    color: "from-emerald-400 to-teal-500"
  },
  {
    title: "AI & Machine Learning Internship Program",
    desc: "Build a strong foundation in AI & ML with hands-on projects and real-world applications.",
    image: "/images/ai.jpg",
    icon: "🤖",
    duration: "16 weeks",
    level: "Intermediate",
    color: "from-green-400 to-emerald-500"
  },
  {
    title: "Data Analyst Internship",
    desc: "Learn how to collect, clean, analyze, and visualize data to drive business decisions.",
    image: "/images/data.jpg",
    icon: "📊",
    duration: "10 weeks",
    level: "Beginner",
    color: "from-teal-400 to-cyan-500"
  },
  {
    title: "Offensive Cyber Security Internship",
    desc: "Hands-on experience in ethical hacking and penetration testing methodologies.",
    image: "/images/cyber.jpg",
    icon: "🛡️",
    duration: "14 weeks",
    level: "Advanced",
    color: "from-emerald-500 to-green-600"
  },
  {
    title: "Data Science Internship",
    desc: "Work with real datasets to derive insights using statistical analysis and machine learning.",
    image: "/images/datascience.jpg",
    icon: "🔬",
    duration: "18 weeks",
    level: "Intermediate to Advanced",
    color: "from-green-500 to-teal-600"
  },
  {
    title: "Web Development Internship",
    desc: "Learn front-end and back-end technologies to build responsive, scalable web applications.",
    image: "/images/web.jpg",
    icon: "🌐",
    duration: "12 weeks",
    level: "Beginner to Intermediate",
    color: "from-teal-500 to-emerald-600"
  },
];

const ThreeJSBackground = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating particles
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 50;
      positions[i + 2] = (Math.random() - 0.5) * 50;
      
      velocities[i] = (Math.random() - 0.5) * 0.02;
      velocities[i + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i + 2] = (Math.random() - 0.5) * 0.02;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x10b981,
      size: 0.8,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Create floating geometric shapes
    const shapes = [];
    for (let i = 0; i < 20; i++) {
      const geometry = Math.random() > 0.5 
        ? new THREE.IcosahedronGeometry(0.5, 0)
        : new THREE.OctahedronGeometry(0.7, 0);
      
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.3 + Math.random() * 0.1, 0.7, 0.5),
        transparent: true,
        opacity: 0.3,
        wireframe: true
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      shapes.push({
        mesh,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01
        }
      });
      scene.add(mesh);
    }

    camera.position.z = 30;

    sceneRef.current = scene;
    rendererRef.current = renderer;
    particlesRef.current = { particles, positions, velocities, shapes };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate particles
      const positionAttribute = particles.geometry.attributes.position;
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        // Boundary check
        if (Math.abs(positions[i]) > 25) velocities[i] *= -1;
        if (Math.abs(positions[i + 1]) > 25) velocities[i + 1] *= -1;
        if (Math.abs(positions[i + 2]) > 25) velocities[i + 2] *= -1;
      }
      positionAttribute.needsUpdate = true;

      // Animate shapes
      shapes.forEach(shape => {
        shape.mesh.rotation.x += shape.rotationSpeed.x;
        shape.mesh.rotation.y += shape.rotationSpeed.y;
        shape.mesh.rotation.z += shape.rotationSpeed.z;
      });

      // Rotate entire particle system
      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0" />;
};

const ProgramCard = ({ prog, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 } 
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Animated background glow */}
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${prog.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-75 transition-all duration-500`}
        animate={{
          opacity: isHovered ? 0.75 : 0,
          scale: isHovered ? 1.02 : 1
        }}
      />
      
      <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-gray-200/50 h-full">
        {/* Image with overlay */}
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={prog.image}
            alt={prog.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${prog.color} opacity-20`} />
          
          {/* Floating icon */}
          <motion.div
            className="absolute top-4 right-4 text-3xl bg-white/90 rounded-full p-2 shadow-lg"
            animate={{
              y: isHovered ? [0, -5, 0] : 0,
              rotate: isHovered ? [0, 10, -10, 0] : 0
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut"
            }}
          >
            {prog.icon}
          </motion.div>
        </div>

        <div className="p-6">
          {/* Program badges */}
          <div className="flex gap-2 mb-3">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
              {prog.duration}
            </span>
            <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full">
              {prog.level}
            </span>
          </div>

          <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-emerald-600 transition-colors">
            {prog.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            {prog.desc}
          </p>

          {/* Action buttons */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 px-4 py-3 bg-gradient-to-r ${prog.color} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              Enroll Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-emerald-400 hover:text-emerald-600 transition-all duration-300"
            >
              Learn More
            </motion.button>
          </div>
        </div>

        {/* Animated corner decoration */}
        <motion.div
          className="absolute top-0 left-0 w-20 h-20 opacity-10"
          animate={{
            rotate: isHovered ? 180 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <div className={`w-full h-full bg-gradient-to-br ${prog.color} rounded-br-full`} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function Programs() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 px-6 py-20 overflow-hidden">
      {/* Three.js Background */}
      <ThreeJSBackground />

      {/* Animated background elements */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-teal-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-200/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Our Programs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Discover cutting-edge internship programs designed to accelerate your career in technology. 
            From development to data science, we've got the perfect path for your journey.
          </motion.p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {programs.map((prog, index) => (
            <ProgramCard key={index} prog={prog} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300"
          >
            Explore All Programs
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}