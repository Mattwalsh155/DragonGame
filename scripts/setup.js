
console.log("Initial setting up...");



// ~~~ { Khori } ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var logoThing;
var logoTime;
// *** The first thing to greet the user after everything is done loading. Usually logos and such like that.
class Scene_Intro extends Phaser.Scene {

    Scene_Intro()
    {
        Phaser.Scene.call(this, { key: 'intro' });
    }

    preload()
    {
        console.log("Intro scene was started.");

        logoTime = 0;
    }

    

    create()
    {
        logoThing = Helper.PlaceImage(100, 100, 'Screen_Intro');
    }

    update(time, delta)
    {
        logoTime += delta;


        var fadeJist;
        fadeJist = Math.min(logoTime / 1000, 1) - (Math.max(0,logoTime-(1000+1500)) / 1000);

        logoThing.alpha = fadeJist;

        this.input.on('pointerdown', function() {
            Helper.ChangeScene('title', {});
        });

        if (logoTime >= 4000) {
            Helper.ChangeScene('title', {});
        }
    }
    
}


// ~~~ { Loi & Aaron } ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var startButton, insButton, hsButton, credButton, menuButton, backButton;
// *** The first acknowledgement of the game. This is the title card or that "press start" sorta screen.
class Scene_Title extends Phaser.Scene {
    
    button;
    
    Scene_Title()
    {
        Phaser.Scene.call(this, { key: 'title' });
    }

    preload()
    {
        console.log("Title scene was started.");
       
    }

    create()
    {
        
        Helper.PlaceImage(0,0,"PlaceHolderBG")
        //
        
        Helper.PlaceSprite(0, 0, "Background_Main");
        //

        //Start Button
        startButton = Helper.PlaceImage(125, 350, "StartButton");
        startButton.setInteractive();
        startButton.on('pointerdown', function(pointer){
            console.log("ButtonPressed");
            Helper.ChangeScene("gameplay");
        });
        //Instruction Button
        insButton = Helper.PlaceImage(125, 445, "InstructionButton").setInteractive();
        insButton.on("pointerdown", function(pointer){
            Helper.ChangeScene("instructions");
        });
        //HighScore Button
        hsButton = Helper.PlaceImage(125, 540, "HighScoreButton").setInteractive();
        hsButton.on("pointerdown", function(pointer){
            // Helper.ChangeScene("highscore");
        });
        hsButton.alpha = 0.3;

        //Credits Button
        credButton =  Helper.PlaceImage(125, 635, "CreditsButton").setInteractive();
        credButton.on("pointerdown", function(pointer){
            Helper.ChangeScene("credits");
            console.log("Credits");
        });
    }

    up() {
        console.log('button up', arguments);
    }
    
    over() {
        console.log('button over');
    }
    
    out() {
        console.log('button out');
    }
    
    actionOnClick () {
    
        background.visible =! background.visible;
    
    }
   
    update(time, delta)
    {
    }
}


// ~~~ { Aaron } ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var instructBackButton;
class Scene_Instructions extends Phaser.Scene {
    Scene_Instructions()
    {
        Phaser.Scene.call(this, { key: 'instructions' });
    }

    preload()
    {
    }

    create()
    {
        Helper.PlaceSprite(0, 0, "Background_Instructions"); // MockDesign_Instructions


        instructBackButton = Helper.PlaceImage(125, 665, "BackButton").setInteractive();
        instructBackButton.on("pointerdown", function(pointer){
            Helper.ChangeScene('title');
        });
    }

    update(time, delta)
    {
    }
}
class Scene_Highscore extends Phaser.Scene {
    Scene_Highscore()
    {
        Phaser.Scene.call(this, { key: 'highscore' });
    }

    preload()
    {
    }

    create()
    {
        
        Helper.PlaceSprite(100, 0, "MockDesign_Instructions");
    }

