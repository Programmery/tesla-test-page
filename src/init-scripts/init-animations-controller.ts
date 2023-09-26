import {AnimationsController} from '../controllers/AnimationsController';

/**
 * Parallax, cursor and scroll based animations
 */
export const initAnimationsController = () => {
  const animationsController = new AnimationsController({
    parallaxElement: document.querySelector('.header__image'),
    cursorElement: document.querySelector('.cursor'),
  });
  animationsController.activate();

  return animationsController;
};
