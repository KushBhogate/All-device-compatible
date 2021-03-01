var Play=0;
var End=2;
var gameState=Play;
var score;
var deaths;
var roadImage;
var road;
var invisibleland;
var jake4,Jake1,Jake2,jakerunning,jakestanding ;
var ohnosound,yaysound,gamesound,coinsound,moneybag,moneybagImg,treasure,treasureImg,gold,goldImg;
var bomb,knifeman,swordman,bombImg,knifemanImg,swordmanImg;
var tryagain,tryagainImg,sadback,sadbackImg;
var winnerback,winner,winnerbackImg,winnerImg,crown,crownImg;
var ins,insImg;


function preload(){
  //pre-load images
   roadImage=loadImage("path.png");
   jakerunning = loadAnimation("Jake1.png", "jake4.PNG", "Jake2.png");
   jakestanding = loadAnimation( "jake4.PNG");
   coinsound=loadSound("coin.mpeg");
   ohnosound=loadSound("ohno.mpeg");
   yaysound=loadSound("yay2.mpeg");
   gamesound=loadSound("gamesound.mpeg");
   moneybagImg=loadImage("moneybag.png");
   treasureImg=loadImage("treasure.png");
   goldImg=loadImage("gold.png");
   bombImg=loadImage("bomb.png");
   swordmanImg=loadImage("swordman.png");
   knifemanImg=loadImage("knifeman.png");
   tryagainImg=loadImage("youlose2.gif");
   sadbackImg=loadImage("sadback2.jpg");
   youwinImg=loadImage("youwin.png");
   restartImg = loadImage("restart2.png");

}

function setup(){
  createCanvas(windowWidth, windowHeight);
  //create sprites here
  
     goldGroup = new Group();
     moneyBagGroup = new Group();
     treasureGroup = new Group();
     bombGroup =new Group();
    jakeGroup =new Group();
    swordmanGroup =new Group();
    knifemanGroup = new Group();
  
    jake= createSprite(2700,500,20,50);
    jake.addAnimation("running", jakerunning);
    jake.addAnimation("standing", jakestanding);
    jake.scale = 0.8;
    jakeGroup.add(jake);
  
    road = createSprite(width/2,200);
    road.addImage("road",roadImage);
    road.scale = width/300;
  
    road2 = createSprite(width/2,200);
    road2.addImage("road",roadImage);
    road2.scale = width/300;
  
    jake=createSprite(width/2,height-90,20,20)
    jake.addAnimation("running", jakerunning);
    jake.scale = 0.8;
    jakeGroup.add(jake);
  
  
    tryagain= createSprite(width/2,height-600,20,20);
    tryagain.addImage("running", tryagainImg);
    tryagain.scale = 0.5;
    tryagain.visible=false;
  
    youwin=createSprite(width/2,height-550,20,20);
    youwin.addImage("scoreBord",youwinImg);
    youwin.scale=0.6;
    youwin.visible=false;
  
    restart = createSprite(width/2,height/2);
    restart.addImage(restartImg);
    restart.scale = 0.5;
    restart.visible=false;

  
    invisibleland=createSprite(10,300,100,600);
    invisibleland2=createSprite(603,300,100,600);
    invisibleland.visible=false;
    invisibleland2.visible=false;

    edges= createEdgeSprites();
  
    score=0;
    deaths="";
  
   
  
    jake.setCollider("circle",0,0,30);
  
  }

