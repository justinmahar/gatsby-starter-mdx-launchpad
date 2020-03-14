import * as React from 'react';
import { Button } from 'react-bootstrap';

interface EditContentButtonProps {
  collection: string;
  slug: string;
}

export default function EditContentButton(props: EditContentButtonProps): JSX.Element {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <>
      {isAdmin && (
        <a
          href={`/admin/#/collections/${props.collection}/entries/${props.slug}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>🖉︎ Edit Content</Button>
        </a>
      )}
    </>
  );
}

EditContentButton.defaultProps = {
  to: '/admin/#/collections',
};
