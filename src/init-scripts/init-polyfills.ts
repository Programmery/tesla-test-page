// eslint-disable-next-line import/no-extraneous-dependencies
import 'formdata-polyfill';
// eslint-disable-next-line import/no-extraneous-dependencies
import Promise from 'promise-polyfill';

export const initPolyfills = () => {
  if (typeof window.Promise === 'undefined') {
    window.Promise = Promise;
  }
};
