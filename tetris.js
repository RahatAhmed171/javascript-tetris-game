var canvas=document.querySelector('canvas');
canvas.width=240;
canvas.height=450;
var dy=0
var dx=0
var stop=20;
let score=0;
let time=510;
let score_count=0;


let locked_items=[]



var c=canvas.getContext('2d');

let square=[{x:120, y:30},{x:140,y:30},{x:120,y:50},{x:140,y:50},];
let line=[{x:120, y:30},{x:140,y:30},{x:160,y:30},{x:180,y:30},];
let l=[{x:120, y:30},{x:120,y:50},{x:120,y:70},{x:140,y:70},];
let half_plus=[{x:120, y:30},{x:140,y:30},{x:140,y:10},{x:160,y:30},];
let right_icon=[{x:120, y:30},{x:140,y:30},{x:140,y:50},{x:160,y:50},];


const items=[square,line,l,half_plus,right_icon];
c.fillStyle='lightgreen';
c.strokestyle='red';

function drawtetro(Part){

    
    c.fillRect(Part.x,Part.y,20,20);
    c.strokeRect(Part.x,Part.y,20,20);
    
    
  
}
function get_random (rahat) {
    return rahat[Math.floor((Math.random()*rahat.length))];
  }
function clear_canvas(){
    c.clearRect(0,0,canvas.width,canvas.height);
  }

function downmovement(hape){
  check_upper_row();
  let collided=false;
  
    
  let results=collidin_blocks(hape,collided);
   if(results==true){
    let last=locked_items[locked_items.length-1]
    last[0].y=last[0].y-20;
    last[1].y=last[1].y-20;
    
  last[2].y=last[2].y-20;
  last[3].y=last[3].y-20;
    
    
    
     game_prep()
   }
   if(hape[3].y==430)
   {
     
     clearInterval(game_start)
     locked_items.push(hape);
     console.log(locked_items.length)
     check_last_row()
     game_prep()
     
     
   }
   else{
    dy=stop
    hape[0].y=hape[0].y+dy
    hape[1].y=hape[1].y+dy
    hape[2].y=hape[2].y+dy
    hape[3].y=hape[3].y+dy

    
    
   }
    
}
function rightmove(shape){
  let collided_with_edges_of_right_blocks=false
  let right_side_results=colliding_edges_right(shape,collided_with_edges_of_right_blocks)
  if(right_side_results==true){

  }
  
  //if(shape[3].x>=270){
    
    
    
  //}
  
  /*if(shape[0].x==2){
  shape[0].x=shape[0].x+8
  shape[1].x=shape[1].x+8
  shape[2].x=shape[2].x+8
  shape[3].x=shape[3].x+8

  }*/
  else{
  stop=0
  dx=20

  shape[0].x=shape[0].x+dx
  shape[1].x=shape[1].x+dx
  shape[2].x=shape[2].x+dx
  shape[3].x=shape[3].x+dx
  

  }

  
}
function leftmove(the_shape){
  /*if(the_shape[0].x<=10){

  the_shape[0].x=the_shape[0].x-8
  the_shape[1].x=the_shape[1].x-8
  the_shape[2].x=the_shape[2].x-8
  the_shape[3].x=the_shape[3].x-8
    
  }*/


  let collided_with_edges_of_left_blocks=false
  let left_side_results=colliding_edges_left(the_shape,collided_with_edges_of_left_blocks)
  if(left_side_results==true){

  }
  
  else{
  stop=0
  dx=-20
  
  the_shape[0].x=the_shape[0].x+dx
  the_shape[1].x=the_shape[1].x+dx
  the_shape[2].x=the_shape[2].x+dx
  the_shape[3].x=the_shape[3].x+dx
  
  
  
  }

}
//function downmove(the_shape){
  //downmovement(the_shape);
  
//}
function collidin_blocks(current_block,collided){
  collide_status=collided
  for(var k=0;k<current_block.length;k++){
    for(var i=0;i<locked_items.length;i++){
        for(var m=0;m<locked_items[i].length;m++)
        {
            if(current_block[k].x==locked_items[i][m].x && current_block[k].y==locked_items[i][m].y-20){
                //console.log(current_block[k].x)
                //console.log(current_block[k].y)
                if(locked_items[i][m].y>430){
                  collided_status=false
                  return collided_status
                }
                else{
                collided_status=true
                
                locked_items.push(current_block);
                clearInterval(game_start);
                return collided_status
                }
            }
        }
    }
}
return false
}

