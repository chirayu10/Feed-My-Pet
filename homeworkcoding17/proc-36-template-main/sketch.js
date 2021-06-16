var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood,reduceFood;
var foodObj,time;


//create feed and lastFed variable here
var feed,lastFed

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
reduceFood=createButton("Feed the Dog")
reduceFood.position(700,95)
reduceFood.mousePressed(feedDog)
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  feed=database.ref('FoodTime')
  feed.on("value",function(data){
    foodObj.lastFed=data.val()
  })
  
 time=lastFed
  //write code to display text lastFed time here
  textSize(16)
  fill ("white")
  if(foodObj.lastFed>=13 && foodObj.lastFed<=23){
    text (" Last Feed :"+(foodObj.lastFed-12)+"   PM",330,30)
  }else if(foodObj.lastFed>=1 && foodObj.lastFed<=11){
    text (" Last Feed :"+foodObj.lastFed+"   AM",330,30)
  }else if(foodObj/12===1){
    text (" Last Feed : 12 PM",330,30)
  }else{
    text (" Last Feed : 12 AM",330,30)
  }

  drawSprites();
  
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  foodObj.deductFood()
  
  database.ref('/').update({
    Food:foodObj.foodStock
  })


  let time=hour()
foodObj.lastFed=time

database.ref('/').update({
FoodTime:foodObj.lastFed

})



}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
