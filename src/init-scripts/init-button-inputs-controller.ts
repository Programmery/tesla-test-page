import {InputButtonsController} from '../controllers/InputButtonsController';
import {toArray} from '../utils/polifills';

export const initButtonInputsController = () => {
  const inputsWithButtons = document.querySelectorAll<HTMLInputElement>('input[type="number"]');
  const inputButtonsController = new InputButtonsController(toArray(inputsWithButtons));
  inputButtonsController.activate();

  return inputButtonsController;
};
