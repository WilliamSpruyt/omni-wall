import React from 'react';
  

class ReactiveCanavas extends React.Component {
  
    componentDidMount() {
      const canvas = this.refs.canvas
      const ctx = canvas.getContext("2d")
       
 
canvas.circle=this.circle;
canvas.offset=this.props.offset;
canvas.refresh=this.refresh;
canvas.red=this.props.r;
canvas.green=this.props.g;
canvas.blue=this.props.b;
canvas.dots=this.props.dots;
canvas.handleClick=this.props.handleClick; 
var xMiddle=this.props.width/2;
var yMiddle=this.props.height/2;
var mousePos=[xMiddle,yMiddle] 
ctx.fillStyle="rgb("+this.props.r+","+this.props.g+","+this.props.b+")";
ctx.fillRect(0,0,this.props.width,this.props.height);
this.refresh(this.props.dots,this.props.offset,this.props.ratio,this.props.width,ctx,this.circle);
canvas.addEventListener('touchmove', function(evt) {
 
  var rect = canvas.getBoundingClientRect()
   mousePos=[
    evt.touches[0].clientX- rect.left,
    evt.touches[0].clientY - rect.top]
   this.circle(mousePos[0],mousePos[1],4,ctx,'purple' )
    
   this.handleClick(evt.touches[0]);
   
}, false); 
setInterval(()=>{ctx.globalAlpha = 0.1;
ctx.fillStyle="rgb("+this.props.r+","+this.props.g+","+this.props.b+")";
ctx.fillRect(0,0,this.props.width,this.props.height);
ctx.globalAlpha = 0.5;
this.refresh(this.props.dots,this.props.offset,this.props.ratio,this.props.width,ctx,this.circle)},100);

    
    

    }
    render() {
      return(
        <div>
          <canvas ref="canvas"  onMouseDown={()=>this.down=true}
        onMouseUp={()=>this.down=false}
        onMouseMove={e => this.down && this.props.handleClick(e)}  width={this.props.width} height={this.props.height} style={this.props.cStyle}  />
          
        </div>
      )
    }
       
       
      
       
      getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return [
           evt.clientX - rect.left,
          evt.clientY - rect.top]
        ;
      }
      
       
      
       circle(x,y,r,ctx,ink){
        ctx.fillStyle=ink;
        
        ctx.beginPath();
        ctx.arc(x,y,r,0,2*Math.PI);
        ctx.closePath();
        ctx.fill();
       // ctx.stroke();
        
      }
      
      refresh(dots,offset,ratio,width,ctx,cir){
       if(width>1000){
        dots.map(function(ele){return cir(ele.dots[0],ele.dots[1],2,ctx,ele.dots[2])
          })}
        else{
          dots.map(function(ele){return cir((ele.dots[0]-offset[0])/ratio,(ele.dots[1]-offset[1])/ratio,2,ctx,ele.dots[2])
          })
        }
      }
      
      
          
     
  }
  export default ReactiveCanavas