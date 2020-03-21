import * as React from 'react';

interface UncachedImageProps {
  cacheBuster?: React.ReactText;
}
export default function UncachedImage(
  props: UncachedImageProps & React.ImgHTMLAttributes<HTMLImageElement>
): JSX.Element {
  let src = props.src;
  const cacheBuster = props.cacheBuster ? props.cacheBuster : new Date().getTime();
  if (typeof src === 'string') {
    const paramSymbol = src.indexOf('?') >= 0 ? '&' : '?';
    src = `${src}${paramSymbol}${encodeURIComponent(cacheBuster)}`;
  }

  const imgProps = { ...props, src };
  // Remove our own props
  delete imgProps.cacheBuster;

  return <img {...imgProps} />;
}
