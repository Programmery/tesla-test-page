import {AnyDataValue} from '../types/common';

export type KeyToResultMap = {[key: string]: number};

export type CalculatorResultMap = {
  model100D: KeyToResultMap;
  modelP100D: KeyToResultMap;
};

type SpeedItem = {kmh: number; kilometers: number};

export type DataItem = {
  temp: number;
  wheelsize: number;
  ac: string;
  hwy: SpeedItem[];
};

export type KeyParams = {
  kmh: AnyDataValue;
  ac: AnyDataValue;
  temp: AnyDataValue;
  wheelsize: AnyDataValue;
};
