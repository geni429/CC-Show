import React from 'react';
import Asset from '../assets/Asset';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContextMenu from './contextMenu/ContextMenu';

import * as slideActions from '../../../actions/slides'
import * as assetsActions from '../../../actions/assets'

import SlideTitle from './slideTitle/SlideTitle';

function getAssetNode(parent, child) {
     var node = child.parentNode;
     while (node != null) {
         if (node.tagName == parent) {
             return node;
         }
         node = node.parentNode;
     }
     return null;
}

function clearSelection() {
if (window.getSelection) {
    window.getSelection().removeAllRanges();
} else if (document.selection) {
    document.selection.empty();
}
}

class SlideContext extends React.Component{

  /* mouseDowned
   * xInElement
   * yInElement
  */
  constructor(props){
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseRelese = this.handleMouseRelese.bind(this);
    this.handleDoubleClickItem = this.handleDoubleClickItem.bind(this);

    this.state = {doubleClicked: false};

    this.mouseAction = 'none';
    this.xInElement = 0;
    this.yInElement = 0;
    this.selectedAsset = undefined;
    this.resizeTarget = undefined;
    this.selectedAssetId = undefined;
  }

    render(){
      let renderingAssets = (assets) => {
        let idx = 0;
        return assets.map((asset)=>{
          let assetKey = this.props.currentSilde+'-'+asset.id+'-'+this.props.currentSilde;
          let assetValue = this.props.setAssetValue;
          let isSelected = false;
          if(this.props.selectedAsset==idx++){
            this.selectedAsset = asset;
            isSelected = true;
          }
          return <Asset key={assetKey} isSelected={isSelected} doubleClicked={this.state.doubleClicked} handleValueChange={assetValue} attribute={asset}/>
        })
      };
      return (
        <div className={this.props.className} id={'SlideContext'}>
        <SlideTitle/>
        <ContextMenu/>
        <scanvas
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseRelese}
        onMouseLeave={this.handleMouseRelese}
        onDoubleClick={this.handleDoubleClickItem}>
          {renderingAssets(this.props.assets)}
          </scanvas>
        </div>
      );
    }

    componentDidMount(){

    }

    handleDoubleClickItem(e){
      this.setState({doubleClicked: true});
    }

    handleMouseMove(e){
      if(this.props.selectedAsset != undefined&&this.mouseAction!='none'){
        if(this.selectedAsset.type=='ASSET_TYPE_VIDEO'&&this.selectedAsset.preview){
          this.mouseAction='none';
          return;
        }
        if(this.mouseAction=='move'){
          let x = e.pageX;
          let y = e.pageY;
          let afterX = parseInt(this.percentWidthToPixel(this.selectedAsset.x)) + (x - this.xInElement) +'px';
          let afterY = parseInt(this.percentHeightToPixel(this.selectedAsset.y)) + (y - this.yInElement) + 'px';
          this.xInElement = x;
          this.yInElement = y;
          if(this.selectedAsset.x.endsWith('%')){
            afterX = this.pixelWidthToPercent(afterX);
            afterY = this.pixelHeightToPercent(afterY);
          }
          this.props.setAssetXY(afterX, afterY);
        } else if(this.mouseAction=='resize'){
          let devX = (this.resizeTarget.includes('left'))? this.xInElement - e.pageX : e.pageX - this.xInElement;
          let devY = (this.resizeTarget.includes('top'))? this.yInElement - e.pageY : e.pageY - this.yInElement;
          let currentX = parseInt(this.percentHeightToPixel(this.selectedAsset.x));
          let currentY = parseInt(this.percentWidthToPixel(this.selectedAsset.y));
          let currentWidth = parseInt(this.percentWidthToPixel(this.selectedAsset.width));
          let currentHeight = parseInt(this.percentHeightToPixel(this.selectedAsset.height));
          let afterHeight = currentHeight+devY+'px';
          let afterWidth = currentWidth+devX+'px';
          let afterX = currentX-devX+'px';
          let afterY = currentY-devY+'px';
          if(parseInt(afterWidth)<5||parseInt(afterHeight)<5){
            return;
          }
          if(this.selectedAsset.x.endsWith('%')){
            afterY = this.pixelHeightToPercent(afterY);
            afterX = this.pixelWidthToPercent(afterX);
          }
          if(this.selectedAsset.width.endsWith('%')){
              afterHeight = this.pixelHeightToPercent(afterHeight);
              afterWidth = this.pixelWidthToPercent(afterWidth);
          }
          let modifyAttrs;
          switch(this.resizeTarget){
            case 'topleft':
              modifyAttrs = {'height':afterHeight, 'y':afterY, 'width':afterWidth, 'x':afterX};
              break;
            case 'topright':
              modifyAttrs = {'height':afterHeight, 'y':afterY, 'width':afterWidth};
              break;
            case 'bottomleft':
              modifyAttrs = {'height':afterHeight, 'width':afterWidth, 'x':afterX};
              break;
            case 'bottomright':
              modifyAttrs = {'height':afterHeight, 'width':afterWidth};
              break;
            case 'top':
              modifyAttrs = {'height':afterHeight, 'y':afterY};
              break;
            case 'left':
              modifyAttrs = {'width':afterWidth, 'x':afterX};
              break;
            case 'bottom':
              modifyAttrs = {'height':afterHeight};
              break;
            case 'right':
              modifyAttrs = {'width':afterWidth};
              break;
          }
          this.props.setAttributes(modifyAttrs);
          this.xInElement = e.pageX;
          this.yInElement = e.pageY;
        }
      }
    }

    handleMouseDown(e){
      document.activeElement.blur();
      e.target.focus();
      this.mouseDowned = true;

      if(!!getAssetNode('ASSET', e.target)){
        if(this.selectedAssetId==getAssetNode('ASSET', e.target).id&&this.state.doubleClicked){
          this.props.assetDeselected();
          return;
        }
        this.setState({doubleClicked: false});
        this.selectedAssetId = getAssetNode('ASSET', e.target).id;
          this.props.assetSelected(this.selectedAssetId);
          this.mouseAction = 'move';
          if(e.target.tagName=='SELECTORDOT'||e.target.tagName=='SELECTORLINE'){
            this.mouseAction = 'resize';
            this.resizeTarget = e.target.getAttribute('target');
          }
          this.xInElement = e.pageX;
          this.yInElement = e.pageY;
          e.preventDefault();
      }else{
        this.setState({doubleClicked: false});
        this.selectedAssetId = undefined;
        this.props.assetDeselected();
        e.preventDefault();
        clearSelection();
      }
    }

    handleMouseRelese(e){
      this.mouseAction = 'none';
      let txt = (document.all) ? window.selection.createRange() : window.getSelection();
      let start = txt.anchorOffset;
      let end = txt.focusOffset;
      if(start>end){
        start = txt.focusOffset;
        end = txt.anchorOffset;
      }
      this.props.setTextSelectionRange(start, end);
    }

    percentHeightToPixel(val){
      if(val.endsWith('%')){
        return parseInt(val)/100*parseInt(this.height) +'px';
      }
      return val;
    }

    percentWidthToPixel(val){
      if(val.endsWith('%')){
        return parseInt(val)/100*parseInt(this.width) +'px';
      }
      return val;
    }


    pixelHeightToPercent(val){
      if(val.endsWith('px')){
        return parseInt(val)/parseInt(this.height)*100 +'%';
      }
      return val;
    }

    pixelWidthToPercent(val){
      if(val.endsWith('px')){
        return parseInt(val)/parseInt(this.width)*100 +'%';
      }
      return val;
    }
}

const mapStateToProps = (state) => {
  if(state.editor.slides.length > 0 && !!state.editor.slides[state.editor.selectedSlide]){
    return {
      currentSilde: state.editor.selectedSlide,
      selectedAsset: state.editor.slides[state.editor.selectedSlide].selectedAsset,
      assets: state.editor.slides[state.editor.selectedSlide].assets
    }
  } else {
    return{
      selectedAsset: -1,
      assets: []
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...assetsActions, ...slideActions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideContext);
