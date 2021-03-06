//import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';

// export interface IAsyncDropdownProps {
//   label: string;
//   loadOptions: () => Promise<IDropdownOption[]>;
//   onChanged: (option: IDropdownOption, index?: number) => void;
//   selectedKey: string | number;
//   disabled: boolean;
//   stateKey: string;
// }

// export interface IAsyncDropdownProps {
//     label: string;
//     loadOptions: () => Promise<IDropdownOption[]>;
//     onChanged: (option: IDropdownOption, index?: number) => void;
//     selectedKey: string | number;
//     disabled: boolean;
//     stateKey: string;
//   }

export interface IAlignPickerProps {
    /**
     * @var
     * Property field label displayed on top
     */
    label: string;
    /**
     * @var
     * Initial value
     */
    initialValue?: string;
    /**
     * @function
     * Defines a onPropertyChange function to raise when the selected Color changed.
     * Normally this function must be always defined with the 'this.onPropertyChange.bind(this)'
     * method of the web part object.
     */
    onPropertyChanged(newValue: any): void;

    /**
     * @function
     * This API is called to render the web part.
     * Normally this function must be always defined with the 'this.render.bind(this)'
     * method of the web part object.
     */
//    render(): void;
    /**
     * This property is used to indicate the web part's PropertyPane interaction mode: Reactive or NonReactive.
     * The default behaviour is Reactive.
     */
    disableReactivePropertyChanges?: boolean;
    /**
     * @var
     * Parent Web Part properties
     */
    //properties: any;
    /**
     * @var
     * An UNIQUE key indicates the identity of this control
     */
//    key?: string;
    /**
     * Whether the property pane field is enabled or not.
     */
    disabled?: boolean;
    /**
     * The method is used to get the validation error message and determine whether the input value is valid or not.
     *
     *   When it returns string:
     *   - If valid, it returns empty string.
     *   - If invalid, it returns the error message string and the text field will
     *     show a red border and show an error message below the text field.
     *
     *   When it returns Promise<string>:
     *   - The resolved value is display as error message.
     *   - The rejected, the value is thrown away.
     *
     */
     onGetErrorMessage?: (value: string) => string | Promise<string>;
     /**
      * Custom Field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
      * Default value is 200.
      */
     deferredValidationTime?: number;
     stateKey: string;
  }