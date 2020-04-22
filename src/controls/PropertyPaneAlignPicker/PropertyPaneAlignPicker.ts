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

import { IPropertyPaneAlignPickerInternalProps } from './IPropertyPaneAlignPickerInternalProps';

import { IAlignPickerProps } from './components/IAlignPickerProps';
import { IPropertyPaneAlignPickerProps } from './IPropertyPaneAlignPickerProps';

import AlignPicker from './components/AlignPicker';

/**
 * @interface
 * Represents a PropertyFieldAlignPicker object
 *
 */
export class PropertyPaneAlignPicker implements IPropertyPaneField<IPropertyPaneAlignPickerProps> {

  //Properties defined by IPropertyPaneField
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyPaneAlignPickerInternalProps;
  private elem: HTMLElement;

  //Custom properties
  private label: string;
  private initialValue: string;
  private customProperties: any;
  private key: string;
  private disabled: boolean = false;
  private onGetErrorMessage: (value: string) => string | Promise<string>;
  private deferredValidationTime: number = 200;
  private disableReactivePropertyChanges: boolean = false;

  /**
   * @function
   * Ctor
   */
  public constructor(targetProperty: string, properties: IPropertyPaneAlignPickerProps) {
    this.targetProperty = targetProperty;
    this.properties = {
      key: properties.label,
      label: properties.label,
      initialValue: properties.initialValue,
      onPropertyChanged: properties.onPropertyChanged,
      disableReactivePropertyChanges: (properties.disableReactivePropertyChanges !== undefined && properties.disableReactivePropertyChanges != null) ? properties.disableReactivePropertyChanges : null,
      disabled: properties.disabled,
      deferredValidationTime: (properties.deferredValidationTime !== undefined) ? properties.deferredValidationTime : null,
      onRender: this.onRender.bind(this),
      onDispose: this.onDispose.bind(this)
    };
    this.label = properties.label;
    this.initialValue = properties.initialValue;
 //   this.key = properties.key;
    if (properties.disabled === true)
      this.disabled = properties.disabled;
    this.onGetErrorMessage = properties.onGetErrorMessage;
    if (properties.deferredValidationTime !== undefined)
      this.deferredValidationTime = properties.deferredValidationTime;
//    this.renderWebPart = _properties.render;
    if (properties.disableReactivePropertyChanges !== undefined && properties.disableReactivePropertyChanges != null)
      this.disableReactivePropertyChanges = properties.disableReactivePropertyChanges;    
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

    const element: React.ReactElement<IAlignPickerProps> = React.createElement(AlignPicker, {
      label: this.properties.label,
      initialValue: this.properties.initialValue,
      onPropertyChanged: this.properties.onPropertyChanged,
      disableReactivePropertyChanges: this.properties.disableReactivePropertyChanges,
      disabled: this.properties.disabled,
      deferredValidationTime: this.properties.deferredValidationTime,
      key: this.key,
      stateKey: new Date().toString()
    });
    ReactDom.render(element, elem);
  }

  private onDispose(element: HTMLElement): void {
    ReactDom.unmountComponentAtNode(element);
  }

}




