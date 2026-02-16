import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface OfficeEntranceSceneProps {
  className?: string;
}

export default function OfficeEntranceScene({ className = '' }: OfficeEntranceSceneProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const buildingRef = useRef<HTMLImageElement>(null);
  const characterRef = useRef<HTMLImageElement>(null);
  const speechBubbleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      // Building enters from right
      scrollTl.fromTo(
        buildingRef.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Character enters from left
      scrollTl.fromTo(
        characterRef.current,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Speech bubble appears
      scrollTl.fromTo(
        speechBubbleRef.current,
        { scale: 0.85, y: 18, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // SETTLE (30-70%): Hold positions

      // EXIT (70-100%)
      scrollTl.fromTo(
        speechBubbleRef.current,
        { y: 0, opacity: 1 },
        { y: -12, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        characterRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        buildingRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0.3, ease: 'power2.in' },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="office-entrance"
      ref={sectionRef}
      className={`section-pinned sky-day ${className}`}
    >
      {/* Sun */}
      <div
        className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full"
        style={{
          left: '75%',
          top: '20%',
          background: 'radial-gradient(circle, #FFD54F 0%, #FFB300 70%)',
          boxShadow: '0 0 40px rgba(255, 213, 79, 0.4)',
        }}
      />

      {/* Clouds */}
      <div className="absolute cloud-float" style={{ left: '8%', top: '12%' }}>
        <div className="w-24 h-9 bg-white/85 rounded-full" />
      </div>
      <div className="absolute cloud-float-slow" style={{ left: '55%', top: '8%' }}>
        <div className="w-28 h-10 bg-white/80 rounded-full" />
      </div>

      {/* Ground */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '20%',
          background: 'linear-gradient(180deg, #9E9E9E 0%, #757575 100%)',
        }}
      />

      {/* Sidewalk */}
      <div
        className="absolute left-0 right-0"
        style={{
          bottom: '18%',
          height: '8vh',
          background: 'linear-gradient(180deg, #BDBDBD 0%, #9E9E9E 100%)',
        }}
      />

      {/* Office Building */}
      <img
        ref={buildingRef}
        src="/images/office_building.png"
        alt="Office Building"
        className="absolute"
        style={{
          right: '5%',
          bottom: '20%',
          width: '50vw',
          maxWidth: '650px',
          height: 'auto',
        }}
      />

      {/* Character (Yaqoot) */}
      <img
        ref={characterRef}
        src="/images/yaqoot_stand.png"
        alt="Yaqoot"
        className="absolute z-10"
        style={{
          right: '42%',
          bottom: '18%',
          height: '32vh',
          maxHeight: '340px',
          width: 'auto',
        }}
      />

      {/* Speech Bubble */}
      <div
        ref={speechBubbleRef}
        className="speech-bubble absolute z-20"
        style={{
          right: '45%',
          top: '25%',
          maxWidth: '280px',
        }}
      >
        <p className="font-['Fredoka'] text-lg md:text-xl font-semibold text-[#2B1E5A] text-center">
          Time to build something great.
        </p>
      </div>

      {/* Decorative elements - street lamp */}
      <div
        className="absolute"
        style={{
          left: '15%',
          bottom: '20%',
          width: '8px',
          height: '35vh',
          background: '#424242',
          borderRadius: '4px',
        }}
      >
        <div
          className="absolute -top-4 -left-6 w-16 h-8 bg-white/30 rounded-full"
          style={{ boxShadow: '0 0 30px rgba(255,255,255,0.3)' }}
        />
      </div>

      {/* Small tree */}
      <div
        className="absolute"
        style={{
          left: '25%',
          bottom: '22%',
        }}
      >
        <div className="w-4 h-16 bg-[#8D6E63] mx-auto" />
        <div className="w-20 h-20 bg-[#66BB6A] rounded-full -mt-20" />
      </div>
    </section>
  );
}
