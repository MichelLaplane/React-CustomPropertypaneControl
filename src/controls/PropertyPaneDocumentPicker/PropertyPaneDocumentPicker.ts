import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-property-pane';
//import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
//import { IPropertyPaneAsyncDropdownProps } from './IPropertyPaneAsyncDropdownProps';
import { IPropertyPaneDocumentPickerInternalProps } from './IPropertyPaneDocumentPickerInternalProps';
import { IPropertyPaneDocumentPickerProps } from './IPropertyPaneDocumentPickerProps';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import DocumentPicker from './components/DocumentPicker';
import { IDocumentPickerProps } from './components/IDocumentPickerProps';

/**
 * @interface
 * Represents a PropertyFieldDocumentPicker object
 *
 */
class PropertyFieldDocumentPickerBuilder implements IPropertyPaneField<IPropertyPaneDocumentPickerInternalProps> {

  //Properties defined by IPropertyPaneField
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyPaneDocumentPickerInternalProps;

  //Custom properties
  private label: string;
  private initialValue: string;
  private context: IWebPartContext;
  private onPropertyChange: (propertyPath: string, oldValue: any, newValue: any) => void;
  private customProperties: any;
  private key: string;
  private disabled: boolean = false;
  private onGetErrorMessage: (value: string) => string | Promise<string>;
  private deferredValidationTime: number = 200;
  private previewDocument: boolean = true;
  private readOnly: boolean = true;
  private allowedFileExtensions: string = ".doc,.docx,.ppt,.pptx,.xls,.xlsx,.pdf,.txt";
  private renderWebPart: () => void;
  private disableReactivePropertyChanges: boolean = false;

  /**
   * @function
   * Ctor
   */
  public constructor(_targetProperty: string, _properties: IPropertyPaneDocumentPickerInternalProps) {
    this.render = this.render.bind(this);
    this.targetProperty = _targetProperty;
    this.properties = _properties;
    this.label = _properties.label;
    this.initialValue = _properties.initialValue;
    this.context = _properties.context;
//    this.properties.onDispose = this.dispose;
//    this.properties.onRender = this.render;
    this.onPropertyChange = _properties.onPropertyChange;
    this.customProperties = _properties.properties;
    this.key = _properties.key;
    if (_properties.disabled === true)
      this.disabled = _properties.disabled;
    this.onGetErrorMessage = _properties.onGetErrorMessage;
    if (_properties.deferredValidationTime !== undefined)
      this.deferredValidationTime = _properties.deferredValidationTime;
    if (_properties.previewDocument !== undefined)
      this.previewDocument = _properties.previewDocument;
    if (_properties.readOnly === false)
      this.readOnly = _properties.readOnly;
    if (_properties.allowedFileExtensions != null && _properties.allowedFileExtensions !== undefined && _properties.allowedFileExtensions != '')
      this.allowedFileExtensions = _properties.allowedFileExtensions;
    this.render = this.render;
    if (_properties.disableReactivePropertyChanges !== undefined && _properties.disableReactivePropertyChanges != null)
      this.disableReactivePropertyChanges = _properties.disableReactivePropertyChanges;
  }

