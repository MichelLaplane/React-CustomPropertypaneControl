//import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { IWebPartContext } from '@microsoft/sp-webpart-base';

// export interface IAsyncDropdownProps {
//   label: string;
//   loadOptions: () => Promise<IDropdownOption[]>;
//   onChanged: (option: IDropdownOption, index?: number) => void;
//   selectedKey: string | number;
//   disabled: boolean;
//   stateKey: string;
// }

// Public properties of the PropertyFieldDocumentPicker custom field
export interface IPropertyPaneDocumentPickerProps {
  // Property field label displayed on top
  label: string;
  // Initial value
  initialValue?: string;
  // Parent web part context
  context: IWebPartContext;
  // Defines a onPropertyChange function to raise when the selected Color changed.
  // Normally this function must be always defined with the 'this.onPropertyChange'
  // method of the web part object.
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
  // This API is called to render the web part.
  // Normally this function must be always defined with the 'this.render.bind(this)'
  // method of the web part object.
  render(): void;
// This property is used to indicate the web part's PropertyPane interaction mode: Reactive or NonReactive.
// The default behaviour is Reactive.
  disableReactivePropertyChanges?: boolean;
// Parent Web Part properties
  properties: any;
// An UNIQUE key indicates the identity of this control
  key?: string;
// Whether the property pane field is enabled or not.
  disabled?: boolean;
// Whether the document preview is enabled or not. Default is true.
  previewDocument?: boolean;
// Defines the file extensions allowed in the picker. You need to specifies all the extensions with
// a dot and to separate them with a comma without spaces. For example a good value is: `.doc,.docx,.ppt`.
// The default value is `.doc,.docx,.ppt,.pptx,.xls,.xlsx,.pdf,.txt`
  allowedFileExtensions?: string;
// Whether the document path can be edit manually or not. Default is true.
  readOnly?: boolean;
// The method is used to get the validation error message and determine whether the input value is valid or not.
//
//     When it returns string:
//     - If valid, it returns empty string.
//     - If invalid, it returns the error message string and the text field will
//       show a red border and show an error message below the text field.
//
//     When it returns Promise<string>:
//     - The resolved value is display as error message.
//     - The rejected, the value is thrown away.
  onGetErrorMessage?: (value: string) => string | Promise<string>;
// Custom Field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
// Default value is 200.
  deferredValidationTime?: number;
}