import {FormController} from '../controllers/FormController';

export const initFormController = () => {
  const calculatorFormEl =
    document.querySelector<HTMLFormElement>('form.calculator');

  if (!calculatorFormEl) {
    throw new Error('Expected to have a Form element. Check Form Selector');
  }
  return new FormController({
    formEl: calculatorFormEl,
    fieldNames: ['ac', 'kmh', 'temp', 'wheelsize'],
    validationMap: {
      ac: value => (value === 'on' ? value : 'off'),
    },
  });
};
