import { useState } from "react";

interface AgentAvatarProps {
  name: string;
  type: "alex" | "mira";
  volume: number;
}

export const AgentAvatar = ({ name, type, volume }: AgentAvatarProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Scale based on volume (1.0 to 2.0)
  const scale = 1 + volume;

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative w-32 h-32 rounded-full bg-agent-bg border-2 border-border flex items-center justify-center overflow-hidden transition-transform duration-200"
        style={{ transform: `scale(${scale})` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {type === "alex" ? (
          <svg
            width="50"
            height={isHovered ? "60" : "57"}
            viewBox={isHovered ? "0 0 50 60" : "0 0 50 57"}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-300"
          >
            {isHovered ? (
              <>
                {/* Winking eyes */}
                <circle cx="15" cy="20" r="3" fill="currentColor" className="text-accent" />
                <line x1="35" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="2" className="text-accent" />
                {/* Smile */}
                <path
                  d="M 15 35 Q 25 45 35 35"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-accent"
                />
              </>
            ) : (
              <>
                {/* Normal eyes */}
                <circle cx="15" cy="20" r="3" fill="currentColor" className="text-accent" />
                <circle cx="35" cy="20" r="3" fill="currentColor" className="text-accent" />
                {/* Smile */}
                <path
                  d="M 15 35 Q 25 45 35 35"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-accent"
                />
              </>
            )}
          </svg>
        ) : (
          <svg
            width="45"
            height={isHovered ? "60" : "56"}
            viewBox={isHovered ? "0 0 45 60" : "0 0 45 56"}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-300"
          >
            {/* Antennas */}
            <line x1="10" y1="5" x2="10" y2="15" stroke="currentColor" strokeWidth="2" className="text-primary" />
            <circle cx="10" cy="5" r="2" fill="currentColor" className="text-primary" />
            <line x1="35" y1="5" x2="35" y2="15" stroke="currentColor" strokeWidth="2" className="text-primary" />
            <circle cx="35" cy="5" r="2" fill="currentColor" className="text-primary" />
            
            {/* Eyes */}
            <circle cx="15" cy="25" r="3" fill="currentColor" className="text-primary" />
            <circle cx="30" cy="25" r="3" fill="currentColor" className="text-primary" />
            
            {isHovered && (
              /* Smile on hover */
              <path
                d="M 12 40 Q 22.5 50 33 40"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-primary"
              />
            )}
          </svg>
        )}
      </div>
      <p className="text-sm font-medium text-foreground">{name}</p>
    </div>
  );
};
