import {ScrollButtonController} from '../controllers/ScrollButtonController';
import {InitParams} from '../controllers/ScrollButtonController/types';

/**
 * Overrides css scroll for universal smooth scroll support
 */
export const activateJsSmoothScrolling = (params: InitParams) => {
  const scrollButtonController = new ScrollButtonController(params);
  scrollButtonController.activate();
  return scrollButtonController;
};
