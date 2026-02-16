import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sun, Moon } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? 'bg-[#2B1E5A]/90 backdrop-blur-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollToSection('home')}
          className="font-['Fredoka'] text-xl font-bold text-white hover:text-[#00D2FF] transition-colors"
        >
          Yaqoot&apos;s World
        </button>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('road')}
            className="text-white/80 hover:text-white font-medium transition-colors relative group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00D2FF] transition-all group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollToSection('desk')}
            className="text-white/80 hover:text-white font-medium transition-colors relative group"
          >
            Work
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00D2FF] transition-all group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollToSection('team')}
            className="text-white/80 hover:text-white font-medium transition-colors relative group"
          >
            Team
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00D2FF] transition-all group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-white/80 hover:text-white font-medium transition-colors relative group"
          >
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00D2FF] transition-all group-hover:w-full" />
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundOn(!soundOn)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Toggle sound"
          >
            {soundOn ? (
              <Volume2 className="w-5 h-5 text-white" />
            ) : (
              <VolumeX className="w-5 h-5 text-white/60" />
            )}
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Moon className="w-5 h-5 text-[#00D2FF]" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-400" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
