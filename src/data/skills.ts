export interface Skill {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'tools' | 'database';
}

export const skills: Skill[] = [
  // Frontend
  { name: 'React', icon: '⚛️', category: 'frontend' },
  { name: 'TypeScript', icon: '🔷', category: 'frontend' },
  { name: 'Next.js', icon: '▲', category: 'frontend' },
  { name: 'Astro', icon: '🚀', category: 'frontend' },
  { name: 'Tailwind CSS', icon: '🎨', category: 'frontend' },
  { name: 'HTML/CSS', icon: '🌐', category: 'frontend' },

  // Backend
  { name: 'Node.js', icon: '🟢', category: 'backend' },
  { name: 'Express', icon: '⚡', category: 'backend' },
  { name: 'REST APIs', icon: '🔗', category: 'backend' },
  { name: 'GraphQL', icon: '◈', category: 'backend' },

  // Database
  { name: 'PostgreSQL', icon: '🐘', category: 'database' },
  { name: 'MongoDB', icon: '🍃', category: 'database' },
  { name: 'Prisma', icon: '△', category: 'database' },

  // Tools
  { name: 'Git', icon: '🔀', category: 'tools' },
  { name: 'Docker', icon: '🐳', category: 'tools' },
  { name: 'Figma', icon: '🎯', category: 'tools' },
  { name: 'VS Code', icon: '💻', category: 'tools' },
];
