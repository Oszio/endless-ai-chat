import { useEffect, useState } from "react";

interface AudioVisualizerProps {
  onVolumeChange: (volume: number) => void;
}

export const AudioVisualizer = ({ onVolumeChange }: AudioVisualizerProps) => {
  const [bars, setBars] = useState<number[]>(Array(40).fill(0));

  useEffect(() => {
    const interval = setInterval(() => {
      const newBars = Array(40)
        .fill(0)
        .map(() => Math.random());
      setBars(newBars);
      
      // Calculate average volume (0 to 1)
      const avgVolume = newBars.reduce((a, b) => a + b, 0) / newBars.length;
      onVolumeChange(avgVolume);
    }, 100);

    return () => clearInterval(interval);
  }, [onVolumeChange]);

  return (
    <div className="flex items-center justify-center gap-1 h-32">
      {bars.map((height, index) => (
        <div
          key={index}
          className="w-1 bg-visualizer-bar rounded-full transition-all duration-100"
          style={{ height: `${height * 100}%` }}
        />
      ))}
    </div>
  );
};
