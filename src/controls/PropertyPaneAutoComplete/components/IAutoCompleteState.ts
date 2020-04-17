
export interface IAutoCompleteState {
    currentValue?: string;
    shortCurrentValue?: string;
    suggestions: string[];
    isOpen: boolean;
    hover: string;
    keyPosition: number;
    isHoverDropdown: boolean;
    errorMessage: string;
    guid: string;
    shouldAutoComplete: boolean;
    scrollPosition: number;
  }