//import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';


export interface IDocumentPickerState {
  openPanel?: boolean;
  openRecent?: boolean;
  openSite?: boolean;
  openUpload?: boolean;
  recentImages?: string[];
  selectedImage: string;
  errorMessage?: string;
}