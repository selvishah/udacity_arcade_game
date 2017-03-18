// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.multiplier = Math.floor(Math.random() * (3) + 1); //generates numbers between 2 and 4 which correspond to row 2,3,4 in the game
    this.x = 0;
    this.y = this.multiplier*83-20;
    this.speed = 100
    this.increaseSpeed = 0;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x > 505){ // once bug is at the end of the canvas , reset the position
        this.multiplier = Math.floor(Math.random() * (3) + 1);
        this.x = 0;
        this.y = this.multiplier*83-20;
    }
    this.x = this.x+this.speed*this.multiplier*dt+this.increaseSpeed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    // The image/sprite for our players, this uses
    // a helper we've provided to easily load images

    this.sprite = "";
    this.score = 0;
    this.lives = 3;
    //position player at 5th row, 2 column
    this.x = 2*101;
    this.y = 5*83-20;
    this.hearty = this.y;
};

// Update the player's position, required method for game
// makes sure player doesnt leave the canvas.
// if player reaches the 0th row, player wins
Player.prototype.update = function() {


    if (this.x > 4*101){
        this.x = this.x-101;
    }
    else if (this.x < 0){
        this.x = this.x+101
    }
    if (this.y > 5*83-20){
        this.y =this.y-83;
    }
    else if (this.y < 0){
        this.score += 50;
        common.action = "WIN";
        allEnemies.forEach(function (enemy){
            enemy.increaseSpeed += 2; // on win increase the speed of the bugs by a factor of 5
        })
        common.reset();
        return;
    }
    this.checkCollision();

};

