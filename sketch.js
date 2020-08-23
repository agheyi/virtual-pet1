var dog, happyDog, database, foodS, foodStock, happyDogImg, dogImg, 
button;

function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
  
  createCanvas(500, 500);

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on('value', readStock);

  dog = createSprite(250, 250);
  dog.addImage("dog", dogImg)
  dog.scale = 0.15;

  button = createButton('Restart');
  button.position(970, 160);
}

function readStock(data)
{
  foodS = data.val();
}
function writeStock(x)
  {
    database.ref('/').update({
      Food:x
    })
    
}

function updateFood(){
  database.ref('/').update({
    Food : foodS - 1
  })
  
}

function restart()
{
  database.ref('/').update({
    Food: 20
  })
}

function draw() {  
  //console.log(mouseX, mouseY);
  background(49, 139, 87);
  button.mousePressed(restart)
  
  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage('dog', happyDogImg);
    updateFood()
  }
  if (foodS <= 0)
  {
    noStroke();
    fill('white');
    textSize(20);
    background('red');
    text('NO MORE FOOD', 170, 100);
    dog.addImage('dog', dogImg);
  }
  // console.log('hello');
  drawSprites();
  noStroke();
  fill('white');
  textSize(20);
  if (foodS > 0)
  {
    text("Note: press UP_ARROW to feed the dog", 75, 50);
    text('Amount of remaining food: ' + foodS, 115, 100);
  }
}



