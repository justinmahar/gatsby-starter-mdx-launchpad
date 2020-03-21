import Disqus from 'disqus-react';
import * as React from 'react';

export interface DiscussionComponentProps {
  title: string;
  identifier: string;
  shortname: string;
}

export default function DiscussionComponent(props: DiscussionComponentProps): JSX.Element {
  const disqusConfig = {
    shortname: props.shortname,
    config: {
      title: props.title,
      identifier: props.identifier,
      url: undefined,
    },
  };

  return (
    <>
      {props.shortname && (
        <>
          <Disqus.DiscussionEmbed {...disqusConfig} />
        </>
      )}
      {!props.shortname && (
        <div style={{ textAlign: 'center' }}>
          <p className="text-danger">Disqus shortname was not found. Please add one to your site's configuration.</p>
        </div>
      )}
    </>
  );
}
