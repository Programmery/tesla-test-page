import {AnimationsController} from '../controllers/AnimationsController';

export const initAnimations = () => {
  /**
   * Parallax, cursor and scroll based animations
   */
  const animationsController = new AnimationsController({
    parallaxElement: document.querySelector('.header__image'),
    cursorElement: document.querySelector('.cursor'),
  });
  animationsController.activate();

  return animationsController;
};
