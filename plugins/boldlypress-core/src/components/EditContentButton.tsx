import * as React from 'react';
import { Button } from 'react-bootstrap';

interface EditContentButtonProps {
  collection: string;
  slug: string;
}

export default function EditContentButton(props: EditContentButtonProps): JSX.Element {
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && !!localStorage) {
      setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    }
  }, [isAdmin, setIsAdmin]);

  return (
    <>
      {isAdmin && (
        <a
          href={`/admin/#/collections/${props.collection}/entries/${props.slug}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>
            <span role="img" aria-label="pencil">
              ✏️
            </span>{' '}
            Edit Content
          </Button>
        </a>
      )}
    </>
  );
}

EditContentButton.defaultProps = {
  to: '/admin/#/collections',
};
