import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  accent: string;
  gifSrc: string;
  technologies: string[];
  link: string;
  delay: number;
}

export default function ProjectCard({
  title,
  description,
  accent,
  gifSrc,
  technologies,
  link,
  delay,
}: ProjectCardProps) {
  return (
    <div
      className="card-minimal h-auto md:h-125 w-full max-w-70 md:max-w-80 rounded-none p-4 md:p-6 overflow-hidden
             flex flex-col group cursor-pointer border-l-2
             transform-gpu transition-all duration-300 ease-out
             hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/30"
      style={{
        borderLeftColor: accent,
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards",
      }}
    >
      {/* GIF */}
      <div className="mb-3 md:mb-4 w-full h-44 md:h-60 overflow-hidden border border-slate-700/60 bg-slate-900 mx-auto">
        <Image
          src={gifSrc}
          alt={`${title} preview`}
          width={240}
          height={240}
          className="h-full w-full object-cover"
          unoptimized
        />
      </div>

      {/* Title */}
      <h3 className="text-base md:text-lg font-bold text-slate-100 mb-2 code-text leading-snug">
        {title}
      </h3>

      {/* Description */}
      <p className="text-slate-400 text-[11px] md:text-xs mb-3 md:mb-4 code-text leading-relaxed">
        {description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 bg-slate-800 text-slate-300 border border-slate-600/50 rounded-lg"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* View link */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-accent-purple hover:text-[#00d9ff] active:text-[#00d9ff] transition-colors text-[11px] md:text-xs font-semibold code-text group/link"
      >      
        view_project →
      </a>
    </div>
  );
}