    update(time, delta)
    {
    }
}
// ~~~ { Loi } ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Scene_Credits extends Phaser.Scene {
    Scene_Credits()
    {
        Phaser.Scene.call(this, { key: 'credits' });
    }

    preload()
    {
    }

    create()
    {
        Helper.PlaceSprite(0, 0, "Background_Credits");

        backButton = Helper.PlaceImage(125, 550, "BackButton").setInteractive();
        backButton.on("pointerdown", function(pointer){
            Helper.ChangeScene('title');
        });
    }

    update(time, delta)
    {
    }
}



// ~~~ { Matt } ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var sprite;
var group;

var cursors;
var player; 
var hamBurnt;
var appleRaw;
var chickenRaw;
var orangeRaw;
var hamRaw;
var bomb;

var fireball;
var touchArea;

var score;
var scoreText;
var timer; //time is in ms
var timerText;
var gameTime;

var areaIsTouched;
var areaX, areaY;

var speed;
var resultsScreen;

var gameOverText;
var resultsText;

var hamCount;
var appleCount;
var chickenCount;
var orangeCount;
var bombCount;

class Scene_Gameplay extends Phaser.Scene {
    Scene_Gameplay()
    {
        Phaser.Scene.call(this, { key: 'gameplay' });
    }

    preload()
    {
        score = 0;
        timer = 30000; //time is in ms
        gameTime = 0;

        areaIsTouched = false;
        areaX = 0;
        areaY = 0;

        hamCount = 0;
        appleCount = 0;
        chickenCount = 0;
        orangeCount = 0;
        bombCount = 0;
    }

