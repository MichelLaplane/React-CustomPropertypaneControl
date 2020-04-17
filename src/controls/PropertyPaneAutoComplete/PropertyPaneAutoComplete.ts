
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
      disableReactivePropertyChanges: (properties.disableReactivePropertyChanges !== undefined && properties.disableReactivePropertyChanges != null) ? properties.disableReactivePropertyChanges : null,
      disabled: properties.disabled,
      deferredValidationTime: (properties.deferredValidationTime !== undefined) ? properties.deferredValidationTime : null,
      onRender: this.onRender.bind(this),
      onDispose: this.onDispose.bind(this)
    };

    //   this.render = this.render.bind(this);
    //   this.targetProperty = _properties.targetProperty;
    //   this.properties = _properties;
    //   this.label = _properties.label;
    //   this.initialValue = _properties.initialValue;
    //   this.properties.onDispose = this.dispose;
    //   this.properties.onRender = this.render;
    //   this.onPropertyChanged = _properties.onPropertyChanged;
    //   this.customProperties = _properties.properties;
    //   this.key = _properties.key;
    //   if (_properties.disabled === true)
    //     this.disabled = _properties.disabled;
    //   this.onGetErrorMessage = _properties.onGetErrorMessage;
    //   if (_properties.deferredValidationTime !== undefined)
    //     this.deferredValidationTime = _properties.deferredValidationTime;
    //   this.renderWebPart = _properties.render;
    //   if (_properties.disableReactivePropertyChanges !== undefined && _properties.disableReactivePropertyChanges != null)
    //     this.disableReactivePropertyChanges = _properties.disableReactivePropertyChanges;
  }

  private onRender(elem: HTMLElement): void {
    if (!this.elem) {
      this.elem = elem;
    }

    const element: React.ReactElement<IAutoCompleteProps> = React.createElement(AutoComplete, {
      label: this.properties.label,
      initialValue: this.properties.initialValue,
      suggestions: this.suggestions,
      placeHolder: this.placeHolder,
      onPropertyChanged: this.properties.onPropertyChanged,
      disableReactivePropertyChanges: this.properties.disableReactivePropertyChanges,
      disabled: this.properties.disabled,
      deferredValidationTime: this.properties.deferredValidationTime,
      key: this.key
    });
    ReactDom.render(element, elem);
  }

  private onDispose(element: HTMLElement): void {
    ReactDom.unmountComponentAtNode(element);
  }
  // /**
  //  * @function
  //  * Renders the field content
  //  */
  // private render(elem: HTMLElement): void {
  //   //Construct the JSX properties
  //   const element: React.ReactElement<IAutoCompleteProps> = React.createElement(AutoComplete, {
  //     label: this.label,
  //     initialValue: this.initialValue,
  //     suggestions: this.suggestions,
  //     placeHolder: this.placeHolder,
  //     //        targetProperty: this.targetProperty,
  //     //        onDispose: this.dispose,
  //     //        onRender: this.render,
  //     onPropertyChanged: this.onPropertyChanged,
  //     //        properties: this.customProperties,
  //     key: this.key,
  //     disabled: this.disabled,
  //     //        onGetErrorMessage: this.onGetErrorMessage,
  //     deferredValidationTime: this.deferredValidationTime,
  //     //        render: this.renderWebPart,
  //     disableReactivePropertyChanges: this.disableReactivePropertyChanges
  //   });
  //   //Calls the REACT content generator
  //   ReactDom.render(element, elem);
  // }

  // /**
  //  * @function
  //  * Disposes the current object
  //  */
  // private dispose(elem: HTMLElement): void {

  // }

}