frontend-nanodegree-arcade-game
===============================

Students should use this [rubric](https://review.udacity.com/#!/projects/2696458597/rubric) for self-checking their submission. Make sure the functions you write are **object-oriented** - either class functions (like Player and Enemy) or class prototype functions such as Enemy.prototype.checkCollisions, and that the keyword 'this' is used appropriately within your class and class prototype functions to refer to the object the function is called upon. Also be sure that the **readme.md** file is updated with your instructions on both how to 1. Run and 2. Play your arcade game.

For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).

Running the Game:
================

1. After downloading the games from , open index.html in a webpage.
2. After loading the html page, you should see an option appear for choosing a player.
3. You are now ready to play!

Playing the Game:
================

## Objective :

**The objective of the game is to get across the stone road to the water (blue blocks) without colliding with the bugs.**

## Collectibles:

* Green Gem : Increases the speed of the bug for some time
* Blue Gem : Slows down the bug for some time
* Orange Gem : Adds to score
* Heart : Adds to lives

## Lives:

* Each player has 3 lives to begin with.
* Everytime player collides with the bugs, a life is lost
* Each time a Heart is collected, life is added
* Lives are displayed at the top left corner of the game

## Scoring:
    
* Every time the player reaches the water , 50 points are awarded.
* Every time player collect Orange Gem, 10 points are awarded.
* Every time the player collides with the bug, 50 points are deducted.
* After all lives are lost, score is reset to 0
* Lives are displayed at the top right corner of the game

## How to Play:

1. Click on a character you want to play with first
2. Use the arrow keys to move the player towards the water
    * Up arrow key is to move the player up by 1 block
    * Down arrow key is to move the player down by 1 block
    * Left arrow key is to move the player left by 1 block
    * Right arror key is to move the player right by 1 block
3. On Collision with bugs, Player will be moved back to start position
4. On Colliding with the collectibles different things can happen.(Look at Collectibles section)
5. If player manages to reach the water without colliding with the bugs, player is moved back to start position.
6. The speed of the bugs will increase every time player manage to reach the water
7. Once all lifes are lost, game is reset
