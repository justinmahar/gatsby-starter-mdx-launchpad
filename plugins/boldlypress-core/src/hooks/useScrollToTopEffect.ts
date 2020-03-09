import * as React from 'react';

/**
 * This effect will scroll to the top of the page on first render. Optionally provide a
 * scroll time (as millis since epoch, e.g. `new Date().getTime()`) to scroll to the top
 * at any time after first render.
 *
 * @param shouldScroll Whether scrolling should occur. Optional. Default `true`.
 * Set to false if you'd like to disable scrolling to the top for cases like using page
 * anchors (e.g. `/mypage#section-2`).
 * @param scrollTime Provide the latest millis since the epoch (e.g. `new Date().getTime()`)
 * to trigger a scroll to top after a page has already loaded. Defaults to 0 (scrolls only
 * once on first render).
 */
export default function useScrollToTopEffect(shouldScroll = true, scrollTime = 0): void {
  React.useEffect(() => {
    if (shouldScroll && !!window && !!window.scrollTo) {
      window.scrollTo(0, 0);
    }
  }, [shouldScroll, scrollTime]);
}
