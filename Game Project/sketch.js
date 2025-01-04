/*
The Game Project part 8

Week 20

*/


var jumpSound;
var damageSound;
var collecSound;

function preload()
{
    soundFormats('mp3','wav');
    
    //load your sounds here
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);
    
    damageSound = loadSound('assets/damage.wav');
    damageSound.setVolume(0.1);
    
    collectSound = loadSound('assets/coin.wav');
    collectSound.setVolume(0.1);
}

var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var collectables;
var trees_x;
var treePos_y;
var clouds;
var mountains;

var cameraPosX;
var game_score;
var flagpole;
var lives;
var playerDead;

var platforms;
var enemies;

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
    lives = 3;
    startGame();
}

function startGame()
{
    gameChar_x = width/2;
	gameChar_y = floorPos_y;
    
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    
    game_score = 0;
    flagpole = {xPos: 2000, isReached: false};
    playerDead = false;
    
    trees_x = [-300, -50, 150, 450, 700, 1150];
    treePos_y = floorPos_y - 165;
    clouds = [
            {xPos: -350,
            size: 1.5},
        
            {xPos: -100,
            size: 1.5},
        
            {xPos: 100,
            size: 1},
        
            {xPos: 420,
            size: 1.2},
        
            {xPos: 900,
            size: 1.5},
        
            {xPos: 1200,
            size: 1.7},
        
            {xPos: 1500,
            size: 2},
        
            {xPos: 1750,
            size: 1.1}
            ];
    mountains = [
            {xPos: -30,
            size: 45},
        
            {xPos: 600,
            size: 20},
        
            {xPos: 1200,
            size: 60},
        
            {xPos: 2000,
            size: 60},
        
            {xPos: 2500,
            size: 60},
            ];
    collectables = [
            {x_pos: 100,
             y_pos: 430,
             size: 30,
             isFound: false},
        
            {x_pos: 800,
            y_pos: 430,
            size: 30,
            isFound: false},
        
            {x_pos: 1100,
            y_pos: 430,
            size: 30,
            isFound: false},
            ];
    canyons = [
        {x_pos: -150,
         width: 120},
        
        {x_pos: 210,
         width: 120},
        
        {x_pos: 980,
         width: 85}
    ];
    
    platforms = []; 
    platforms.push(createPlatforms(100, floorPos_y - 70, 100));
    platforms.push(createPlatforms(400, floorPos_y - 70, 100));
    platforms.push(createPlatforms(750, floorPos_y - 70, 150));
    platforms.push(createPlatforms(1300, floorPos_y - 80, 80));
    
    enemies = [];
    enemies.push(new Enemy(100, floorPos_y - 10, 100));
    enemies.push(new Enemy(750, floorPos_y - 10, 100));
    enemies.push(new Enemy(1100, floorPos_y - 10, 100));
    enemies.push(new Enemy(1500, floorPos_y - 10, 100));
}

