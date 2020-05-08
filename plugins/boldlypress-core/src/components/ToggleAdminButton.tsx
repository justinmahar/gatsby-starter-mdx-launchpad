import * as React from 'react';
import { Button } from 'react-bootstrap';

interface ToggleAdminButtonProps {}

export default function ToggleAdminButton(props: ToggleAdminButtonProps): JSX.Element {
  const [firstRender, setFirstRender] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const keyName = 'NetlifyCMS.isAdmin';

  React.useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      if (typeof window !== 'undefined' && !!localStorage) {
        setIsAdmin(localStorage.getItem(keyName) === 'true');
      }
    }
  }, [firstRender, isAdmin, setIsAdmin]);

  React.useEffect(() => {
    if (!firstRender) {
      if (typeof window !== 'undefined' && !!localStorage) {
        localStorage.setItem(keyName, `${isAdmin}`);
      }
    }
  }, [firstRender, isAdmin, setIsAdmin]);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    setIsAdmin(!isAdmin);
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return <Button onClick={handleButtonClick}>{isAdmin ? 'Disable' : 'Enable'} Admin Mode</Button>;
}
