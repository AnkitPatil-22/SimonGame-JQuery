var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;


$(document).keypress(function(){
  if(!started){
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function nextSequence() {

  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  level ++;
  $("#level-title").text("level " + level);

}

function playSound(name){

  var myAudio = new Audio('sounds/'+name+'.mp3');
  myAudio.play();

}

function animatePress(currentColour){

  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel) {

  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("correct");

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  }else{
    playSound("wrong");

    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver(){

  level = 0;
  gamePattern = [];
  started = false;
  
}
