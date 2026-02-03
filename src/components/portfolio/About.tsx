import { Card, CardContent } from '@/components/ui/card';
import { MapPin, GraduationCap, Target, Heart, Code2, Sparkles } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: MapPin,
      title: 'Based in Hyderabad',
      description: 'Telangana, India'
    },
    {
      icon: GraduationCap,
      title: 'Academic Foundation',
      description: 'Strong grasp of DSA, DBMS, and OOP'
    },
    {
      icon: Target,
      title: 'Career Focus',
      description: 'Full-Stack Developer (MERN)'
    },
    {
      icon: Heart,
      title: 'Core Values',
      description: 'Consistency, Confidence, and Clarity'
    }
  ];

  return (
    <section id="about" className="relative py-20 overflow-hidden bg-background">
      {/* Animated Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-pulse"></div>
      </div>

      {/* Floating Code Brackets */}
      <div className="absolute top-10 right-20 text-primary/20 text-8xl font-bold animate-float hidden lg:block">{'{'}</div>
      <div className="absolute bottom-10 left-20 text-primary/20 text-8xl font-bold animate-float" style={{ animationDelay: '1s' }}>{'}'}</div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Shimmer */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-4">
            <Code2 className="w-8 h-8 text-primary animate-pulse-glow" />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-text-shimmer">
              About Me
            </h2>
            <Sparkles className="w-8 h-8 text-accent animate-pulse-glow" />
          </div>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            A disciplined and proactive learner with a passion for real-world problem-solving
          </p>
        </div>

        {/* Creative About Story Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-5xl mx-auto">
          {/* Card 1 - Academic Journey */}
          <Card className="group gradient-card border-border/50 shadow-lg hover:shadow-glow transition-all duration-500 animate-slide-in-left backdrop-blur-sm bg-card/80">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <GraduationCap className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    Academic Excellence
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    B.Tech Computer Science and Engineering (AI & ML), Class of 2026, with a strong 
                    academic foundation in Data Structures, Algorithms, DBMS, and Object-Oriented 
                    Programming. Actively building full-stack applications using the MERN stack.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2 - Professional Vision */}
          <Card className="group gradient-card border-border/50 shadow-lg hover:shadow-glow transition-all duration-500 animate-slide-in-right backdrop-blur-sm bg-card/80" style={{ animationDelay: '200ms' }}>
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <Target className="w-8 h-8 text-accent group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                    Professional Vision
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    B.Tech Computer Science (AI & ML) graduate (2026) with a strong academic foundation 
                    in Data Structures, Algorithms, DBMS, and Object-Oriented Programming. Currently 
                    mastering the MERN stack and gaining exposure to DevOps fundamentals.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Console Log Style Quote */}
        <div className="max-w-3xl mx-auto mb-16 animate-scale-in" style={{ animationDelay: '400ms' }}>
          <div className="relative p-6 sm:p-8 rounded-xl border border-primary/30 bg-card/50 backdrop-blur-sm shadow-glow">
            <div className="absolute -top-3 left-6 px-3 py-1 bg-primary/20 border border-primary/30 rounded-md text-xs font-mono text-primary">
              console.log()
            </div>
            <p className="font-mono text-sm sm:text-base text-muted-foreground mt-2">
              <span className="text-accent">"</span>
              <span className="text-foreground">
                A clear ambition to become a Full-Stack Developer and DevOps Engineer, with a balanced 
                approach to personal and professional growth.
              </span>
              <span className="text-accent">"</span>
            </p>
          </div>
        </div>

        {/* Animated Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {highlights.map((item, index) => (
            <Card 
              key={index} 
              className="group gradient-card border-border/50 shadow-md hover:shadow-glow transition-all duration-500 animate-bounce-in backdrop-blur-sm bg-card/80 hover:scale-105"
              style={{ animationDelay: `${600 + index * 150}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-colors"></div>
                    <div className="relative p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform animate-pulse-glow" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;