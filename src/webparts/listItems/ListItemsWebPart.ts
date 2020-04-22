import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ListItemsWebPartStrings';
import ListItems from './components/ListItems';
import { IListItemsProps } from './components/IListItemsProps';

import { PropertyPaneAsyncDropdown } from '../../controls/PropertyPaneAsyncDropdown/PropertyPaneAsyncDropdown';
import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { update, get } from '@microsoft/sp-lodash-subset';


import { PropertyPaneDocumentPicker } from '../../controls/PropertyPaneDocumentPicker/PropertyPaneDocumentPicker';
import { PropertyPaneAlignPicker } from '../../controls/PropertyPaneAlignPicker/PropertyPaneAlignPicker';
import { PropertyPaneAutoComplete } from '../../controls/PropertyPaneAutoComplete/PropertyPaneAutoComplete';
import { PropertyPaneAlignPicker1 } from '../../controls/PropertyPaneAlignPicker1/PropertyPaneAlignPicker1';


const packageSolution: any = require("../../../config/package-solution.json");

export interface IListItemsWebPartProps {
  listNameSimple: string;
  listName: string;
  item: string;
  documentUrl: string;
  align1: string;
  align: string;
  autoSuggest: string;
}



export default class ListItemsWebPart extends BaseClientSideWebPart<IListItemsWebPartProps> {

  private itemsDropDown: PropertyPaneAsyncDropdown;

  private loadItems(): Promise<IDropdownOption[]> {
    if (!this.properties.listName) {
      // resolve to empty options since no list has been selected
      return Promise.resolve();
    }

    const wp: ListItemsWebPart = this;

    return new Promise<IDropdownOption[]>((resolve: (options: IDropdownOption[]) => void, reject: (error: any) => void) => {
      setTimeout(() => {
        const items = {
          sharedDocuments: [
            {
              key: 'spfx_presentation.pptx',
              text: 'SPFx for the masses'
            },
            {
              key: 'hello-world.spapp',
              text: 'hello-world.spapp'
            }
          ],
          myDocuments: [
            {
              key: 'isaiah_cv.docx',
              text: 'Isaiah CV'
            },
            {
              key: 'isaiah_expenses.xlsx',
              text: 'Isaiah Expenses'
            }
          ]
        };
        resolve(items[wp.properties.listName]);
      }, 2000);
    });
  }

  private loadLists(): Promise<IDropdownOption[]> {
    return new Promise<IDropdownOption[]>((resolve: (options: IDropdownOption[]) => void, reject: (error: any) => void) => {
      setTimeout(() => {
        resolve([{
          key: 'sharedDocuments',
          text: 'Shared Documents'
        },
        {
          key: 'myDocuments',
          text: 'My Documents'
        }]);
      }, 2000);
    });
  }

  private onListChange(propertyPath: string, newValue: any): void {
    const oldValue: any = get(this.properties, propertyPath);
    // store new value in web part properties
    update(this.properties, propertyPath, (): any => { return newValue; });
    // reset selected item
    this.properties.item = undefined;
    // store new value in web part properties
    update(this.properties, 'item', (): any => { return this.properties.item; });
    // refresh web part
    this.render();
    // reset selected values in item dropdown
    this.itemsDropDown.properties.selectedKey = this.properties.item;
    // allow to load items
    this.itemsDropDown.properties.disabled = false;
    // load items and re-render items dropdown
    this.itemsDropDown.render();
  }

  private onAlignPickerChange1(propertyPath: string, newValue: any): void {
    const oldValue: any = get(this.properties, propertyPath);
    // store new value in web part properties
    update(this.properties, 'align1', (): any => { return newValue; });
    // refresh web part
    this.render();
  }

  private onAlignPickerChange( newValue: any): void {
    // store new value in web part properties
    update(this.properties, 'align', (): any => { return newValue; });
    // refresh web part
    this.render();
  }
    private onListItemChange(propertyPath: string, newValue: any): void {
    const oldValue: any = get(this.properties, propertyPath);
    // store new value in web part properties
    update(this.properties, propertyPath, (): any => { return newValue; });
    // refresh web part
    this.render();
  }

  private onAutoCompleteChange(newValue: any): void {
    // store new value in web part properties
//    update(this.properties, this.properties.autoSuggest, (): any => { return newValue; });
    update(this.properties, 'autoSuggest', (): any => { return newValue; });
    // refresh web part
    this.render();
  }

