import FormData from 'form-data';
import * as React from 'react';
import FormSubmit from '../util/form-submit';

/**
 * A contact form field. Can be a text input, email input, or textarea.
 */
export interface ContactFormField {
  nameAttribute: string;
  label?: string;
  initialValue?: any;
  type?: 'text' | 'email' | 'textarea' | 'hidden';
  placeholder?: string;
  required?: boolean;
  requiredErrorText?: string;
  /**
   * Validates the provided value. Returns `true` if valid, or returns a display
   * `string` indicating what the problem is if invalid.
   * Can also return `false` to display a default error message.
   */
  validate?: (value: any) => string | boolean;
}

const defaultContactFormFieldPartial: Partial<ContactFormField> = {
  label: '',
  initialValue: '',
  type: 'text',
  placeholder: '',
  required: false,
  requiredErrorText: 'This field is required.',
};

/** Used to validate emails when no email validation is provided. */
const emailValidate = (email: any) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase()) ? true : 'Please enter a valid email.';
};

export type FormValues = {
  [key: string]: any;
};
export type FormErrors = {
  [key: string]: string;
};

export interface FormModel {
  formFields: ContactFormField[];
  formValues: FormValues;
  formErrors: FormErrors;
  getFieldValue: (nameAttribute: string, defaultIfUndefined?: any) => any;
  setFieldValue: (nameAttribute: string, value: any) => void;
  clear: () => void;
  validate: () => boolean;
  isValid: () => boolean;
  submit: () => Promise<any>;
  sending: boolean;
}

export default function useContactForm(
  actionUrl: string,
  formFields: ContactFormField[],
  fetchRequestInit: RequestInit = {}
): FormModel {
  const formFieldMap: { [key: string]: ContactFormField } = {};
  formFields = formFields.map((formField: ContactFormField) => {
    formFieldMap[formField.nameAttribute] = formField;
    return { ...defaultContactFormFieldPartial, ...formField };
  });
  formFields.forEach((formField: ContactFormField) => {
    formFieldMap[formField.nameAttribute] = formField;
  });

  const [formValues, setFormValues] = React.useState<FormValues>({});
  const [formErrors, setFormErrors] = React.useState<FormErrors>({});
  const [sending, setSending] = React.useState<boolean>(false);

  const getFieldValue = (nameAttribute: string, defaultIfUndefined: any = undefined): any => {
    let value = formValues[nameAttribute];
    if (typeof value === 'undefined') {
      value = defaultIfUndefined;
    }
    return value;
  };

  const setFieldValue = (nameAttribute: string, value: any): void => {
    setFormValues({ ...formValues, [nameAttribute]: value });
  };

  const validate = (): boolean => {
    let newFormErrors: FormErrors = {};

    Object.keys(formFieldMap).forEach(key => {
      const field: ContactFormField = formFieldMap[key];
      const fieldValue: any = formValues[key];
      if (!!field.required && !fieldValue && fieldValue !== 0) {
        newFormErrors = {
          ...newFormErrors,
          [key]: field.requiredErrorText ? field.requiredErrorText : 'This field is required.',
        };
      } else if (field.validate) {
        const validation: boolean | string = field.validate(formValues[key]);
        if (typeof validation === 'string' || validation === false) {
          const message: string = typeof validation === 'string' ? validation : 'Invalid entry. Please try again.';
          newFormErrors = {
            ...newFormErrors,
            [key]: message,
          };
        }
      } else if (field.type === 'email') {
        const validation: boolean | string = emailValidate(formValues[key]);
        if (typeof validation === 'string') {
          newFormErrors = {
            ...newFormErrors,
            [key]: validation,
          };
        }
      }
    });
    setFormErrors(newFormErrors);
    const errorEncountered: boolean = Object.keys(newFormErrors).length > 0;
    return !errorEncountered;
  };

  const clear = () => {
    setFormValues({});
    setFormErrors({});
  };

  const isValid = (): boolean => {
    return Object.keys(formErrors).length <= 0;
  };
  const submit = (): Promise<any> => {
    const formData: FormData = new FormData();
    Object.keys(formValues).forEach((key: string) => {
      const value = formValues[key];
      formData.append(key, value ? value : '');
    });

    setSending(true);
    return FormSubmit.submitFormData(actionUrl, formData, fetchRequestInit)
      .then(() => setSending(false))
      .catch(() => setSending(false));
  };

  return {
    formFields: formFields,
    formValues: formValues,
    formErrors: formErrors,
    getFieldValue: getFieldValue,
    setFieldValue: setFieldValue,
    validate: validate,
    isValid: isValid,
    clear: clear,
    submit: submit,
    sending: sending,
  };
}

export const GFORMS_FETCH_INIT: RequestInit = {
  mode: 'no-cors',
};
