/* eslint-disable no-restricted-properties */
import {PromiseFunction} from './types';

export const clamp = (value: number, min: number, max: number) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

export const wait = async (ms = 1000): Promise<void> => new Promise(r => setTimeout(() => r(), ms));

/**
 * Executes promises one by one in a chain.
 *
 * NOTE: Execution continues even in case of Promise rejection.
 * Error is included in resulting array and execution chain goes on.
 */
export const chainPromiseExecution = async (...funcs: PromiseFunction[]) => {
  const results = [];
  for (const func of funcs) {
    // eslint-disable-next-line no-await-in-loop
    const result = await func().catch(e => {
      console.error(e);
      return e;
    });
    results.push(result);
  }
  return results;
};