  public render(): void {
    const element: React.ReactElement<IListItemsProps> = React.createElement(
      ListItems,
      {
        listNameSimple: this.properties.listNameSimple,
        listName: this.properties.listName,
        item: this.properties.item,
        align1: this.properties.align1,
        align: this.properties.align,
        autoSuggest: this.properties.autoSuggest
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any) {
    const value: any = get(this.properties, propertyPath);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    // reference to item dropdown needed later after selecting a list
    this.itemsDropDown = new PropertyPaneAsyncDropdown('item', {
      label: strings.ItemFieldLabel,
      loadOptions: this.loadItems.bind(this),
      onPropertyChange: this.onListItemChange.bind(this),
      selectedKey: this.properties.item,
      // should be disabled if no list has been selected
      disabled: !this.properties.listName
    });

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription + " Version : " + packageSolution.solution.version
          },
          groups: [
            // {
            //   groupName: "About",
            //   groupFields: [
            //     PropertyPaneWebPartInformation({
            //       description: "Version: " + (<any>packageSolution).solution.version,
            //       key: 'webPartInfoId'
            //     }),
            //   ],
            // },
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('listNameSimple', {
                  label: strings.ListFieldLabel
                }),
                new PropertyPaneAsyncDropdown('listName', {
                  label: strings.ListFieldLabel,
                  loadOptions: this.loadLists.bind(this),
                  onPropertyChange: this.onListChange.bind(this),
                  selectedKey: this.properties.listName
                }),
                this.itemsDropDown,
                //                  PropertyPaneDocumentPicker('document', {
                //                   label: strings.DocumentFieldLabel,
                //                   initialValue: this.properties.documentUrl,
                //                   onPropertyChange: this.onPropertyPaneFieldChanged,
                // //                  onRender: this.render.bind(this),
                //                   render: this.render.bind(this),
                //                   disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                //                   context: this.context,
                //                   properties: this.properties,
                //                   disabled: false,
                //                   readOnly: true,
                //                   previewDocument: true,
                //                   allowedFileExtensions: '.doc,.docx,.ppt,.pptx,.xls,.xlsx,.pdf,.txt',
                //                   onGetErrorMessage: null,
                //                   deferredValidationTime: 0,
                //                   key: 'documentFieldId'
                //                 })
                new PropertyPaneAlignPicker1('align1', {
                  label: strings.AlignFieldLabel1,
//                  mode:this.properties.align1,
                  initialValue: this.properties.align1,
                  onPropertyChange: this.onAlignPickerChange1.bind(this),
//                  onPropertyChange: this.onAfterPropertyPaneChangesApplied,                  
                  selectedAlign: this.properties.align1
                }),
                new PropertyPaneAlignPicker('align', {
                  label: strings.AlignFieldLabel,
                  initialValue: this.properties.align,
                  onPropertyChanged: this.onAlignPickerChange.bind(this),
                  //onPropertyChanged: this.onListChange.bind(this),
                  //                  render: this.render.bind(this),
                  //                  disableReactivePropertyChanges: this.disableReactivePropertyChanges,
//                  disableReactivePropertyChanges: false,

                  //                  properties: this.properties,
                  disabled: false,
                  //                  onGetErrorMessage: null,
//                  deferredValidationTime: 0,
                  //                  key: 'alignFieldId'
                }),
                new PropertyPaneAutoComplete('autoSuggest', {
                  label: strings.AutoSuggestFieldLabel,
                  placeHolder: 'Select a state',
                  initialValue: this.properties.autoSuggest,
                  suggestions: [
                    "Alabama",
                    "Alaska",
                    "Arizona",
                    "Arkansas",
                    "California",
                    "Colorado",
                    "Connecticut",
                    "Delaware",
                    "Florida",
                    "Georgia",
                    "Hawaii",
                    "Idaho",
                    "Illinois",
                    "Indiana",
                    "Iowa",
                    "Kansas",
                    "Kentucky",
                    "Louisiana",
                    "Maine",
                    "Maryland",
                    "Massachusetts",
                    "Michigan",
                    "Minnesota",
                    "Mississippi",
                    "Missouri",
                    "Montana",
                    "Nebraska",
                    "Nevada",
                    "New Hampshire",
                    "New Jersey",
                    "New Mexico",
                    "New York",
                    "North Carolina",
                    "North Dakota",
                    "Ohio",
                    "Oklahoma",
                    "Oregon",
                    "Pennsylvania",
                    "Rhode Island",
                    "South Carolina",
                    "South Dakota",
                    "Tennessee",
                    "Texas",
                    "Utah",
                    "Vermont",
                    "Virginia",
                    "Washington",
                    "West Virginia",
                    "Wisconsin",
                    "Wyoming"
                  ],
                  onPropertyChanged: this.onAutoCompleteChange.bind(this),
                  //                  onPropertyChanged: this.onAutoCompleteChange.bind(this),
                  //                  render: this.render.bind(this),
//                  disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                  //                  properties: this.properties,
                  disabled: false,
                  //                  onGetErrorMessage: null,
//                  deferredValidationTime: 0,
                  //                  key: 'autoSuggestFieldId'
                })

              ]
            }
          ]
        }
      ]
    };
  }
}
