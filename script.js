let userClickedPattern  = []; 
let buttonColours = ["red","blue","green","yellow"];
let gamePattern = [];
let level = 0;

let started = false;


$(".btn").click((e) => {
    let src = e.currentTarget.id;
    userClickedPattern.push(src);
    
    playAudio(src);
    animatePress(src);

    checkAnswer(userClickedPattern.length - 1)
});

$(document).on("keydown", () => {
    if(!started){
        $("#level-title").text("level " + level);
        // animatePress(randomChosenColours);
        nextSequence();
        started = true;
    }
    
})

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);
    let randomNumber =  Math.floor(Math.random() * 4);
    let randomChosenColours = buttonColours[randomNumber];
    gamePattern.push(randomChosenColours);
    console.log("Game Pattern  = " + gamePattern);
    
    $("." + randomChosenColours).fadeTo(100, 0.4, function () { $(this).fadeTo(500, 4.0) });
    playAudio(randomChosenColours);
}

function playAudio(src){
    let audio = new Audio(`sounds/${src}.mp3`);
    audio.play();
}

function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");
    setTimeout(() => $("." + currentColour).removeClass("pressed") ,100);
}

function checkAnswer(currendIndex){
    if(gamePattern[currendIndex] === userClickedPattern[currendIndex]){
        console.log("User Clicked Pattern = " + userClickedPattern);
    
       if(userClickedPattern.length === gamePattern.length){
           setTimeout(function () {
               nextSequence();  
           },1000);
       }

       
    } else{
        playAudio("wrong");
        $("body").addClass("game-over")
        $("#level-title").text("Game-Over, Press Any Key to Restart");
        
        setTimeout(function () {
            $("body").removeClass("game-over")

        },200);

        startOver();
    }

}

function  startOver(){
    level = 0;
    gamePattern = [];
    started =  false;
}