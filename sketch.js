var bg, bgImg;
var player, shooterImg, shooter_shooting, invisibleground;
var boxGroup, villain

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 50

function preload() {

  harryImg = loadAnimation("assets/hp_1.png", "assets/hp_1.png")
  snitchImg = loadImage("assets/snitch.png")
  voldemortImg = loadImage("assets/voldemort.png")
  dementorImg = loadImage("assets/dementor.png")
  bgImg = loadImage("/assets/BG.JPG")
  boxImg = loadImage("assets/box.png")
  bludgerImg = loadImage("assets/bludger.png")
  killspellImg = loadImage("assets/avada-kedavra.png")
  blastspellImg = loadImage("assets/bombarda.png")
  patronusspellImg = loadImage("assets/patronus.png")


  harry_running = loadAnimation("assets/hp_1.png", "assets/hp_2.png", "assets/hp_3.png")



}

function setup() {


  createCanvas(windowWidth, windowHeight);

  // adding the background image
  bg = createSprite(0, 0, width, height)
  bg.addImage(bgImg)
  bg.scale = 3.8



  //creating the player sprite
  player = createSprite(80, displayHeight - 300, 50, 50);
  player.addAnimation("running", harry_running)
  player.addAnimation("idle", harryImg)
  player.scale = 5


  //  player.debug = true
  player.setCollider("rectangle", 0, 0, 20, 30)


  invisibleground = createSprite(width / 2, height - 50, width, 20)
  invisibleground.visible = false

  boxGroup = createGroup()
  villainGroup = createGroup()
  bludgerGroup = createGroup()
  snitchGroup = createGroup()
}

function draw() {
  background(0);



  if (gameState === PLAY) {
    bg.velocityX = -4;
    if (bg.x < 0) {
      bg.x = bg.width / 3;
    }
    if ((keyDown("space") && player.y >= 750) || touches.length > 0) {
      player.velocityY = -25
      console.log(player.y)
      player.changeAnimation("idle")
    }

    player.velocityY = player.velocityY + 0.9

    spawnBoxes()
    spawnVillains()

    player.overlap(boxGroup, touched)
  }


  //moving the player up and down and making the game mobile compatible using touches


  // if(keyDown("DOWN_ARROW")||touches.length>0){
  //  player.y = player.y+30
  // }


  // // //release bullets and change the image of shooter to shooting position when space is pressed
  // if(keyWentDown("space")||touches.length>0){
  //  player.velocityY= -2
  //   player.changeAnimation("idle")

  // }


  // // //player goes back to original standing image once we stop pressing the space bar
  // else if(keyWentUp("space")){

  //   player.changeAnimation("running")

  // }




  player.collide(invisibleground)

  drawSprites();


  fill("red")
  textSize(20)
  text("SCORE : " + score, width - 200, 50)
}

function spawnBoxes() {
  if (frameCount % 225 === 0) {
    var box = createSprite(width, displayHeight - 190, 20, 80)
    box.velocityX = -4.5
    box.addImage(boxImg)
    box.lifetime = 600
    box.scale = 0.35
    boxGroup.add(box)
  }
}



function touched() {
  score -= 5
  boxGroup.destroyEach()

}
function spawnVillains() {
  if (frameCount % 500 === 0) {
    var villain = createSprite(width, displayHeight - 270, 50, 80)
    villain.velocityX = -5
    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1: villain.addImage(voldemortImg);

        villain.scale = 0.6             
         break;
      case 2: villain.addImage(dementorImg);

        villain.scale = 0.75              
        break;
    }
  
    villain.lifetime = 400
    villainGroup.add(villain)
  }


}
