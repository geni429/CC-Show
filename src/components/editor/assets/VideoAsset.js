import React from 'react';
import styles from './Assets.css';

const propTypes = {
  styles: React.PropTypes.object.isRequired,
  value: React.PropTypes.string.isRequired
};

class VideoAsset extends React.Component{

  render() {
    return (
      <div style={this.props.styles}>
          <iframe style={{'width':'100%','height':'100%'}} src={'https://www.youtube.com/embed/4VnZ8WeJXhA'} frameborder="0"></iframe>
      </div>
    )
  }
}

VideoAsset.propTypes = propTypes;

export default VideoAsset;
