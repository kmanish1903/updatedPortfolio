import { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getMutedState, setMutedState, playClick, playHover } from '@/lib/audio';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [soundMuted, setSoundMuted] = useState(true); // default true for safety

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    // Read initial sound muted state
    setSoundMuted(getMutedState());

    const handleScroll = () => {
      // Update scrolled state
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = !soundMuted;
    setSoundMuted(newState);
    setMutedState(newState);
    // synthesize sound on click
    if (!newState) {
      setTimeout(() => playClick(), 50);
    }
  };

  const scrollToSection = (href: string) => {
    playClick();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // 64px header height + 16px buffer
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 border-b
        transition-all duration-300
        ${scrolled ? 'bg-black/15 backdrop-blur-md border-white/5 shadow-sm' : 'bg-transparent border-transparent'}
      `}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with hover animation */}
          <button
            onClick={() => { playClick(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            onMouseEnter={playHover}
            className="font-bold text-xl text-primary hover:scale-110 transition-transform duration-300 cursor-pointer"
          >
            K. Manish
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  onMouseEnter={playHover}
                  className={`
                    relative text-sm font-medium transition-all duration-300
                    ${isActive ? 'text-cyan-400 scale-105 font-bold' : 'text-white/70 hover:text-white'}
                  `}
                >
                  {item.label}
                  {/* Active section underline */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 gradient-hero animate-scale-in" />
                  )}
                </button>
              );
            })}
          </nav>
 
          {/* Sound, Theme and Mobile Menu Toggle */}
          <div className="flex items-center space-x-2">
            {/* Audio Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSoundToggle}
              onMouseEnter={playHover}
              title={soundMuted ? "Unmute interface sound effects" : "Mute interface sound effects"}
              className="text-white/60 hover:text-primary transition-colors h-9 w-9 rounded-md"
            >
              {soundMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 animate-pulse text-primary" />}
            </Button>


            
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden interactive-button"
              onClick={() => { playClick(); setIsMenuOpen(!isMenuOpen); }}
              onMouseEnter={playHover}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
 
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/85 backdrop-blur-lg border-t border-white/5">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    onMouseEnter={playHover}
                    className={`
                      block w-full text-left px-3 py-2 rounded-lg transition-all duration-300
                      ${isActive 
                        ? 'text-cyan-400 bg-white/5 font-semibold' 
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
