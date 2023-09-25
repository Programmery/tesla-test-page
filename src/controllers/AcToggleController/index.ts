import {AC_CLASS, HEAT_CLASS} from '../../styles/animation/animation-classes';
import {passiveIfSupported} from '../../utils/browser-utils';
import {FormDataMap} from '../FormController/types';
import {InitData} from './types';

export class AcToggleController {
  acToggleElement: InitData['acToggleElement'];
  warmTemp = 20;

  constructor({acToggleElement, initialFormData}: InitData) {
    this.acToggleElement = acToggleElement;
    this.updateAcToggle(initialFormData);
  }

  public activate() {
    this.preventFocusOnMouseClick();
  }

  public updateAcToggle = (formData: FormDataMap<'temp'>) => {
    const temp = (formData.temp && +formData.temp) || 0;

    if (temp >= this.warmTemp) {
      this.acToggleElement.classList.remove(HEAT_CLASS);
      this.acToggleElement.classList.add(AC_CLASS);
      return;
    }
    this.acToggleElement.classList.remove(AC_CLASS);
    this.acToggleElement.classList.add(HEAT_CLASS);
  };

  /**
   * Design choice:
   * We do not want a focus state to trigger on checkbox click.
   * But we want to have it on keyboard tab navigation for a11y.
   * We unfocus it manually on mouse up.
   *
   * We could also use a button,
   * but checkbox is better for accessibility here.
   */
  private preventFocusOnMouseClick() {
    const checkbox = document.querySelector<HTMLInputElement>('.ac-toggle input');
    checkbox &&
      window?.addEventListener('mouseup', () => requestAnimationFrame(() => checkbox.blur()), passiveIfSupported);
  }
}
