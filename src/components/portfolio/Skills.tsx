import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import TiltCard from '@/components/3d/TiltCard';

type SkillCategory = 'all' | 'frontend' | 'backend' | 'databases' | 'devops' | 'tools' | 'languages';

interface Skill {
  name: string;
  icon: string;
  categories: SkillCategory[];
}

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');

  const categories = [
    { id: 'all' as SkillCategory, label: 'All Skills' },
    { id: 'frontend' as SkillCategory, label: 'Frontend' },
    { id: 'backend' as SkillCategory, label: 'Backend' },
    { id: 'databases' as SkillCategory, label: 'Databases' },
    { id: 'devops' as SkillCategory, label: 'DevOps' },
    { id: 'tools' as SkillCategory, label: 'Tools' },
    { id: 'languages' as SkillCategory, label: 'Languages' },
  ];

  const allSkills: Skill[] = [
    { name: 'React.js', icon: '⚛️', categories: ['frontend'] },
    { name: 'JavaScript', icon: 'JS', categories: ['frontend', 'backend', 'languages'] },
    { name: 'Node.js', icon: '🟢', categories: ['backend'] },
    { name: 'HTML', icon: '📄', categories: ['frontend'] },
    { name: 'CSS', icon: '🎨', categories: ['frontend'] },
    { name: 'Bootstrap', icon: '🅱️', categories: ['frontend'] },
    { name: 'Python', icon: '🐍', categories: ['languages', 'backend'] },
    { name: 'C', icon: 'Ⓒ', categories: ['languages'] },
    { name: 'MongoDB', icon: '🍃', categories: ['databases'] },
    { name: 'MySQL', icon: '🐬', categories: ['databases'] },
    { name: 'Git', icon: '🔀', categories: ['tools'] },
    { name: 'GitHub', icon: '🐙', categories: ['tools'] },
    { name: 'Vercel', icon: '▲', categories: ['devops'] },
    { name: 'Express.js', icon: '📡', categories: ['backend'] },
    { name: 'Command Line', icon: '💻', categories: ['tools'] },
    { name: 'SQLite', icon: '📊', categories: ['databases'] },
    { name: 'REST APIs', icon: '🔌', categories: ['backend'] },
  ];

  const isSkillHighlighted = (skill: Skill) => {
    if (activeCategory === 'all') return true;
    return skill.categories.includes(activeCategory);
  };

  return (
    <section id="skills" className="py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Skills
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex flex-wrap gap-2 p-1.5 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-300
                  ${
                    activeCategory === category.id
                      ? 'gradient-hero text-white shadow-glow'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }
                `}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid with 3D Card */}
        <div className="max-w-4xl mx-auto">
          <TiltCard tiltAmount={5} glareEnabled={true}>
            <Card className="gradient-card border-0 shadow-custom">
              <CardContent className="p-4">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                  {allSkills.map((skill, index) => {
                    const isHighlighted = isSkillHighlighted(skill);
                    
                    return (
                      <div
                        key={index}
                        className={`
                          group relative flex flex-col items-center gap-1.5 p-2 rounded-lg
                          transition-all duration-300
                          ${
                            isHighlighted
                              ? 'scale-105 opacity-100'
                              : 'scale-95 opacity-40'
                          }
                        `}
                        style={{
                          transitionDelay: `${index * 20}ms`,
                        }}
                      >
                        {/* Icon with 3D hover effect */}
                        <div
                          className={`
                            text-2xl transition-all duration-300
                            ${isHighlighted ? 'group-hover:scale-125 group-hover:-translate-y-1' : ''}
                          `}
                        >
                          {skill.icon}
                        </div>
                        
                        {/* Skill Name */}
                        <span
                          className={`
                            text-xs font-medium text-center transition-colors duration-300
                            ${
                              isHighlighted
                                ? 'text-foreground'
                                : 'text-muted-foreground'
                            }
                          `}
                        >
                          {skill.name}
                        </span>
                        
                        {/* Highlight Underline */}
                        {isHighlighted && (
                          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 gradient-hero rounded-full" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

export default Skills;
