import * as React from 'react';
import styles from './ListItems.module.scss';
import { IListItemsProps } from './IListItemsProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class ListItems extends React.Component<IListItemsProps, {}> {
  public render(): React.ReactElement<IListItemsProps> {
    return (
      <div className={styles.listItems}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1" >
              <span className="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p className="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p className="ms-font-l ms-fontColor-white">{escape(`listName Simple:${this.props.listNameSimple}`)}</p>
              <p className="ms-font-l ms-fontColor-white">{escape(`listName :${this.props.listName}`)}</p>
              <p className="ms-font-l ms-fontColor-white">{escape(`Item :${this.props.item}`)}</p>
              <p className="ms-font-l ms-fontColor-white">{escape(`AlignPicker 1 :${this.props.align1}`)}</p>
              <p className="ms-font-l ms-fontColor-white">{escape(`AlignPicker :${this.props.align}`)}</p>
              <p className="ms-font-l ms-fontColor-white">{escape(`Auto Complete Text :${this.props.autoSuggest}`)}</p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
