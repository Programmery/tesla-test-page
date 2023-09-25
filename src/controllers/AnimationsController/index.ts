import {
  hasReducedMotion,
  isPassiveSupported,
  isMouseDevice,
  getScrollPositionY,
} from '../../utils/browser-utils';
import {InitParams} from './types';

import {
  OBSERVED_FADE_IN,
  FADE_IN_CLASS,
  ANIMATION_DELAY_50MS,
  ANIMATION_DELAY_1S,
  VISIBLE_CLASS,
  CLICKABLE_CLASS,
  ACTIVE_CLASS,
} from '../../styles/animation/animation-classes';

const passiveIfSupported = isPassiveSupported ? {passive: true} : undefined;

export class AnimationsController {
  parallaxMultiplier = 0.2;

  parallaxElement: InitParams['parallaxElement'];

  cursorElement: InitParams['cursorElement'];

  constructor({parallaxElement, cursorElement}: InitParams) {
    this.parallaxElement = parallaxElement;
    this.cursorElement = cursorElement;
  }

  activate() {
    if (hasReducedMotion) {
      return;
    }

    this.activateParallax();
    this.activateCursorAnimation();
    this.activateScrollBasedFadeIn();
  }

  private activateParallax() {
    const parallaxEl = this.parallaxElement;
    if (!parallaxEl) {
      return;
    }
    const onScrollEffect = () => {
      parallaxEl.style.transform = `translate3d(0px, ${
        window.scrollY * this.parallaxMultiplier
      }px, 0px)`;
    };

    window.addEventListener('scroll', onScrollEffect, passiveIfSupported);
  }

  private activateScrollBasedFadeIn = () => {
    if (!('IntersectionObserver' in window)) {
      return;
    }
    const observedElements = document.getElementsByClassName(OBSERVED_FADE_IN);
    const animateOnVisible = (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(FADE_IN_CLASS);
      }
    };

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(animateOnVisible);
      },
      {threshold: 0.1},
    );

    for (const element of observedElements) {
      // remove classes for browsers that do not support IntersectionObserver
      element.classList.remove(FADE_IN_CLASS);
      element.classList.remove(ANIMATION_DELAY_50MS);
      element.classList.remove(ANIMATION_DELAY_1S);
      // start observing

      setTimeout(() => {
        // do not animate if page had initial scroll
        if (getScrollPositionY() > 100) {
          element.classList.remove(OBSERVED_FADE_IN);
          return;
        }
        observer.observe(element);
      }, 100);
    }
  };

  private activateCursorAnimation = () => {
    const cursorEl = this.cursorElement;
    if (!isMouseDevice || !cursorEl) {
      return;
    }

    window.addEventListener(
      'scroll',
      () => cursorEl.classList.remove(VISIBLE_CLASS),
      passiveIfSupported,
    );

    document?.addEventListener('mouseenter', () => {
      cursorEl.classList.add(VISIBLE_CLASS);
    });

    document?.addEventListener('mouseleave', () => {
      cursorEl.classList.remove(VISIBLE_CLASS);
    });

    document?.addEventListener(
      'mousemove',
      e => {
        if (!this.cursorElement) {
          return;
        }
        cursorEl.classList.add(VISIBLE_CLASS);
        const {clientX: x, clientY: y} = e;
        requestAnimationFrame(() => {
          cursorEl.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
        });
      },
      passiveIfSupported,
    );

    const clickableElements = document.getElementsByClassName(CLICKABLE_CLASS);

    for (const element of clickableElements) {
      element.addEventListener('mouseenter', () =>
        cursorEl.classList.add(ACTIVE_CLASS),
      );
      element.addEventListener('mouseleave', () =>
        cursorEl.classList.remove(ACTIVE_CLASS),
      );
    }
  };
}