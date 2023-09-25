import {KeyToResultMap} from '../../data/types';
import {FormDataMap} from '../FormController/types';

export type InitParams<T extends FormDataMap<string>> = {
  keyToResultMap: KeyToResultMap;
  initialFormData: T;
  getMapKey: (formData: T) => string;
  elementToUpdate: HTMLElement | null;
};
