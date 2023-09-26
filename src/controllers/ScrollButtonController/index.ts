import {getScrollPositionY, preventDefault} from '../../utils/browser-utils';
import {clamp} from '../../utils/custom';
import {InitParams} from './types';

export class ScrollButtonController {
  /**
   * Design choice
   */
  private extraSpace = 45;
  private button: InitParams['button'];
  private animationDuration = 300;
  private destinationElement: InitParams['destinationElement'];

  constructor({button, destinationElement}: InitParams) {
    this.button = button;
    this.destinationElement = destinationElement;
  }

  public activate() {
    this.button?.addEventListener('click', this.scrollToButtonHref);
  }

  private scrollToButtonHref = (e: Event) => {
    if (!this.destinationElement || !this.button) {
      return;
    }
    preventDefault(e);

    const {animationDuration, destinationElement} = this;
    const toY = destinationElement.offsetTop - this.extraSpace;
    const startY = getScrollPositionY();
    const diffY = toY - startY;

    let startTime = 0;

    // eslint-disable-next-line prefer-arrow-callback
    requestAnimationFrame(function animateLoop(time) {
      startTime = startTime || time;
      const timePassed = time - startTime;
      const timeFraction = timePassed / animationDuration;

      const progress = clamp(timeFraction, 0, 1);

      window.scrollTo(0, startY + diffY * progress);

      if (progress < 1) {
        requestAnimationFrame(animateLoop);
      }
    });
  };
}
