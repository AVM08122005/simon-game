var buttonColors = ["red", "blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();   
        started = true; 
    }
    
});



$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});



function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        
        startOver();
    }
}


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    
}   


function animatePress(currentColor){
    $('#' + currentColor).addClass("pressed");

    setTimeout(function(){
        $('#' + currentColor).removeClass("pressed");
    },100);
}


function playSound(name){
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}


function startOver(){
    level =0;
    gamePattern = [];
    started = false;

}








