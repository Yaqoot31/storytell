import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HomeSceneProps {
  className?: string;
}

export default function HomeScene({ className = '' }: HomeSceneProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const houseRef = useRef<HTMLImageElement>(null);
  const characterRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const cloud1Ref = useRef<HTMLDivElement>(null);
  const cloud2Ref = useRef<HTMLDivElement>(null);
  const cloud3Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const loadTl = gsap.timeline({ delay: 0.3 });

      // House entrance
      loadTl.fromTo(
        houseRef.current,
        { opacity: 0, y: '6vh' },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        0
      );

      // Character entrance
      loadTl.fromTo(
        characterRef.current,
        { opacity: 0, x: '-6vw', scale: 0.92 },
        { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power2.out' },
        0.2
      );

      // Card entrance
      loadTl.fromTo(
        cardRef.current,
        { opacity: 0, x: '8vw', y: '4vh', scale: 0.96 },
        { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.6)' },
        0.4
      );

      // CTA entrance
      loadTl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 18, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' },
        0.6
      );

      // Cloud floating animations
      gsap.to(cloud1Ref.current, {
        x: 30,
        duration: 8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
      gsap.to(cloud2Ref.current, {
        x: -20,
        duration: 10,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
      gsap.to(cloud3Ref.current, {
        x: 25,
        duration: 12,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset elements when scrolling back to top
            gsap.set([houseRef.current, characterRef.current, cardRef.current, ctaRef.current], {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            });
          },
        },
      });

      // ENTRANCE (0-30%): Hold - elements already visible from load
      // Just subtle cloud movement handled by CSS/JS above

      // SETTLE (30-70%): Static

      // EXIT (70-100%): Elements exit
      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        ctaRef.current,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        characterRef.current,
        { x: 0, opacity: 1 },
        { x: '24vw', opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        houseRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0.3, ease: 'power2.in' },
        0.78
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const roadSection = document.getElementById('road');
    if (roadSection) {
      roadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className={`section-pinned sky-day ${className}`}
    >
      {/* Sun */}
      <div
        className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full"
        style={{
          left: '82%',
          top: '18%',
          background: 'radial-gradient(circle, #FFD54F 0%, #FFB300 70%)',
          boxShadow: '0 0 60px rgba(255, 213, 79, 0.5)',
        }}
      />

      {/* Clouds */}
      <div
        ref={cloud1Ref}
        className="absolute cloud-float"
        style={{ left: '10%', top: '12%' }}
      >
        <div className="w-24 h-10 bg-white/90 rounded-full" />
      </div>
      <div
        ref={cloud2Ref}
        className="absolute cloud-float-slow"
        style={{ left: '45%', top: '8%' }}
      >
        <div className="w-32 h-12 bg-white/80 rounded-full" />
      </div>
      <div
        ref={cloud3Ref}
        className="absolute cloud-float"
        style={{ left: '70%', top: '15%' }}
      >
        <div className="w-20 h-8 bg-white/85 rounded-full" />
      </div>

      {/* Ground/Grass */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '22%',
          background: 'linear-gradient(180deg, #81C784 0%, #4CAF50 100%)',
          borderRadius: '50% 50% 0 0 / 20px 20px 0 0',
        }}
      />

      {/* House */}
      <img
        ref={houseRef}
        src="/images/house_scene.png"
        alt="Yaqoot's House"
        className="absolute"
        style={{
          left: '12%',
          bottom: '15%',
          width: '40vw',
          maxWidth: '500px',
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
          left: '38%',
          bottom: '12%',
          height: '38vh',
          maxHeight: '400px',
          width: 'auto',
        }}
      />

      {/* Text Card */}
      <div
        ref={cardRef}
        className="anime-card absolute p-6 md:p-8"
        style={{
          left: '55%',
          top: '28%',
          width: '36vw',
          maxWidth: '480px',
          minWidth: '280px',
        }}
      >
        <h1 className="font-['Fredoka'] text-2xl md:text-4xl lg:text-5xl font-bold text-[#2B1E5A] mb-3">
          Welcome to Yaqoot&apos;s World
        </h1>
        <p className="text-base md:text-lg text-[#5C4A7A] mb-6 font-medium">
          IT Project Manager & Software Professional
        </p>
        <button
          ref={ctaRef}
          onClick={scrollToNext}
          className="anime-btn flex items-center gap-2 text-base md:text-lg"
        >
          Start Journey
          <ChevronRight className="w-5 h-5" />
        </button>
        <p className="text-sm text-[#8B7AA8] mt-4">
          Scroll to explore
        </p>
      </div>
    </section>
  );
}
