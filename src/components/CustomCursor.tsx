'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device is touch-only
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
    };

    const animate = () => {
      // Smooth follow for cursor
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      }

      // Slower follow for follower
      followerX += (cursorX - followerX) * 0.1;
      followerY += (cursorY - followerY) * 0.1;
      
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerX}px, ${followerY}px)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    
    const addHoverEffect = () => {
      cursorRef.current?.classList.add('hovering');
      followerRef.current?.classList.add('hovering');
    };

    const removeHoverEffect = () => {
      cursorRef.current?.classList.remove('hovering');
      followerRef.current?.classList.remove('hovering');
    };

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', addHoverEffect);
      el.addEventListener('mouseleave', removeHoverEffect);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', addHoverEffect);
        el.removeEventListener('mouseleave', removeHoverEffect);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="cursor hidden md:block fixed top-0 left-0 w-5 h-5 border-2 border-neon-cyan rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-75"
        style={{
          marginLeft: '-10px',
          marginTop: '-10px',
        }}
      />
      
      {/* Follower */}
      <div
        ref={followerRef}
        className="cursor-follower hidden md:block fixed top-0 left-0 w-10 h-10 bg-neon-cyan/10 border border-neon-cyan/30 rounded-full pointer-events-none z-[9998]"
        style={{
          marginLeft: '-20px',
          marginTop: '-20px',
        }}
      />
    </>
  );
}