function draw() {
  
  background(80);
  jake.x=width/2;
  jake.velocityX=0;
  jake.velocityY=0;
  

  if(gameState==Play)
    {
      // gamesound.play()

      if(keyDown("right"))
         {
           jake.velocityX=5;
         }
      if(keyDown("left"))
         {
           jake.velocityX=-5;
         }
      
      jake.x=World.mouseX
  
    road.velocityY=10;
    road2.velocityY=10;


    if(bombGroup.isTouching(jake))
    {
      
      bombGroup.destroyEach();
      ohnosound.play()
      deaths=deaths+" ☠";
    }
       
    if(swordmanGroup.isTouching(jake))
    {

      swordmanGroup.destroyEach();
      ohnosound.play()
      deaths=deaths+" ☠";
    }
       
    if(knifemanGroup.isTouching(jake))
      {

        knifemanGroup.destroyEach();
        ohnosound.play()
        deaths=deaths+" ☠";
      }
       
    if(goldGroup.isTouching(jake))
      {
        goldGroup.destroyEach();
        yaysound.play()
        score=score+50;
      }
       
       
    if(treasureGroup.isTouching(jake))
      {
        treasureGroup.destroyEach();
        yaysound.play()
        score=score+100;
      }
       
    if(moneyBagGroup.isTouching(jake))
      {
        moneyBagGroup.destroyEach();
        yaysound.play()
        score=score+100;
      }
      
    if(score>1500)
       {
         score=1500;
       }
       
    if(deaths>" ☠ ☠ ☠ ☠ ☠")
       {
         deaths=" ☠ ☠ ☠ ☠ ☠";
       }
       
       
   if(road.y>height)
{
road.y=height/2
}
  
   jake.collide(invisibleland);
   jake.collide(invisibleland2);
   jake.collide(edges[3]);
   jake.collide(edges[2]);
   jake.collide(edges[1]);
   jake.collide(edges[0]);
       
        
    createmoneyBag();
    creategold();
    createtreasure();
    createbomb();
    createswordman();
    createknifeman();
       
  }
  
drawSprites();
  
  if(gameState==Play)
   {
     textSize(15);
     fill("white");
     text("Treasure:"+score+" $",width/2-150,20);
     text("Deaths: "+deaths,width/2+10,20);
    }
  
  if ((deaths==" ☠ ☠ ☠ ☠ ☠")||(score==1500))
      { 
      gameState=End;
        
      }

  if((deaths==" ☠ ☠ ☠ ☠ ☠" )&&(gameState==End))
     {
       
        road.velocityY=0;
        road2.velocityY=0;
        jake.velocitX=0;
        jake.velocityY=0;
        goldGroup.destroyEach();
        moneyBagGroup.destroyEach();
        treasureGroup.destroyEach();
        bombGroup.destroyEach();
        swordmanGroup.destroyEach();
        knifemanGroup.destroyEach();
        tryagain .visible=true
        restart.visible=true;
        jake.x=width/2;
  
     }
  
  if((score==1500)&&(gameState==End))
     {
    
        road.velocityY=0;
        road2.velocityY=0;
        jake.velocitX=0;
        jake.velocityY=0;
        goldGroup.destroyEach();
        moneyBagGroup.destroyEach();
        treasureGroup.destroyEach();
        bombGroup.destroyEach();
        swordmanGroup.destroyEach();
        knifemanGroup.destroyEach();
        youwin .visible=true
        restart.visible=true;
        jake.x=width/2;
   
     }
  

  
  if((touches.length > 0)||(mousePressedOver(restart))&&(gameState==End))
    {
      score=0;
      deaths=""
      gameState=Play;
      restart.visible=false;
      tryagain.visible=false;
      youwin.visible=false;
      jake.x=width/2;
      
      touches = [];
    }


  
  
  
}



function createmoneyBag() {
  if (frameCount % 110 == 0) 
  {
    moneyBag = createSprite(Math.round(random(50,width-50),40,10,10))
    moneyBag.addImage(moneybagImg);
    moneyBag.scale=0.10;
    moneyBag.velocityY = 4.4;
    moneyBag.lifetime = 570;
    moneyBagGroup.add(moneyBag);
  }
  }


function creategold() {
  if (frameCount % 159 == 0) 
  {
    gold = createSprite(Math.round(random(50,width-50),40,10,10))
    gold.addImage(goldImg);
    gold.scale=0.14;
    gold.velocityY = 6;
    gold.lifetime = 200;
    goldGroup.add(gold);
  }
}

function createtreasure() {
  if (frameCount % 167 == 0) 
  {
    treasure = createSprite(Math.round(random(50,width-50),40,10,10)) 
    treasure.addImage(treasureImg);
    treasure.scale=0.14;
    treasure.velocityY = 4;
    treasure.lifetime = 570;
    treasureGroup.add(treasure);
  }
}

function createbomb() {
  if (frameCount % 200 == 0)
  {
    bomb = createSprite(Math.round(random(50,width-50),40,10,10)) 
    bomb.addImage(bombImg);
    bomb.scale=0.14;
    bomb.velocityY = 7;
    bomb.lifetime = 570;
    bombGroup.add(bomb);
  }
}


function createswordman() {
  if (frameCount % 275 == 0) 
  {
     swordman = createSprite(Math.round(random(50,width-50),40,10,10)) 
     swordman.addImage(swordmanImg);
     swordman.scale=0.14;
     swordman.velocityY = 3;
     swordman.lifetime =570;
     swordmanGroup.add(swordman);
  }
}


function createknifeman() {
  if (frameCount % 240 == 0) 
  {
    knifeman=createSprite(Math.round(random(50,width-50),40,10,10)) 
    knifeman.addImage(knifemanImg);
    knifeman.scale=0.14;
    knifeman.velocityY = 5;
    knifeman.lifetime = 570;
    knifemanGroup.add(knifeman);
  }
}