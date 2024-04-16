import { useMemo, useRef } from "react";

interface NumberCycleProps {
  value: number;
  className?: string;
}

export default function NumberCycle({ value, className }: NumberCycleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const containerHeight = useMemo(() => {
    if (containerRef.current) return containerRef.current.scrollHeight;
    return 0;
  }, [containerRef.current]);

  return (
    <div
      className="text-center overflow-hidden"
      style={{
        height: containerHeight / 10,
      }}
      ref={containerRef}
    >
      <div
        className="relative transition-all origin-center"
        style={{ bottom: (value * containerHeight) / 10 }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
          <div
            className={className}
            style={{
              lineHeight: containerHeight ? `${containerHeight / 10}px` : 1,
            }}
            key={i}
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  );
}
