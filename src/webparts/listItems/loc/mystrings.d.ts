declare interface IListItemsWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ListFieldLabel: string;
  ItemFieldLabel: string;
  DocumentFieldLabel: string;
  //DocumentPicker labels
  DocumentPickerTitle: string;
  DocumentPickerRecent: string;
  DocumentPickerSite: string;
  DocumentPickerButtonSelect: string;
  DocumentPickerButtonReset: string;
  AlignFieldLabel: string;
  AutoSuggestFieldLabel: string;
}

declare module 'ListItemsWebPartStrings' {
  const strings: IListItemsWebPartStrings;
  export = strings;
}
