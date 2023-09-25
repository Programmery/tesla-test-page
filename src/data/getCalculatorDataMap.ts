import {writeFile} from 'fs';
import exampleData100D from './metric-100D.json';
import exampleDataP100D from './metric-P100D.json';
import {DataItem, KeyToResultMap, CalculatorResultMap} from './types';
import {getMapKey} from './utils/getMapKey';

/**
 * Since the task did not specify, how should I work with data,
 * I denormalise it before use.
 * In our case it is over-optimisation,
 * but in production there could be more data.
 */
const convertDataToMap = (data: DataItem[]) => {
  return data.reduce<KeyToResultMap>((dataMap, item) => {
    const {temp, wheelsize, ac, hwy} = item;

    for (const speedItem of hwy) {
      const {kmh, kilometers} = speedItem;
      const mapKey = getMapKey({ac, temp, wheelsize, kmh});

      dataMap[mapKey] = kilometers;
    }
    return dataMap;
  }, Object.create(null));
};

const getCalculatorDataMap = (
  data100D: DataItem[],
  dataP100D: DataItem[],
): CalculatorResultMap => {
  const data100DMap = convertDataToMap(data100D);
  const dataP100DMap = convertDataToMap(dataP100D);

  return {model100D: data100DMap, modelP100D: dataP100DMap};
};

const writeDataToFile = (data: CalculatorResultMap) => {
  JSON.stringify(data);

  writeFile(
    'denormalised-data-map.json',
    JSON.stringify(data).replace(/\s+/, ''),
    'utf8',
    err => {
      if (err) {
        console.log('Error while writing the file');
        return console.log(err);
      }

      return console.log('JSON file has been saved.');
    },
  );
};

const getDataMapFile = (data100D: DataItem[], dataP100D: DataItem[]) => {
  const calculatorDataMap = getCalculatorDataMap(data100D, dataP100D);
  writeDataToFile(calculatorDataMap);
};

getDataMapFile(exampleData100D, exampleDataP100D);
