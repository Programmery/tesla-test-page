import {ScrollButtonController} from '../controllers/ScrollButtonController';
import {InitParams} from '../controllers/ScrollButtonController/types';

export const activateJsSmoothScrolling = (params: InitParams) => {
  const scrollButtonController = new ScrollButtonController(params);
  scrollButtonController.activate();
};
