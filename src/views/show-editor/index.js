import React from 'react';
import SideController from './components/side-controller';
import AssetController from './components/asset-controller';
import AssetManager from 'components/dialog/asset-manager';
import SlideContext from './components/slide-context';
import SlideManager from './components/slide-manager';
import ColorPicker from 'components/dialog/color-picker';
import SlideShow from './components/slide-show-dialog';
import ProgressDialog from 'components/dialog/progress';
import dialogs from 'services/ui/dialogs';

import * as editorActions from 'services/editor/actions';
import * as uiActions from 'services/ui/actions';
import * as accountActions from 'services/account/actions';

import classnames from 'classnames';

import {bindActionCreators} from 'redux';

import styles from './style.css';
import {connect} from 'react-redux';
import * as assetTypes from 'services/editor/asset/assetTypes';

class ShowEditor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {showId: undefined};

    this.checkContextDisabled = this.checkContextDisabled.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onUnload = this.onUnload.bind(this);
  }

  render() {
    let renderDialogs = () => {
      if (this.props.ui.dialog != undefined) {
        switch (this.props.ui.dialog) {
          case dialogs.ASSET_STORE:
            return (<AssetManager />);
          case dialogs.COLOR_PICKER:
            return (<ColorPicker />)
          case dialogs.SLIDE_SHOW:
            return (<SlideShow />);
          case dialogs.PROGRESS:
            return (<ProgressDialog />);
        }
      }
    }
    let contextDisabled = this.checkContextDisabled();
    return (
      <div className={styles.showEditor}
        ref={root => {this.root = root}}
      >
        <SideController account={this.props.account}
          buttonMap={this.sideControllerActions}
          className={styles.sideController}
        />
        <SlideManager
          className={classnames(styles.slideManager, (this.props.visibleSlideManager ? styles.show : ''))}
          currentSlideIndex={this.props.showData.selectedSlide}
          editorActions={this.props.editorActions}
          slides={this.props.showData.slides}
          uiActions={this.props.uiActions}
        />
        {renderDialogs()}
        <div className={classnames(styles.contextWrap, (contextDisabled ? styles.disabled : ''))}>
          <div className={styles.contextSpace}>
            <SlideContext
              className={styles.slideContext}
              editorActions={this.props.editorActions}
              onModified={() => this.props.editorActions.saveShowDataAfterTimeout(this.props.showId)}
              showData={this.props.showData}
            />
          </div>
        </div>
        <AssetController className={styles.assetController} />
      </div>
    );
  }

  get sideControllerActions(){
    return [
      [
        { label: '텍스트',  action: () => this.props.editorActions.createAssetByType(assetTypes.TYPE_TEXT) },
        { label: '이미지',  action: () => this.props.editorActions.createAssetByType(assetTypes.TYPE_IMAGE) },
        { label: '비디오',  action: () => this.props.editorActions.createAssetByType(assetTypes.TYPE_VIDEO) },
        { label: '도형',  action: () => this.props.editorActions.createAssetByType(assetTypes.TYPE_SHAPE) },
        { label: '표',  action: () => this.props.editorActions.createAssetByType(assetTypes.TYPE_TABLE) },
        { label: '기타',  action: () => this.props.uiActions.toggleAssetStore() }
      ],
      [
        { label: '슬라이드 리스트',  action: () => this.props.uiActions.toggleSlideManager() },
        { label: '슬라이드 쇼',  action: () => this.props.uiActions.toggleSlideShow() }
      ]
    ];
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown, true);
    window.addEventListener('beforeunload', this.onUnload);
    this.props.editorActions.loadShowData();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('beforeunload', this.onUnload)
  }

  handleKeyDown(e) {
    if (e.keyCode === 27) {
      this.props.uiActions.releaseDialog();
    } else if ((e.which == 83 && e.ctrlKey)) {
      this.props.editorActions.saveShowData(this.props.showId);
      e.preventDefault()
    }
  }

  onUnload(event) {
    return event.returnValue = '발표자료를 저장하셨나요? (Ctrl + S)';
  }

  checkContextDisabled() {
    let check = false;
    if (this.props.visibleSlideManager || this.props.ui.dialog != undefined) {
      check = true;
    }
    return check;
  }

}

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    showData: state.editor,
    account: state.account,
    visibleSlideManager: state.ui.visibleSlideManager,
    showId: state.editor.showId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    accountActions : bindActionCreators(accountActions, dispatch),
    uiActions : bindActionCreators(uiActions, dispatch),
    editorActions : bindActionCreators(editorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowEditor);