    create(data)
    {
        //this.add.text(20, 20, "Loading game...");
        var s = this.add.sprite(0, 0, "Background_Temp");
        s.setOrigin(0.1, 0);
        s.rotation = 0;
        s.setScale(0.7);

        
        hamBurnt = this.physics.add.image(300, 500, "Burnt_Ham");
        hamBurnt.setScale(.05);
        appleRaw = this.physics.add.image(150, 150, "RawApple");
        appleRaw.setScale(.75);
        chickenRaw = this.physics.add.image(250, 100, "RawChicken");
        chickenRaw.setScale(1);
        orangeRaw = this.physics.add.image(300, 200, "RawOrange");
        // orangeRaw.setScale(.02);
        hamRaw = this.physics.add.image(200, 100, "RawHam");
        // hamRaw.setScale(.02);
        bomb = this.physics.add.image(350, 150, "cannonball");
        // bomb.setScale(.015);



        var foodGroup = this.physics.add.group({
            allowGravity: false
        });
        foodGroup.add(hamBurnt, true);
        foodGroup.add(appleRaw, true);
        foodGroup.add(chickenRaw, true);
        foodGroup.add(orangeRaw, true);
        foodGroup.add(hamRaw, true);
        foodGroup.add(bomb, true);


        cursors = this.input.keyboard.createCursorKeys();

        player = this.physics.add.image(100, 850 -170, "DragonInGame").setInteractive({ draggable: true});
        player.setScale(1);

        player.setCollideWorldBounds(true);

        touchArea = this.add.image(0, 800-120, "TouchArea");
        touchArea.setOrigin(0,0);
        touchArea.alpha = 1;
        touchArea.setInteractive({});
        
        
        // this.physics.add.collider(player, foodGroup, this.collectFood, null, this);
        this.physics.add.overlap(player, foodGroup, this.collectFood, null, this);
        //this.physics.add.overlap(player, hamBurnt, collectFood, null, this);

        //fireball = this.input.keyboard.addkey(Phaser.keyboard.SPACEBAR);

        scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px', fill: '#A00' 
        });

        
        timerText = this.add.text(16, 48, 'Time Left: ' + (timer /1000).toString(), {
            fontSize: '32px', fill: '#A00' 
        });


        this.input.on('gameobjectdown', function(pointer, gameObject) {
            if (gameObject == touchArea) {
                areaIsTouched = true;
            }
        }, this);
        this.input.on('gameobjectmove', function(pointer, gameObject) {
            if (gameObject == touchArea) {
                areaX = pointer.x;
                areaY = pointer.y;
            }
        }, this);
        
        this.input.on('pointerup', function(pointer, gameObject) {
            areaIsTouched = false;
        }, this);

        //
        menuButton = Helper.PlaceImage(350,10,"MenuButton").setInteractive();
        menuButton.on("pointerdown", function(pointer){
            Helper.ChangeScene("title");
        });

    }

    collectFood(player, food) {

        

        // hamBurnt.disableBody(true, true);
        food.y = 0;
        var randomX = Phaser.Math.Between(0, 450);
        food.x = randomX;

        if (food == bomb) {
            Helper.Sound_Play("boom");

            score -= 1000;
            bombCount++;
        }
        else {
            Helper.Sound_Play("chomp");

            if (food == hamBurnt) {
                score -= 100;
                hamCount++;
            } 
            else if (food == hamRaw) {
                score += 500;
                hamCount++;
            }
            else if (food == appleRaw) {
                score += 300;
                appleCount++;
            }
            else if (food == orangeRaw) {
                score += 200;
                orangeCount++;
            }
            else if (food == chickenRaw) {
                score += 1000;
                chickenCount++;
            }
        }
        
        scoreText.setText('Score: ' + score);

    }

    moveDragon(dragon, speed) {
        dragon.y += speed;
        if (dragon.y > 900) {
            this.resetDragonPos(dragon);
        }
    }

    resetDragonPos(dragon) {
        dragon.y = Phaser.Math.Between(-800, 0);
        var randomX = Phaser.Math.Between(0, 450);
        dragon.x = randomX;
    }

    endGame() {
        Helper.ChangeScene("results");
    }
    
    update(time, delta)
    {
        gameTime += delta;

        if (player) {
            player.setVelocity(0);

            if (cursors.left.isDown) {
                player.setVelocityX(-300);
                player.setScale(-1, 1);
            }
            else if (cursors.right.isDown) {
                player.setVelocityX(300);
                
                player.setScale(1, 1);
            }

            //working but not working
            // %%$$&&
            if (player.scaleX > 0) {
                player.body.setSize(40, 40);
                //
                player.body.setOffset(80, 0);
            }
            else if (player.scaleX < 0) {
                player.body.setSize(40, 40);
                //
                player.body.setOffset(80+40, 0);
            }

            this.moveDragon(hamBurnt, 2);
            this.moveDragon(appleRaw, 2.5);
            this.moveDragon(chickenRaw, 1);
            this.moveDragon(orangeRaw, 1.5);
            this.moveDragon(bomb, 1);
            this.moveDragon(hamRaw, 2);

            if (timer > 0) {
                timer = timer - delta;
                if (timer < 0) {
                    timer = 0;
                    this.endGame();
                }
            }

            var tempStr = (timer /1000).toString();
            var theIndex = tempStr.indexOf('.');
            if (theIndex >= 0) { 
                tempStr = tempStr.slice(0, tempStr.indexOf('.'));
            }
            timerText.setText('Time Left: ' + tempStr);
            
            if (areaIsTouched) {
                if (Math.abs(player.x-areaX) < 10) {}
                else if (player.x < areaX) {
                    player.setVelocityX(300);
                    player.setScale(1, 1);
                }
                else if (player.x > areaX) {
                    player.setVelocityX(-300);
                    player.setScale(-1, 1);
                }
            }
        }


        if (gameTime >= 3000) { touchArea.alpha = 0.001; }
    }
}


// ~~~ { Matt } ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var appleTotal;
var hamTotal;
var chickenTotal;
var orangeTotal;
var bombTotal;
var rank;
var rankText;

var resultBackButton;

class Scene_Results extends Phaser.Scene {
    Scene_Results()
    {
        Phaser.Scene.call(this, { key: 'results' });
    }

    preload()
    {
    }

