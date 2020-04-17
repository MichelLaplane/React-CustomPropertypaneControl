
import { IPropertyPaneCustomFieldProps } from "@microsoft/sp-property-pane";
// import { IPropertyPaneAsyncDropdownProps } from './IPropertyPaneAsyncDropdownProps';

// export interface IPropertyPaneAlignPickerInternalProps extends IPropertyPaneCustomFieldProps, IPropertyPaneCustomFieldProps {
// }


/**
 * @interface
 * Private properties of the PropertyFieldAlignPicker custom field.
 * We separate public & private properties to include onRender & onDispose method waited
 * by the PropertyFieldCustom, witout asking to the developer to add it when he's using
 * the PropertyFieldAlignPicker.
 *
 */
export interface IPropertyPaneAlignPickerInternalProps extends IPropertyPaneCustomFieldProps {
    label: string;
    initialValue?: string;
    targetProperty: string;
    onRender(elem: HTMLElement): void;
    onDispose(elem: HTMLElement): void;
    onPropertyChanged(propertyPath: string, oldValue: any, newValue: any): void;
    render(): void;
    disableReactivePropertyChanges?: boolean;
    properties: any;
    key: string;
    disabled?: boolean;
    onGetErrorMessage?: (value: string) => string | Promise<string>;
    deferredValidationTime?: number;
  }

  