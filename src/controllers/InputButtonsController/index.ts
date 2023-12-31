import {clamp} from '../../utils/custom';
import {toArray, isFinite} from '../../utils/polifills';
import {UpdateDisabledStateParams, DirectionToButtonMap} from './types';

export class InputButtonsController {
  inputs: HTMLInputElement[];
  subscribers: Array<() => void> = [];

  constructor(inputs: HTMLInputElement[]) {
    this.inputs = inputs;
  }

  public activate() {
    this.activateInputButtons();
  }

  private generateDirectionToButtonMap(buttons: HTMLButtonElement[]) {
    return buttons.reduce<DirectionToButtonMap>((directionMap, btn) => {
      const key = btn.dataset.direction;
      if (key === 'up' || key === 'down') {
        directionMap[key] = btn;
      }
      return directionMap;
    }, Object.create(null));
  }

  private updateButtonDisabledStates = ({newValue, min, max, directionToButtonMap}: UpdateDisabledStateParams) => {
    const buttonUp = directionToButtonMap.up;
    const buttonDown = directionToButtonMap.down;

    if (buttonUp) {
      buttonUp.disabled = newValue >= max;
    }

    if (buttonDown) {
      buttonDown.disabled = newValue <= min;
    }
  };

  private generateButtonClickHandler(
    input: HTMLInputElement,
    button: HTMLButtonElement,
    directionToButtonMap: DirectionToButtonMap,
  ) {
    return () => {
      const max = +input.max;
      const min = +input.min;
      const value = +input.value;
      const step = +input.step;

      const multiplier = button.dataset.direction === 'up' ? 1 : -1;

      const newValue = clamp(value + step * multiplier, +min, +max);

      input.value = isFinite(newValue) ? `${newValue}` : input.value;

      this.updateButtonDisabledStates({
        newValue,
        min,
        max,
        directionToButtonMap,
      });

      this.triggerOnChange();
    };
  }

  private activateInputButtons() {
    for (const input of this.inputs) {
      const buttons = toArray(document.querySelectorAll<HTMLButtonElement>(`[data-name="${input.name}"]`));

      const directionToButtonMap = this.generateDirectionToButtonMap(buttons);

      buttons.forEach(button =>
        button.addEventListener('click', this.generateButtonClickHandler(input, button, directionToButtonMap)),
      );
    }
  }

  private triggerOnChange() {
    this.subscribers.forEach(cb => cb());
  }

  onChange(...callbacks: Array<() => void>) {
    this.subscribers.push(...callbacks);
  }
}
