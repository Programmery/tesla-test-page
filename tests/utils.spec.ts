/* eslint-disable prefer-promise-reject-errors */
import {chainPromiseExecution, clamp, wait} from '../src/utils/custom';

const mockPromise = () => new Promise<number>(r => wait(1000).then(() => r(1)));
const mockReject = () => new Promise<number>((_, rej) => wait(1000).then(() => rej(2)));
const promises = [mockPromise, mockReject, () => Promise.reject(3), () => Promise.resolve(4)];

describe('chainPromiseExecution() works as expected', () => {
  test('Order of execution, Rejects are ignored and logged with console.error', async () => {
    const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation();

    expect(await chainPromiseExecution(...promises)).toStrictEqual([1, 2, 3, 4]);

    expect(consoleErrorSpy.mock.calls.length).toBe(2);
    consoleErrorSpy.mockRestore();
  });
});

describe('clamp() works as expected', () => {
  test('Value remains the same if it is within min max range', () => {
    expect(clamp(100, 1, 200)).toBe(100);
  });

  test('Value larger than max is clamped to max', () => {
    expect(clamp(100, 1, 20)).toBe(20);
  });

  test('Value smaller than min is clamped to min', () => {
    expect(clamp(-100, 1, 20)).toBe(1);
  });
});
