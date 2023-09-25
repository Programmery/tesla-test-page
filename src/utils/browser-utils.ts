// eslint-disable-next-line import/no-mutable-exports
let isPassiveSupported = false;
if (typeof window !== 'undefined') {
  try {
    const options = Object.defineProperty({}, 'passive', {
      get() {
        isPassiveSupported = true;
        return true;
      },
    });

    // @ts-ignore: testing passive with a fake event
    window.addEventListener('test', null, options);
  } catch (e) {
    console.error(e);
  }
}

const isMatchMediaSupported = typeof matchMedia === 'function';

const hasReducedMotion = isMatchMediaSupported && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;

const isMouseDevice = isMatchMediaSupported && matchMedia('(pointer:fine)').matches;

const preloadImage = (src: string): Promise<void> =>
  new Promise((res, rej) => {
    const image = new Image();
    image.onload = () => res();
    image.onerror = () => rej();

    image.src = src;
  });

const getScrollPositionY = () =>
  document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset || 0;

const preventDefault = (e?: Event) => e?.cancelable && e.preventDefault();

const passiveIfSupported = isPassiveSupported ? {passive: true} : undefined;

export {isMouseDevice, passiveIfSupported, hasReducedMotion, preloadImage, preventDefault, getScrollPositionY};
