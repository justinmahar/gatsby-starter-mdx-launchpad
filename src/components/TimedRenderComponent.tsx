import * as React from 'react';

export interface ITimedRenderComponentProps {
  /** Time between renders in milliseconds. */
  interval: number
  /**
   * Renders the JSX element. Time parameter (in milliseconds since the epoch) for the start of each period is provided for convenience.
   * @param time The time for the beginning of each period in milliseconds since the epoch.
   * @returns The JSX element to render.
   */
  render: (time: number) => JSX.Element
}

/**
 * Renders a component at fixed intervals.
 * 
 * @param props Props for the `interval` and `render` function.
 */
export default function TimedRenderComponent(props: ITimedRenderComponentProps) {

  const [time, setTime] = React.useState(new Date().getTime());

  React.useEffect(() => {
    const timeout: NodeJS.Timer = setTimeout(() => {
      setTime(new Date().getTime())
    }, props.interval)
    return () => {
      clearTimeout(timeout)
    }
  }, [time])

  return (
    <>
      {props.render(time)}
    </>
  )
}

TimedRenderComponent.defaultProps = {
  interval: 5000,
  render: (time: number) => { return (<>Time: {time}</>) }
}
