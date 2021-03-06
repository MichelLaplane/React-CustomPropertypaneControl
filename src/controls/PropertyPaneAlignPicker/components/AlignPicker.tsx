/**
 * @file PropertyFieldAlignPickerHost.tsx
 * Renders the controls for PropertyFieldAlignPicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
//import { IAlignPickerProps } from './IAlignPickerProps';
import { IPropertyPaneAlignPickerInternalProps } from '../IPropertyPaneAlignPickerInternalProps';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import GuidHelper from '../../../Shared/GuidHelper';
import styles from '../../../Shared/PropertyFields.module.scss';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
//import '@microsoft/sp-office-ui-fabric-core/dist/sass';
//@import '~@microsoft/sp-office-ui-fabric-core/dist/sass/SPFabricCore.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import { IAlignPickerState } from './IAlignPickerState';
import { IAlignPickerProps } from '././IAlignPickerProps';


/**
 * 
 * Renders the controls for PropertyFieldAlignPicker component
 */
export default class AlignPicker extends React.Component<IAlignPickerProps, IAlignPickerState> {

  private latestValidateValue: string;
  private _key: string;

  /**
   * @function
   * Constructor
   */
  constructor(props: IAlignPickerProps) {
    super(props);

    this.onClickBullets = this.onClickBullets.bind(this);
    this.onClickTiles = this.onClickTiles.bind(this);
    this.onClickRight = this.onClickRight.bind(this);
    this.mouseListEnterDropDown = this.mouseListEnterDropDown.bind(this);
    this.mouseListLeaveDropDown = this.mouseListLeaveDropDown.bind(this);
    this.mouseTilesEnterDropDown = this.mouseTilesEnterDropDown.bind(this);
    this.mouseTilesLeaveDropDown = this.mouseTilesLeaveDropDown.bind(this);
    this.mouseRightEnterDropDown = this.mouseRightEnterDropDown.bind(this);
    this.mouseRightLeaveDropDown = this.mouseRightLeaveDropDown.bind(this);
    this._key = GuidHelper.getGuid();

    this.state = {
      mode: this.props.initialValue != null && this.props.initialValue != '' ? this.props.initialValue : '',
      overList: false,
      overTiles: false,
      overRight: false,
      errorMessage: ''
    };
  }

  public componentDidMount(): void {
  }

  public componentDidUpdate(prevProps: IAlignPickerProps, prevState: IAlignPickerState): void {
    if ((this.state.mode) && (this.state.mode !== this.latestValidateValue)) {
      this.latestValidateValue = this.state.mode;
      this.setState(this.state);
    }
  }

  /**
   * @function
   * Called when the component will unmount
   */
  public componentWillUnmount() {
  }

  private onClickBullets(element?: any) {
    var previous = this.state.mode;
    this.state = {
      mode: 'left'
    };
    this.setState(this.state);
  }

  private onClickTiles(element?: any) {
    var previous = this.state.mode;
    this.state = {
      mode: 'center'
    };
    this.setState(this.state);
  }

  private onClickRight(element?: any) {
    var previous = this.state.mode;
    this.state = {
      mode: 'right'
    };
    this.setState(this.state);
  }

  private mouseListEnterDropDown() {
    if (this.props.disabled === true)
      return;
    this.state = {
      overList: true
    };
    this.setState(this.state);
  }

  private mouseListLeaveDropDown() {
    if (this.props.disabled === true)
      return;
    this.state = {
      overList: false
    };
    this.setState(this.state);
  }

  private mouseTilesEnterDropDown() {
    if (this.props.disabled === true)
      return;
    this.state = {
      overTiles: true
    };
    this.setState(this.state);
  }

  private mouseTilesLeaveDropDown() {
    if (this.props.disabled === true)
      return;
    this.state = {
      overTiles: false
    };
    this.setState(this.state);
  }

  private mouseRightEnterDropDown() {
    if (this.props.disabled === true)
      return;
    this.state = {
      overRight: true
    };
    this.setState(this.state);
  }

  private mouseRightLeaveDropDown() {
    if (this.props.disabled === true)
      return;
    this.state = {
      overRight: false
    };
    this.setState(this.state);
  }
  private onPropertyChanged(newValue: string): void {
    if (this.props.onPropertyChanged && newValue != null) {
      if (this.props.onPropertyChanged) {
//        this.latestValidateValue = newValue;
        this.props.onPropertyChanged(newValue);
      }
    }
  }

