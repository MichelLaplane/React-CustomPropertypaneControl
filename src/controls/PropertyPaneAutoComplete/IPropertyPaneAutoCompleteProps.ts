

export interface IPropertyPaneAutoCompleteProps {
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
     * @var
     * List of suggestions
     */
    suggestions: string[];    
    /**
     * @function
     * Defines a onPropertyChange function to raise when the selected Color changed.
     * Normally this function must be always defined with the 'this.onPropertyChange.bind(this)'
     * method of the web part object.
     */
    /**
     * @var
     * TextBox default place holder text
     */
    placeHolder?: string;    
 //   onPropertyChanged(propertyPath: string, newValue: any):void;
    onPropertyChanged(newValue: any):void;    
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
  }