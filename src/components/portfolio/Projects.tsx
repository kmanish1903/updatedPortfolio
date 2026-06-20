import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ExternalLink, Github, Sparkles, Code2, Layers } from 'lucide-react';
import genvitexImage from '@/assets/genvitex-project.jpg';
import mernImage from '@/assets/mern-crud-project.jpg';
import TiltCard from '@/components/3d/TiltCard';
import MindCareShowcase from './MindCareShowcase';
// React project images
import appStoreImg from '@/assets/react-projects/app-store.png';
import randomNumberImg from '@/assets/react-projects/random-number.png';
import destinationSearchImg from '@/assets/react-projects/destination-search.png';
import balanceWithdrawImg from '@/assets/react-projects/balance-withdraw.png';
import googleSearchImg from '@/assets/react-projects/google-search.png';
import browserHistoryImg from '@/assets/react-projects/browser-history.png';
import counterImg from '@/assets/react-projects/counter.png';
import todoImg from '@/assets/react-projects/todo.png';
import ratingImg from '@/assets/react-projects/rating.png';
import natureGalleryImg from '@/assets/react-projects/nature-gallery.png';
import coinTossImg from '@/assets/react-projects/coin-toss.png';
import statesCapitalsImg from '@/assets/react-projects/states-capitals.png';