  /**
   * @function
   * Renders the controls
   */
  public render(): JSX.Element {
    var backgroundTiles = this.state.overTiles ? '#DFDFDF' : '';
    var backgroundLists = this.state.overList ? '#DFDFDF' : '';
    var backgroundRight = this.state.overRight ? '#DFDFDF' : '';
    this.onPropertyChanged(this.latestValidateValue);
    if (this.state.mode == 'left')
      backgroundLists = '#EEEEEE';
    if (this.state.mode == 'center')
      backgroundTiles = '#EEEEEE';
    if (this.state.mode == 'right')
      backgroundRight = '#EEEEEE';

    var styleLeft = styles['spcfChoiceFieldField'];
    var styleCenter = styles['spcfChoiceFieldField'];
    var styleRight = styles['spcfChoiceFieldField'];
    if (this.state.mode === 'left')
      styleLeft += ' is-checked';
    else if (this.state.mode === 'center')
      styleCenter += ' is-checked';
    else if (this.state.mode === 'right')
      styleRight += ' is-checked';
    if (this.props.disabled === true) {
      styleLeft += ' is-disabled';
      styleCenter += ' is-disabled';
      styleRight += ' is-disabled';
    }

    //Renders content
    return (
      <div style={{ marginBottom: '8px' }}>
        <Label>{this.props.label}</Label>

        <div style={{ display: 'inline-flex' }}>
          <div style={{ cursor: this.props.disabled === false ? 'pointer' : 'default', width: '70px', marginRight: '30px', backgroundColor: backgroundLists }}
            onMouseEnter={this.mouseListEnterDropDown} onMouseLeave={this.mouseListLeaveDropDown}>
            <div style={{ float: 'left' }} className={styles['spcfChoiceField']}>
              <input id={"leftRadio-" + this._key} className={styles['spcfChoiceFieldInput']}
                disabled={this.props.disabled}
                onChange={this.onClickBullets} type="radio" role="radio" name={"align-picker-" + this._key}
                defaultChecked={this.state.mode == "left" ? true : false}
                aria-checked={this.state.mode == "left" ? true : false}
                value="left" style={{ cursor: this.props.disabled === false ? 'pointer' : 'default', width: '18px', height: '18px', opacity: 0 }} />
              <label htmlFor={"leftRadio-" + this._key} className={styleLeft}>
                <div className={styles['spcfChoiceFieldInnerField']}>
                  <div className={styles['spcfChoiceFieldIconWrapper_b5c1b963']}>
                    <Icon iconName='AlignLeft' style={{ cursor: this.props.disabled === false ? 'pointer' : 'default', fontSize: '32px', paddingLeft: '30px', color: this.props.disabled === false ? '#808080' : '#A6A6A6' }} />
                  </div>
                </div>
              </label>
            </div>
          </div>
          <div style={{ cursor: this.props.disabled === false ? 'pointer' : 'default', width: '70px', marginRight: '30px', backgroundColor: backgroundTiles }}
            onMouseEnter={this.mouseTilesEnterDropDown} onMouseLeave={this.mouseTilesLeaveDropDown}>
            <div style={{ float: 'left' }} className={styles['spcfChoiceField']}>
              <input id={"centerRadio-" + this._key} className={styles['spcfChoiceFieldInput']}
                onChange={this.onClickTiles} type="radio" name={"align-picker-" + this._key} role="radio"
                disabled={this.props.disabled}
                defaultChecked={this.state.mode == "center" ? true : false}
                aria-checked={this.state.mode == "center" ? true : false}
                value="center" style={{ cursor: this.props.disabled === false ? 'pointer' : 'default', width: '18px', height: '18px', opacity: 0 }} />
              <label htmlFor={"centerRadio-" + this._key} className={styleCenter}>
                <div className={styles['spcfChoiceFieldInnerField']}>
                  <div className={styles['spcfChoiceFieldIconWrapper']}>
                    <Icon iconName='AlignCenter' style={{ cursor: this.props.disabled === false ? 'pointer' : 'default', fontSize: '32px', paddingLeft: '30px', color: this.props.disabled === false ? '#808080' : '#A6A6A6' }} />
                  </div>
                </div>
              </label>
            </div>
          </div>
          <div style={{ cursor: this.props.disabled === false ? 'pointer' : 'default', width: '70px', marginRight: '30px', backgroundColor: backgroundRight }}
            onMouseEnter={this.mouseRightEnterDropDown} onMouseLeave={this.mouseRightLeaveDropDown}>
            <div style={{ float: 'left' }} className={styles['spcfChoiceField']}>
              <input id={"rightRadio-" + this._key} className={styles['spcfChoiceFieldInput']}
                onChange={this.onClickRight} type="radio" name={"align-picker-" + this._key} role="radio"
                disabled={this.props.disabled}
                defaultChecked={this.state.mode == "right" ? true : false}
                aria-checked={this.state.mode == "right" ? true : false}
                value="right" style={{ cursor: this.props.disabled === false ? 'pointer' : 'default', width: '18px', height: '18px', opacity: 0 }} />
              <label htmlFor={"rightRadio-" + this._key} className={styleRight} >
                <div className={styles['spcfChoiceFieldInnerField']}>
                  <div className={styles['spcfChoiceFieldIconWrapper']}>
                    <Icon iconName='AlignRight' style={{ cursor: this.props.disabled === false ? 'pointer' : 'default', fontSize: '32px', paddingLeft: '30px', color: this.props.disabled === false ? '#808080' : '#A6A6A6' }} />
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
        {this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
          <div><div aria-live='assertive' className='ms-u-screenReaderOnly' data-automation-id='error-message'>{this.state.errorMessage}</div>
            <span>
              <p className='ms-TextField-errorMessage ms-u-slideDownIn20'>{this.state.errorMessage}</p>
            </span>
          </div>
          : ''}
      </div>
    );
  }
}
