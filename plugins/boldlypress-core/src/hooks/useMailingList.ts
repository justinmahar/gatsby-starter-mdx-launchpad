import * as React from 'react';
import FormSubmit from '../util/form-submit';

export interface MailingList {
  mailingListSubmitting: boolean;
  setMailingListSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  mailingListSubmitError: boolean;
  setMailingListSubmitError: React.Dispatch<React.SetStateAction<boolean>>;
  mailingListSubmitSuccess: boolean;
  setMailingListSubmitSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  mailingListEmail: string;
  setMailingListEmail: React.Dispatch<React.SetStateAction<string>>;
  handleMailingListSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function useMailingList(
  formActionUrl: string,
  asyncEnabled = false,
  asyncFetchInitOptions: RequestInit = {}
): MailingList {
  const [mailingListSubmitting, setMailingListSubmitting] = React.useState(false);
  const [mailingListSubmitError, setMailingListSubmitError] = React.useState(false);
  const [mailingListSubmitSuccess, setMailingListSubmitSuccess] = React.useState(false);

  const [mailingListEmail, setMailingListEmail] = React.useState('');

  const handleMailingListSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    if (asyncEnabled) {
      e.preventDefault();
      if (mailingListEmail) {
        setMailingListSubmitting(true);
        FormSubmit.submitForm(formActionUrl, e.currentTarget, asyncFetchInitOptions)
          .then(() => {
            setMailingListSubmitting(false);
            setMailingListSubmitError(false);
            setMailingListSubmitSuccess(true);
            setMailingListEmail('');
          })
          .catch(() => {
            setMailingListSubmitting(false);
            setMailingListSubmitError(true);
            setMailingListSubmitSuccess(false);
          });
      } else {
        setMailingListSubmitError(true);
      }
    }
  };

  const mailingList: MailingList = {
    mailingListSubmitting: mailingListSubmitting,
    setMailingListSubmitting: setMailingListSubmitting,
    mailingListSubmitError: mailingListSubmitError,
    setMailingListSubmitError: setMailingListSubmitError,
    mailingListSubmitSuccess: mailingListSubmitSuccess,
    setMailingListSubmitSuccess: setMailingListSubmitSuccess,
    mailingListEmail: mailingListEmail,
    setMailingListEmail: setMailingListEmail,
    handleMailingListSubmit: handleMailingListSubmit,
  };

  return mailingList;
}
