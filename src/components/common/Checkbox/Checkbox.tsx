import React, { useId } from 'react';
import { Check } from 'lucide-react';
import clsx from 'clsx';

import styles from './Checkbox.module.css';

type CheckboxProps = {
  label?: React.ReactNode;
  error?: boolean;
  className?: string;
} & Omit<React.ComponentProps<'input'>, 'type'>;

export const Checkbox: React.FC<CheckboxProps> = ({ label, error = false, className, disabled, ...props }) => {
  const checkboxId = useId();

  return (
    <div className={clsx(styles.container, error && styles.error, disabled && styles.disabled, className)}>
      <div className={styles.inputWrapper}>
        <input type="checkbox" id={checkboxId} className={styles.input} disabled={disabled} {...props} />
        <div className={styles.checkbox}>
          <Check className={styles.checkIcon} size={14} strokeWidth={3} color="currentColor" />
        </div>
      </div>
      {label && (
        <label htmlFor={checkboxId} className={styles.label}>
          {label}
        </label>
      )}
    </div>
  );
};
