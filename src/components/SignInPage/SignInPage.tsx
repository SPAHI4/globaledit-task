import { SignInForm } from '../SignInForm/SignInForm.tsx';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { selectUser } from '../../store/auth/selectors.ts';
import { Card } from '../common/Card/Card.tsx';
import { Button } from '../common/Button/Button.tsx';
import { logoutRequest } from '../../store/auth/actions.ts';

import styles from './SignInPage.module.css';

export const SignInPage = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handeLogout = () => {
    dispatch(logoutRequest());
  };

  return (
    <div className={styles.container}>
      {user ? (
        <Card className={styles.card}>
          <div className={styles.welcome}>Welcome back, {user.email}!</div>
          <Button onClick={handeLogout}>Sign out</Button>
        </Card>
      ) : (
        <SignInForm />
      )}
    </div>
  );
};
