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
import { IPropertyPaneAlignPickerInternalProps1 } from './IPropertyPaneAlignPickerInternalProps1';

import { IAlignPickerProps1 } from './components/IAlignPickerProps1';
import { IPropertyPaneAlignPickerProps1} from './IPropertyPaneAlignPickerProps1';
//import { AlignPicker} from './components/AlignPicker';
import AlignPicker1 from './components/AlignPicker1';

/**
 * @interface
 * Represents a PropertyFieldAlignPicker object
 *
 */
//class PropertyFieldAlignPickerBuilder implements IPropertyPaneField<IPropertyPaneAlignPickerProps> {
  export class PropertyPaneAlignPicker1 implements IPropertyPaneField<IPropertyPaneAlignPickerProps1> {

  //Properties defined by IPropertyPaneField
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyPaneAlignPickerInternalProps1;
  private elem: HTMLElement;

    public constructor(targetProperty: string, properties: IPropertyPaneAlignPickerProps1) {
      this.targetProperty = targetProperty;
      this.properties = {
        key: properties.label, 
//        mode: properties.mode,      
        label: properties.label,
        initialValue: properties.initialValue,
        onPropertyChange: properties.onPropertyChange,
        disabled: properties.disabled,
        selectedAlign: properties.selectedAlign,
        onRender: this.onRender.bind(this),
        onDispose: this.onDispose.bind(this)
      };
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

    const element: React.ReactElement<IAlignPickerProps1> = React.createElement(AlignPicker1, {
      label: this.properties.label,
//      mode:this.properties.mode,
      initialValue: this.properties.initialValue,
      onChanged: this.onChanged.bind(this),
      disabled: this.properties.disabled,
      selectedAlign:this.properties.selectedAlign
//      key: this.properties.label
    });
    ReactDom.render(element, elem);
  }

  private onChanged(option: IAlignPickerProps1, align: string): void {
    this.properties.onPropertyChange(this.targetProperty,align);
  }
  private onDispose(element: HTMLElement): void {
    ReactDom.unmountComponentAtNode(element);
  }  


}


