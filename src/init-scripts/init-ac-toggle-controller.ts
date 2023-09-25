import {AcToggleController} from '../controllers/AcToggleController';
import {FormDataMap} from '../controllers/FormController/types';

export const initAcToggleController = (initialFormData: FormDataMap<'temp'>) => {
  const acToggleElement = document.querySelector<HTMLElement>('.ac-toggle__info');

  if (!acToggleElement) {
    throw new Error('Expected to have an AcToggle element. Check selectors');
  }
  const acToggleController = new AcToggleController({
    acToggleElement,
    initialFormData,
  });
  acToggleController.activate();

  return acToggleController;
};
