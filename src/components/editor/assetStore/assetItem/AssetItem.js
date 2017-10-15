import React from 'react';
import styles from './AssetItem.css';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/asseteditor';
import Store from '../../../../store';
import { bindActionCreators } from 'redux';
import * as uiActions from '../../../../actions/ui';

const propTypes = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  subTitle: React.PropTypes.string.isRequired,
  star: React.PropTypes.number.isRequired,
  thumbnail: React.PropTypes.string.isRequired,
  useAsset: React.PropTypes.func.isRequired
}

class AssetItem extends React.Component{

  constructor(props){
    super(props);
    
    this.onClick = this.onClick.bind(this);
  }

  render(){

      // <div className={styles.imgBtn}><img src={'/images/ic_move_in_box_gray.png'}/></div>
      // <div className={styles.imgBtn}><img src={'/images/ic_flag_white.png'}/></div>
    return (
      <div onClick={this.props.useAsset} className={styles.asset}>
      <div className={styles.thumbnail}><img src={this.props.thumbnail}/></div>
        <div className={styles.buttonHeader}>
        </div>
        <div className={styles.inner}></div>
        <div className={styles.bookmark}/>
        <div className={styles.footer}>
          <div className={styles.texts}>
            <div className={styles.title}>{this.props.title}</div>
            <div className={styles.subTitle}>{this.props.subTitle}</div>
          </div>
          <div className={styles.stars}>
            <div className={styles.star+' '+((this.props.star>0)?styles.active:'')}/>
            <div className={styles.star+' '+((this.props.star>1)?styles.active:'')}/>
            <div className={styles.star+' '+((this.props.star>2)?styles.active:'')}/>
            <div className={styles.star+' '+((this.props.star>3)?styles.active:'')}/>
            <div className={styles.star+' '+((this.props.star>4)?styles.active:'')}/>
          </div>
        </div>
      </div>
    );
  }



  onClick(){
    axios.get('/store/lookup?asset='+this.props.id).then(response => {
      this.setState({
        ...this.state,
        assets: response.data
      });
    });
  }
}

AssetItem.PropTypes = propTypes;

var mapStateToProps = (state) => {
  return{
    previewImage : state.asseteditor.previewImage
  }
}

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...actions},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetItem);
