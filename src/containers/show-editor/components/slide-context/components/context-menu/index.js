import React from 'react';

import styles from './style.css';

function getAssetNode(parent, child) {
  var node = child;
  while (node != null) {
    if (node.tagName == parent) {
      return node;
    }
    node = node.parentNode;
  }
  return null;
}

const propTypes = {
  cachedAsset: React.PropTypes.object,
  actions: React.PropTypes.object.isRequired
}

class ContextMenu extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      x: 0,
      y: 0,
      assetId: undefined,
      copyAsset: undefined,
      targetAssetId: undefined
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);
  }

  componentDidMount () {
    document.getElementById('SlideContext').addEventListener('contextmenu', this.handleContextMenu);
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    document.getElementById('SlideContext').parentNode.removeEventListener('contextmenu', this.handleContextMenu);
    document.removeEventListener('click', this.handleClick);
  }

  render() {
    const { visible } = this.state;

    return(visible || null) &&
            <div>
              <div className={styles.contextMenu}
                ref={root => {this.root = root}}
                style={{'left':this.state.x, 'top':this.state.y}}
              >
                <div className={styles.content}>
                  <div className={styles.option+' '+((this.state.assetId)?'':styles.disabled)}
                    onClick={this.handleOptionClick}
                  >복사<div className={styles.shortcut}>Ctrl + C</div></div>
                  <div className={styles.option+' '+((this.props.cachedAsset)?'':styles.disabled)}
                    onClick={this.handleOptionClick}
                  >붙여넣기<div className={styles.shortcut}>Ctrl + V</div></div>
                  <div className={styles.option+' '+((this.state.assetId)?'':styles.disabled)}
                    onClick={this.handleOptionClick}
                  >삭제<div className={styles.shortcut}>Ctrl + D</div></div>
                  <div className={styles.option+' '+((this.state.assetId)?'':styles.disabled)}
                    onClick={this.handleOptionClick}
                  >잘라내기<div className={styles.shortcut}>Ctrl + X</div></div>
                  <div className={styles.separator}/>
                  <div className={styles.option+' '+((this.state.assetId)?'':styles.disabled)}>정렬<div className={styles.submenu} />
                    <div className={styles.contextMenu}>
                      <div className={styles.content}>
                        <div className={styles.option}
                          onClick={this.handleOptionClick}
                          style={{'width': '190px'}}
                        >맨 앞으로 가져오기<div className={styles.shortcut}>SHIFT+CTRL+]</div></div>
                        <div className={styles.option}
                          onClick={this.handleOptionClick}
                        >앞으로 가져오기<div className={styles.shortcut}>CTRL+]</div></div>
                        <div className={styles.option}
                          onClick={this.handleOptionClick}
                        >뒤로 보내기<div className={styles.shortcut}>CTRL+[</div></div>
                        <div className={styles.option}
                          onClick={this.handleOptionClick}
                        >맨 뒤로 보내기<div className={styles.shortcut}>SHIFT+CTRL+[</div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  }

  handleOptionClick(event){
    let action = event.target.textContent;
    if(action.includes('붙여넣기')&&!!this.props.cachedAsset){
      this.props.actions.pasteAsset(this.state.x+'px', this.state.y+'px');
    }else if(this.state.assetId){
      if(action.includes('복사')){
        this.props.actions.copyAsset(this.state.assetId);
      }else if(action.includes('삭제')){
        this.props.actions.deleteAsset(this.state.assetId);
      }else if(action.includes('잘라내기')){
        this.props.actions.cutAsset(this.state.assetId);
      }else if(action.includes('맨 앞으로 가져오기')){
        this.props.actions.sortFirstAsset(this.state.assetId);
      }else if(action.includes('앞으로 가져오기')){
        this.props.actions.sortFrontAsset(this.state.assetId);
      }else if(action.includes('뒤로 보내기')){
        this.props.actions.sortBackAsset(this.state.assetId);
      }else if(action.includes('맨 뒤로 보내기')){
        this.props.actions.sortLastAsset(this.state.assetId);
      }
    }
  }

  handleContextMenu(event){
    let enable = false;
    let pasteable = false;
    let assetId = undefined;
    if(getAssetNode('ASSET', event.target)){
      enable = true;
      assetId = getAssetNode('ASSET', event.target).id;
    }
    if(this.cachedAsset){
      pasteable = true;
    }
    event.preventDefault();
    this.setState({ visible: true, enable, pasteable, assetId });
    let rect = document.getElementById('SlideContext').getBoundingClientRect();
    let right = rect.right;
    let bottom = rect.bottom;
    let left = rect.left;
    let top = rect.top;
    let x = event.pageX - left;
    let y = event.pageY - top;

    if(right-event.pageX<this.root.offsetWidth){
      x -= this.root.offsetWidth;
    }
    if(bottom-event.pageY<this.root.offsetHeight){
      y -= this.root.offsetHeight;
    }
    this.setState({ x, y });
  }

  handleClick(event){
    if (this.state.visible) this.setState({ visible: false });
  }
}
ContextMenu.propTypes = propTypes;
export default ContextMenu;
