'use client';

interface SkillCardProps {
  category: string;
  skills: string[];
  icon: string;
}

export default function SkillCard({ category, skills, icon }: SkillCardProps) {
  return (
    <div className="card-minimal rounded-none p-6 text-left border-l-4 border-accent-purple hover:border-accent-cyan">
      {/* Icon & Category */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-lg font-bold text-slate-100 code-text">{category}</h3>
      </div>

      {/* Skills list */}
      <div className="space-y-2">
        {skills.map((skill) => (
          <p key={skill} className="text-slate-400 text-xs code-text before:content-['▸'] before:text-accent-cyan before:mr-2">
            {skill}
          </p>
        ))}
      </div>
    </div>
  );
}