  /**
   * @function
   * Renders the ColorPicker field content
   */
  private render(elem: HTMLElement): void {
    //Construct the JSX properties
    const element: React.ReactElement<IPropertyPaneDocumentPickerProps> = React.createElement(DocumentPicker, {
      label: this.label,
      initialValue: this.initialValue,
      context: this.context,
      //targetProperty: this._targetProperty,
      //onDispose: this.dispose,
      //onRender: this.render,
      onPropertyChange: this.onPropertyChange,
      properties: this.customProperties,
      key: this.key,
      disabled: this.disabled,
      onGetErrorMessage: this.onGetErrorMessage,
      deferredValidationTime: this.deferredValidationTime,
      previewDocument: this.previewDocument,
      readOnly: this.readOnly,
      allowedFileExtensions: this.allowedFileExtensions,
      render: this.renderWebPart,
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

/**
 * @interface
 * Represents a PropertyFieldDocumentPicker object
 *
 */
export function PropertyPaneDocumentPicker(targetProperty: string, properties: IPropertyPaneDocumentPickerProps): IPropertyPaneField<IPropertyPaneDocumentPickerInternalProps> {

// implements IPropertyPaneField<IPropertyPaneDocumentPickerInternalProps> {

  //Properties defined by IPropertyPaneField
  // public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  // public targetProperty: string;
  // public properties: IPropertyPaneDocumentPickerInternalProps;

  // //Custom properties
  // private label: string;
  // private initialValue: string;
  // private context: IWebPartContext;
  // private onPropertyChange: (propertyPath: string, oldValue: any, newValue: any) => void;
  // private customProperties: any;
  // private key: string;
  // private disabled: boolean = false;
  // private onGetErrorMessage: (value: string) => string | Promise<string>;
  // private deferredValidationTime: number = 200;
  // private previewDocument: boolean = true;
  // private readOnly: boolean = true;
  // private allowedFileExtensions: string = ".doc,.docx,.ppt,.pptx,.xls,.xlsx,.pdf,.txt";
  // private renderWebPart: () => void;
  // private disableReactivePropertyChanges: boolean = false;
  // private elem: HTMLElement;
  // /**
  //  * @function
  //  * Ctor
  //  */
  // constructor(targetProperty: string, properties: IPropertyPaneDocumentPickerInternalProps) {
    var newProperties: IPropertyPaneDocumentPickerInternalProps;
    {
      this.targetProperty = targetProperty;
      this.properties = {
        label: properties.label,
        initialValue: properties.initialValue,
//        context: properties.context,
        onPropertyChange: properties.onPropertyChange,
        properties: properties.properties,
//        key: properties.key,
        disabled: properties.disabled,
        onGetErrorMessage: properties.onGetErrorMessage,
        //
        deferredValidationTime: properties.deferredValidationTime,
        previewDocument: properties.previewDocument,
        readOnly: properties.readOnly,
        allowedFileExtensions: properties.allowedFileExtensions,
        disableReactivePropertyChanges: properties.disableReactivePropertyChanges,
        //      onRender: this.render.bind(this),
        onRender: this.onRender.bind(this),
        //      onDispose: this.dispose,
        onDispose: this.onDispose.bind(this)
      };
    }
    //    this.render = this.render.bind(this);

    //    this.properties = properties;
    //    this.label = properties.label;
    //    this.initialValue = properties.initialValue;
    //    this.context = properties.context;
    //    this.properties.onDispose = this.dispose;
    //    this.properties.onRender = this.render;
    //    this.onPropertyChange = properties.onPropertyChange;
    //    this.customProperties = properties.properties;
    //    this.key = properties.key;
    // if (properties.disabled === true)
    //   this.disabled = properties.disabled;
    // this.onGetErrorMessage = properties.onGetErrorMessage;
    // if (properties.deferredValidationTime !== undefined)
    //   this.deferredValidationTime = properties.deferredValidationTime;
    // if (properties.previewDocument !== undefined)
    //   this.previewDocument = properties.previewDocument;
    // if (properties.readOnly === false)
    //   this.readOnly = properties.readOnly;
    // if (properties.allowedFileExtensions != null && properties.allowedFileExtensions !== undefined && properties.allowedFileExtensions != '')
    //   this.allowedFileExtensions = properties.allowedFileExtensions;
    //    this.renderWebPart = properties.render;
    // if (properties.disableReactivePropertyChanges !== undefined && properties.disableReactivePropertyChanges != null)
    //   this.disableReactivePropertyChanges = properties.disableReactivePropertyChanges;
    return new PropertyFieldDocumentPickerBuilder(targetProperty, newProperties);
  }

  // public render(): void {
  //   if (!this.elem) {
  //     return;
  //   }

  //   this.onRender(this.elem);
  //   //    this.onRender(this.elem);
  // }

  // private onDispose(element: HTMLElement): void {
  //   ReactDom.unmountComponentAtNode(element);
  // }

  /**
   * @function
   * Renders the ColorPicker field content
   */
  // private onRender(elem: HTMLElement): void {
  //   if (!this.elem) {
  //     this.elem = elem;
  //   }

  //   //Construct the JSX properties
  //   const element: React.ReactElement<IDocumentPickerProps> = React.createElement(DocumentPicker, {
  //     label: this.label,
  //     initialValue: this.initialValue,
  //     context: this.context,
  //     //      targetProperty: this.targetProperty,
  //     //      onDispose: this.dispose,
  //     render: this.render,
  //     onPropertyChange: this.onPropertyChange,
  //     properties: this.customProperties,
  //     key: this.key,
  //     disabled: this.disabled,
  //     onGetErrorMessage: this.onGetErrorMessage,
  //     deferredValidationTime: this.deferredValidationTime,
  //     previewDocument: this.previewDocument,
  //     readOnly: this.readOnly,
  //     allowedFileExtensions: this.allowedFileExtensions,
  //     //      onRender: this.renderWebPart,
  //     disableReactivePropertyChanges: this.disableReactivePropertyChanges
  //   });
  //   //Calls the REACT content generator
  //   ReactDom.render(element, elem);
  // }

  // // Disposes the current object
  // private dispose(elem: HTMLElement): void {

  // }

// }