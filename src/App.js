import React, { Component } from 'react';

import "whatwg-fetch";
import './App.css';
import RSVG from './commponents/reactIveSvg'
//const url = "http://localhost:3001/message";
const url = "/message";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
       dots:[{dots:[50,50]}],
       nextDot:[[250,250]]
       
    };
   this.handleClick = this.handleClick.bind(this);
   this.loadStatsFromServer = this.loadStatsFromServer.bind(this);
   this.updateDB = this.updateDB.bind(this);
   }
   componentDidMount() {
    this.loadStatsFromServer();
  }
  render() {
    return (
      <div >
       <RSVG handleClick={this.handleClick} width={500} height={500}  dots={this.state.dots} dotNow={this.state.nextDot} />
      </div>
    );
  }
 /* handleClick(event) {
    
    var tempArr=this.state.dots.slice();
    
    tempArr.push([event.clientX,event.clientY]);
    tempArr.push([Math.random()*500,Math.random()*500]);
     
    this.setState({dots:tempArr},()=>{this.submitStat()})
   }*/
   handleClick(event) {
    
    
    
     
     
    this.setState({nextDot:[event.clientX,event.clientY]},()=>{this.submitStat()})
   }

   loadStatsFromServer = () => {
    // fetch returns a promise. If you are not familiar with promises, see
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    fetch(url)
      .then(data => data.json())
      .then(res => {
        if (!res.success) this.setState({ error: res.error });
        else
        
          this.setState({ dots: res.data } );
           
      });
      
  };
  updateDB() {
     
    var dot = this.state.dots.slice();
    console.log('the dot '+dot[dot.length-1] );
    return fetch(`${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        
        dot
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log( "UPDATED:", res.message);
        this.loadStatsFromServer();
        return res;
      })

      .catch(err => console.error(err));
  }
  submitStat(){
    var dot = this.state.nextDot;

    

    if (dot.length > 0) {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
           dot:dot
        })
      })
        .then(res => res.json())
        .then(res => {
          if (!res.success)
            this.setState({ error: res.error.message || res.error });
          else {
            this.loadStatsFromServer();
          }
        });
    }
  };
}

export default App;
