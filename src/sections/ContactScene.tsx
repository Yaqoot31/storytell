import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Linkedin, Github, Mail, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactSceneProps {
  className?: string;
}

export default function ContactScene({ className = '' }: ContactSceneProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLImageElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Flowing section - no pin, just scroll-triggered animations
      gsap.fromTo(
        cardRef.current,
        { x: '-12vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 35%',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        characterRef.current,
        { x: '12vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 35%',
            scrub: 0.5,
          },
        }
      );

      // Background parallax
      gsap.to(section, {
        backgroundPosition: 'center -20px',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`relative min-h-screen py-20 ${className}`}
      style={{
        background: 'linear-gradient(180deg, #FFD6A5 0%, #FF9E7D 40%, #2B1E5A 100%)',
      }}
    >
      {/* Evening scene background */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: 'url(/images/evening_scene.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 w-full px-6 lg:px-12 min-h-screen flex items-center">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Contact Card */}
          <div
            ref={cardRef}
            className="anime-card p-6 md:p-8 w-full max-w-lg"
          >
            <h2 className="font-['Fredoka'] text-2xl md:text-4xl font-bold text-[#2B1E5A] mb-3">
              Let&apos;s Build Something Together
            </h2>
            <p className="text-[#5C4A7A] mb-6">
              Have a project in mind? Send a message and I&apos;ll get back within 24 hours.
            </p>

            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="font-['Fredoka'] text-xl font-bold text-[#2B1E5A] mb-2">
                  Message Sent!
                </h3>
                <p className="text-[#5C4A7A]">
                  Thank you for reaching out. I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#2B1E5A] mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#2B1E5A]/20 focus:border-[#00D2FF] focus:outline-none transition-colors text-[#2B1E5A]"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2B1E5A] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#2B1E5A]/20 focus:border-[#00D2FF] focus:outline-none transition-colors text-[#2B1E5A]"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2B1E5A] mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#2B1E5A]/20 focus:border-[#00D2FF] focus:outline-none transition-colors text-[#2B1E5A] resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="anime-btn w-full flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Social Links */}
            <div className="mt-8 pt-6 border-t border-[#2B1E5A]/10">
              <p className="text-sm text-[#5C4A7A] mb-4 text-center">
                Or connect with me on
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#2B1E5A] text-white rounded-xl hover:bg-[#00D2FF] hover:text-[#2B1E5A] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#2B1E5A] text-white rounded-xl hover:bg-[#00D2FF] hover:text-[#2B1E5A] transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="mailto:yaqoot@example.com"
                  className="p-3 bg-[#2B1E5A] text-white rounded-xl hover:bg-[#00D2FF] hover:text-[#2B1E5A] transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Character (Yaqoot waving) */}
          <img
            ref={characterRef}
            src="/images/yaqoot_wave.png"
            alt="Yaqoot waving"
            className="hidden lg:block"
            style={{
              height: '55vh',
              maxHeight: '550px',
              width: 'auto',
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full py-6 text-center">
        <p className="text-white/60 text-sm">
          © 2024 Yaqoot&apos;s World. Built with love and anime magic.
        </p>
      </footer>
    </section>
  );
}
