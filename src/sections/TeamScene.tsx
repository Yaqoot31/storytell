import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TeamSceneProps {
  className?: string;
}

export default function TeamScene({ className = '' }: TeamSceneProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLImageElement>(null);
  const speechBubbleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      // Table enters from bottom
      scrollTl.fromTo(
        tableRef.current,
        { y: '50vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Speech bubble appears
      scrollTl.fromTo(
        speechBubbleRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0.15
      );

      // SETTLE (30-70%): Hold positions with idle animation

      // EXIT (70-100%)
      scrollTl.fromTo(
        speechBubbleRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        tableRef.current,
        { x: 0, y: 0, opacity: 1 },
        { x: '-12vw', y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      // Idle animation for table during settle
      gsap.to(tableRef.current, {
        y: -5,
        duration: 0.9,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className={`section-pinned ${className}`}
      style={{ background: 'linear-gradient(180deg, #1A103C 0%, #2B1E5A 100%)' }}
    >
      {/* Decorative background elements */}
      <div
        className="absolute"
        style={{
          left: '10%',
          top: '20%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(0,210,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      <div
        className="absolute"
        style={{
          right: '15%',
          bottom: '30%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(0,210,255,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Speech Bubble */}
      <div
        ref={speechBubbleRef}
        className="speech-bubble absolute z-20"
        style={{
          left: '50%',
          top: '12%',
          transform: 'translateX(-50%)',
          maxWidth: '400px',
        }}
      >
        <p className="font-['Fredoka'] text-lg md:text-2xl font-semibold text-[#2B1E5A] text-center">
          Great products are built by great teams.
        </p>
      </div>

      {/* Team Table Image */}
      <img
        ref={tableRef}
        src="/images/team_members.png"
        alt="Team collaboration"
        className="absolute z-10"
        style={{
          left: '50%',
          bottom: '8%',
          transform: 'translateX(-50%)',
          width: '80vw',
          maxWidth: '1000px',
          height: 'auto',
        }}
      />

      {/* Floating icons representing collaboration */}
      <div
        className="absolute cloud-float"
        style={{ left: '8%', top: '35%' }}
      >
        <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-[#00D2FF]/30">
          <span className="text-2xl">💬</span>
        </div>
      </div>

      <div
        className="absolute cloud-float-slow"
        style={{ right: '10%', top: '30%' }}
      >
        <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-[#00D2FF]/30">
          <span className="text-2xl">🎯</span>
        </div>
      </div>

      <div
        className="absolute cloud-float"
        style={{ left: '15%', bottom: '35%' }}
      >
        <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-[#00D2FF]/30">
          <span className="text-2xl">🚀</span>
        </div>
      </div>

      <div
        className="absolute cloud-float-slow"
        style={{ right: '12%', bottom: '40%' }}
      >
        <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-[#00D2FF]/30">
          <span className="text-2xl">⭐</span>
        </div>
      </div>

      {/* Leadership qualities text */}
      <div
        className="absolute flex gap-4 md:gap-8"
        style={{
          left: '50%',
          bottom: '5%',
          transform: 'translateX(-50%)',
        }}
      >
        {['Communication', 'Leadership', 'Collaboration', 'Innovation'].map((quality) => (
          <span
            key={quality}
            className="px-3 py-1 md:px-4 md:py-2 bg-[#00D2FF]/20 rounded-full text-[#00D2FF] text-xs md:text-sm font-medium border border-[#00D2FF]/30"
          >
            {quality}
          </span>
        ))}
      </div>
    </section>
  );
}
