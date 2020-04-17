/**
 * @file PropertyFieldAlignPicker.ts
 * Define a custom field of type PropertyFieldAlignPicker for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
  IPropertyPaneCustomFieldProps
} from '@microsoft/sp-webpart-base';
//import PropertyFieldAlignPickerHost, { IPropertyFieldAlignPickerHostProps } from './PropertyPaneAlignPicker';
import { IPropertyPaneAlignPickerInternalProps } from './IPropertyPaneAlignPickerInternalProps';

import { IAlignPickerProps } from './components/IAlignPickerProps';
import { IPropertyPaneAlignPickerProps} from './IPropertyPaneAlignPickerProps';
//import { AlignPicker} from './components/AlignPicker';
import AlignPicker from './components/AlignPicker';

/**
 * @interface
 * Represents a PropertyFieldAlignPicker object
 *
 */
//class PropertyFieldAlignPickerBuilder implements IPropertyPaneField<IPropertyPaneAlignPickerProps> {
  export class PropertyPaneAlignPicker implements IPropertyPaneField<IPropertyPaneAlignPickerProps> {

  //Properties defined by IPropertyPaneField
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyPaneAlignPickerInternalProps;
  private elem: HTMLElement;

  //Custom properties
  private label: string;
  private initialValue: string;
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
//  public constructor(_targetProperty: string, _properties: IPropertyPaneAlignPickerInternalProps) {
    public constructor(targetProperty: string, properties: IPropertyPaneAlignPickerProps) {
      this.targetProperty = targetProperty;
      this.properties = {
        key: properties.label,        
        label: properties.label,
        initialValue: properties.initialValue,
        onPropertyChanged: properties.onPropertyChanged,
        disableReactivePropertyChanges: (properties.disableReactivePropertyChanges !== undefined && properties.disableReactivePropertyChanges != null) ? properties.disableReactivePropertyChanges : null,
        disabled: properties.disabled,
        deferredValidationTime:(properties.deferredValidationTime !== undefined) ? properties.deferredValidationTime : null,
        onRender: this.onRender.bind(this),
        onDispose: this.onDispose.bind(this)
      };

//      this.render = this.render.bind(this);
    //this.targetProperty = _properties.targetProperty;
    // this.properties = _properties;
    // this.label = _properties.label;
    //this.initialValue = _properties.initialValue;
//    this.properties.onDispose = this.dispose;
//    this.properties.onRender = this.render;
//    this.properties.onRender = this.onRender.bind(this);
//    this.onPropertyChanged = _properties.onPropertyChanged;
//    this.customProperties = _properties.properties;
    // this.key = _properties.key;
    // if (_properties.disabled === true)
    //   this.disabled = _properties.disabled;
//    this.onGetErrorMessage = _properties.onGetErrorMessage;
    // if (_properties.deferredValidationTime !== undefined)
    //   this.deferredValidationTime = _properties.deferredValidationTime;
//    this.renderWebPart = _properties.render;
    // if (_properties.disableReactivePropertyChanges !== undefined && _properties.disableReactivePropertyChanges != null)
    //   this.disableReactivePropertyChanges = _properties.disableReactivePropertyChanges;
  }

  private onRender(elem: HTMLElement): void {
    if (!this.elem) {
      this.elem = elem;
    }

    const element: React.ReactElement<IAlignPickerProps> = React.createElement(AlignPicker, {
      label: this.properties.label,
      initialValue: this.properties.initialValue,
      onPropertyChanged: this.properties.onPropertyChanged,
      disableReactivePropertyChanges: this.properties.disableReactivePropertyChanges,
      disabled: this.properties.disabled,
      deferredValidationTime:this.properties.deferredValidationTime,
      key: this.key
    });
    ReactDom.render(element, elem);
  }

  private onDispose(element: HTMLElement): void {
    ReactDom.unmountComponentAtNode(element);
  }  

  /**
   * @function
   * Renders the field content
   */
  private render(elem: HTMLElement): void {
    //Construct the JSX properties
    const element: React.ReactElement<IAlignPickerProps> = React.createElement(AlignPicker, {
      label: this.label,
      initialValue: this.initialValue,
//      targetProperty: this.targetProperty,
//      onDispose: this.dispose,
//      onRender: this.render,
      onPropertyChanged: this.onPropertyChanged,
//      properties: this.customProperties,
      key: this.key,
      disabled: this.disabled,
//      onGetErrorMessage: this.onGetErrorMessage,
      deferredValidationTime: this.deferredValidationTime,
//      render: this.renderWebPart,
      disableReactivePropertyChanges: this.disableReactivePropertyChanges
    });
    //Calls the REACT content generator
    ReactDom.render(element, elem);
  }

  /**
   * @function
   * Disposes the current object
   */
  private dispose(elem: HTMLElement): void {

  }

}

// /**
//  * @function
//  * Helper method to create the customer field on the PropertyPane.
//  * @param targetProperty - Target property the custom field is associated to.
//  * @param properties - Strongly typed custom field properties.
//  */
// export function PropertyPaneAlignPicker1(targetProperty: string, properties: IPropertyPaneAlignPickerProps): IPropertyPaneField<IPropertyPaneAlignPickerInternalProps> {

//   //Create an internal properties object from the given properties
//   var newProperties: IPropertyPaneAlignPickerInternalProps = {
//     label: properties.label,
// //    targetProperty: targetProperty,
//     initialValue: properties.initialValue,
//     onPropertyChanged: properties.onPropertyChanged,
//     properties: properties.properties,
//     onDispose: null,
//     onRender: null,
//     key: null,
//     disabled: properties.disabled,
//     onGetErrorMessage: properties.onGetErrorMessage,
//     deferredValidationTime: properties.deferredValidationTime,
//     render: properties.render,
//     disableReactivePropertyChanges: properties.disableReactivePropertyChanges
//   };
//   //Calls the PropertyFieldAlignPicker builder object
//   //This object will simulate a PropertyFieldCustom to manage his rendering process
//   return new PropertyFieldAlignPickerBuilder(targetProperty, newProperties);
// }