// Draw the player on the screen, required method for game
//also write the score on top right and lives on the top left
Player.prototype.render = function() {

    if (this.sprite == ""){
        return;
    }
    if (common.pause == 1){
        ctx.globalAlpha = 0.5;
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.globalAlpha = 1;
    ctx.font = "20px Griffy";
    ctx.fillStyle = "white";
    ctx.fillText("Score:"+this.score, 420,83);
    ctx.fillText("Lives:"+this.lives,20,83)
};

//update player position based on key input
Player.prototype.handleInput = function(key){

    if (common.pause == 1){ //if game is paused, dont update position based on keys
        return;
    }

    if (key == 'left'){
        this.x = this.x-101;
    }
    else if(key == 'right'){
        this.x = this.x+101;
    }
    else if(key == 'up'){
        this.y =this.y-83;
    }
    else if(key == 'down'){
        this.y=this.y+83;
    }
}

//check collision of player with bug/collectibles
Player.prototype.checkCollision = function() {

    playerRow = Math.floor(this.y/83);
    playerCol = (this.x)/101;


    for (var index=0;index<allEnemies.length;index++){
        var enemy = allEnemies[index];
        if (Math.round(enemy.x/101) == playerCol  && Math.floor(enemy.y/83) == playerRow){
            player.score -= 50;
            common.action = "LOSE";
            player.lives -= 1;
            common.reset();
            break;
        }
    };

    if (Math.round(collectibles.x/101) == playerCol  && Math.floor(collectibles.y/83) == playerRow){

        if (/Blue/.exec(collectibles.sprite)){
            var increaseSpeed = 0
            allEnemies.forEach(function(enemy) {
                enemy.speed = 10 /*slow down all bugs*/
                increaseSpeed = enemy.increaseSpeed;
                enemy.increaseSpeed=0;
            })
            setTimeout(function(){allEnemies.forEach(function(enemy) {
                                    enemy.speed = 100 /*default speed for all bugs*/
                                    enemy.increaseSpeed = increaseSpeed;
            })},10000)
        }
        else if (/Green/.exec(collectibles.sprite)){
            allEnemies.forEach(function(enemy) {
                enemy.speed = 500 /*speed up all bugs*/
            })
            setTimeout(function(){allEnemies.forEach(function(enemy) {
                                    enemy.speed = 100 /*default speed for all bugs*/
            })},10000)
        }
        else if (/Heart/.exec(collectibles.sprite)){
            player.lives += 1;
        }
        else {
            player.score += 10;
        }

        collectibles.update();
    }

}

// collectibles class

var Collectibles = function() {

    this.sprite = "images/Gem Orange.png";

    var randomRow = Math.floor(Math.random() * (3)+1);
    var randomColumn = Math.floor(Math.random() * (5));

    this.x = randomColumn*101;
    this.y = randomRow*83-20;

    this.interval = setInterval(this.update.bind(this),5000); //will change position of collectible and collectible itself every 5 seconds
};

// change collectible type and collectible position

Collectibles.prototype.update = function() {

    gemsList = ["images/Gem Blue.png","images/Gem Green.png","images/Gem Orange.png","images/Heart.png"];

    var random = Math.floor(Math.random() * (4));

    this.sprite = gemsList[random];
    //position player at 5th row, 2 column

    var randomRow = Math.floor(Math.random() * (3)+1);
    var randomColumn = Math.floor(Math.random() * (5));

    this.x = randomColumn*101;
    this.y = randomRow*83-20;

}

// Draw the collectible on the screen, required method for game
Collectibles.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// common class for pause/unpause/reset
var Common = function(){
    this.pause = 0; //set to 1 when game is paused
    this.action = "";
    this.opacity = 1;
}

//pauses game
Common.prototype.pauseGame = function() {
    this.pause = 1;
    clearInterval(collectibles.interval);
}

//resumes game or asks users if they want to resume game
Common.prototype.unpauseGame =function(){
    if (player.lives<=0){
        player.lives=3;
        this.action = "RESTART"; //once lives are negative or 0 reset the score and lives and ask user if they want to play again
        allEnemies.forEach(function (enemy){
            enemy.increaseSpeed = 0;
        })
    }
    else {
        this.pause = 0;
        collectibles.interval = setInterval(function(){collectibles.update()},5000);
        this.action = "";
    }
}

/*reset player/enemy/collectible variables*/

Common.prototype.reset = function(){
    player.x = 2*101;
    player.y = 5*83-20;
    player.hearty = player.y;
    if (player.score<0){
        player.score=0;
    }
    if (player.lives<=0){
        player.score=0;
    }
    allEnemies.forEach(function(enemy) {
        enemy.speed = 100;
    })
    this.pauseGame();
    setTimeout(this.unpauseGame.bind(this),2500); /*resume game after 2.5 sec*/
    this.opacity = 1;
}

// Draw/write different things on canvas based on whether player won/lost/paused game/lost all lives
Common.prototype.pauseAction = function() {

    if (this.action == "WIN") {
        var x = Math.floor(Math.random() * (405) + 10);
        var y = Math.floor(Math.random() * (405) + 10);
        ctx.drawImage(Resources.get("images/Star.png"), x, y);
        ctx.font = "80px Griffy";
        ctx.fillStyle = "black";
        ctx.fillText("You WIN!", 100,300);
    }
    else if (this.action == "LOSE") {
        this.opacity -= 0.006;
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(Resources.get("images/Heart.png"), player.x, player.hearty);
        if (player.hearty > 0){
            player.hearty -= 2.5;
        }
        ctx.globalAlpha = 1;
        ctx.font = "80px Griffy";
        ctx.fillStyle = "black";
        ctx.fillText("You LOSE!", 90,300);
    }
    else if (this.action == "PAUSE") {
        ctx.font = "60px Griffy";
        ctx.fillStyle = "black";
        ctx.fillText("Game PAUSED!", 80,300);
    }
    else if (this.action == "RESTART"){
        ctx.font = "60px Griffy";
        ctx.fillStyle = "black";
        ctx.fillText("Game OVER!", 80,270);
        ctx.fillText("Click to RESTART!", 30,350);
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(),new Enemy(),new Enemy()];
var player = new Player();
var collectibles = new Collectibles();
var common = new Common(); /* common function like reset/action on losing game/winning game/pausing game etc*/


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//this listens to which player has been selected and sets the sprite variable and hides the select player dom
var charNameList = document.getElementsByClassName("charname");
for (i=0;i<charNameList.length;i++){
    charNameList[i].addEventListener('click',function(evt){
        var image = this.getElementsByTagName("img")[0];
        player.sprite = image.getAttribute("src");
        document.getElementById("character").style.display = "none";
        script = document.createElement('script'),
        script.setAttribute("src","js/engine.js");
        document.body.appendChild(script);
    });
}

/*pause game if user clicks on canvas*/

var canvasClick =function(){
    var canvas = document.getElementsByTagName("canvas")[0];
    canvas.addEventListener('click',function(evt){
        if (common.pause == 0){
            common.action = "PAUSE"
            common.pauseGame();
        }
        else {
            common.unpauseGame();
        }
    });
}



