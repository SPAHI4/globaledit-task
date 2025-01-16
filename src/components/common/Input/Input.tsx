import clsx from 'clsx';
import React from 'react';

import styles from './Input.module.css';

type InputProps = {
  startSlot?: React.ReactNode;
  endSlot?: React.ReactNode;
  error?: boolean;
  fullWidth?: boolean;
  className?: string;
} & React.ComponentProps<'input'>;

export const Input: React.FC<InputProps> = ({
  startSlot,
  endSlot,
  error,
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  return (
    <div
      className={clsx(
        styles.container,
        fullWidth && styles.fullWidth,
        error && styles.error,
        disabled && styles.disabled,
        className,
      )}
    >
      {startSlot && <div className={styles.startSlot}>{startSlot}</div>}

      <input className={styles.input} disabled={disabled} {...props} />

      {endSlot && <div className={styles.endSlot}>{endSlot}</div>}
    </div>
  );
};
