import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import TiltCard from '@/components/3d/TiltCard';
import SkillSphere from '@/components/3d/SkillSphere';
import { playHover } from '@/lib/audio';

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
    <section id="skills" className="py-10 bg-transparent relative overflow-hidden scroll-mt-20">
      {/* Glow background decoration */}
      <div className="absolute right-0 top-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-6 reveal">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Skills
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
            A curated set of technologies I use to design, develop, and deploy modern applications.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-5 flex justify-center">
          <div className="inline-flex flex-wrap gap-2 p-1 rounded-lg bg-black/35 backdrop-blur-md border border-white/10">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                onMouseEnter={playHover}
                className={`
                  px-3.5 py-1 rounded-md text-xs sm:text-sm font-medium transition-all duration-300
                  ${
                    activeCategory === category.id
                      ? 'gradient-hero text-white shadow-glow'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Sphere alongside Grid */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 max-w-6xl mx-auto">
          {/* 3D Spinning Skill Constellation Sphere */}
          <div className="flex-1 w-full flex items-center justify-center reveal-left">
            <SkillSphere />
          </div>
          
          {/* Skills Grid Card with 3D Tilt */}
          <div className="flex-1 w-full max-w-xl lg:max-w-none reveal-right" style={{ transitionDelay: '150ms' }}>
            <TiltCard tiltAmount={4} glareEnabled={true}>
              <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-custom">
                <div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {allSkills.map((skill, index) => {
                      const isHighlighted = isSkillHighlighted(skill);
                      
                      return (
                        <div
                          key={index}
                          onMouseEnter={isHighlighted ? playHover : undefined}
                          className={`
                            group relative flex flex-col items-center gap-1.5 p-2 rounded-xl
                            transition-all duration-300 border border-transparent
                            ${
                              isHighlighted
                                ? 'scale-105 opacity-100 bg-transparent border border-white/5 hover:border-primary/30 hover:bg-primary/5'
                                : 'scale-95 opacity-40 bg-transparent border-transparent'
                            }
                          `}
                          style={{
                            transitionDelay: `${index * 12}ms`,
                          }}
                        >
                          {/* Icon with 3D hover effect - forced to be bright white/cyan rather than theme text */}
                          <div
                            className={`
                              text-xl transition-all duration-300 font-bold
                              ${isHighlighted ? 'text-cyan-400 group-hover:scale-120 group-hover:-translate-y-0.5' : 'text-white/40'}
                            `}
                          >
                            {skill.icon}
                          </div>
                          
                          {/* Skill Name */}
                          <span
                            className={`
                              text-[10px] sm:text-xs font-semibold text-center transition-colors duration-300
                              ${
                                isHighlighted
                                  ? 'text-white'
                                  : 'text-white/40'
                              }
                            `}
                          >
                            {skill.name}
                          </span>
                          
                          {/* Highlight Underline */}
                          {isHighlighted && (
                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 gradient-hero rounded-full" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
