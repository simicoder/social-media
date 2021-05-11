import React from 'react';

export default function useWindowWidth(): number {
  const isSSR = typeof document.documentElement.clientWidth !== 'undefined';
  const [windowWidth, setWindowWidth] = React.useState(1200);

  function changeWindowWidth() {
    setWindowWidth(isSSR ? document.documentElement.clientWidth : 1200);
  }

  React.useEffect(() => {
    changeWindowWidth();
    window.addEventListener('resize', changeWindowWidth);

    return () => {
      window.removeEventListener('resize', changeWindowWidth);
    };
  }, []);

  return windowWidth;
}
