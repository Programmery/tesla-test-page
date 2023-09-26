import {KeyParams} from '../types';

const NO_VAL = '#';

export const getMapKey = ({ac, temp, wheelsize, kmh}: Partial<KeyParams>) =>
  `${ac ?? NO_VAL}-${temp ?? NO_VAL}-${wheelsize ?? NO_VAL}-${kmh ?? NO_VAL}`;
