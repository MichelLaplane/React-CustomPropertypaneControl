
import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
  IPropertyPaneCustomFieldProps
} from '@microsoft/sp-webpart-base';
//import PropertyPaneAutoComplete, { IPropertyFieldAlignPickerHostProps } from './PropertyPaneAutoComplete';
import { IPropertyPaneAutoCompleteInternalProps } from './IPropertyPaneAutoCompleteInternalProps';

import { IPropertyPaneAutoCompleteProps } from './IPropertyPaneAutoCompleteProps';
import { IAutoCompleteProps } from './components/IAutoCompleteProps';
import AutoComplete from './components/AutoComplete';
/**
 * @interface
 * Represents a PropertyFieldAlignPicker object
 *
 */
export class PropertyPaneAutoComplete implements IPropertyPaneField<IPropertyPaneAutoCompleteProps> {

  //Properties defined by IPropertyPaneField
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyPaneAutoCompleteInternalProps;
  private elem: HTMLElement;

  //Custom properties
  private label: string;
  private initialValue: string;
  private suggestions: string[];
  private placeHolder: string;
  private onPropertyChanged: (propertyPath: string, oldValue: any, newValue: any) => void;
  private customProperties: any;
  private key: string;
  private disabled: boolean = false;
  private onGetErrorMessage: (value: string) => string | Promise<string>;
  private deferredValidationTime: number = 200;
  private renderWebPart: () => void;
  private disableReactivePropertyChanges: boolean = false;

  /**
   * @function
   * Ctor
   */
  public constructor(targetProperty: string, properties: IPropertyPaneAutoCompleteProps) {
    this.targetProperty = targetProperty;
    this.properties = {
      key: properties.label,
      label: properties.label,
      initialValue: properties.initialValue,
      suggestions: properties.suggestions,
      placeHolder: properties.placeHolder,
      onPropertyChanged: properties.onPropertyChanged,
      disabled: properties.disabled,
      onRender: this.onRender.bind(this),
      onDispose: this.onDispose.bind(this)
    };


       this.label = properties.label;
       this.initialValue = properties.initialValue;
      if (properties.disabled === true)
        this.disabled = properties.disabled;
    //   this.onGetErrorMessage = _properties.onGetErrorMessage;
  }

  public render(): void {
    if (!this.elem) {
      return;
    }
    this.onRender(this.elem);
  }

  private onRender(elem: HTMLElement): void {
    if (!this.elem) {
      this.elem = elem;
    }

    const element: React.ReactElement<IAutoCompleteProps> = React.createElement(AutoComplete, {
      label: this.properties.label,
      initialValue: this.properties.initialValue,
      suggestions: this.properties.suggestions,
      placeHolder: this.placeHolder,
      onPropertyChanged: this.properties.onPropertyChanged,
      disabled: this.properties.disabled,
      key: this.key
    });
    ReactDom.render(element, elem);
  }

  private onDispose(element: HTMLElement): void {
    ReactDom.unmountComponentAtNode(element);
  }

}