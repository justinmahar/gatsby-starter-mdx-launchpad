import * as React from 'react';

const keyName = 'NetlifyCMS.isAdmin';

interface EditContentButtonProps {
  collection: string;
  entry: string;
  toggleButtonEnabled?: boolean;
  buttonComponent?: any;
  buttonProps?: any;
  render?: (
    href: string,
    toggleButtonEnabled: boolean,
    isAdmin: boolean,
    setIsAdmin: (state: boolean) => void,
    buttonComponent?: any,
    buttonProps?: any
  ) => JSX.Element;
}

export default function NetlifyCMSEditButton(props: EditContentButtonProps): JSX.Element {
  const [firstRun, setFirstRun] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    if (firstRun) {
      setFirstRun(false);
      if (typeof window !== 'undefined' && !!localStorage) {
        setIsAdmin(localStorage.getItem(keyName) === 'true');
      }
    }
  }, [firstRun]);

  return (
    <>
      {props.render(
        `/admin/#/collections/${props.collection}/entries/${props.entry}`,
        props.toggleButtonEnabled,
        isAdmin,
        setIsAdmin,
        props.buttonComponent,
        props.buttonProps
      )}
    </>
  );
}

const defaultRender = (
  href: string,
  toggleButtonEnabled: boolean,
  isAdmin: boolean,
  setIsAdmin: (state: boolean) => void,
  buttonComponent: any = undefined,
  buttonProps: any = undefined
): JSX.Element => {
  const Button = buttonComponent ? buttonComponent : props => <button>{props.children}</button>;

  const toggleButton = isAdmin ? (
    <Button title="Lock Edit Button" {...buttonProps} onClick={() => setIsAdmin(false)}>
      <span role="img" aria-label="Lock">
        🔒
      </span>
    </Button>
  ) : (
    <Button title="Unlock Edit Button" {...buttonProps} onClick={() => setIsAdmin(true)}>
      <span role="img" aria-label="Unlock">
        Unlock Edit Button 🔓
      </span>
    </Button>
  );
  return (
    <>
      {isAdmin && (
        <a href={href} target="_blank" rel="noopener noreferrer">
          <Button title="Edit Content" {...buttonProps}>
            <span role="img" aria-label="pencil">
              ✏️
            </span>{' '}
            Edit Content
          </Button>
        </a>
      )}
      {toggleButtonEnabled ? toggleButton : <></>}
    </>
  );
};

NetlifyCMSEditButton.defaultProps = {
  render: defaultRender,
};
