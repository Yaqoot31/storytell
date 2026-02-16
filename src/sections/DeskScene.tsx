import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ExternalLink, Calendar, Users, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DeskSceneProps {
  className?: string;
}

const projects = [
  {
    id: 1,
    title: 'Project Alpha',
    description: 'Mobile app launch — 3 platforms, 6 sprints, on time.',
    details: 'Led a cross-functional team of 12 developers and designers to deliver a fintech mobile application for iOS, Android, and Web. Implemented Agile methodologies with 2-week sprints.',
    tech: ['React Native', 'Node.js', 'AWS', 'Firebase'],
    metrics: { team: 12, sprints: 6, completion: 100 },
  },
  {
    id: 2,
    title: 'Current Stack',
    description: 'Jira · Confluence · Figma · GitHub · Slack',
    details: 'Modern project management toolchain enabling seamless collaboration across distributed teams. Integrated CI/CD pipelines and automated reporting.',
    tech: ['Jira', 'Confluence', 'Figma', 'GitHub', 'Slack'],
    metrics: { team: 8, sprints: 12, completion: 85 },
  },
  {
    id: 3,
    title: 'Project Beta',
    description: 'Enterprise dashboard — 200% adoption in 90 days.',
    details: 'Spearheaded the development of an analytics dashboard for enterprise clients. Achieved 200% user adoption rate within the first quarter of launch.',
    tech: ['React', 'TypeScript', 'PostgreSQL', 'Docker'],
    metrics: { team: 15, sprints: 8, completion: 100 },
  },
];

