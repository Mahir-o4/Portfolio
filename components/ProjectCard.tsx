'use client';

interface ProjectCardProps {
  title: string;
  description: string;
  accent: string;
  icon: string;
  technologies: string[];
  delay: number;
}

export default function ProjectCard({
  title,
  description,
  accent,
  icon,
  technologies,
  delay,
}: ProjectCardProps) {
  return (
    <div
      className="card-minimal rounded-none p-6 overflow-hidden group cursor-pointer border-l-4"
      style={{ borderLeftColor: accent, animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {/* Icon */}
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-slate-100 mb-2 code-text">
        {title}
      </h3>

      {/* Description */}
      <p className="text-slate-400 text-xs mb-4 code-text leading-relaxed">
        {description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded-none border border-slate-600/50 code-text"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* View link */}
      <a
        href="#"
        className="inline-flex items-center text-accent-purple hover:text-accent-cyan transition-colors text-xs font-semibold code-text group/link"
      >
        view_project →
      </a>
    </div>
  );
}
