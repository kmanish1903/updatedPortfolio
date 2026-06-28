import { MessageCircle, Download, Github, Linkedin, FolderOpen, Layers, Terminal, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { lazy, Suspense } from 'react';

const DeveloperWorkspace = lazy(() => import('@/components/3d/DeveloperWorkspace'));

const Hero = () => {
  const typingText = useTypingEffect(['Full Stack Developer (MERN)', 'AI Enthusiast', 'Problem Solver', 'Continuous Learner'], 100, 50, 2000);
  
  const handleConnectWithMe = () => {
    const element = document.querySelector('#contact');
    if (element) {
      const offset = 80; // 64px header height + 16px buffer
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  const handleDownloadResume = () => {
    window.open('/resume.pdf', '_blank');
  };
  
  return (
    <section id="about" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent pt-24 lg:pt-28 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Side - Text Content matching reference image layout */}
          <div className="flex-1 text-center lg:text-left text-accent-foreground max-w-3xl">
            
            {/* ABOUT ME small label */}
            <div 
              className="text-[11px] font-bold font-mono text-cyan-400 tracking-[0.3em] uppercase mb-3 select-none filter drop-shadow-[0_0_8px_rgba(34,211,238,0.3)] animate-fade-in-up opacity-0" 
              style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
            >
              ABOUT ME
            </div>

            {/* Custom Heading from reference image */}
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-5 leading-tight uppercase font-mono animate-fade-in-up opacity-0" 
              style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
            >
              Building <span className="bg-gradient-to-r from-cyan-400 via-primary-hover to-purple-500 bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(59,130,246,0.35)] font-bold">ideas.</span><br />
              Solving real <span className="bg-gradient-to-r from-cyan-400 via-primary-hover to-purple-500 bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(59,130,246,0.35)] font-bold">problems.</span>
            </h1>
            
            {/* Description paragraph matching reference image */}
            <p 
              className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed mb-6 max-w-2xl text-center lg:text-left animate-fade-in-up opacity-0 whitespace-pre-line" 
              style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
            >
              B.Tech Graduate in Computer Science turning bold ideas into scalable digital products through thoughtful engineering.{"\n"}
              Driven by innovation, execution, and a commitment to continuous growth.
            </p>

            {/* Typing roles badge */}
            <div 
              className="text-xs sm:text-sm text-cyan-400 font-semibold mb-6 font-mono flex items-center justify-center lg:justify-start gap-1.5 animate-fade-in-up opacity-0" 
              style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
            >
              <span>FOCUS: {typingText}</span>
              <span className="animate-pulse">|</span>
            </div>
            
            {/* Action Buttons */}
            <div 
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8 animate-fade-in-up opacity-0" 
              style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
            >
              <Button size="lg" onClick={handleConnectWithMe} className="gradient-hero text-white shadow-glow interactive-button rounded-full px-8 h-12 text-xs font-bold font-mono tracking-wider border border-primary/20">
                <MessageCircle className="mr-2 h-5 w-5" />
                Connect With Me
              </Button>
              <Button size="lg" onClick={handleDownloadResume} variant="outline" className="border-white/10 hover:border-cyan-500/40 text-white hover:text-cyan-400 bg-transparent rounded-full px-8 h-12 text-xs font-bold font-mono tracking-wider">
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
            </div>

            {/* Horizontal Stats Row integrated directly at bottom-left */}
            <div 
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 w-full max-w-2xl animate-fade-in-up opacity-0" 
              style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
            >
              {/* Stat 1 */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                  <FolderOpen className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold text-white leading-none">10+</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Projects Completed</div>
                </div>
              </div>
              {/* Stat 2 */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                  <Layers className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold text-white leading-none">5+</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Technologies</div>
                </div>
              </div>
              {/* Stat 3 */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                  <Terminal className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold text-white leading-none">2000+</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Lines of Code</div>
                </div>
              </div>
              {/* Stat 4 */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                  <Star className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold text-white leading-none">100%</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Dedication</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - 3D Workspace */}
          <div 
            className="flex-1 w-full max-w-xl lg:max-w-none animate-scale-in opacity-0" 
            style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}
          >
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
