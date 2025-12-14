import type { ReactNode } from "react";

interface CardProps {
  className?: string;
  children: ReactNode;
}

const Card = ({ className = "", children }: CardProps) => {
  return (
    <section className={`card ${className}`}>
      {children}
    </section>
  );
};

export default Card;
