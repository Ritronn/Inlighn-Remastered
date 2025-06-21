import { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function AnimatedCursor() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState([]);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const previousCoords = useRef({ x: 0, y: 0 });
  const animationFrame = useRef();

  // Smooth cursor movement with spring animation
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const updateCursor = (e) => {
      const newCoords = { x: e.clientX, y: e.clientY };
      
      // Calculate velocity for dynamic effects
      setVelocity({
        x: newCoords.x - previousCoords.current.x,
        y: newCoords.y - previousCoords.current.y
      });
      
      setCoords(newCoords);
      cursorX.set(newCoords.x);
      cursorY.set(newCoords.y);
      
      // Update trail
      setTrail(prevTrail => {
        const newTrail = [
          { x: newCoords.x, y: newCoords.y, id: Date.now() },
          ...prevTrail.slice(0, 15)
        ];
        return newTrail;
      });
      
      previousCoords.current = newCoords;
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    const handleMouseEnter = (e) => {
      const element = e.target;
      const isInteractive = element.tagName === 'BUTTON' || 
                           element.tagName === 'A' || 
                           element.role === 'button' ||
                           element.classList.contains('cursor-pointer') ||
                           window.getComputedStyle(element).cursor === 'pointer';
      setIsHovering(isInteractive);
    };

    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [cursorX, cursorY]);

  // Calculate cursor size based on velocity
  const getCursorSize = () => {
    const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
    const baseSize = isHovering ? 60 : isClicking ? 20 : 40;
    const velocitySize = Math.min(speed * 0.5, 20);
    return baseSize + velocitySize;
  };

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="pointer-events-none fixed z-[9999] mix-blend-difference"
        style={{
          left: coords.x,
          top: coords.y,
          x: -20,
          y: -20,
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          rotate: isClicking ? 180 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28
        }}
      >
        {/* Outer Ring */}
        <motion.div
          className="relative w-10 h-10 rounded-full border-2 border-emerald-400"
          animate={{
            borderColor: isClicking ? "#f59e0b" : isHovering ? "#10b981" : "#34d399",
            opacity: isClicking ? 0.8 : isHovering ? 1 : 0.7,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Inner Dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            animate={{
              backgroundColor: isClicking ? "#f59e0b" : isHovering ? "#059669" : "#10b981",
              scale: isClicking ? 2 : isHovering ? 0 : 1,
            }}
            transition={{ duration: 0.15 }}
          />
          
          {/* Rotating Elements */}
          {[0, 90, 180, 270].map((rotation, index) => (
            <motion.div
              key={index}
              className="absolute w-1 h-1 bg-emerald-400 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transformOrigin: '0 0',
              }}
              animate={{
                rotate: rotation + (isHovering ? 360 : 0),
                x: isClicking ? 8 : 12,
                y: -0.5,
                opacity: isHovering ? 1 : 0.6,
              }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                x: { duration: 0.3 },
                opacity: { duration: 0.2 }
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Glow Effect */}
      <motion.div
        className="pointer-events-none fixed z-[9998]"
        style={{
          left: coords.x,
          top: coords.y,
          x: -getCursorSize() / 2,
          y: -getCursorSize() / 2,
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovering ? 2 : 1,
          opacity: isClicking ? 0.8 : isHovering ? 0.3 : 0.2,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      >
        <div
          className="rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 blur-xl"
          style={{
            width: getCursorSize(),
            height: getCursorSize(),
          }}
        />
      </motion.div>

      {/* Particle Trail */}
      {trail.map((point, index) => {
        const opacity = (trail.length - index) / trail.length;
        const size = Math.max(2, 8 - index * 0.5);
        
        return (
          <motion.div
            key={point.id}
            className="pointer-events-none fixed z-[9997] rounded-full bg-emerald-400"
            style={{
              left: point.x,
              top: point.y,
              width: size,
              height: size,
              x: -size / 2,
              y: -size / 2,
            }}
            initial={{ opacity: opacity, scale: 1 }}
            animate={{ 
              opacity: 0, 
              scale: 0,
              x: Math.random() * 20 - 10,
              y: Math.random() * 20 - 10,
            }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut"
            }}
          />
        );
      })}

      {/* Click Ripple Effect */}
      {isClicking && (
        <motion.div
          className="pointer-events-none fixed z-[9996] border-2 border-amber-400 rounded-full"
          style={{
            left: coords.x,
            top: coords.y,
            x: -25,
            y: -25,
          }}
          initial={{ width: 0, height: 0, opacity: 0.8 }}
          animate={{ 
            width: 100, 
            height: 100, 
            opacity: 0,
            x: -50,
            y: -50,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}

      {/* Hover Magnetic Field Effect */}
      {isHovering && (
        <>
          {[...Array(8)].map((_, index) => {
            const angle = (index * 360) / 8;
            return (
              <motion.div
                key={index}
                className="pointer-events-none fixed z-[9995] w-1 h-1 bg-emerald-300 rounded-full"
                style={{
                  left: coords.x,
                  top: coords.y,
                }}
                animate={{
                  x: Math.cos((angle * Math.PI) / 180) * 30,
                  y: Math.sin((angle * Math.PI) / 180) * 30,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.1,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </>
      )}

      {/* Speed Lines */}
      {Math.abs(velocity.x) > 5 || Math.abs(velocity.y) > 5 ? (
        <motion.div
          className="pointer-events-none fixed z-[9994]"
          style={{
            left: coords.x,
            top: coords.y,
            x: -velocity.x * 2,
            y: -velocity.y * 2,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-8 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
              style={{
                transform: `rotate(${Math.atan2(velocity.y, velocity.x) * (180 / Math.PI)}deg)`,
                left: -velocity.x * (index + 1) * 0.3,
                top: -velocity.y * (index + 1) * 0.3,
              }}
              animate={{
                opacity: [0.8, 0],
                scaleX: [1, 0.5],
              }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
              }}
            />
          ))}
        </motion.div>
      ) : null}

      {/* Ambient Particles */}
      {isHovering && (
        <>
          {[...Array(12)].map((_, index) => (
            <motion.div
              key={`ambient-${index}`}
              className="pointer-events-none fixed z-[9993] w-0.5 h-0.5 bg-emerald-200 rounded-full"
              style={{
                left: coords.x + (Math.random() - 0.5) * 100,
                top: coords.y + (Math.random() - 0.5) * 100,
              }}
              animate={{
                y: [0, -20, 0],
                x: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </>
      )}
    </>
  );
}