function check_last_row(){
  count=0

for(var i=0;i<locked_items.length;i++){
    for(var m=0;m<locked_items[i].length;m++){
        if (locked_items[i][m].y==430){
            count=count+1
        }
    }
}

if(count==12){
  score=score+50;
  
  
  document.querySelector('h2').innerHTML ="Score:"+score;
    for(var i=0;i<locked_items.length;i++){
        for(var m=0;m<locked_items[i].length;m++){
            if (locked_items[i][m].y==430){
                
                locked_items[i][m].y=locked_items[i][m].y+20;
            }
            else{
                locked_items[i][m].y=locked_items[i][m].y+20;
            }
        }
    }
}

}

function check_upper_row(){


  for(var i=0;i<locked_items.length;i++){
        for(var m=0;m<locked_items[i].length;m++){
            if (locked_items[i][m].y==90){
                
                document.querySelector('h2').innerHTML = "Game Over. Refresh the page to restart the game";
                javascript_abort();
                
                
              
                
            }
            
        }
    }
}

function javascript_abort()
{
   throw new Error('This is not an error. This is just to abort javascript');
}

function colliding_edges_right(current_block,collided_with_edges_right){


 collided_with_edge_right_status=collided_with_edges_right
  for(var r=0;r<current_block.length;r++){
    for(var s=0;s<locked_items.length;s++){
        for(var t=0;t<locked_items[s].length;t++)
        {
            if(current_block[r].y==locked_items[s][t].y && current_block[r].x==locked_items[s][t].x-20){
                //console.log(current_block[k].x)
                //console.log(current_block[k].y)
                collided_with_edge_right_status=true
                
                
                return collided_with_edge_right_status
            }
        }
    }
}
return false
}


function colliding_edges_left(current_block,collided_with_edges_left){


  collided_with_edge_left_status=collided_with_edges_left
   for(var r=0;r<current_block.length;r++){
     for(var s=0;s<locked_items.length;s++){
         for(var t=0;t<locked_items[s].length;t++)
         {
             if(current_block[r].y==locked_items[s][t].y && current_block[r].x==locked_items[s][t].x+20){
                 //console.log(current_block[k].x)
                 //console.log(current_block[k].y)
                 collided_with_edge_left_status=true
                 
                 
                 return collided_with_edge_left_status
             }
         }
     }
 }
 return false
 }
























function main(){
  //game_start=setTimeout(function onTick(){
    
    clear_canvas()
    

    the_shape.forEach(drawtetro)
    for(i=0;i<locked_items.length;i++){
      locked_items[i].forEach(drawtetro)
    }
  
    stop=20;
    
    //happening but some bugs(reduced)
    setTimeout(downmovement,500,the_shape)
  
    
    
    //
    
 // },1000);
}
function game_prep(){
  let square=[{x:120, y:30},{x:140,y:30},{x:120,y:50},{x:140,y:50},];
let line=[{x:120, y:30},{x:140,y:30},{x:160,y:30},{x:180,y:30},];
let l=[{x:120, y:30},{x:120,y:50},{x:120,y:70},{x:140,y:70},];
let half_plus=[{x:120, y:30},{x:140,y:30},{x:140,y:10},{x:160,y:30},];
let right_icon=[{x:120, y:30},{x:140,y:30},{x:140,y:50},{x:160,y:50},];
const items=[square,line,l,half_plus,right_icon];
  the_shape=get_random(items);
  
  game_start=setInterval(main,time);

}





window.addEventListener('keydown', function(e){

  switch (e.key){
    case 'ArrowRight':
      if(the_shape[3].x>=220){

      }
      else{
      
      rightmove(the_shape)
      }
      
      break;
    case 'ArrowLeft':
      if(the_shape[0].x<=0)
      {

      }
      else{
    
      leftmove(the_shape);
      }
      break;
    
    
    
    case 's':
      document.querySelector('h2').innerHTML = "";
      game_prep()
      break;
  }

});





