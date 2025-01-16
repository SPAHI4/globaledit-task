import React, { useState } from 'react';
import clsx from 'clsx';

import { Input } from '../Input/Input.tsx';

import styles from './PasswordInput.module.css';

type PasswordInputProps = Omit<React.ComponentProps<typeof Input>, 'type' | 'endSlot'>;

export const PasswordInput: React.FC<PasswordInputProps> = ({ className, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Input
      type={showPassword ? 'text' : 'password'}
      className={clsx(styles.passwordInput, className)}
      endSlot={
        <button type="button" className={styles.toggleButton} onClick={togglePassword}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
      }
      {...props}
    />
  );
};