const Projects = () => {
  // React practice projects with screenshots and skill tags
  const reactProjects = [
    {
      title: 'Nature Photography',
      image: natureGalleryImg,
      liveUrl: 'https://kmanishgally.ccbp.tech/',
      skills: ['Gallery', 'Thumbnails', 'State'],
    },
    {
      title: 'Coin Toss Game',
      image: coinTossImg,
      liveUrl: 'https://kmanishcoin.ccbp.tech/',
      skills: ['Random', 'useState', 'Counter'],
    },
    {
      title: 'States & Capitals',
      image: statesCapitalsImg,
      liveUrl: 'https://kmanishcapital.ccbp.tech/',
      skills: ['Select', 'Lookup', 'Data'],
    },
    {
      title: 'App Store',
      image: appStoreImg,
      liveUrl: 'https://appmanish1903.ccbp.tech/',
      skills: ['Tabs', 'Filter', 'Components'],
    },
    {
      title: 'Random Number Generator',
      image: randomNumberImg,
      liveUrl: 'https://cp6rannum.ccbp.tech/',
      skills: ['useState', 'Events'],
    },
    {
      title: 'Destination Search',
      image: destinationSearchImg,
      liveUrl: 'https://reactcdp6.ccbp.tech/',
      skills: ['Props', 'Filter', 'Lists'],
    },
    {
      title: 'Balance Withdraw',
      image: balanceWithdrawImg,
      liveUrl: 'https://reactcp7amount.ccbp.tech/',
      skills: ['useState', 'State Logic'],
    },
    {
      title: 'Google Search Clone',
      image: googleSearchImg,
      liveUrl: 'https://reactcp71903.ccbp.tech/',
      skills: ['Conditional Rendering', 'Lists'],
    },
    {
      title: 'Browser History',
      image: browserHistoryImg,
      liveUrl: 'https://reactcphistory.ccbp.tech/',
      skills: ['Filter', 'Delete', 'Lists'],
    },
    {
      title: 'Counter App',
      image: counterImg,
      liveUrl: 'https://reactcp9counter.ccbp.tech/',
      skills: ['useState', 'State Mgmt'],
    },
    {
      title: 'Todo Application',
      image: todoImg,
      liveUrl: 'https://reactcp9todo.ccbp.tech/',
      skills: ['CRUD', 'useState', 'Lists'],
    },
    {
      title: 'Rating Widget',
      image: ratingImg,
      liveUrl: 'https://reactcp11rating.ccbp.tech/',
      skills: ['Conditional UI', 'Events'],
    },
  ];

  const featuredProjects = [
    {
      title: 'Gen.Vitex',
      description: 'An AI-powered platform that converts YouTube videos into summaries and bullet points, featuring an integrated AI chatbot that answers queries related to the video content.',
      image: genvitexImage,
      technologies: ['React.js', 'Node.js', 'FastAPI', 'LLM Integration'],
      features: [
        'YouTube video content conversion',
        'AI-generated summaries and bullet points',
        'Integrated chatbot for video queries',
        'Real-time processing'
      ],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'MERN CRUD Application',
      description: 'A responsive web application for handling CRUD operations using the complete MERN stack, showcasing full-stack development capabilities with modern design patterns.',
      image: mernImage,
      technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
      features: [
        'Complete CRUD operations',
        'Responsive design',
        'RESTful API architecture',
        'Database management'
      ],
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  const staticProjects = [
    {
      title: 'Static Web Project',
      description: 'A static website project demonstrating clean HTML structure, CSS styling, and fundamental web development concepts.',
      image: null,
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      features: [
        'Clean semantic HTML structure',
        'Custom CSS styling',
        'Cross-browser compatibility',
        'Professional layout design'
      ],
      liveUrl: 'https://0static01.ccbp.tech',
      githubUrl: '#'
    }
  ];

  const responsiveProjects = [
    // Add responsive projects here
  ];

  const dynamicProjects = [
    {
      title: 'My Todo App',
      description: 'A comprehensive todo application for managing tasks and daily activities with add, delete, and completion tracking functionality.',
      image: null,
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      features: [
        'Add and delete tasks',
        'Mark tasks as complete',
        'Local storage persistence',
        'Clean user interface'
      ],
      liveUrl: 'https://kmanishmytodo.ccbp.tech/',
      githubUrl: null
    },
    {
      title: 'Array Splice Playground',
      description: 'An interactive learning tool demonstrating the JavaScript splice method with real-time array manipulation and visual feedback.',
      image: null,
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      features: [
        'Interactive splice operations',
        'Real-time array visualization',
        'Educational interface',
        'Live code examples'
      ],
      liveUrl: 'https://manishjslearnin.ccbp.tech',
      githubUrl: null
    },
    {
      title: 'Array FindIndex Tool',
      description: 'A practical utility for finding index positions in arrays with interactive search functionality and visual element highlighting.',
      image: null,
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      features: [
        'Find index in arrays',
        'Interactive search',
        'Visual highlighting',
        'Real-time results'
      ],
      liveUrl: 'https://1903findindex.ccbp.tech',
      githubUrl: null
    },
    {
      title: 'Random Reply Chatbot',
      description: 'A simple chatbot that provides random responses from a predefined array, showcasing basic AI simulation and user interaction.',
      image: null,
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      features: [
        'Random reply generation',
        'Chat interface',
        'Predefined responses',
        'Interactive conversation'
      ],
      liveUrl: 'https://kmanishchatbot.ccbp.tech',
      githubUrl: null
    },
    {
      title: 'Clear Counter',
      description: 'A counter application with start, increment, and clear functionality. The counter progresses automatically and can be stopped and reset with user controls.',
      image: null,
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      features: [
        'Auto-incrementing counter',
        'Start/stop controls',
        'Clear functionality',
        'Real-time updates'
      ],
      liveUrl: 'https://clearcount1903.ccbp.tech',
      githubUrl: null
    },
    {
      title: 'Peace Timer',
      description: 'A meditation and relaxation timer with preset durations (20s, 30s, 40s, 1min) that counts down to provide moments of peace and mindfulness.',
      image: null,
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      features: [
        'Multiple timer presets',
        'Countdown functionality',
        'Peace and mindfulness focus',
        'Clean timer interface'
      ],
      liveUrl: 'https://peacetimer1903.ccbp.tech',
      githubUrl: null
    },
    {
      title: 'Dark/Light Theme Toggle',
      description: 'A theme switcher application that dynamically changes the background and styling based on user input, demonstrating CSS manipulation and theme management.',
      image: null,
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      features: [
        'Dynamic theme switching',
        'Dark and light modes',
        'Real-time background changes',
        'User input controls'
      ],
      liveUrl: 'https://manishdarklyt.ccbp.tech',
      githubUrl: null
    },
    {
      title: 'Bomb Defuser Game',
      description: 'An interactive game where players must type "defuse" to stop a countdown timer and defuse the bomb, creating an engaging and thrilling user experience.',
      image: null,
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      features: [
        'Countdown timer',
        'Text input validation',
        'Game logic implementation',
        'Success/failure feedback'
      ],
      liveUrl: 'https://k1903bombdefuse.ccbp.tech',
      githubUrl: null
    },
    {
      title: 'Interactive Counter',
      description: 'A dynamic counter application demonstrating JavaScript interactivity with increment, decrement, and reset functionality using pure HTML, CSS, and JavaScript.',
      image: null,
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      features: [
        'Real-time counter updates',
        'Interactive button controls',
        'Clean user interface',
        'State management'
      ],
      liveUrl: 'https://kmanishincredec.ccbp.tech',
      githubUrl: null
    },
    {
      title: 'Traffic Light Controller',
      description: 'An interactive traffic light simulation built with HTML, CSS, and JavaScript. Features dynamic state changes with Stop, Ready, and Go functionality, demonstrating DOM manipulation and event handling.',
      image: null,
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      features: [
        'Interactive traffic light states',
        'Stop, Ready, and Go functionality',
        'Smooth state transitions',
        'Responsive button controls',
        'Visual feedback with color changes'
      ],
      liveUrl: 'https://kmanishtraffic.ccbp.tech',
      githubUrl: null
    }
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  // Render React project card (glassmorphism + gradient border + skill tags + 3D tilt)
  const renderReactProjectCard = (project: any, index: number) => (
    <TiltCard
      key={index}
      className="gradient-border-wrapper animate-scale-in"
      tiltAmount={8}
    >
      <div style={{ animationDelay: `${index * 80}ms` }}>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseMove={handleMouseMove}
          className="group relative block overflow-hidden rounded-xl glass-card shine-effect transition-all duration-500 hover:shadow-glow"
        >
          {/* Dynamic Spotlight mouse-glare refraction (minimal and decent but extraordinary) */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(250px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0, 240, 255, 0.12), transparent 80%)'
            }}
          />

          {/* Image */}
          <div className="relative aspect-video overflow-hidden z-10">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
            
            {/* Hover Overlay with View Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="flex items-center gap-2 text-primary-foreground font-semibold bg-primary px-5 py-2.5 rounded-full text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <ExternalLink className="h-4 w-4" />
                View Live
              </span>
            </div>

            {/* React Badge Top Right */}
            <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1.5 text-xs font-medium text-primary border border-primary/30">
              <Code2 className="h-3 w-3" />
              React
            </div>
          </div>
          
          {/* Content Section */}
          <div className="p-4 space-y-3 relative z-10">
            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-lg">
              {project.title}
            </h3>
            
            {/* Skill Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.skills?.map((skill: string, skillIndex: number) => (
                <Badge 
                  key={skillIndex} 
                  variant="outline" 
                  className="text-[10px] px-2 py-0.5 bg-primary/10 border-primary/30 text-primary"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </a>
      </div>
    </TiltCard>
  );

  const renderProjectCard = (project: any, index: number) => (
    <TiltCard key={index} className="h-full" tiltAmount={6}>
      <Card 
        onMouseMove={handleMouseMove}
        className="group gradient-card border-0 shadow-custom project-card overflow-hidden animate-scale-in h-full relative" 
        style={{ animationDelay: `${index * 200}ms` }}
      >
      {/* Dynamic Spotlight mouse-glare refraction */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(185, 0, 255, 0.08), transparent 80%)'
        }}
      />

      {project.image && (
        <div className="relative overflow-hidden z-10">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-48 object-cover transition-smooth hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      )}
      
      {project.images && (
        <div className="relative overflow-hidden z-10">
          <Carousel className="w-full">
            <CarouselContent>
              {project.images.map((imageSrc: string, imgIndex: number) => (
                <CarouselItem key={imgIndex}>
                  <img 
                    src={imageSrc} 
                    alt={`${project.title} - State ${imgIndex + 1}`}
                    className="w-full h-48 object-cover transition-smooth"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        </div>
      )}
      
      <CardHeader className="relative z-10">
        <CardTitle className="text-xl font-bold text-foreground">
          {project.title}
        </CardTitle>
        <p className="text-muted-foreground leading-relaxed">
          {project.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4 relative z-10">
        {/* Technologies */}
        <div>
          <h4 className="font-semibold text-foreground mb-2">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: string, techIndex: number) => (
              <Badge key={techIndex} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <h4 className="font-semibold text-foreground mb-2">Key Features</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {project.features.map((feature: string, featureIndex: number) => (
              <li key={featureIndex} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button 
            size="sm" 
            className="gradient-hero text-white shadow-glow interactive-button"
            onClick={() => window.open(project.liveUrl, '_blank')}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Live Demo
          </Button>
          {project.githubUrl && project.githubUrl !== '#' && (
            <Button 
              size="sm" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-white interactive-button"
              onClick={() => window.open(project.githubUrl, '_blank')}
            >
              <Github className="mr-2 h-4 w-4" />
              View Code
            </Button>
          )}
        </div>
      </CardContent>
      </Card>
    </TiltCard>
  );

  return (
    <section id="projects" className="py-20 gradient-subtle scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            My Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my technical skills and problem-solving abilities through 
            real-world applications and course projects.
          </p>
        </div>

        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="flex md:grid overflow-x-auto md:overflow-x-visible whitespace-nowrap no-scrollbar justify-start md:justify-center w-full grid-cols-5 mb-8 p-1 bg-muted rounded-lg">
            <TabsTrigger value="featured" className="flex-shrink-0 md:flex-shrink">Featured</TabsTrigger>
            <TabsTrigger value="react" className="flex-shrink-0 md:flex-shrink">React</TabsTrigger>
            <TabsTrigger value="dynamic" className="flex-shrink-0 md:flex-shrink">Dynamic</TabsTrigger>
            <TabsTrigger value="static" className="flex-shrink-0 md:flex-shrink">Static</TabsTrigger>
            <TabsTrigger value="responsive" className="flex-shrink-0 md:flex-shrink">Responsive</TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-12">
            {/* MindCare AI Ultimate 3D Showcase Block */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 reveal pt-4">
              {/* Left Details Block - Downsized to give more area to screenshots */}
              <div className="lg:w-[20%] w-full space-y-6 text-left flex-shrink-0">
                {/* MY WORK Badge strictly matching mockup! */}
                <div className="flex items-center gap-2 animate-fade-in pl-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary shadow-[0_0_8px_rgba(0,240,255,0.8)]"></span>
                  </span>
                  <span className="text-[10px] font-bold font-mono tracking-[0.35em] text-foreground/80 uppercase">
                    MY WORK
                  </span>
                </div>

                {/* Typography Heading strictly matching mockup style! */}
                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight uppercase select-none">
                    MindCare <span className="bg-gradient-to-r from-cyan-400 via-primary-hover to-purple-500 bg-clip-text text-transparent filter drop-shadow-[0_0_12px_rgba(59,130,246,0.3)]">Ai</span>
                  </h3>
                  <p className="text-[9px] sm:text-[10px] font-bold font-mono tracking-[0.2em] text-primary/90 uppercase pl-0.5 animate-pulse">
                    AI MENTAL WELLNESS
                  </p>
                </div>

                {/* Short Paragraph Description */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-0.5">
                  Your AI-powered companion for mental wellness, mood tracking, goals, insights, and support.
                </p>

                {/* Primary Action Buttons strictly matching mockup styles! */}
                <div className="flex flex-col gap-3.5 pt-2 max-w-[260px]">
                  <Button 
                    size="lg" 
                    className="gradient-hero text-white shadow-glow interactive-button w-full h-11 px-8 text-xs font-bold font-mono border border-primary/20 rounded-full"
                    onClick={() => window.open('https://calm-mind-builder.vercel.app/', '_blank')}
                  >
                    <ExternalLink className="mr-2.5 h-4 w-4" />
                    LIVE DEMO
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white/10 hover:border-primary text-foreground hover:text-white bg-transparent interactive-button w-full h-11 px-8 text-xs font-bold font-mono rounded-full"
                    onClick={() => window.open('https://github.com/kmanish1903', '_blank')}
                  >
                    <Github className="mr-2.5 h-4 w-4" />
                    GITHUB
                  </Button>
                </div>
              </div>

              {/* Right 3D Interactive Wall Column - Expanded to 80% screen space! */}
              <div className="lg:w-[80%] w-full flex-grow max-w-5xl lg:max-w-none">
                <MindCareShowcase />
              </div>
            </div>

            {/* Subtle Divider for other featured works */}
            <div className="relative py-8 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/40"></div>
              </div>
              <div className="relative px-4 bg-background text-xs uppercase tracking-widest text-muted-foreground/60 font-mono">
                Other Featured Accomplishments
              </div>
            </div>

            {/* Grid of secondary featured items */}
            <div className="grid md:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => renderProjectCard(project, index))}
            </div>
          </TabsContent>

          <TabsContent value="react">
            {/* Stats Header */}
            <div className="mb-8 glass-card rounded-2xl p-6 border border-primary/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Left: Title & Description */}
                <div className="text-center md:text-left">
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">React.js Projects</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Interactive applications demonstrating component architecture & state management
                  </p>
                </div>
                
                {/* Right: Stats */}
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary stats-glow">{reactProjects.length}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Projects</div>
                  </div>
                  <div className="w-px h-10 bg-border"></div>
                  <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                    <Code2 className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">React.js</span>
                  </div>
                  <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full">
                    <Layers className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium text-accent-foreground">Components</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {reactProjects.map((project, index) => renderReactProjectCard(project, index))}
            </div>
          </TabsContent>

          <TabsContent value="static">
            <div className="grid md:grid-cols-2 gap-8">
              {staticProjects.map((project, index) => renderProjectCard(project, index))}
            </div>
          </TabsContent>

          <TabsContent value="responsive">
            <div className="grid md:grid-cols-2 gap-8">
              {responsiveProjects.length > 0 ? (
                responsiveProjects.map((project, index) => renderProjectCard(project, index))
              ) : (
                <div className="col-span-2 text-center py-12">
                  <p className="text-muted-foreground">Responsive projects coming soon...</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="dynamic">
            <div className="grid md:grid-cols-2 gap-8">
              {dynamicProjects.map((project, index) => renderProjectCard(project, index))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Projects;