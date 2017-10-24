import React from 'react';

class Square extends React.Component{
    render() {
        console.log(this.props.asset.style['border-width']);
        return (
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width={this.props.asset.width} height={this.props.asset.height} viewBox="0 0 20.000000 20.000000"
            preserveAspectRatio="xMidYMid meet">
           <metadata>
           Created by potrace 1.14, written by Peter Selinger 2001-2017
           </metadata>
           <g transform="translate(0.000000,20.000000) scale(0.100000,-0.100000)"
           fill={this.props.asset.style['background-color']} stroke={this.props.asset.style['border-color']} strokeWidth={this.props.asset.style['border-width']}>
           <path d="M0 100 l0 -100 100 0 100 0 0 100 0 100 -100 0 -100 0 0 -100z"/>
           </g>
           </svg>
        )
    }
} 

export default Square;