function draw()
{
	///////////DRAWING CODE//////////
	background(100,155,255); //fill the sky blue
    
    //draw some green ground
	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y);
    
    //side scrolling
    cameraPosX = gameChar_x - width/2;    
    push();
    translate(-cameraPosX, 0);
    
    //clouds
    drawClouds();
    
    // mountains
    drawMountains();
    
    //trees
    drawTrees();
    
    //platformsф
    for(i = 0; i< platforms.length; i++)
        {
            platforms[i].draw();
        }
    
    //enemies
    for(i = 0; i< enemies.length; i++)
        {
            enemies[i].draw();
            
            var isContact = enemies[i].checkContact();
            if(isContact)
                {
                    if(lives > 0)
                        {
                            lives -=1;
                            damageSound.play();
                            startGame();
                        }
                }
        }
    
    //canyon
    for(c = 0; c < canyons.length; c++)
        {
            //draw the canyon
            drawCanyon(canyons[c]);
            // falling down the canyon
            checkCanyon(canyons[c])
        }
    
    //collectable
    for(i = 0; i < collectables.length; i++)
        {
            if(!collectables[i].isFound)
                {
                    //draw collectable 
                    drawCollectable(collectables[i]);
                    //make the character collect the item
                    checkCollectable(collectables[i])
                }
        }
    //draw flagpole
    renderFlagpole();
    
    //check flagpole
    if(!flagpole.isReached)
        {
                checkFlagpole();
        }
    
    //check death
    if(!playerDead)
        {
                checkPlayerDie();
        }
   
    
	//the game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code
    fill(0, 100, 0);
    ellipse(gameChar_x, gameChar_y - 60, 25, 25);
    ellipse(gameChar_x, gameChar_y - 33, 15, 35);
    
    fill(0, 70, 0);
    rect(gameChar_x - 22, gameChar_y - 19, 20, 10);       
    rect(gameChar_x - 25, gameChar_y - 50, 20, 10);
   
    fill(190, 0, 0);
    rect(gameChar_x - 10, gameChar_y - 67, 5, 7);
	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
    fill(0, 100, 0);
    ellipse(gameChar_x, gameChar_y - 60, 25, 25);
    ellipse(gameChar_x, gameChar_y - 33, 15, 35);
    
    fill(0, 70, 0);
    rect(gameChar_x + 3, gameChar_y - 19, 20, 10);
    rect(gameChar_x + 5, gameChar_y - 50, 20, 10);
    
    fill(190, 0, 0);
    rect(gameChar_x + 6, gameChar_y - 67, 5, 7);
	}
	else if(isLeft)
	{
		// add your walking left code
    fill(0, 100, 0);
    ellipse(gameChar_x, gameChar_y - 60, 25, 25);
    ellipse(gameChar_x, gameChar_y - 33, 15, 35);
    
    fill(0, 70, 0);
    rect(gameChar_x - 7, gameChar_y - 17, 6, 20);       
    rect(gameChar_x + 2, gameChar_y - 17, 6, 20);
    rect(gameChar_x - 5, gameChar_y - 50, 10, 20);
    
    fill(190, 0, 0);
    rect(gameChar_x - 10, gameChar_y - 67, 5, 7);
	}
	else if(isRight)
	{
		// add your walking right code
    fill(0, 100, 0);
    ellipse(gameChar_x, gameChar_y - 60, 25, 25);
    ellipse(gameChar_x, gameChar_y - 33, 15, 35);
    
    fill(0, 70, 0);
    rect(gameChar_x - 7, gameChar_y - 17, 6, 20);       
    rect(gameChar_x + 2, gameChar_y - 17, 6, 20);
    rect(gameChar_x - 5, gameChar_y - 50, 10, 20);
    
    fill(190, 0, 0);
    rect(gameChar_x + 6, gameChar_y - 67, 5, 7);
	}
	else if(isFalling)
	{
		// add your jumping facing forwards code
    fill(0, 100, 0);
    ellipse(gameChar_x, gameChar_y - 60, 25, 25);
    ellipse(gameChar_x, gameChar_y - 33, 25, 30);
    
    fill(0, 70, 0);
    rect(gameChar_x - 23, gameChar_y - 19, 20, 10);     
    rect(gameChar_x + 3, gameChar_y - 19, 20, 10);
    rect(gameChar_x - 29, gameChar_y - 50, 20, 10);
    rect(gameChar_x + 11, gameChar_y - 50, 20, 10);
    
    fill(190, 0, 0);
    rect(gameChar_x - 10, gameChar_y - 67, 20, 7);
	}
	else
	{
		// add your standing front facing code
    fill(0, 100, 0);
    ellipse(gameChar_x, gameChar_y - 60, 25, 25);
    ellipse(gameChar_x, gameChar_y - 33, 25, 35);
    
    fill(0, 70, 0);
    rect(gameChar_x - 13, gameChar_y - 17, 10, 20);       
    rect(gameChar_x + 3, gameChar_y - 17, 10, 20);
    rect(gameChar_x - 20, gameChar_y - 50, 10, 20);
    rect(gameChar_x + 11, gameChar_y - 50, 10, 20);
    
    fill(190, 0, 0);
    rect(gameChar_x - 10, gameChar_y - 67,20, 7);
	}
    
    //side scrolling 
    pop();
    
    
    // text in the corner
    push();
    fill(255);
    textSize(25);
    text("score: " + game_score , 20, 25);
    text("lives: ", 20, 55)
    pop();
    
    //lives tracker
    for(i = lives; i > 0; i-=1)
        {
            fill(255, 0, 0);
            ellipse(70 + 30 * i, 48, 30, 30)
        }
    // text when game over after 0 lives 
    if(lives < 1)
        {
            push();
            fill(0);
            textSize(50);
            text("Game over.Press Space to continue.", width/6, height/2);
            pop();
        }
    //text when passed the level
    if(flagpole.isReached)
        {
            push();
            fill(0);
            textSize(50);
            text("Level complete. Press Space to continue.", width/7, height/2);
            pop();
        }

	///////////INTERACTION CODE//////////
	//moving the game character
    if(isLeft)
    {
        gameChar_x -= 5;
    }
     if(isRight)
    {
        gameChar_x += 5;
    }  
    
    if(gameChar_y < floorPos_y)
    {
        //check contact with enemies
        var isContact = false;
        for(i = 0; i< platforms.length; i++)
        {
            if(platforms[i].checkContact() == true)
                {
                    isContact = true;
                    isFalling = false;
                    break;
                }
            
        }
        
        if(isContact == false)
            {
                gameChar_y += 3;
                isFalling = true;
            }
    }
    else
    {
        isFalling = false;
    }
    
    
}

