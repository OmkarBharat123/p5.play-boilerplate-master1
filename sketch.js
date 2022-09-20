var backgroundImg, player, playerImg;
var astoroid, astoroidImg, astoroidGroup;
var bullets = 70;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var life = 3;
var astoSound, gameOverSound;
var gameState = "fight"
var bottom, bulletSound;

function preload(){
  heart1Img = loadImage("1Heart.png")
  heart2Img = loadImage("2Heart.png")
  heart3Img = loadImage("3Heart.png")

  astoSound = loadSound("asto.wav");
  gameOverSound = loadSound("gameOver.wav");
  bulletSound = loadSound("bulletSoun.mp3");

  backgroundImg = loadImage("background.jpg");
  playerImg = loadImage("player.png");
  astoroidImg = loadImage("astoroid.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  player = createSprite(900, 500, 160, 160);
  player.addImage(playerImg);
  player.scale = 0.30;

  bottom = createSprite(600,950,3000,10);

  heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

  astoroidGroup = new Group()
  bulletGroup = new Group()


}

function draw() {
  background(backgroundImg); 
  



  if(keyDown("w")){
    player.y = player.y-30
  }

  if(keyDown("s")){
    player.y = player.y+30
  }

  if(keyDown("a")){
    player.x = player.x-30
  }

  if(keyDown("d")){
    player.x = player.x+40
  }


  if(keyWentDown("space")){
    bulletSound.play();
    bullet = createSprite(player.x-50,player.y,10,20)
    bullet1 = createSprite(player.x+50,player.y,10,20)
    bullet.shapeColor = "#FEFF89"
    bullet1.shapeColor = "#FEFF89"
    bullet.velocityY = -20
    bullet1.velocityY = -20
    bulletGroup.add(bullet)
    bulletGroup.add(bullet1)
    player.depth = bullet.depth
    player.depth = bullet1.depth
    player.depth = player.depth+2
    player.depth = player.depth+2
    bullets = bullets-1
  }

  if(bullets==0){
    gameState = "bullet"
      
  }


  if(bulletGroup.isTouching(astoroidGroup)){
    astoroid.destroy();
  }

  if(gameState === "fight"){

    if(life===3){
      heart3.visible = true
      heart1.visible = false
      heart2.visible = false
    }
    if(life===2){
      heart2.visible = true
      heart1.visible = false
      heart3.visible = false
    }
    if(life===1){
      heart1.visible = true
      heart3.visible = false
      heart2.visible = false
    }
  
    //go to gameState "lost" when 0 lives are remaining
    if(life===0){
      heart1.visible = false
      heart3.visible = false
      heart2.visible = false
      gameState = "lost"
      
    }

    if(player.isTouching(astoroidGroup)){
      astoroidGroup.destroyEach();
      life=life-1
    }

    if(life<1){
      gameOverSound.play();

    }
  }

  if(gameState == "lost"){
  
    textSize(100)
    fill("white")
    text("GAME OVER", 600, 600);
    astoroidGroup.destroy();
    player.destroy();
   
  
  }
  enemy();
  
  drawSprites();
}


function enemy(){
  if(frameCount%50===0){
    astoroid = createSprite(random(400,800),random(50,100),100, 100);
    astoSound.play();
    astoroid.addImage(astoroidImg);
    astoroid.scale = 0.20;
    astoroid.velocityY =+25; 
    astoroid.debug = true;
    astoroid.setCollider("rectangle",0,0,400,400);

    astoroid.lifetime= 700;
    astoroidGroup.add(astoroid);

    
  }
}



