export type DirectionToButtonMap = {
  up?: HTMLButtonElement;
  down?: HTMLButtonElement;
};

export type UpdateDisabledStateParams = {
  newValue: number;
  min: number;
  max: number;
  directionToButtonMap: DirectionToButtonMap;
};
