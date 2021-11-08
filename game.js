var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];


var level = 0;

$(document).keypress(function() {
  nextSequence();
});




$(".btn").click(function(event) {
  var userChosenColor = event.target.id;
  /*var userChosenColor=$(this).attr("id"); WÜRDE AUCH FUNKTIONIEREN*/
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

$(".btnstart").click(function(event) {
  nextSequence();

  $("button").addClass("pressed");
  setTimeout(function() {
    $("button").removeClass("pressed");
  }, 100);


});



function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor((Math.random()) * buttonColors.length);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(50).fadeIn(50);
  playSound(randomChosenColor);
  $("h1").html("Level " + level);
  level++;
}



function playSound(name) {
  var buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $(".pressed").removeClass("pressed");
  }, 100);

}


function checkAnswer(currentLevel) {

  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {

    console.log("wrong");

    playSound("wrong");
    $("body").addClass("game-over");
    startOver();

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").html("Game Over, Press Any Key to Restart");





  }

}

function startOver() {
  level = 0;
  gamePattern = [];

}
