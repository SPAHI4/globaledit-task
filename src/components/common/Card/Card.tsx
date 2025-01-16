import clsx from 'clsx';
import React from 'react';

import styles from './Card.module.css';

type CardProps<TComponent extends React.ElementType = 'div'> = {
  component?: TComponent;
} & React.ComponentProps<TComponent>;

export const Card: React.FC<CardProps> = ({ component: Component = 'div', className, ...props }) => {
  return <Component className={clsx(styles.container, className)} {...props} />;
};
