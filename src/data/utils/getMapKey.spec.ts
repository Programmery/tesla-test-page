import {getMapKey} from './getMapKey';

describe('getMapKey works as expected', () => {
  test('Creates the right key, no matter the data type', async () => {
    expect(getMapKey({kmh: 70, ac: 'on', temp: -23, wheelsize: '19'})).toBe(
      'on--23-19-70',
    );
  });

  test('Falls back to # for missing values', async () => {
    expect(
      getMapKey({kmh: null, ac: undefined, temp: false, wheelsize: 0}),
    ).toBe('#-false-0-#');
  });
});
