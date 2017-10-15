import React from 'react';
import styles from './AssetEditorItem.css';
import { connect } from 'react-redux';
import FreeAsset from './FreeAsset';
import ChargeAsset from './ChargeAsset';
import * as actions from '../../../../actions/asseteditor';
import Store from '../../../../store';
import { bindActionCreators } from 'redux';
import * as uiActions from '../../../../actions/ui';

class AssetSetting extends React.Component{
    constructor(prop){
        super(prop);
        this.state = {
        file : ' ' ,
        currentMode : 0,
        file2 : ' ',
        file3 : ' ',
        ThumbnailUrl: 'asdfasdf',
        previewInputUrl : undefined,
        previewInputUrl2 : undefined,
        previewInputUrl3 : undefined,
        previewInputUrl4 : undefined,
        currentImageUpload: undefined,
        addFileCNT : 0,
        defWidth : 434,
        myWidth : 286,
        isCheckedFree : false,
        isCheckedCharge : false,
        // title : title
    };
    this.handleChangeCharge = this.handleChangeCharge.bind(this);
    this.handleChangeFree = this.handleChangeFree.bind(this);
};

// componentWillMount(){
//     this.setState( { isChecked: this.props.isChecked } );
// }

    priceHandler(e){
        var price = e.target.value
        this.props.getPrice(price)
    }
    contentHandler(e){
       var content = e.target.value
       this.props.getContent(content)
    }

    thumbNail (e){
        this.setState({
            ...this.state,
            currentImageUpload : 'previewThumbnail'
        });
    }

    inputimg(e){
        this.setState({
            ...this.state,
            currentImageUpload : 'pushPreviewInputimg'
        });
    }

    inputimg1(e){
        this.setState({
            ...this.state,
            currentImageUpload : 'setPreviewInputimg'
        });
    }

    addFileChange(e){
        
        let add = 145;
                    
        this.setState({
            ...this.state,
            addFileCNT : this.state.addFileCNT+1,
            defWidth : this.state.defWidth + add,
            myWidth : this.state.defWidth + "px"
        })
        // console.log(this.state.myWidth);
        if(this.state.addFileCNT === 3){
            e.preventDefault();
        }
        if(this.state.myWidth === '724px'){
            this.setState({
                myWidth : 724 + "px"
            })
        }        
    }
    
    titleHandler(e){
        this.props.setTitle(e.target.value);
    }

    ImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
        let file2 = e.target.files[0];
        let file3 = e.target.files[0];
        let file4 = e.target.files[0];
        // let file5 = e.taraget.files[0];