function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.
    
	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
    
    if((keyCode == 65) && (!isPlummeting) && (lives > 0) && (flagpole.isReached == false))
    {
        console.log("Left arrow");
        isLeft = true;
    }
    else if((keyCode == 68) && (!isPlummeting) && (lives > 0) && (flagpole.isReached == false))
    {
        console.log("Right arrow");
        isRight = true;
    }
       console.log("is plummeting " + isPlummeting);
    
    if(((keyCode == 87) && (isFalling == false) && (!isPlummeting)) && (lives > 0) && (flagpole.isReached == false))
    {
        console.log("Up arrow");
        gameChar_y -= 100;
        jumpSound.play();
    }
    
    //bring the game back to start by pressing Space
    if(((lives < 1) || (flagpole.isReached)) && (keyCode == 32))
    {
        setup();
    }
   
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
    
      if(keyCode == 65)
    {
        console.log("Left arrow");
        isLeft = false;
    }
    else if(keyCode == 68)
    {
        console.log("Right arrow");
        isRight = false;
    }
}

function drawClouds()
{
    for(var c = 0; c < clouds.length; c++)
        {
            fill(255);
            ellipse(clouds[c].xPos, 100, 60 * clouds[c].size, 60 * clouds[c].size);
            ellipse(clouds[c].xPos - 30 * clouds[c].size, 100, 40 * clouds[c].size, 40 * clouds[c].size);
            ellipse(clouds[c].xPos + 30 * clouds[c].size, 100, 40 * clouds[c].size, 40 * clouds[c].size);
        }
}

function drawMountains()
{
     for(var m = 0; m < mountains.length; m++)
        {
             fill(100);
    //middle 
    triangle(mountains[m].xPos - 150 - (mountains[m].size - 20), 432, //b left
             mountains[m].xPos + 150 + (mountains[m].size - 20), 432, //b right
             mountains[m].xPos, 230 - (mountains[m].size - 20)); //top
    
    //left
    triangle(mountains[m].xPos - 200 - (mountains[m].size - 20), 432, //b left
             mountains[m].xPos - 50 + (mountains[m].size - 20), 432, //b right 
             mountains[m].xPos - 130, 300 - (mountains[m].size - 20)); //top
    
    //right
    triangle(mountains[m].xPos + 50  - (mountains[m].size - 20), 432, //b left
             mountains[m].xPos + 200 + (mountains[m].size - 20), 432, //b right
             mountains[m].xPos + 120, 300  - (mountains[m].size - 20));//top
    
    //snow on mountains
    fill(255);
    //right
     triangle(mountains[m].xPos + 103  - (mountains[m].size - 20) * 0.8, 331,//b left   
              mountains[m].xPos + 138 + (mountains[m].size - 20) * 0.8, 331,//b right
              mountains[m].xPos + 120, 300  - (mountains[m].size - 20));//top
    //left
     triangle(mountains[m].xPos - 150  - (mountains[m].size - 20) * 0.8, 336,//b left
              mountains[m].xPos - 109 + (mountains[m].size - 20) * 0.8, 336,//b right
              mountains[m].xPos - 130, 300  - (mountains[m].size - 20));//top
    //middle
     triangle(mountains[m].xPos - 38 - (mountains[m].size - 20) * 0.8, 282,//b left
              mountains[m].xPos + 40 + (mountains[m].size - 20) * 0.8, 282,//b right
              mountains[m].xPos, 230  - (mountains[m].size - 20))//top;
        }
    
}

