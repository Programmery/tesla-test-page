import {KeyToResultMap} from '../../data/types';
import {FormDataMap} from '../FormController/types';
import {InitParams} from './types';

export class ResultsController<T extends FormDataMap<string>> {
  keyToResultMap: InitParams<T>['keyToResultMap'];

  element: InitParams<T>['elementToUpdate'];

  getMapKey: InitParams<T>['getMapKey'];

  constructor({
    keyToResultMap,
    getMapKey,
    initialFormData,
    elementToUpdate,
  }: InitParams<T>) {
    this.keyToResultMap = keyToResultMap;
    this.element = elementToUpdate;
    this.getMapKey = getMapKey;

    this.updateResultsUI(initialFormData);
  }

  updateResultsUI = (formData: T) => {
    if (!this.element) {
      return;
    }
    const key = this.getMapKey(formData);
    const result = this.keyToResultMap[key];
    this.element.innerText = `${result}`;
  };
}
