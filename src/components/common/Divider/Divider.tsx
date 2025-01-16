// Divider.tsx
import clsx from 'clsx';
import React from 'react';

import styles from './Divider.module.css';

type DividerProps<TComponent extends React.ElementType = 'div'> = {
  component?: TComponent;
  narrow?: boolean;
} & React.ComponentProps<TComponent>;

export const Divider: React.FC<DividerProps> = ({
  component: Component = 'div',
  className,
  children,
  narrow,
  ...props
}) => {
  return (
    <Component
      className={clsx(styles.container, narrow && styles.narrow, children && styles.withChildren, className)}
      {...props}
    >
      {children && (
        <>
          <span className={styles.line} />
          <span className={styles.content}>{children}</span>
          <span className={styles.line} />
        </>
      )}
    </Component>
  );
};
