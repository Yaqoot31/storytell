import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Briefcase, Wrench } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface RoadSceneProps {
  className?: string;
}

export default function RoadScene({ className = '' }: RoadSceneProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLImageElement>(null);
  const cardARef = useRef<HTMLDivElement>(null);
  const cardBRef = useRef<HTMLDivElement>(null);
  const cardCRef = useRef<HTMLDivElement>(null);
  const colleaguesRef = useRef<HTMLImageElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);

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
      // Road slides in
      scrollTl.fromTo(
        roadRef.current,
        { y: '20vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Character enters from right
      scrollTl.fromTo(
        characterRef.current,
        { x: '50vw', scale: 0.9, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Cards enter from left (staggered)
      scrollTl.fromTo(
        cardARef.current,
        { x: '-40vw', rotate: -2, opacity: 0 },
        { x: 0, rotate: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        cardBRef.current,
        { x: '-40vw', rotate: 1, opacity: 0 },
        { x: 0, rotate: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        cardCRef.current,
        { x: '-40vw', rotate: -1, opacity: 0 },
        { x: 0, rotate: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // Colleagues enter from right
      scrollTl.fromTo(
        colleaguesRef.current,
        { x: '30vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // SETTLE (30-70%): Hold positions

      // EXIT (70-100%)
      scrollTl.fromTo(
        characterRef.current,
        { x: 0, y: 0, opacity: 1 },
        { x: '18vw', y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [cardARef.current, cardBRef.current, cardCRef.current],
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        colleaguesRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        roadRef.current,
        { x: 0, opacity: 1 },
        { x: '-8vw', opacity: 0.3, ease: 'power2.in' },
        0.78
      );

      // Idle animation for colleagues during settle
      gsap.to(colleaguesRef.current, {
        y: -6,
        duration: 0.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="road"
      ref={sectionRef}
      className={`section-pinned sky-day ${className}`}
    >
      {/* Sun (lower position) */}
      <div
        className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full"
        style={{
          left: '78%',
          top: '22%',
          background: 'radial-gradient(circle, #FFD54F 0%, #FFB300 70%)',
          boxShadow: '0 0 50px rgba(255, 213, 79, 0.4)',
        }}
      />

      {/* Clouds */}
      <div className="absolute cloud-float" style={{ left: '5%', top: '10%' }}>
        <div className="w-28 h-10 bg-white/85 rounded-full" />
      </div>
      <div className="absolute cloud-float-slow" style={{ left: '60%', top: '6%' }}>
        <div className="w-24 h-9 bg-white/80 rounded-full" />
      </div>

      {/* Ground/Grass */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '25%',
          background: 'linear-gradient(180deg, #81C784 0%, #4CAF50 100%)',
        }}
      />

      {/* Road */}
      <div
        ref={roadRef}
        className="absolute left-0 right-0"
        style={{
          bottom: '15%',
          height: '20vh',
          background: 'linear-gradient(180deg, #5C6BC0 0%, #3949AB 100%)',
          clipPath: 'polygon(0 30%, 100% 20%, 100% 100%, 0 100%)',
        }}
      >
        {/* Road lines */}
        <div className="absolute top-1/2 left-0 right-0 flex justify-around">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-16 h-2 bg-white/40"
              style={{ transform: 'skewX(-20deg)' }}
            />
          ))}
        </div>
      </div>

      {/* Road Scene Background */}
      <img
        src="/images/road_scene.png"
        alt="Road"
        className="absolute opacity-40"
        style={{
          left: '0',
          bottom: '20%',
          width: '100%',
          height: '50%',
          objectFit: 'cover',
        }}
      />

      {/* Content Cards - Left Side */}
      <div
        ref={cardARef}
        className="anime-card absolute p-4 md:p-6"
        style={{
          left: '6%',
          top: '15%',
          width: '24vw',
          maxWidth: '320px',
          minWidth: '200px',
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-[#00D2FF]/20 rounded-xl">
            <User className="w-5 h-5 text-[#00D2FF]" />
          </div>
          <h3 className="font-['Fredoka'] text-lg md:text-xl font-bold text-[#2B1E5A]">
            About Me
          </h3>
        </div>
        <p className="text-sm md:text-base text-[#5C4A7A]">
          I&apos;m Yaqoot — a project manager who loves turning chaos into clear plans.
        </p>
      </div>

      <div
        ref={cardBRef}
        className="anime-card absolute p-4 md:p-6"
        style={{
          left: '6%',
          top: '42%',
          width: '24vw',
          maxWidth: '320px',
          minWidth: '200px',
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-[#00D2FF]/20 rounded-xl">
            <Briefcase className="w-5 h-5 text-[#00D2FF]" />
          </div>
          <h3 className="font-['Fredoka'] text-lg md:text-xl font-bold text-[#2B1E5A]">
            Experience
          </h3>
        </div>
        <p className="text-sm md:text-base text-[#5C4A7A]">
          5+ years shipping web & mobile products with global teams.
        </p>
      </div>

      <div
        ref={cardCRef}
        className="anime-card absolute p-4 md:p-6"
        style={{
          left: '6%',
          top: '69%',
          width: '24vw',
          maxWidth: '320px',
          minWidth: '200px',
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-[#00D2FF]/20 rounded-xl">
            <Wrench className="w-5 h-5 text-[#00D2FF]" />
          </div>
          <h3 className="font-['Fredoka'] text-lg md:text-xl font-bold text-[#2B1E5A]">
            Skills
          </h3>
        </div>
        <p className="text-sm md:text-base text-[#5C4A7A]">
          Agile · Scrum · Roadmaps · Risk Management · Stakeholder Sync
        </p>
      </div>

      {/* Character (Yaqoot walking) */}
      <img
        ref={characterRef}
        src="/images/yaqoot_walk.png"
        alt="Yaqoot walking"
        className="absolute z-10"
        style={{
          left: '48%',
          bottom: '18%',
          height: '36vh',
          maxHeight: '380px',
          width: 'auto',
        }}
      />

      {/* Colleagues Group */}
      <img
        ref={colleaguesRef}
        src="/images/colleagues_group.png"
        alt="Colleagues"
        className="absolute z-10"
        style={{
          right: '8%',
          bottom: '20%',
          height: '28vh',
          maxHeight: '300px',
          width: 'auto',
        }}
      />
    </section>
  );
}
