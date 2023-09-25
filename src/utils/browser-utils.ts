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

const hasReducedMotion =
  isMatchMediaSupported &&
  window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

const isMouseDevice =
  isMatchMediaSupported && matchMedia('(pointer:fine)').matches;

/**
 * Early caching of Images
 */
const preloadImage = (src: string): Promise<void> =>
  new Promise((res, rej) => {
    const image = new Image();
    image.onload = () => res();
    image.onerror = () => rej();

    image.src = src;
  });

const getScrollPositionY = () =>
  document.documentElement.scrollTop ||
  document.body.scrollTop ||
  window.pageYOffset ||
  0;

/**
 * Прекращает нативную обработку события
 */
const preventDefault = (e?: Event) => e?.cancelable && e.preventDefault();

export {
  isMouseDevice,
  isPassiveSupported,
  hasReducedMotion,
  preloadImage,
  preventDefault,
  getScrollPositionY,
};
