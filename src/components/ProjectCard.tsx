import type { ReactNode } from "react";

export const ProjectCard = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={`${className} rounded-lg p-5 bg-surface hover:bg-elevated hover:scale-105 transition-all duration-550 ease-in-out`}
    >
      {children}
    </div>
  );
};
