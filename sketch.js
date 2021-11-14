var START= 0;
var PLAY = 1;
var END = 2;

var score=0;
var life=3;
var gameState = START;
function preload(){
  back1img = loadImage("back1.jpg");
  backimg = loadImage("back.jpg");
  playimg = loadImage("play.png")
  bg2img = loadImage("bg2.jpg");
  playerimg = loadImage("First Person Img.png");
  restartimg = loadImage("restart.png");
  fireBallIMG=loadImage("fireBall.png")
  helicop1Img=loadImage("helicop1.png")
  helicop2Img=loadImage("helicop2.png")
  helicop3Img=loadImage("helicop3.png")
}
function setup(){
createCanvas (windowWidth,windowHeight)
back1 = createSprite(windowWidth/2, windowHeight/2);
back1.addImage(back1img);
playBtn = createSprite(windowWidth/2 - 430, height - 250);
playBtn.addImage(playimg);
back2 = createSprite(windowWidth/2, windowHeight/2);
back2.addImage(bg2img);
back2.velocityY = 4;
back2.visible = false;
player = createSprite(width/2,height-180,30,30)
player.addImage(playerimg);
player.scale = 1;
//player.rotation = 60;
player.visible = false;
restart = createSprite(width/2,height/2);
restart.addImage(restartimg);
restart.scale = 0.7;
restart.visible = false;

heli1group=createGroup();
heli2group=createGroup();
heli3group=createGroup();
 
  
  
fireBallGroup=createGroup();
}
function draw(){
background(180);
drawSprites();

fill("yellow");
  textSize(20)
  text("Score: "+score,width-200,80);
  text("Lives: "+life,width-200,100);

  if(gameState === START){
  if(mousePressedOver(playBtn)){
    gameState = PLAY;
  }   
}
   if(gameState === PLAY){
    back1.visible = false;
    playBtn.visible = false;
    back2.visible = true;
    player.visible = true;
    back2.velocityY = 5;
    if(back2.y > height){
      back2.y = height/2;
      }

      player.x=mouseX;

      var select1= Math.round(random(1,3))
      if(frameCount%160===0){
        if(select1===1){
          spawnHeli1();
        }
          if(select1===2){
          spawnHeli2();
        }
        if(select1===3){
          spawnHeli3();
        }
      }

      if(keyWentDown("space")){
        createfireballs();
      }

      //destroying heli1 by fireball
      for(var fb = 0; fb < fireBallGroup.length; fb++){
        for(var helil=0;helil<heli1group.length;helil++){
          if(fireBallGroup.isTouching(heli1group)){
            heli1group.get(helil).remove();
            fireBallGroup.get(fb).lifetime=0;
            score = score + 50;
          }
        }
      }

      //destroying heli2 by fireball
      for(var fb = 0; fb < fireBallGroup.length; fb++){
        for(var heli2=0;helil<heli2group.length;heli2++){
          if(fireBallGroup.isTouching(heli2group)){
            heli2group.get(heli2).remove();
            fireBallGroup.get(fb).lifetime=0;
            score = score + 50;
          }
        }
      }

      //destroying heli3 by fireball
      for(var fb = 0; fb < fireBallGroup.length; fb++){
        for(var heli3=0;heli3<heli3group.length;heli3++){
          if(fireBallGroup.isTouching(heli3group)){
            heli3group.get(heli3).remove();
            fireBallGroup.get(fb).lifetime=0;
            score = score + 50;
          }
        }
      }

      if(heli1group.isTouching(player)||heli2group.isTouching(player)||heli3group.isTouching(player)){
        life=life-1;
        gameState=END;
      }
  }

  else if(gameState===END) {
    
    back2.velocityY=0
    heli1group.destroyEach();
    heli2group.destroyEach();
    heli3group.destroyEach();
    
    
    player.destroy();
    
    
    if (life>=1) {
      restart=createSprite(windowWidth/2, windowHeight/2)
      restart.addImage(restartImg)
      restart.scale= 0.7;  
      restart.visible=true;
      //restart.visible=true;
          textSize(20)
          fill("cyan")
          text("TRY AGAIN...",windowWidth/2-50,windowHeight/2+100)
          if (mousePressedOver(restart)){
          
          reset();
        }
    }
      else{
      restart.visible=false;
      textSize(30)
      fill("red")
      stroke("yellow")
      strokeWeight(3);
      text("Sorry!!! You LOSE",windowWidth/2-50,windowHeight/2)
    }
      
    }
    
    
    
   
    
    
  
  
  if(score===1500 && gameState===PLAY){
      
      gameState=START
      score=0;
      life=3;
    }
  
  
}

function reset(){
  //restart.visible = true;
  
  gameState=PLAY
  
  back2 = createSprite(windowWidth/2, windowHeight/2);
  back2.addImage(bg2img);
  
  player = createSprite(width/2,height-180,30,30)
  player.addImage(playerimg);
  player.scale = 1;

  player.x=mouseX
  
 //preload();
  
}



function createfireballs(){
  fireBall= createSprite(200,500,20, 20);
  fireBall.addImage(fireBallIMG);
  fireBall.x=player.x;
  fireBall.velocityY = -8 ;
  
  fireBall.lifetime = 800;
  fireBall.scale=0.3
  fireBall.scale = fireBall.scale-0.02;
  fireBallGroup.add(fireBall);
 
}

function spawnHeli1(){
  var heli1 = createSprite(random(windowWidth/2-600,windowWidth/2+600),10,50 , 50 )
  heli1.addImage(helicop1Img);
  //heli1.scale=0.1;
  heli1.velocityY=8+score/200;
  heli1.lifetime=800;
  heli1group.add(heli1)
}  

function spawnHeli2(){
  var heli2 = createSprite(random(windowWidth/2-600,windowWidth/2+600),10,50 , 50 )
  heli2.addImage(helicop2Img);
  //heli2.scale=0.1;
  heli2.velocityY=8+score/200;
  heli2.lifetime=800;
  heli2group.add(heli2)
}  

function spawnHeli3(){
  var heli3 = createSprite(random(windowWidth/2-600,windowWidth/2+600),10,50 , 50 )
  heli3.addImage(helicop3Img);
  heli3.scale=0.7;
  heli3.velocityY=8+score/200;
  heli3.velocityX=-2
  heli3.lifetime=800;
  heli3group.add(heli3)
}  