function drawTrees()
{
      for (var i = 0; i < trees_x.length; i++)
        {
            fill(150, 76, 0);
            rect(trees_x[i], treePos_y + 50, 50, 120);
   
            fill(76, 153, 0);
            ellipse(trees_x[i] + 20, treePos_y, 150, 150);
        }
}

function drawCollectable(t_collectable)
{
    if(t_collectable.isFound == false) 
    {
        fill(220, 196, 34);
        ellipse(t_collectable.x_pos, t_collectable.y_pos, t_collectable.size, t_collectable.size);
        noStroke();
        fill(160, 150, 70);
        text("2£", t_collectable.x_pos - 7, t_collectable.y_pos + 4);
    }
}

function drawCanyon(t_canyon)
{
    fill(100,155,255);
    beginShape();
    vertex(t_canyon.x_pos, 432);
    vertex(t_canyon.x_pos - 17, 470)
    vertex(t_canyon.x_pos - 30, 510);
    vertex(t_canyon.x_pos - 11, 575);
    
    vertex(t_canyon.x_pos - 11 + t_canyon.width, 575);
    vertex(t_canyon.x_pos - 30 + t_canyon.width, 514);
    vertex(t_canyon.x_pos - 17 + t_canyon.width, 479);
    vertex(t_canyon.x_pos + t_canyon.width, 432);
    
    endShape(CLOSE);
}

function checkCollectable(t_collectable)
{
     if(dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < t_collectable.size)
    {
        t_collectable.isFound = true;
        game_score += 1;
        collectSound.play();
    }
}

function checkCanyon(t_canyon) 
{
     if((t_canyon.x_pos < gameChar_x) && ((t_canyon.x_pos + t_canyon.width) > gameChar_x) && (gameChar_y > (floorPos_y - 10)))
        {
            isPlummeting = true;
        }

    if(isPlummeting)
        {
            gameChar_y +=6;
        }   
}
function renderFlagpole()
{
    if(flagpole.isReached)
        {
            fill(0, 255, 0)
        }
    else
        {
            fill(255, 0, 0)
        }    
    push();
    strokeWeight(5);
    stroke(180);
    line(flagpole.xPos, floorPos_y - 200, flagpole.xPos, floorPos_y)
    noStroke();
    rect(flagpole.xPos, floorPos_y - 200, 100, 50);
    pop();
}
function checkFlagpole()
{
    if(dist(gameChar_x, gameChar_y, flagpole.xPos, floorPos_y) < 5)
        {
            flagpole.isReached = true
        }
}
function checkPlayerDie()
{
    if (gameChar_y > height)
        {
            playerDead = true;
            lives -=1;
            damageSound.play()
            
            if(lives > 0)
            {
                startGame();
            }
        }
}

function createPlatforms(x, y, length)
{
    //platforn object that has properties and a built in draw function
    var p =
        {
            x: x,
            y: y,
            length: length,
            draw: function()
            {
                fill(255, 0, 255);
                rect(this.x, this.y, this.length, 20);
            },
            checkContact: function()
            {
                if(gameChar_x > this.x && gameChar_x < this.x + this.length)
                    {
                        var d = this.y - gameChar_y;
                        if(d >= 0 && d < 5)
                            {
                                return true
                            }
                    }
                return false
            }
        };
    return p
}

function Enemy(x, y, range)
{
    this.x = x;
    this.y = y;
    this.range = range;
        
    this.currentX = x;
    this.inc = 1;
    
    this.update = function()
    {
        this.currentX += this.inc;
        
        if(this.currentX >= this.x + this.range)
            {
                this.inc = -1;
            }
        else if (this.currentX < this.x)
            {
                this.inc = 1;
            }
    };
    this.draw = function()
    {
        this.update();
        fill(255,0,0)
        ellipse(this.currentX, this.y, 30, 30);
        fill(255);
        ellipse(this.currentX, this.y - 5, 18, 18);
        fill(0);
        ellipse(this.currentX, this.y - 5, 8, 8);
        fill(255, 100, 0);
        rect(this.currentX + 4, this.y + 5, 5, 20);
        rect(this.currentX - 9, this.y + 5, 5, 20);

        
    };
    
    this.checkContact = function()
    {
        var d = dist(gameChar_x, gameChar_y, this.currentX, this.y)
        if(d < 20)
            {
                return true;
            }
        return false;
    }
}