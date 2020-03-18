import * as React from 'react';

export interface TimedRendererProps {
  /** Time between renders in milliseconds. Defaults to 5000 (5 seconds). */
  interval?: number;
  /**
   * Renders the JSX element. Optional. Time parameter (in milliseconds since the epoch) for the start of each period is provided for convenience.
   * Will be rendered as the first child.
   * @param time The time for the beginning of each period in milliseconds since the epoch.
   * @returns The JSX element to render, or undefined.
   */
  render?: (time: number) => JSX.Element;
  /**
   * Children to render. Optional.
   */
  children?: any;
}

/**
 * Renders a component at fixed intervals.
 *
 * @param props Props for the `interval` and `render` function.
 */
export default function TimedRenderer(props: TimedRendererProps): JSX.Element {
  const [time, setTime] = React.useState(new Date().getTime());

  React.useEffect(() => {
    const timeout: NodeJS.Timer | number = setTimeout(() => {
      setTime(new Date().getTime());
    }, props.interval);
    return () => {
      clearTimeout(timeout);
    };
  }, [props.interval, time]);

  return (
    <>
      {props.render ? props.render(time) : undefined}
      {props.children}
    </>
  );
}

TimedRenderer.defaultProps = {
  interval: 5000,
  render: () => {
    return undefined;
  },
};
