import React, { Component } from 'react';
import {
  FacebookShareButton,
 // EmailShareButton,
} from 'react-share';
import {
  FacebookIcon,
  /*TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  GooglePlusIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  RedditIcon,
  TumblrIcon,
  LivejournalIcon,
  MailruIcon,
  ViberIcon,
  WorkplaceIcon,
  EmailIcon,*/
} from 'react-share';
import "whatwg-fetch";
import { isMobile } from 'mobile-device-detect'; 
import axios from 'axios'
import './App.css';
//import RSVG from './commponents/reactIveSvg'
import ColourButton from './commponents/colourButton'
import RCanvas from'./commponents/reactiveCanvas'
//local host needs to be set.
//const url = "http://192.168.0.7:3001/message";
//const reseturl = "http://192.168.0.7:3001/reset";
const reseturl = "/reset";
const url = "/message";
 
const MASTERW=1366;
 
const MASTERH=768;
const WATIO=135;
const MAXDATA=5000000;

const OFFSET_RANGE_X=MASTERW-WATIO;
const OFFSET_RANGE_Y=MASTERH/2;
 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
       dots:[{dots:[50,50]}],
       nextDot:[[250,250]],
        
       width:0,
       height:0,
       ratio:0,
       offset:[0,0],
       ink:"red",
       colours:['red','green','blue','black','white']
       
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
   this.handleClick = this.handleClick.bind(this);
   this.handleColour= this.handleColour.bind(this);
   this.loadStatsFromServer = this.loadStatsFromServer.bind(this);
   
   }
   componentDidMount() {
    console.log("appjs API_PORT "+process.env.PORT );
    
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  
    window.addEventListener('keyup', (e)=>(e.key==='z')?this.clearDB():(console.log(e.key)));
     
    
    setInterval(()=>{this.loadStatsFromServer()},1000)
    
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  render() {
    return (
      <div className="canvi"   >
      {(isMobile) &&<div className="colourBox canvi"> {this.state.colours.map((ele)=>{return<ColourButton on={this.state.ink} col={ele} handleClick={this.handleColour}/>})}
      </div>}
       <RCanvas ratio={this.state.ratio} offset={this.state.offset} handleClick={this.handleClick} dots={this.state.dots} width={this.state.width} height={this.state.height}  r={255} g={255} b={100} ink={this.state.ink} className="canvi" />
        
      </div>

    );
  }
 /* 
   <RSVG handleClick={this.handleClick} width={500} height={500}  dots={this.state.dots} dotNow={this.state.nextDot} />*/
   
   
   handleClick(event) {
   this.setState({nextDot:[this.state.offset[0]+(event.clientX*this.state.ratio),this.state.offset[1]+(event.clientY*this.state.ratio),this.state.ink]},()=>{this.submitStat()})
   }
   
   
   handleColour(col){
      
     this.setState({ink:col});
   }

   loadStatsFromServer = () => {
  
    // fetch returns a promise. If you are not familiar with promises, see
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    fetch(url)
      .then(
        data => data.json())
      .then(res => {
        if (!res.success) this.setState({ error: res.error });
        else
        
         (res.data.length<MAXDATA)?
          this.setState({ dots: res.data }):
          this.setState({ dots: res.data.slice(res.data.length-MAXDATA) } );
           
      });
      
  };
  
 /* clearDB() 
    {
      alert('Clearing Database')
      return fetch(reseturl, {method: 'DELETE'})
        .then(res => res.json())
        .then(res => {
          alert('Deleted:', res)
          return res
        })
        .catch(err => console.error(err))
    }*/
       
    clearDB() 
    {
      console.log('Clearing Database')
      
        axios.delete(reseturl)
          .then(response => console.log(response))
      
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
           // this.loadStatsFromServer();
          }
        });
    }
  };
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight,offset:[((OFFSET_RANGE_X)*Math.random()),((OFFSET_RANGE_Y)*Math.random())],ratio:(WATIO/window.innerWidth) });
    
  }
  
}

export default App;
