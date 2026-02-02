import { MessageCircle, Download, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { lazy, Suspense } from 'react';

const DeveloperWorkspace = lazy(() => import('@/components/3d/DeveloperWorkspace'));

const Hero = () => {
  const typingText = useTypingEffect(['MERN Stack Developer', 'DevOps Enthusiast', 'Problem Solver', 'Continuous Learner'], 100, 50, 2000);
  
  const handleConnectWithMe = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  
  const handleDownloadResume = () => {
    window.open('/resume.pdf', '_blank');
  };
  
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background pt-20 lg:pt-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 gradient-glow rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Side - Text Content (Always first on mobile and desktop) */}
          <div className="flex-1 text-center lg:text-left animate-fade-in-up text-accent-foreground">
            
            {/* "create • learn • build" Tagline */}
            <div className="mb-6 flex items-center justify-center lg:justify-start gap-3 text-lg sm:text-xl md:text-2xl font-medium">
              <span className="tagline-word animate-fade-in" style={{ animationDelay: '0ms' }}>create</span>
              <span className="text-primary text-2xl animate-pulse">•</span>
              <span className="tagline-word animate-fade-in" style={{ animationDelay: '200ms' }}>learn</span>
              <span className="text-primary text-2xl animate-pulse">•</span>
              <span className="tagline-word animate-fade-in" style={{ animationDelay: '400ms' }}>build</span>
            </div>

            {/* Name - Large and Bold */}
            <h1 className="text-5xl xs:text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight">
              <span className="gradient-text-hero">K. MANISH</span>
            </h1>
            
            {/* Typing effect with role */}
            <div className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl mx-auto lg:mx-0 flex flex-col sm:flex-row items-center justify-center lg:justify-start text-center lg:text-left gap-1 sm:gap-0">
              <span>Final-year B.Tech CSE</span>
              <span className="hidden sm:inline mx-2">|</span>
              <span className="text-primary font-semibold">
                {typingText}
                <span className="animate-pulse">|</span>
              </span>
            </div>

            {/* Connection invitation message */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-md mx-auto lg:mx-0">
              Let's build something <span className="text-primary font-semibold">amazing</span> together.
            </p>

            {/* Available badge */}
            <div className="flex justify-center lg:justify-start mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                <span className="text-sm font-medium text-primary">Open to Work</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8">
              <Button size="lg" onClick={handleConnectWithMe} className="gradient-hero text-white shadow-glow interactive-button">
                <MessageCircle className="mr-2 h-5 w-5" />
                Connect With Me
              </Button>
              <Button size="lg" onClick={handleDownloadResume} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-md hover:shadow-glow">
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-4">
              <a href="https://github.com/kmanish1903" target="_blank" rel="noopener noreferrer" className="group relative p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border hover:border-primary transition-all duration-300 hover:scale-110">
                <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://linkedin.com/in/kmanish1903" target="_blank" rel="noopener noreferrer" className="group relative p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border hover:border-primary transition-all duration-300 hover:scale-110">
                <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Side - 3D Workspace */}
          <div className="flex-1 w-full max-w-xl lg:max-w-none">
            <Suspense fallback={
              <div className="h-[300px] lg:h-[500px] w-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="relative w-16 h-16 mx-auto">
                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                    <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                  <p className="text-muted-foreground text-sm">Loading 3D Workspace...</p>
                </div>
              </div>
            }>
              <DeveloperWorkspace />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
