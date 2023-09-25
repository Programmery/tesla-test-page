import {AnyDataValue} from '../../types/common';

export type ValidationMap<T extends string> = {
  [key in T]?: (value: File | string | null) => AnyDataValue;
};

export type InitParams<T extends string> = {
  formEl: HTMLFormElement;
  fieldNames: T[];
  validationMap: ValidationMap<T>;
};

export type FormDataMap<T extends string> = {[key in T]: AnyDataValue};
export type UpdateCallback<T extends string> = (
  formData: FormDataMap<T>,
) => void;
