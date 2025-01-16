import { z } from 'zod';

import EnvelopeIcon from '../../assets/icons/envelope.svg';
import LockIcon from '../../assets/icons/lock.svg';
import { useForm } from '../../hooks/useForm.tsx';
import { Input } from '../common/Input/Input.tsx';
import { Button } from '../common/Button/Button.tsx';
import { Card } from '../common/Card/Card.tsx';
import { Divider } from '../common/Divider/Divider.tsx';
import { Link } from '../common/Link/Link.tsx';
import { SignUpGoogleButton } from '../common/SignUpGoogleButton/SignUpGoogleButton.tsx';
import { PasswordInput } from '../common/PasswordInput/PasswordInput.tsx';
import { signInRequest } from '../../store/auth/actions.ts';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { selectAuthState } from '../../store/auth/selectors.ts';
import { Checkbox } from '../common/Checkbox/Checkbox.tsx';

import styles from './SignInForm.module.css';
import logo from './logo.svg?url';

const formSchema = z.object({
  email: z.string().email().nonempty(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Za-z]/, 'Password must contain at least one letter')
    .regex(/[0-9]/, 'Password must contain at least one digit'),
  termsAccepted: z.boolean().refine((val) => val === true, 'You must accept the terms of use'),
});

type FormState = z.infer<typeof formSchema>;

export function SignInForm() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(selectAuthState);

  // TODO: trigger the validation once browser autofills the form
  const form = useForm<FormState>({
    defaultValues: {
      email: '',
      password: '',
      termsAccepted: false,
    },
    schema: formSchema,
    onSubmit: (values) => {
      console.log('Submitting', values);
      dispatch(signInRequest(values));
    },
  });

  /*
  5. UI Behavior:
• Input fields and the checkbox must not display errors during input.
• No error messages should appear on the screen.
   */
  const showErrors = false; // disabled to follow the description above

  return (
    <Card className={styles.container}>
      <img src={logo} className={styles.logo} alt="logo" />
      <SignUpGoogleButton fullWidth />
      <Divider>or</Divider>
      <form className={styles.form} onSubmit={form.handleSubmit}>
        <div className={styles.field}>
          <Input
            placeholder="Email"
            name="email"
            type="email"
            startSlot={<EnvelopeIcon />}
            value={form.values.email}
            onChange={(e) => form.setValue('email', e.target.value)}
            onBlur={() => form.setTouched('email')}
            error={form.touched.email && Boolean(form.errors.email)}
          />
          {showErrors &&
            form.touched.email &&
            form.errors.email?.map((error) => (
              <div key={error} className={styles.fieldError}>
                {error}
              </div>
            ))}
        </div>
        <div className={styles.field}>
          <PasswordInput
            name="password"
            placeholder="Password"
            startSlot={<LockIcon />}
            value={form.values.password}
            onChange={(e) => form.setValue('password', e.target.value)}
            onBlur={() => form.setTouched('password')}
            error={form.touched.password && Boolean(form.errors.password)}
          />
          {showErrors &&
            form.touched.password &&
            form.errors.password?.map((error) => (
              <div key={error} className={styles.fieldError}>
                {error}
              </div>
            ))}
          <div className={styles.passwordHints}>
            <Link href="/forgot-password" className={styles.forgotPasswordLink}>
              Forgot password?
            </Link>
          </div>
        </div>
        <div className={styles.fieldCheckbox}>
          <Checkbox
            label={
              <>
                I agree to globaledit&#39;s{' '}
                <a href="/terms" className={styles.termsLink}>
                  Terms of Use
                </a>
              </>
            }
            checked={form.values.termsAccepted}
            onChange={(e) => form.setValue('termsAccepted', e.target.checked)}
            error={form.touched.termsAccepted && Boolean(form.errors.termsAccepted)}
            onBlur={() => form.setTouched('termsAccepted')}
          />
          {showErrors && form.touched.termsAccepted && form.errors.termsAccepted && (
            <div className={styles.fieldError}>{form.errors.termsAccepted}</div>
          )}
        </div>

        {error && <div className={styles.fieldError}>{error}</div>}

        <Button type="submit" disabled={!form.canSubmit} color="primary" loading={isLoading} loadingText={'Signing in'}>
          Sign In
        </Button>
      </form>
      <div className={styles.signInOptions}>
        <Link href="/magic-link">Sign in with a Magic Link</Link>
        <Divider narrow />
        <Link href="/use-sso">Use Single Sign-On (SSO)</Link>
      </div>
    </Card>
  );
}
