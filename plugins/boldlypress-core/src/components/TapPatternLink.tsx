import * as React from 'react';
import { navigate } from 'gatsby';
const site = 'devboldly';

export interface TapPatternLinkProps {
  children?: any;
  to: string;
  pattern: string;
  external?: boolean;
  useNewWindow?: boolean;
  timeout?: number;
  printPatternOnTimeout?: boolean;
  patternToEncrypt?: string;
  linkToEncrypt?: string;
}

export default function TapPatternLink(props: TapPatternLinkProps): JSX.Element {
  const [tapTimes, setTapTimes] = React.useState([]);

  const marginOfError = 0.2;

  const reset = (): void => {
    setTapTimes([]);
  };

  const patternScores: number[] = keyRotate(props.pattern, site, true)
    .split(',')
    .map((value: string) => parseFloat(value.trim()));

  React.useEffect(() => {
    const theirScores: number[] = [];
    if (tapTimes.length >= 2) {
      const norm = tapTimes[1] - tapTimes[0];
      for (let i = 1; i < tapTimes.length; i++) {
        const prev: number = tapTimes[i - 1];
        const curr: number = tapTimes[i];
        const delay: number = curr - prev;
        const ratio: number = delay / norm;
        const ratioFixed: number = Math.round(ratio * 100) / 100;
        theirScores.push(ratioFixed);
      }
    }

    if (tapTimes.length - 1 === patternScores.length) {
      const destination: string = keyRotate(props.to, site, true);
      let succeeded = true;
      for (let i = 0; i < patternScores.length; i++) {
        const correctScore = patternScores[i];
        const theirScore = theirScores[i];
        succeeded =
          succeeded && theirScore >= correctScore - marginOfError && theirScore <= correctScore + marginOfError;
        if (!succeeded) {
          break;
        }
      }
      if (succeeded) {
        reset();
        navTo(destination, props.external, props.useNewWindow);
      }
    }
    let timeout: NodeJS.Timeout | undefined = undefined;
    if (tapTimes.length > 0) {
      timeout = setTimeout(() => {
        if (props.printPatternOnTimeout) {
          console.log(theirScores);
        }
        reset();
      }, props.timeout);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [
    patternScores,
    patternScores.length,
    props.external,
    props.printPatternOnTimeout,
    props.timeout,
    props.to,
    props.useNewWindow,
    tapTimes,
    tapTimes.length,
  ]);

  const handleClick = (_event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    const newTapTimes = [...tapTimes, new Date().getTime()];
    setTapTimes(newTapTimes);
  };

  if (props.linkToEncrypt) {
    console.log(keyRotate(props.linkToEncrypt, site));
  }
  if (props.patternToEncrypt) {
    console.log(keyRotate(props.patternToEncrypt, site));
  }

  return <span onClick={handleClick}>{props.children}</span>;
}

const navTo = (destination: string, external: boolean, useNewWindow: boolean): void => {
  if (!external) {
    navigate(destination);
  } else {
    if (!useNewWindow) {
      window.location.href = destination;
    } else {
      window.open(destination);
    }
  }
};

TapPatternLink.defaultProps = {
  external: false,
  useNewWindow: false,
  timeout: 1000,
};

const keyRotate = (text, key, reverse = false): string => {
  const bound = 0x10000;
  return String.fromCharCode.apply(
    null,
    text.split('').map(function(v, i) {
      let rotation = key[i % key.length].charCodeAt();
      if (reverse) rotation = -rotation;
      return (v.charCodeAt() + rotation + bound) % bound;
    })
  );
};
