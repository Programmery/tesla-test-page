/* eslint-disable no-restricted-properties */
/* eslint-disable no-undef */

type CollectionOrList<T extends Node | Element> = T extends Element
  ? HTMLCollectionOf<T> | NodeListOf<T>
  : NodeListOf<T>;

/**
 * IE11 does not support spread or forEach on NodeLists / HTMLCollections
 */
export const toArray = <T extends Node | Element>(items: CollectionOrList<T>): T[] => {
  const result = [];
  for (let i = 0; i < items.length; i++) {
    result.push(items[i]);
  }
  return result as T[];
};

/**
 * IE11 does not support Number.isFinite and Number.isNaN
 */
export const isFinite = (n: number) => typeof n === 'number' && !window.isNaN(n);