export default function DeskScene({ className = '' }: DeskSceneProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const deskRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLImageElement>(null);
  const laptopRef = useRef<HTMLImageElement>(null);
  const cardLeftRef = useRef<HTMLDivElement>(null);
  const cardCenterRef = useRef<HTMLDivElement>(null);
  const cardRightRef = useRef<HTMLDivElement>(null);

  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      // Desk group enters from bottom
      scrollTl.fromTo(
        [deskRef.current, characterRef.current, laptopRef.current],
        { y: '60vh', scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Cards enter with stagger
      scrollTl.fromTo(
        cardLeftRef.current,
        { x: '-50vw', rotate: -2, opacity: 0 },
        { x: 0, rotate: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        cardCenterRef.current,
        { y: '-40vh', scale: 0.9, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        cardRightRef.current,
        { x: '50vw', rotate: 2, opacity: 0 },
        { x: 0, rotate: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // SETTLE (30-70%): Hold positions

      // EXIT (70-100%)
      scrollTl.fromTo(
        [deskRef.current, characterRef.current, laptopRef.current],
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [cardLeftRef.current, cardCenterRef.current, cardRightRef.current],
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.72
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="desk"
      ref={sectionRef}
      className={`section-pinned ${className}`}
      style={{ background: 'linear-gradient(180deg, #2B1E5A 0%, #1A103C 100%)' }}
    >
      {/* Radial glow behind desk */}
      <div
        className="absolute"
        style={{
          left: '50%',
          top: '60%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          height: '60vh',
          background: 'radial-gradient(ellipse, rgba(0,210,255,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Project Cards */}
      <div
        ref={cardLeftRef}
        onClick={() => setSelectedProject(projects[0])}
        className="anime-card absolute p-4 md:p-6 cursor-pointer hover:scale-105 transition-transform"
        style={{
          left: '6%',
          top: '18%',
          width: '22vw',
          maxWidth: '300px',
          minWidth: '180px',
        }}
      >
        <h3 className="font-['Fredoka'] text-lg md:text-xl font-bold text-[#2B1E5A] mb-2">
          {projects[0].title}
        </h3>
        <p className="text-sm md:text-base text-[#5C4A7A]">
          {projects[0].description}
        </p>
        <div className="mt-4 flex items-center gap-2 text-[#00D2FF]">
          <ExternalLink className="w-4 h-4" />
          <span className="text-sm font-medium">View Details</span>
        </div>
      </div>

      <div
        ref={cardCenterRef}
        onClick={() => setSelectedProject(projects[1])}
        className="anime-card absolute p-4 md:p-6 cursor-pointer hover:scale-105 transition-transform"
        style={{
          left: '50%',
          top: '12%',
          transform: 'translateX(-50%)',
          width: '24vw',
          maxWidth: '320px',
          minWidth: '200px',
        }}
      >
        <h3 className="font-['Fredoka'] text-lg md:text-xl font-bold text-[#2B1E5A] mb-2">
          {projects[1].title}
        </h3>
        <p className="text-sm md:text-base text-[#5C4A7A]">
          {projects[1].description}
        </p>
        <div className="mt-4 flex items-center gap-2 text-[#00D2FF]">
          <ExternalLink className="w-4 h-4" />
          <span className="text-sm font-medium">View Details</span>
        </div>
      </div>

      <div
        ref={cardRightRef}
        onClick={() => setSelectedProject(projects[2])}
        className="anime-card absolute p-4 md:p-6 cursor-pointer hover:scale-105 transition-transform"
        style={{
          right: '6%',
          top: '18%',
          width: '22vw',
          maxWidth: '300px',
          minWidth: '180px',
        }}
      >
        <h3 className="font-['Fredoka'] text-lg md:text-xl font-bold text-[#2B1E5A] mb-2">
          {projects[2].title}
        </h3>
        <p className="text-sm md:text-base text-[#5C4A7A]">
          {projects[2].description}
        </p>
        <div className="mt-4 flex items-center gap-2 text-[#00D2FF]">
          <ExternalLink className="w-4 h-4" />
          <span className="text-sm font-medium">View Details</span>
        </div>
      </div>

      {/* Desk */}
      <div
        ref={deskRef}
        className="absolute"
        style={{
          left: '50%',
          bottom: '0',
          transform: 'translateX(-50%)',
          width: '90vw',
          maxWidth: '1200px',
          height: '35vh',
          background: 'linear-gradient(180deg, #8D6E63 0%, #6D4C41 100%)',
          borderRadius: '20px 20px 0 0',
          border: '4px solid #4E342E',
        }}
      >
        {/* Desk surface detail */}
        <div
          className="absolute top-4 left-4 right-4 h-4 bg-[#A1887F] rounded"
          style={{ opacity: 0.5 }}
        />
      </div>

      {/* Character (Yaqoot sitting) */}
      <img
        ref={characterRef}
        src="/images/yaqoot_sit.png"
        alt="Yaqoot working"
        className="absolute z-10"
        style={{
          left: '50%',
          bottom: '25%',
          transform: 'translateX(-50%)',
          height: '42vh',
          maxHeight: '450px',
          width: 'auto',
        }}
      />

      {/* Laptop */}
      <img
        ref={laptopRef}
        src="/images/laptop.png"
        alt="Laptop"
        className="absolute z-20"
        style={{
          left: '50%',
          bottom: '32%',
          transform: 'translateX(-50%) scale(0.7)',
          height: 'auto',
          width: '30vw',
          maxWidth: '400px',
        }}
      />

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(26, 16, 60, 0.9)' }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="anime-card p-6 md:p-8 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-['Fredoka'] text-2xl font-bold text-[#2B1E5A]">
                {selectedProject.title}
              </h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-[#5C4A7A]" />
              </button>
            </div>

            <p className="text-[#5C4A7A] mb-6">
              {selectedProject.details}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-[#00D2FF]/10 rounded-xl p-3 text-center">
                <Users className="w-5 h-5 text-[#00D2FF] mx-auto mb-1" />
                <p className="font-['Fredoka'] font-bold text-[#2B1E5A]">
                  {selectedProject.metrics.team}
                </p>
                <p className="text-xs text-[#5C4A7A]">Team</p>
              </div>
              <div className="bg-[#00D2FF]/10 rounded-xl p-3 text-center">
                <Calendar className="w-5 h-5 text-[#00D2FF] mx-auto mb-1" />
                <p className="font-['Fredoka'] font-bold text-[#2B1E5A]">
                  {selectedProject.metrics.sprints}
                </p>
                <p className="text-xs text-[#5C4A7A]">Sprints</p>
              </div>
              <div className="bg-[#00D2FF]/10 rounded-xl p-3 text-center">
                <CheckCircle className="w-5 h-5 text-[#00D2FF] mx-auto mb-1" />
                <p className="font-['Fredoka'] font-bold text-[#2B1E5A]">
                  {selectedProject.metrics.completion}%
                </p>
                <p className="text-xs text-[#5C4A7A]">Complete</p>
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <p className="text-sm font-semibold text-[#2B1E5A] mb-2">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-[#2B1E5A] text-white text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
