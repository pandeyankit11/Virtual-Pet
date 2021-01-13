//Create variables here
var dog,dogImg,happydogImg,database,foodS,foodStock;
function preload()
{
  //load images here
  dogImg=loadImage("dogImg.png");
  happydogImg=loadImage("dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database=firebase.database();
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
  foodStock.set(20);

  dog=createSprite(250,350,10,60);
  dog.addImage(dogImg);
  dog.scale=0.2;

}


function draw() {  
background("yellow");
if(foodS!==undefined){
textSize(25);
fill("red");
text("Press UP ARROW to feed the pet",65,50);
text("Food Remaining:"+foodS,150,120);

if(keyWentDown(UP_ARROW)){
writeStock(foodS);
dog.addImage(happydogImg);
}
if(keyWentUp(UP_ARROW)){
  dog.addImage(dogImg);
}

if(foodS===0){
  foodS=20;
}

  drawSprites();
  //add styles here
   }
}
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref("/").update({
    Food:x
  })
}
function readStock(data){
foodS=data.val();
}


