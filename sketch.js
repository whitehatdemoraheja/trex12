var trex, trex_running,trex_collided;
var ground, inv_ground,groundimage;

var cloudsGroup, cloudImage;
var obstacleGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6; 
function preload()
{
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided=loadImage("trex_collided.png");
  groundimage=loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
}

function setup() {
  createCanvas(400, 400);
  trex=createSprite();
  trex.addAnimation("running",trex_running);
  ground=createSprite(200,380,400,20);
  ground.addImage("ground",groundimage);
  ground.X=ground.width/2;
  
  ground.velocityX=-3;
  
  inv_ground=createSprite(200,390,400,20)
  inv_ground.visible=false;
  
  cloudGroup=new Group();
  obstacleGroup = new Group();
  
  
}

function draw() {
  background(180);
  
  if(keyDown("space")){
      trex.velocityY = -12 ;
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  spawnClouds();
  spawnObstacles();
  trex.collide(inv_ground);
  
  drawSprites();    
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(280,320));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloud.lifetime=200;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = - 4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand)
    { 
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break; 
      case 3: obstacle.addImage(obstacle1);
              break;
      case 4: obstacle.addImage(obstacle2);
              break; 
      case 5: obstacle.addImage(obstacle1);
              break;
      case 6: obstacle.addImage(obstacle2);
              break; 
      default: break;
    }
      
      
    //obstacle.setAnimation("obstacle" + rand);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}