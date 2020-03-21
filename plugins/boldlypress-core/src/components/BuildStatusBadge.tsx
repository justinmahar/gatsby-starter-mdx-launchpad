import * as React from 'react';
import TimedImage from './TimedImage';

export interface NetlifyDeployStatusBadgeProps {
  href?: string;
  src?: string;
  alt?: string;
  timed?: boolean;
  interval?: number;
  children?: React.ReactNode;
  useLink?: boolean;
}

export default function BuildStatusBadge(props: NetlifyDeployStatusBadgeProps): JSX.Element {
  let href = props.href;
  let src = props.src;
  let alt = props.alt;

  if (typeof props.children === 'string') {
    // Regex matches on: [![alt](src)](href)
    // It looks more complicated than it really is, because there's so much [] and () escaping needed.
    // Groups are named by putting ?<name> immediately after the opening paren.
    const imageLinkRegex = /\[!\[(?<alt>[^\]]*)\]\((?<src>[^)]+)\)\]\((?<href>[^)]+)\)/;
    const match = props.children.match(imageLinkRegex);
    if (match) {
      const groups = match.groups;
      href = groups.href;
      src = groups.src;
      alt = groups.alt;
    }
  }

  const useLink =
    (typeof props.useLink === 'undefined' || (typeof props.useLink !== 'undefined' && props.useLink)) &&
    typeof href !== 'undefined';
  console.log('useLink:', useLink);

  const imageElement =
    typeof props.timed === 'undefined' || props.timed ? (
      <TimedImage interval={props.interval} src={src} alt={alt} />
    ) : (
      <img src={src} alt={alt} />
    );

  if (useLink) {
    return <a href={href}>{imageElement}</a>;
  } else {
    return imageElement;
  }
}
