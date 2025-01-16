import { useState, useCallback, useMemo } from 'react';
import { z } from 'zod';

type FormErrors<T> = {
  [P in keyof T]?: string[];
};
type TouchedFields<T> = Partial<Record<keyof T, boolean>>;

interface UseFormConfig<T> {
  defaultValues: T;
  schema: z.ZodType<T>;
  onSubmit: (values: T) => void | Promise<void>;
}

interface UseFormReturn<T> {
  values: T;
  errors: FormErrors<T>;
  touched: TouchedFields<T>;
  isValid: boolean;
  isSubmitting: boolean;
  canSubmit: boolean;
  setValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setTouched: (field: keyof T) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useForm<T extends Record<string, any>>({
  defaultValues,
  schema,
  onSubmit,
}: UseFormConfig<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(defaultValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touched, setTouched] = useState<TouchedFields<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate a single field
  const validateField = useCallback(
    async (field: keyof T, value: T[keyof T]) => {
      // Create a partial object with just the field we want to validate
      const partialData = { ...values, [field]: value };
      const result = schema.safeParse(partialData);

      if (result.success) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      } else {
        const { fieldErrors } = result.error.flatten();

        // Cast to the correct index type that matches Zod's internal typing
        const fieldName = field as keyof typeof fieldErrors;
        const errorMessages = fieldErrors[fieldName];

        if (errorMessages?.length) {
          setErrors((prev) => ({ ...prev, [field]: errorMessages }));
        } else {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
          });
        }
      }
    },
    [schema, values],
  );

  // Validate all fields
  const validateForm = useCallback(async () => {
    const result = schema.safeParse(values);

    if (result.success) {
      setErrors({});
      return true;
    } else {
      const { fieldErrors } = result.error.flatten();
      setErrors(fieldErrors as FormErrors<T>);
      return false;
    }
  }, [values, schema]);

  // Set a field value and validate it
  const setValue = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      validateField(field, value);
    },
    [validateField],
  );

  // Mark a field as touched
  const setFieldTouched = useCallback((field: keyof T) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      const isValid = await validateForm();
      if (isValid) {
        try {
          await onSubmit(values);
        } catch (error) {
          console.error('Form submission error:', error);
        }
      }

      setIsSubmitting(false);
    },
    [values, validateForm, onSubmit],
  );

  // Compute form validity
  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  // Determine if form can be submitted
  const canSubmit = useMemo(
    () => isValid && !isSubmitting && Object.keys(touched).length > 0,
    [isValid, isSubmitting, touched],
  );

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setValues(defaultValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [defaultValues]);

  return {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    canSubmit,
    setValue,
    setTouched: setFieldTouched,
    handleSubmit,
    resetForm,
  };
}
