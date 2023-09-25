import {InputButtonsController} from '../controllers/InputButtonsController';

export const initButtonInputsController = () => {
  const inputsWithButtons = document.querySelectorAll<HTMLInputElement>(
    'input[type="number"]',
  );
  const inputButtonsController = new InputButtonsController([
    ...inputsWithButtons,
  ]);
  inputButtonsController.activate();

  return inputButtonsController;
};
