import Image from "next/image";

interface LogoIconProps {
  size?: number;
  className?: string;
}

export default function LogoIcon({ size = 36, className = "" }: LogoIconProps) {
  return (
    <span
      role="img"
      aria-label="Sk Mahir Ashef — monogram"
      className={`relative block overflow-hidden rounded-xl bg-black ${className}`}
      style={{
        width: size,
        height: size,
        border: "1px solid rgba(255, 255, 255, 0.15)",
        flexShrink: 0,
      }}
    >
      <Image
        src="/logoicon.png"
        alt=""
        fill
        unoptimized
        className="invert"
        style={{
          objectFit: "cover",
          objectPosition: "50% 30%",
          transform: "scale(1.55)",
          transformOrigin: "50% 30%",
        }}
      />
    </span>
  );
}
