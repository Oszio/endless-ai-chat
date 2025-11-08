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
        className="relative w-20 h-20 rounded-full bg-agent-bg border-2 border-border flex items-center justify-center overflow-hidden transition-transform duration-200"
        style={{ transform: `scale(${scale})` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {type === "alex" ? (
          <svg 
            width="50" 
            height="57" 
            viewBox="0 0 50 57" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-300"
          >
            <path 
              d="M2.08704 35.5021C0.983861 35.4601 0.0546573 36.3198 0.0118408 37.423C-0.0816146 39.8528 0.359815 43.6135 1.97083 47.2374C3.59665 50.8944 6.47635 54.5319 11.299 56.3693C12.3311 56.7622 13.4868 56.2441 13.88 55.212C14.2729 54.18 13.7547 53.0242 12.7228 52.631C9.14597 51.2682 6.94084 48.5719 5.62512 45.6124C4.29506 42.6203 3.93576 39.4805 4.00891 37.5773C4.05112 36.4737 3.19064 35.5445 2.08704 35.5021ZM24.7833 1.09484C24.283 0.110519 23.0794 -0.282934 22.0948 0.216908C21.1104 0.717003 20.7174 1.92076 21.2169 2.90538L35.9894 31.9864L21.1622 34.5284C20.0739 34.7151 19.3422 35.7496 19.5284 36.838C19.7151 37.9266 20.7495 38.6582 21.838 38.4718L39.338 35.4718C39.9642 35.3644 40.5021 34.9653 40.7872 34.3976C41.0721 33.8301 41.0708 33.161 40.7833 32.5948L24.7833 1.09484ZM45.5001 4.50011C43.0151 4.50043 41.0003 8.08224 41.0001 12.5001C41.0001 16.9182 43.015 20.4998 45.5001 20.5001C47.9854 20.5001 50.0001 16.9184 50.0001 12.5001C50 8.08204 47.9853 4.50011 45.5001 4.50011ZM12.5001 4.50011C10.0151 4.50043 8.00026 8.08224 8.00012 12.5001C8.00012 16.9182 10.015 20.4998 12.5001 20.5001C14.9854 20.5001 17.0001 16.9184 17.0001 12.5001C17 8.08204 14.9853 4.50011 12.5001 4.50011Z" 
              fill="currentColor" 
              className="text-accent"
            />
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
