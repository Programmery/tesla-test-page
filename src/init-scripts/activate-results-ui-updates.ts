import type {FormController} from '../controllers/FormController';
import {ResultsController} from '../controllers/ResultsController';
import {fakeApiCall} from '../data/utils/fake-api-call';
import {getMapKey} from '../data/utils/get-map-key';

export const activateResultsUIUpdates = async (formController: FormController<'ac' | 'kmh' | 'temp' | 'wheelsize'>) => {
  /**
   * Pretend we are getting data from API
   */
  const calculatorResultMap = await fakeApiCall();
  if (!calculatorResultMap) {
    return;
  }
  /**
   * Update two UI elements when Form onChange triggers
   */
  const initialFormData = formController.getFormData();
  const model100DController = new ResultsController({
    initialFormData,
    keyToResultMap: calculatorResultMap.model100D,
    elementToUpdate: document.getElementById('result-100d'),
    getMapKey,
  });
  const modelP100DController = new ResultsController({
    initialFormData,
    keyToResultMap: calculatorResultMap.modelP100D,
    elementToUpdate: document.getElementById('result-p100d'),
    getMapKey,
  });

  formController.onChange(model100DController.updateResultsUI, modelP100DController.updateResultsUI);
};
