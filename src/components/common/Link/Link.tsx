import clsx from 'clsx';
import React from 'react';

import styles from './Link.module.css';

type LinkProps<TComponent extends React.ElementType = 'a'> = {
  component?: TComponent;
} & React.ComponentProps<TComponent>;

export const Link: React.FC<LinkProps> = ({ component: Component = 'a', className, ...props }) => {
  return <Component className={clsx(styles.container, className)} {...props} />;
};
