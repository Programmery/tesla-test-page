import {wait} from '../src/utils/custom';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('wait() works as expected', () => {
  test('Delays callback using setTimeout', async () => {
    const callback = jest.fn();

    const promise = wait(1500).then(callback);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1500);

    expect(callback).not.toBeCalled();

    jest.runOnlyPendingTimers();

    await promise;
    jest.runAllTimers();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
