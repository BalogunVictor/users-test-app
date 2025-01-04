import classNames from 'classnames';
import React from 'react';
import { JSX, ReactNode } from 'react';

interface CardProps {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: ReactNode;
}

export function Card({
  as: Component = 'div',
  className,
  children,
}: CardProps) {
  return (
    <Component
      className={classNames(
        `h-full w-full bg-white flex flex-col rounded-xl shadow-xl overflow-hidden`,
        className
      )}
    >
      {children}
    </Component>
  );
}
