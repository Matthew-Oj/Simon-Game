var buttonColours = ["red", "blue", "green", "yellow"]; 
var gamePattern = []; 
var userClickedPattern = []; 
var started = false;
var level = 0;

$(document).on("keypress", function (){
    if (!started) {  // shorthand for started === false
        $("#level-title").text("Level " + level); 
        nextSequence();
        started = true;
    }
})

$(".btn").on("click", function(e){
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);  
});

function nextSequence () {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level); 
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds\\" + name + ".mp3"); 
    audio.play(); 
}

function animatePress (currentColour) {
    var button = $("#" + currentColour);
    button.addClass("pressed")
    setTimeout(function(){
        button.removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    // $("#level-title").text("Press Any Key to Start");
}


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) 
                setTimeout(function(){
                nextSequence();
            }, 1000);
        // }
    } else {
        playSound("wrong")
        var body = $("body")
        body.addClass("game-over");
        setTimeout(function(){
            body.removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

