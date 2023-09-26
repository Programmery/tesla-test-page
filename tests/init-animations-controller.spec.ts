import fs from 'fs';
import path from 'path';
import {initAnimationsController} from '../src/init-scripts/init-animations-controller';
import {
  ANIMATION_DELAY_1S,
  ANIMATION_DELAY_50MS,
  FADE_IN_CLASS,
  OBSERVED_FADE_IN,
} from '../src/styles/animation/animation-classes';

/* HTML processing */
const html = fs.readFileSync(path.resolve(__dirname, '../src/index.html'), 'utf8');

beforeEach(() => {
  document.documentElement.innerHTML = html.toString();
});
afterEach(jest.resetModules);

/* Mocking module import for variables that AnimationController uses  */
jest.mock('../src/utils/browser-utils', () => {
  const originalModule = jest.requireActual('../src/utils/browser-utils');

  return {
    __esModule: true,
    ...originalModule,
    // If true, AnimationsController will not do anything
    hasReducedMotion: false,
    // AnimationController will check this to apply cursor animations
    isMouseDevice: true,
    // To check if AnimationController will pass this to addEventListener
    passiveIfSupported: {passive: true},
  };
});

/* Initiating spies for tests and mocks */
jest.spyOn(global, 'addEventListener');
jest.spyOn(document, 'addEventListener');
jest.spyOn(global, 'setTimeout');

/* For setTimeout that is used internally by AnimationsController */
jest.useFakeTimers();

/* Mocking IntersectionObserver */
const observeFunction = jest.fn();
global.IntersectionObserver = jest.fn(() => {
  return {observe: observeFunction};
}) as unknown as typeof window.IntersectionObserver;

/* TEST */
describe('AnimationsController works as expected when isMouseDevice: true, hasReducedMotion: false', () => {
  test('AnimationController Attaches events and removes classes from elements', () => {
    /* Initiate */
    initAnimationsController();

    /* AnimationController Initializes IntersectionObserver */
    expect(IntersectionObserver).toBeCalledTimes(1);
    expect(IntersectionObserver).toHaveBeenLastCalledWith(expect.any(Function), {threshold: 0.1});

    /* AnimationController attaches listeners to the document */
    expect(document.addEventListener).toBeCalledTimes(3);
    expect(document.addEventListener).toHaveBeenNthCalledWith(1, 'mouseenter', expect.any(Function), {
      passive: true,
    });
    expect(document.addEventListener).toHaveBeenNthCalledWith(2, 'mouseleave', expect.any(Function), {
      passive: true,
    });
    expect(document.addEventListener).toHaveBeenNthCalledWith(3, 'mousemove', expect.any(Function), {
      passive: true,
    });

    /* AnimationController attaches scroll listeners for Parallax and Cursor animations */
    expect(window.addEventListener).toBeCalledTimes(2);
    expect(window.addEventListener).toHaveBeenNthCalledWith(1, 'scroll', expect.any(Function), {
      passive: true,
    });
    expect(window.addEventListener).toHaveBeenNthCalledWith(2, 'scroll', expect.any(Function), {
      passive: true,
    });

    const observedElements = document.getElementsByClassName(OBSERVED_FADE_IN);
    const observedElementsClasses = [...observedElements].reduce<string[]>((acc, el) => {
      acc.push(...el.classList);
      return acc;
    }, []);

    /**
     * AnimationController removes default css only animation classes
     * (fallback fadeIn classes, when JS is disabled)
     */
    expect(observedElementsClasses).not.toContain(FADE_IN_CLASS);
    expect(observedElementsClasses).not.toContain(ANIMATION_DELAY_50MS);
    expect(observedElementsClasses).not.toContain(ANIMATION_DELAY_1S);

    /* AnimationController starts observing elements after a timer */
    expect(observeFunction).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(observeFunction).toBeCalledTimes(observedElements.length);
  });
});
