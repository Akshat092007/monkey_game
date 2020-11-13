var monkey, monkey_running, monkeycollide;
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score, survivaltime;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  var monkeycollided = loadAnimation("sprite_1.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
  createCanvas(400, 400);
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();

  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(70, 350, 800, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;

  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  
  score = 0;
  survialTime = 0;

}

function draw() {
  background(180);

  stroke("black");
  fill("black");
  textSize(20);
  text("Survial Time:" + survialTime, 100, 50);

  stroke("black");
  fill("black");
  textSize(20);
  text("Score:" + score, 300, 100);

  monkey.velocityY = monkey.velocityY + 0.8;


  monkey.collide(ground);
  //PLAY
  if (gameState === PLAY) {

    survialTime = Math.ceil(frameCount / frameRate());

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    //jump when the space key is pressed
    if (keyDown("space") && monkey.y >= 300) {
      monkey.velocityY = -16;
    }

    if (FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score + 1;
    }

    if (monkey.isTouching(obstacleGroup)) {
      gameState = END;
    }
 if (gameState === END){
   monkey.destroy();
   ground.destroy();
   FoodGroup.destroyEach();
   obstacleGroup.destroyEach();
 }
    
    food();
    obstacles();
  }
  drawSprites();
}

function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400, 350, 40, 10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.1;

    banana.velocityX = -3;
    banana.lifetime = 150;

    FoodGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(250, 325, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 100;
    obstacle.scale = 0.1;
    obstacleGroup.add(obstacle);
  }

}