import clsx from 'clsx';

import GoogleIcon from '../../../assets/icons/google.svg';
import { Button } from '../Button/Button.tsx';

import styles from './Button.module.css';

type ButtonProps = React.ComponentProps<typeof Button>;

export const SignUpGoogleButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button className={clsx(styles.container, props.className)} icon={<GoogleIcon />} color="default" {...props}>
      Sign up with Google
    </Button>
  );
};
