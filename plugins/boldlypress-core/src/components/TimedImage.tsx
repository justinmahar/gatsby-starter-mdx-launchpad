import * as React from 'react';
import { TimedRenderer } from '@devboldly/react-timed-renderer';
import UncachedImage from './UncachedImage';

// Use http://lorempixel.com/ for demo

const DEFAULT_INTERVAL = 5000;

interface TimedImageProps {
  interval?: number;
  uncached?: boolean;
}

export default function TimedImage(props: TimedImageProps & React.ImgHTMLAttributes<HTMLImageElement>): JSX.Element {
  const interval: number | undefined = props.interval ? props.interval : DEFAULT_INTERVAL;
  const uncached: boolean = typeof props.uncached !== 'undefined' ? !!props.uncached : true;

  const imgProps = { ...props };
  // Remove our own props
  delete imgProps.interval;
  delete imgProps.uncached;

  return (
    <TimedRenderer
      interval={interval}
      render={(time: number) => {
        if (uncached) {
          return <UncachedImage {...imgProps} cacheBuster={time} />;
        } else {
          return <img {...imgProps} />;
        }
      }}
    />
  );
}
