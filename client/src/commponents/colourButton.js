import React from 'react';
  

export default class ReactiveCanavas extends React.Component {


    render() {

        return (
          <div >
              <svg
            version="1.1"
             
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
             
             
            onClick={()=>  this.props.handleClick(this.props.col)}
           >  <ellipse
               
           fill={this.props.col} 
           strokeWidth="3"
           stroke={(this.props.on===this.props.col)?this.props.col:'none'}
           //stroke="pink"
           cx="12"
           cy="12"
           rx="9"
           ry="9"
           
         />
            
            
            </svg>
           
          </div>
        );
      }



}