
import { IPropertyPaneCustomFieldProps } from "@microsoft/sp-property-pane";
import { IPropertyPaneDocumentPickerProps } from './IPropertyPaneDocumentPickerProps';

//import { IWebPartContext } from '@microsoft/sp-webpart-base';

// export interface IPropertyPaneDocumentPickerInternalProps extends IPropertyPaneDocumentPickerProps, IPropertyPaneCustomFieldProps {
// }

// Private properties of the PropertyFieldDocumentPicker custom field.
// We separate public & private properties to include onRender & onDispose method waited
// by the PropertyFieldCustom, witout asking to the developer to add it when he's using
// the PropertyFieldDocumentPicker.
// export interface IPropertyPaneDocumentPickerInternalProps extends IPropertyPaneCustomFieldProps {
//     label: string;
//     initialValue?: string;
//     targetProperty: string;
//     context: IWebPartContext;
//     onRender(elem: HTMLElement): void;
//     onDispose(elem: HTMLElement): void;
//     onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
//     render(): void;
//     disableReactivePropertyChanges?: boolean;
//     properties: any;
//     disabled?: boolean;
//     onGetErrorMessage?: (value: string) => string | Promise<string>;
//     deferredValidationTime?: number;
//     previewDocument?: boolean;
//     readOnly?: boolean;
//     allowedFileExtensions?: string;
//   }

export interface IPropertyPaneDocumentPickerInternalProps extends IPropertyPaneDocumentPickerProps {
}