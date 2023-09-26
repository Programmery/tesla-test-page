import {toArray} from '../../utils/polifills';
import type {FormDataMap, UpdateCallback, InitParams} from './types';

export class FormController<T extends string> {
  private formEl: InitParams<T>['formEl'];
  private formData: FormDataMap<T>;
  private fieldNames: InitParams<T>['fieldNames'];
  private validationMap?: InitParams<T>['validationMap'];
  private subscribers: UpdateCallback<T>[] = [];

  constructor({formEl, fieldNames, validationMap}: InitParams<T>) {
    this.formEl = formEl;
    this.fieldNames = fieldNames;
    this.validationMap = validationMap;

    this.subscribeToAllChanges();
    const formData = this.updateFormData();
    this.formData = formData;
  }

  private subscribeToAllChanges() {
    this.fieldNames.forEach(name => {
      const elements = toArray(this.formEl.querySelectorAll(`[name="${name}"]`));
      elements.forEach(el => el.addEventListener('change', this.updateFormData));
    });
  }

  private triggerOnChange() {
    this.subscribers.forEach(cb => cb(this.formData));
  }

  public onChange(...callbacks: Array<UpdateCallback<T>>) {
    this.subscribers.push(...callbacks);
  }

  public updateFormData = () => {
    const rawFormData = new FormData(this.formEl);
    const formData = this.formData || {};
    for (const fieldName of this.fieldNames) {
      const value = rawFormData.get(fieldName);

      formData[fieldName] = this.validationMap?.[fieldName]?.(value) ?? value;
    }

    this.triggerOnChange();

    return formData;
  };

  public getFormData() {
    return this.formData;
  }
}
