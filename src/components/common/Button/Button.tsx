import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

import styles from './Button.module.css';

type ButtonProps = {
  color?: 'default' | 'primary';
  loading?: boolean;
  loadingText?: string;
  className?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
} & React.ComponentProps<'button'>;

export const Button: React.FC<ButtonProps> = ({
  color = 'default',
  loading = false,
  loadingText,
  className,
  disabled,
  children,
  fullWidth,
  icon,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      className={clsx(
        styles.button,
        styles[color],
        loading && styles.loading,
        fullWidth && styles.fullWidth,
        className,
      )}
      disabled={isDisabled}
      {...props}
    >
      <span className={styles.content}>
        {loading ? <Loader2 className={styles.spinner} /> : icon && <span className={styles.icon}>{icon}</span>}
        <span>{loading && loadingText ? loadingText : children}</span>
      </span>
    </button>
  );
};
