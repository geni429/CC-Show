import React from 'react';
import styles from './style.css';
import axios from 'axios';

const propTypes = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  subTitle: React.PropTypes.string.isRequired,
  star: React.PropTypes.number.isRequired,
  thumbnail: React.PropTypes.string.isRequired,
  onUse: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onClick: React.PropTypes.func.isRequired
};

class AssetItem extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  render() {

    // <div className={styles.imgBtn}><img src={'/images/ic_move_in_box_gray.png'}/></div>
    // <div className={styles.imgBtn}><img src={'/images/ic_flag_white.png'}/></div>
    return (
      <div className={styles.asset}
        onClick={this.props.onClick}
      >
        <div className={styles.thumbnail}><img src={this.props.thumbnail} /></div>
        <div className={styles.buttonHeader} />
        <div className={styles.inner} />
        <div className={styles.bookmark} />
        <div className={styles.footer}>
          <div className={styles.texts}>
            <div className={styles.title}>{this.props.title}</div>
            <div className={styles.subTitle}>{this.props.subTitle}</div>
          </div>
          <div className={styles.stars}>
            <div className={styles.star + ' ' + ((this.props.star > 0) ? styles.active : '')} />
            <div className={styles.star + ' ' + ((this.props.star > 1) ? styles.active : '')} />
            <div className={styles.star + ' ' + ((this.props.star > 2) ? styles.active : '')} />
            <div className={styles.star + ' ' + ((this.props.star > 3) ? styles.active : '')} />
            <div className={styles.star + ' ' + ((this.props.star > 4) ? styles.active : '')} />
          </div>
        </div>
      </div>
    );
  }


  onClick() {
    axios.get('/store/lookup?asset=' + this.props.id).then(response => {
      this.setState({
        ...this.state,
        assets: response.data
      });
    });
  }
}

AssetItem.propTypes = propTypes;

export default AssetItem;
