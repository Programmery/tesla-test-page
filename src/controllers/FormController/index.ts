import type {
  ValidationMap,
  FormDataMap,
  UpdateCallback,
  InitParams,
} from './types';

export class FormController<T extends string> {
  private formEl: InitParams<T>['formEl'];

  private validationMap?: InitParams<T>['validationMap'];

  private fieldNames: InitParams<T>['fieldNames'];

  private formData: FormDataMap<T>;

  private subscribers: UpdateCallback<T>[] = [];

  constructor({formEl, fieldNames, validationMap}: InitParams<T>) {
    this.formEl = formEl;
    this.fieldNames = fieldNames;
    this.validationMap = validationMap;

    formEl.addEventListener('input', this.updateFormData);
    const formData = this.updateFormData();
    this.formData = formData;
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
