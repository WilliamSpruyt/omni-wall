import React, { Component } from 'react';

import '../App.css';
 
class ReactiveSVG extends Component {
    componentWillMount(){
         
    }
  render() {

    return (
      <div >
          <svg
        version="1.1"
         
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
         
         
        onMouseMove={e =>  this.props.handleClick(e)}
       >  <ellipse
           
           
       cx={this.props.dotNow[0]}
       cy={this.props.dotNow[1]}
       rx="4"
       ry="4"
       
     />
        {this.props.dots && this.props.dots.map(function(ele){return<ellipse
           
           
           cx={ele.dots[0]}
           cy={ele.dots[1]}
           rx="4"
           ry="4"
           
         />})}
        
        </svg>
       
      </div>
    );
  }
}

export default ReactiveSVG;