    create()
    {
        resultsScreen = this.add.image(0, 0, "PlaceHolderBG");
        resultsScreen.setOrigin(0,0);
        resultsScreen.setScale(1.5);

        gameOverText = this.add.text(36, 32, 'Results!', {
            fontSize: '80px', fill: '#F90', 
        });

        scoreText = this.add.text(48, 128, 'Final Score: ' + score, {
            fontSize: '32px', fill: '#F90' 
        });

        appleTotal = this.add.text(32, 200, 'Apples Collected: ' + appleCount, {
            fontSize: '32px', fill: '#F90'
        });

        orangeTotal = this.add.text(32, 250, 'Oranges Collected: ' + orangeCount, {
            fontSize: '32px', fill: '#F90'
        });

        hamTotal = this.add.text(32, 300, 'Ham Collected: ' + hamCount, {
            fontSize: '32px', fill: '#F90'
        });

        chickenTotal = this.add.text(32, 350, 'Chicken Collected: ' + chickenCount, {
            fontSize: '32px', fill: '#F90'
        });

        bombTotal = this.add.text(32, 400, 'Bombs Collected: ' + bombCount, {
            fontSize: '32px', fill: '#F90'
        });


        if (score > 10000) {
            rank = 'Food Dragon God';
        }
        else if (score > 6000) {
            rank = 'Gluttonous Dragon';
        }
        else if (score > 3000) {
            rank = 'Satisfied Dragon';
        }
        else if (score > 1000) {
            rank = 'Hungry Dragon';
        }
        else {
            rank = 'Starving Dragon';
        }
        
        
        

        rankText = this.add.text(32, 500, "Rank: \n" + rank, {
            fontSize: '32px', fill: '#F90'
        });


        

        //
        resultBackButton = Helper.PlaceImage((450/2)-(321/2),600,"BackButton").setInteractive();
        resultBackButton.on("pointerdown", function(pointer){
            Helper.ChangeScene("title");
        });

        
    }

    update(time, delta)
    {

    }
}


/*
Loading
Intro
Title/Menu
    Start Game
    Instructions
    Highscore
    Credits
Gameplay
Results
*/




// ~~~ { Khori } ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Helper = {
    _scene: undefined,

    _initialize: function() {
        console.log("Init HELPER...");

        
        this.AR = game.config.width / 720;
    },

    ChangeScene: function(key, data) {
        if (this._scene) {
            game.scene.stop(this._scene);
        }
        //
        this._scene = game.scene.keys[key];
        //
        console.log("[" + key + "] scene is beginning...");
        //
        game.scene.start(key, data);
        //
        console.log("... [" + key + "] scene has begun.");
    },

    PlaceSprite: function(x, y, key) {
        var s = this._scene.add.sprite(x, y, key);
        s.setOrigin(0, 0);
        //
        s.scaleX = Helper.AR;
        s.scaleY = Helper.AR;
        //
        //
        // this._allSprites.push(s);
        // this._allTheThings.push(s);
        //
        this._ActorSetup(s);
        //
        //
        return s;
    },

    PlaceImage: function(x, y, key) {
        var s = this._scene.add.image(x, y, key);
        s.setOrigin(0, 0);
        //
        s.scaleX = Helper.AR;
        s.scaleY = Helper.AR;
        //
        //
        // this._allImages.push(s);
        // this._allTheThings.push(s);
        //
        this._ActorSetup(s);
        //
        //
        return s;
    },

    // *** Loads the sound effect in immediately so that there is no delay the next time it must be played.
    Sound_WarmUp: function(key) {
        if (!this._scene._soundList) { this._scene._soundList = {}; }
        //
        if (!this._scene._soundList[key]) { this._scene._soundList[key] = this._scene.sound.add(key); }
    },
    // *** Plays the sound. It may need to load if it has not been warmed up yet.
    Sound_Play: function(key) {
        this.Sound_WarmUp(key);
        //
        //
        this._scene._soundList[key].play();
    },




    _ActorSetup: function(actor) {
        if (!actor.Despawn) { actor.Despawn = this.__Despawn; }
        if (!actor.Discard) { actor.Discard = this.__Discard; }
    },


    __Despawn: function() {

        //
        this.Discard();
    },
    __Discard: function() {
        this.destroy();
    },
};

