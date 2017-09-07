import React from 'react';
import { connect } from 'react-redux';
import styles from './AssetController.css';

class VideoController extends React.Component {
    constructor(props){
        super(props);
        
        this.state={
            video:true,
            video_arrow_up:false,
            video_arrow_down:true,
            video_controller: this.props.controller,
            video_autoplay: this.props.autoplay,
            video_loop:this.props.loop    
        };

        this.videoOn=this.videoOn.bind(this);
        this.videoOff=this.videoOff.bind(this);
        this.controllerOnClick =this.controllerOnClick.bind(this);
        this.autoplayOnClick=this.autoplayOnClick.bind(this);
        this.loopOnClick=this.loopOnClick.bind(this);
    }
    render() {
        return (
            <div>
                <div className={styles.controller_sub_wrapper}>
                    <div className={styles.controller_sub_title}>비디오
                        <img onClick={this.videoOn.bind()} src="/images/ic_arrow_up.png" style={this.state.video_arrow_up ? {} : {display:'none'}} className={styles.show_items_button}/>
                        <img onClick={this.videoOff.bind()} src="/images/ic_arrow_down.png" style={this.state.video_arrow_down ? {} : {display:'none'}} className={styles.show_items_button}/>
                    </div>
                </div>
                <div className={styles.items} style={this.state.video ? {} : {display:'none'}}>
                    <div className={styles.control_item+' '+styles.URL_controller}>
                        <span className={styles.attribute_item_title+' '+styles.video_margin_zero} >URL :</span> <input type="text" value="video_url" className={styles.attribute_item_input}/>
                    </div>
                    <div>
                        <div onClick={this.controllerOnClick.bind()} className={styles.control_item+' '+styles.video} style={this.state.video_controller ? {'background-color': '#5a84b3'} : {}}>
                            <span className={styles.attribute_item_title+' '+styles.video_margin_zero} style={this.state.video_controller ? {color:'#fff'} : {}}>컨트롤러</span>
                        </div>
                        <div onClick={this.autoplayOnClick.bind()} className={styles.control_item+' '+styles.video} style={this.state.video_autoplay ? {'background-color': '#5a84b3'} : {}}>
                            <span className={styles.attribute_item_title+' '+styles.video_margin_zero} style={this.state.video_autoplay ? {color:'#fff'} : {}}>자동재생</span>
                        </div>
                        <div onClick={this.loopOnClick.bind()} className={styles.control_item+' '+styles.video} style={this.state.video_loop ? {'background-color': '#5a84b3'} : {}}>
                            <span className={styles.attribute_item_title+' '+styles.video_margin_zero} style={this.state.video_loop ? {color:'#fff'} : {}}>반복</span>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
        )
    }

    videoOn(){
        this.setState({
            ...this.state,
            video:true,
            video_arrow_up:false,
            video_arrow_down:true
        });
    }

    videoOff(){
        this.setState({
            ...this.state,
            video:false,
            video_arrow_up:true,
            video_arrow_down:false
        });
    }

    controllerOnClick(){
        this.props.setURL(!this.state.video_controller);
    }

    loopOnClick(){
        this.props.setURL(!this.state.video_loop);
    }

    autoplayOnClick(){
        this.props.setURL(!this.state.video_autoplay);
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setURL: (url) => {
            dispatch(actions.setAssetVideoURL(url));
        },
        setcontroller: (controller) => {
            dispatch(actions.setAssetVideoURL(controller));
        },
        setAutoplay: (autoplay) => {
            dispatch(actions.setAssetVideoURL(autoplay));
        },
        setLoop: (loop) => {
            dispatch(actions.setAssetVideoURL(loop));
        }
    }
}

export default VideoController;