        reader.onloadend = () => {
            switch(this.state.currentImageUpload){

                case 'previewThumbnail':
                this.setState({
                    ...this.state,
                    file : file,
                    ThumbnailUrl : reader.result,
                });
                this.props.getPreviewImage(this.state.ThumbnailUrl);
                // var image = this.props.getPreviewImage;
                // image = this.state.ThumbnailUrl;
                break;

                case 'previewInputimg':
                this.setState({
                    ...this.state,
                    file : file2,
                    previewInputUrl : reader.result
                });
                break;

                case 'previewInputimg2':
                this.setState({
                    ...this.state,
                    file : fil3,
                    previewInputUrl2 : reader.result
                }) 
                break;

                case 'previewInputimg3':
                this.setState({
                    ...this.state,
                    file : file4,
                    previewInputUrl3 : reader.result
                })
                break;
                
                case 'previewInputimg4':
                this.setState({
                    ...this.state,
                    file : file5,
                    previewInputUrl4 : reader.result
                });
                break;

            }
        }
        reader.readAsDataURL(file)
    }

    

    render(){
        
        
        var renderForm = () => {
            
            if(this.state.isCheckedFree == true && this.state.isCheckedCharge == true){
                return(
                    <ChargeAsset />
                )
            }
            if(this.state.isCheckedFree == false && this.state.isCheckedCharge == false){
                return(
                    <FreeAsset />
                )
            }
            if(this.state.isCheckedFree == true && this.state.isCheckedCharge == false){
                return(
                    <FreeAsset />
                )
            }

            if(this.state.isCheckedCharge == true && this.state.isCheckedFree == false){
                return(
                    <ChargeAsset />
                )
            }
        }


        let $imagePreview = null;
        let $imagePreview2 = null;
        let $imagePreview3 = null;
        let $imagePreview4 = null;
        let $imagePreview5 = null;
    
        let card = [];
            const CardComponent = props => <div className = {styles.imagePreview}>
            <input type = "file" className = {styles.inputImage} onClick =  {(e)=> this.inputimg(e)} onChange = {(e)=>this.ImageChange(e)} />
            <button className = {styles.previewText}>{$imagePreview3}</button>
            </div>;

            for(var i = 1; i < 4; i++){
                card.push(<CardComponent key = {i} />)
            }

            // this.state.ThumbnailUrl ? $imagePreview = (<img src={this.state.ThumbnailUrl} accept="image/*"/>) : $imagePreview = (<div className="preview_Image">미리보기<br/>(파일을 선택하세요)</div>);
            this.state.previewInputUrl ? $imagePreview2 = (<img src={this.state.previewInputUrl} accept="image/*"/>) : $imagePreview2 = (<div className="previewinputimg"><br/>(파일을 선택하세요)</div>);
            this.state.previewInputUrl2 ? $imagePreview3 = (<img src={this.state.previewInputUrl2} accept="image/*"/>) : $imagePreview3 = (<div className="previewinputimg"><br/>(파일을 선택하세요)</div>);
            this.state.previewInputUrl3 ? $imagePreview4 = (<img src={this.state.previewInputUrl3} accept="image/*"/>) :$imagePreview4 = (<div className="previewinputimg"><br/>(파일을 선택하세요)</div>);
            this.state.previewInputUrl4 ? $imagePreview5 = (<img src={this.state.previewInputUrl3} accept="image/*"/>) :$imagePreview5 = (<div className="previewinputimg"><br/>(파일을 선택하세요)</div>);
        
        
        return(
<div className = {styles.content}>
     <div className = {styles.AssetEditor_left}>
            <div className = {styles.previewDiv}>
                <input type = "file" className = {styles.previewFile} onClick = {(e)=>this.thumbNail(e)} onChange = {(e)=>this.ImageChange(e)}/>
                <button className = {styles.AssetEditor_preview}><img className = {styles.thumbnailImg} src = {this.props.thumbnail} /></button>
            </div>
            <div className = {styles.AssetEditor_setting}>

                <div className = {styles.setting_first}>
                    <div className = {styles.cover}><span className = {styles.frontTitle}>제목</span>
                        <input type = "text" className = {styles.title} placeholder=" 타이틀을 입력하세요" onChange = {(e)=>this.titleHandler(e)} value = {this.props.title}/>
                    </div>
                </div>

                <div className = {styles.setting_second}>

                    <div className = {styles.openStoreDiv}>
                     <input type = "checkbox"  className = {styles.modebox}  onChange={this.handleChangeFree}/>
                     <label className = {styles.modeboxlabel}>
                         <span className = {styles.openStoreSpan}>스토어 공개</span>
                     </label>
                    </div>
                    <div className = {styles.openStoreDiv}>
                     <input type = "checkbox"  className = {styles.modebox} onChange={this.handleChangeCharge}/>
                     <label className = {styles.modeboxlabel}>
                         <span className = {styles.openStoreSpan}>유료로 변환</span>
                     </label>
                        
                    </div>

                    <div>
                    </div>
                    
                    <div className = {styles.cover2}>
                        <span className = {styles.frontTitle2}>￦</span>
                        <input type = "number" className = {styles.price} onChange = {(e)=> this.priceHandler(e)} />
                    </div>
                    
                </div>

                <div className = {styles.setting_third}>
                    
                    <div className = {styles.imagePreview_ScrollDiv}>
                        <div className = {styles.imagePreview_ScrollSmallDiv} style = {{width : this.state.myWidth}}>
                            <div className = {styles.imagePreview}>
                                <input type = "file" className = {styles.inputImage} onClick = {(e)=>this.inputimg(e)} onChange = {(e)=> this.ImageChange(e)}/>
                                <button className = {styles.previewText}>{$imagePreview2}</button>
                            </div>

                            <div className = {styles.imagePreview}>
                                <input type = "file" className = {styles.inputImage} onClick = {(e)=> this.inputimg2(e)} onChange = {(e)=>this.ImageChange(e)}/>
                                <button className = {styles.previewText}>{$imagePreview3}</button>
                            </div>

                            {card}

                        </div>
                    </div>
                    <button className = {styles.filebutton} onClick = {(e)=> this.addFileChange(e)}>+</button>
                </div> 

        </div>
            <div className = {styles.AssetEditor_description}>
                <div className = {styles.AssetEditor_topbar}>
                    <span className = {styles.topbar_title}>부가설명</span>
                </div>
                <div className = {styles.AssetEditor_content}>
                    <textarea cols = "107" rows = "50" className = {styles.description_content} onChange = {(e)=> this.contentHandler(e)} placeholder ="텍스트를 입력하세요." />
                </div>
            </div>  
    </div>
    {/* <FreeAsset /> */}
   {renderForm()}
    </div>
        );
    }

    handleChangeFree () {
        this.setState( { isCheckedFree: !this.state.isCheckedFree } );
        this.props.getOpenToStore(this.state.isCheckedFree);  
        console.log(this.state.isCheckedFree);      
    }

    handleChangeCharge(){
        this.setState({ isCheckedCharge : !this.state.isCheckedCharge });        
        this.props.getChangeToCharge(this.state.isCheckedCharge);
        console.log(this.state.isCheckedCharge);
    }
}

var mapStateToProps = (state) =>{
    return{
        htmlsource : state.asseteditor.htmlsource,
        title : state.asseteditor.title,
        thumbnail : state.asseteditor.previewImage,
    }
}

var mapDispatchToProps = (dispatch) => {
    return bindActionCreators({...actions, ...uiActions}, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(AssetSetting);