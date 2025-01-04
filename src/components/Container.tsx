import classNames from 'classnames';
import React from 'react';
import { JSX, ReactNode } from 'react';

interface ContainerProps {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: ReactNode;
}

export function Container({
  as: Component = 'div',
  className,
  children,
}: ContainerProps) {
  return (
    <Component
      className={classNames('mx-auto max-w-6xl px-4 lg:px-8', className)}
    >
      {children}
    </Component>
  );
}
