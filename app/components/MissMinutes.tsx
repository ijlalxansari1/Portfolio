'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUOTES = [
  "Hey y'all!",
  "Welcome to the TVA!",
  "For all time. Always.",
  "Looks like you're creating a branched timeline!",
  "Don't make me angry...",
  "Tick tock!",
  "I'm keeping an eye on you!",
  "We protect the Sacred Timeline."
];

export default function MissMinutes() {
  const [quote, setQuote] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [theme, setTheme] = useState("tva");
  const svgRef = useRef<SVGSVGElement>(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  // Eye tracking logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const angle = Math.atan2(dy, dx);
      // Limit how far eyes can move
      const distance = Math.min(3.5, Math.sqrt(dx * dx + dy * dy) / 80); 
      setEyeOffset({ x: Math.cos(angle) * distance, y: Math.sin(angle) * distance });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Occasionally pop up a message
  useEffect(() => {
    // Detect theme from html data-theme or class
    const updateTheme = () => {
      const isLoki = document.documentElement.classList.contains('loki-theme') || 
                     document.documentElement.getAttribute('data-theme') === 'loki';
      const isTva = document.documentElement.getAttribute('data-theme') === 'tva';
      setTheme(isLoki ? 'loki' : (isTva ? 'tva' : 'other'));
    };
    
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });

    const interval = setInterval(() => {
      if (Math.random() > 0.7 && !isVisible) {
        setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 5000);
      }
    }, 15000); // Check every 15 seconds

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [isVisible]);

  const handleClick = () => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 4000);
  };

  if (theme !== 'loki' && theme !== 'tva') return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
       {/* Dialogue Bubble */}
       <AnimatePresence>
         {isVisible && (
           <motion.div 
             initial={{ opacity: 0, y: 10, scale: 0.8 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
             className={`
               font-bold p-4 rounded-3xl rounded-br-none mb-2 shadow-2xl border-2 pointer-events-auto
               ${theme === 'loki' 
                 ? 'bg-emerald-900/90 text-emerald-400 border-emerald-500 backdrop-blur-md' 
                 : 'bg-orange-500 text-white border-orange-700'
               }
             `}
             style={{ maxWidth: '220px' }}
           >
             {quote}
           </motion.div>
         )}
       </AnimatePresence>
       
       {/* Miss Minutes Character */}
       <motion.div 
         drag
         whileDrag={{ scale: 1.1, cursor: "grabbing" }}
         animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
         transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
         onClick={handleClick}
         className="cursor-pointer pointer-events-auto group"
       >
          <svg ref={svgRef} width="120" height="120" viewBox="-10 -10 120 120" className="drop-shadow-[0_10px_15px_rgba(249,115,22,0.4)] group-hover:drop-shadow-[0_10px_25px_rgba(249,115,22,0.8)] transition-all duration-300">
             {/* Arms */}
             <path d="M 5 50 Q -10 60 5 75" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
             <path d="M 95 50 Q 110 60 95 75" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
             
             {/* Legs */}
             <line x1="35" y1="92" x2="35" y2="105" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
             <line x1="65" y1="92" x2="65" y2="105" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
             
             {/* Shoes */}
             <ellipse cx="32" cy="105" rx="7" ry="4" fill="#111" />
             <ellipse cx="68" cy="105" rx="7" ry="4" fill="#111" />

             {/* Gloves */}
             <circle cx="5" cy="75" r="5" fill="white" stroke="black" strokeWidth="1.5" />
             <circle cx="95" cy="75" r="5" fill="white" stroke="black" strokeWidth="1.5" />
             
             {/* Body Outer Rim */}
             <circle cx="50" cy="50" r="45" fill="#f97316" stroke="#c2410c" strokeWidth="4" />
             
             {/* Inner lighter rim */}
             <circle cx="50" cy="50" r="38" fill="#fdba74" opacity="0.4" />
             <circle cx="50" cy="50" r="38" fill="none" stroke="#ea580c" strokeWidth="1.5" opacity="0.6" />
             
             {/* Eyes */}
             <ellipse cx="32" cy="38" rx="7" ry="14" fill="white" stroke="black" strokeWidth="1.5" />
             <ellipse cx="68" cy="38" rx="7" ry="14" fill="white" stroke="black" strokeWidth="1.5" />
             
             {/* Pupils */}
             <ellipse cx={32 + eyeOffset.x} cy={42 + eyeOffset.y} rx="3.5" ry="5" fill="black" />
             <ellipse cx={68 + eyeOffset.x} cy={42 + eyeOffset.y} rx="3.5" ry="5" fill="black" />
             
             {/* Eyelashes Left */}
             <path d="M 28 26 L 24 20 M 32 24 L 32 18 M 36 26 L 40 20" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
             
             {/* Eyelashes Right */}
             <path d="M 64 26 L 60 20 M 68 24 L 68 18 M 72 26 L 76 20" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
             
             {/* Smile */}
             <path d="M 35 65 Q 50 78 65 65" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
             <path d="M 33 62 Q 35 65 35 65" fill="none" stroke="black" strokeWidth="1.5" />
             <path d="M 67 62 Q 65 65 65 65" fill="none" stroke="black" strokeWidth="1.5" />
             <path d="M 45 71 Q 50 74 55 71" fill="none" stroke="black" strokeWidth="1" strokeLinecap="round" />
             
             {/* Clock Hands (Nose/Center) */}
             <circle cx="50" cy="50" r="2.5" fill="black" />
             <line x1="50" y1="50" x2="50" y2="22" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
             <line x1="50" y1="50" x2="72" y2="50" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
             <path d="M 48 24 L 50 20 L 52 24 Z" fill="black" />
             <path d="M 70 48 L 74 50 L 70 52 Z" fill="black" />
             
             {/* Tick Marks */}
             <line x1="50" y1="10" x2="50" y2="14" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" />
             <line x1="50" y1="90" x2="50" y2="86" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" />
             <line x1="10" y1="50" x2="14" y2="50" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" />
             <line x1="90" y1="50" x2="86" y2="50" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" />
          </svg>
       </motion.div>
    </div>
  );
}
