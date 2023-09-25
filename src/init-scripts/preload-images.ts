import {preloadImage} from '../utils/browser-utils';
import {chainPromiseExecution} from '../utils/custom';

import iconFanGray from '../components/AcToggle/icons/icon-fan-gray.svg';
import iconFanWhite from '../components/AcToggle/icons/icon-fan-white.svg';
import iconWaveGray from '../components/AcToggle/icons/icon-wave-gray.svg';
import iconWaveWhite from '../components/AcToggle/icons/icon-wave-white.svg';

export const preloadImages = () =>
  chainPromiseExecution(
    () => preloadImage(iconFanGray),
    () => preloadImage(iconWaveGray),
    () => preloadImage(iconFanWhite),
    () => preloadImage(iconWaveWhite),
  );
