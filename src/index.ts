import './styles/animation/animation-setup.scss';
import './styles/layout.scss';
import './styles/presets.scss';

import './components/Header';
import './components/Calculator';
import './components/BaseInput';
import './components/AcToggle';
import './components/WheelSelection';
import './components/Footer';
import './components/NoJsAlerts';
import './components/CarDemo';
import './components/Intro';
import './components/Calculation';
import './components/ScrollButton';

import {initAnimations} from './init-scripts/init-animations-controller';
import {initFormController} from './init-scripts/init-form-controller';
import {initButtonInputsController} from './init-scripts/init-button-inputs-controller';
import {initAcToggleController} from './init-scripts/init-ac-toggle-controller';
import {preloadImages} from './init-scripts/preload-images';
import {activateResultsUIUpdates} from './init-scripts/activate-results-ui-updates';
import {activateJsSmoothScrolling} from './init-scripts/activate-js-smooth-scrolling';

// import calculatorResultMap from './data/denormalised-data-map.json';

const init = () => {
  initAnimations();
  preloadImages();
  activateJsSmoothScrolling({
    button: document.getElementById('scroll-button'),
    destinationElement: document.getElementById('calculator'),
  });

  /**
   * Start syncing form state
   */
  const formController = initFormController();

  /**
   * Triggers Form updates when buttons are clicked
   */
  const inputButtonsController = initButtonInputsController();
  inputButtonsController.onChange(formController.updateFormData);

  /**
   * Subscribe to onChange of the Form, to update AcToggle button
   */
  const initialFormData = formController.getFormData();
  const acToggleController = initAcToggleController(initialFormData);
  formController.onChange(acToggleController.updateAcToggle);

  /**
   * Update two UI elements when Form onChange triggers
   */
  activateResultsUIUpdates(formController);
  /**
   * Activate JS Smooth Scrolling
   */
};

document.addEventListener('DOMContentLoaded', () => {
  try {
    init();
  } catch (e) {
    console.error('JS Initialization Error:');
    console.error(e);
  }
});
