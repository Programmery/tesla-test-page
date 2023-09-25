import {getCalculatorDataMap} from './getCalculatorDataMap';

describe('Should correctly convert array data to lookup map', () => {
  test('Generates expected map from example data', () => {
    const result = getCalculatorDataMap(DATA_MOCK, DATA_MOCK_2);

    expect(result).toEqual({
      model100D: {
        'off--10-19-70': 798,
        'off--10-19-80': 710,
        'off--10-19-90': 627,
        'off--10-19-100': 555,
        'off--10-19-110': 491,
        'off--10-19-120': 435,
        'off--10-19-130': 386,
        'off--10-19-140': 338,
        'on-55-23-70': 618,
        'on-55-23-80': 575,
        'on-55-23-90': 526,
        'on-55-23-100': 478,
        'on-55-23-110': 433,
        'on-55-23-120': 390,
        'on-55-23-130': 351,
        'on-55-23-140': 311,
      },
      modelP100D: {
        'off-0-19-70': 783,
        'off-0-19-80': 698,
        'off-0-19-90': 618,
        'off-0-19-100': 546,
        'off-0-19-110': 484,
        'off-0-19-120': 428,
        'off-0-19-130': 380,
        'off-0-19-140': 338,
        'on-0-19-70': 635,
        'on-0-19-80': 588,
        'on-0-19-90': 536,
        'on-0-19-100': 485,
        'on-0-19-110': 437,
        'on-0-19-120': 393,
        'on-0-19-130': 354,
        'on-0-19-140': 315,
        'off-0-21-70': 739,
        'off-0-21-80': 662,
        'off-0-21-90': 588,
        'off-0-21-100': 522,
        'off-0-21-110': 463,
        'off-0-21-120': 411,
        'off-0-21-130': 366,
        'off-0-21-140': 326,
      },
    });
  });
});

const DATA_MOCK = [
  {
    temp: -10,
    wheelsize: 19,
    ac: 'off',
    hwy: [
      {kmh: 70, kilometers: 798},
      {kmh: 80, kilometers: 710},
      {kmh: 90, kilometers: 627},
      {kmh: 100, kilometers: 555},
      {kmh: 110, kilometers: 491},
      {kmh: 120, kilometers: 435},
      {kmh: 130, kilometers: 386},
      {kmh: 140, kilometers: 338},
    ],
  },
  {
    temp: 55,
    wheelsize: 23,
    ac: 'on',
    hwy: [
      {kmh: 70, kilometers: 618},
      {kmh: 80, kilometers: 575},
      {kmh: 90, kilometers: 526},
      {kmh: 100, kilometers: 478},
      {kmh: 110, kilometers: 433},
      {kmh: 120, kilometers: 390},
      {kmh: 130, kilometers: 351},
      {kmh: 140, kilometers: 311},
    ],
  },
  {
    temp: 55,
    wheelsize: 23,
    ac: 'on',
    hwy: [
      {kmh: 70, kilometers: 618},
      {kmh: 80, kilometers: 575},
      {kmh: 90, kilometers: 526},
      {kmh: 100, kilometers: 478},
      {kmh: 110, kilometers: 433},
      {kmh: 120, kilometers: 390},
      {kmh: 130, kilometers: 351},
      {kmh: 140, kilometers: 311},
    ],
  },
];

const DATA_MOCK_2 = [
  {
    temp: 0,
    wheelsize: 19,
    ac: 'off',
    hwy: [
      {kmh: 70, kilometers: 783},
      {kmh: 80, kilometers: 698},
      {kmh: 90, kilometers: 618},
      {kmh: 100, kilometers: 546},
      {kmh: 110, kilometers: 484},
      {kmh: 120, kilometers: 428},
      {kmh: 130, kilometers: 380},
      {kmh: 140, kilometers: 338},
    ],
  },
  {
    temp: 0,
    wheelsize: 19,
    ac: 'on',
    hwy: [
      {kmh: 70, kilometers: 635},
      {kmh: 80, kilometers: 588},
      {kmh: 90, kilometers: 536},
      {kmh: 100, kilometers: 485},
      {kmh: 110, kilometers: 437},
      {kmh: 120, kilometers: 393},
      {kmh: 130, kilometers: 354},
      {kmh: 140, kilometers: 315},
    ],
  },

  {
    temp: 0,
    wheelsize: 21,
    ac: 'off',
    hwy: [
      {kmh: 70, kilometers: 739},
      {kmh: 80, kilometers: 662},
      {kmh: 90, kilometers: 588},
      {kmh: 100, kilometers: 522},
      {kmh: 110, kilometers: 463},
      {kmh: 120, kilometers: 411},
      {kmh: 130, kilometers: 366},
      {kmh: 140, kilometers: 326},
    ],
  },
];
