
console.log("Initial setting up...");

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

var score = 0;
var scoreText;
var timer = 30000; //time is in ms
var timerText;

var areaIsTouched = false;
var areaX = 0, areaY = 0;

var startButton, insButton, hsButton, credButton, menuButton, backButton;
// *** The first thing to greet the user after everything is done loading. Usually logos and such like that.
class Scene_Intro extends Phaser.Scene {

    Scene_Intro()
    {
        Phaser.Scene.call(this, { key: 'intro' });
    }

    preload()
    {
        console.log("Intro scene was started.");
    }

    

    create()
    {
    }

    update(time, delta)
    {
        // Helper.ChangeScene('title', {});
    }
    
}
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
            Helper.ChangeScene("highscore");
        });
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
        Helper.PlaceSprite(0, 0, "MockDesign_Instructions");
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



var sprite;
var group;
class Scene_Gameplay extends Phaser.Scene {
    Scene_Gameplay()
    {
        Phaser.Scene.call(this, { key: 'gameplay' });
    }

    preload()
    {
    }

    create(data)
    {
        //this.add.text(20, 20, "Loading game...");
        var s = this.add.sprite(0, 0, "Background_Temp");
        s.setOrigin(0, 0);
        s.rotation = 0;
        s.setScale(0.7);
        //this.add.image(375, 300, "background");

        //ship2 = this.add.image(150, 150, "ship2");
        //ship3 = this.add.image(200, 200, "ship3");
        hamBurnt = this.physics.add.image(300, 500, "Burnt_Ham");
        hamBurnt.setScale(.05);
        appleRaw = this.physics.add.image(150, 150, "RawApple");
        appleRaw.setScale(.02);
        chickenRaw = this.physics.add.image(250, 100, "RawChicken");
        chickenRaw.setScale(.5);
        orangeRaw = this.physics.add.image(300, 200, "RawOrange");
        orangeRaw.setScale(.02);
        hamRaw = this.physics.add.image(200, 100, "RawHam");
        hamRaw.setScale(.02);
        bomb = this.physics.add.image(350, 150, "cannonball");
        bomb.setScale(.015);



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
        player.setScale(0.1);

        player.setCollideWorldBounds(true);

        touchArea = this.add.image(0, 800-120, "TouchArea");
        touchArea.setOrigin(0,0);
        touchArea.alpha = 0.001;
        touchArea.setInteractive({});
        
        
        // this.physics.add.collider(player, foodGroup, this.collectFood, null, this);
        this.physics.add.overlap(player, foodGroup, this.collectFood, null, this);
        //this.physics.add.overlap(player, hamBurnt, collectFood, null, this);

        //fireball = this.input.keyboard.addkey(Phaser.keyboard.SPACEBAR);

        scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px', fill: '#000' 
        });

        
        timerText = this.add.text(16, 48, 'Time Left: ' + (timer /1000).toString(), {
            fontSize: '32px', fill: '#000' 
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

        if (food == hamBurnt) {
            score -= 100;
        } 
        else if (food == hamRaw) {
            score += 500;
        }
        else if (food == appleRaw) {
            score += 100;
        }
        else if (food == orangeRaw) {
            score += 200;
        }
        else if (food == bomb) {
            score -= 1000;
        }
        
        scoreText.setText('Score: ' + score);

    }

    moveDragon(dragon, speed) {
        dragon.y += speed;
        if (dragon.y > 800) {
            this.resetDragonPos(dragon);
        }
    }

    resetDragonPos(dragon) {
        dragon.y = 0;
        var randomX = Phaser.Math.Between(0, 450);
        dragon.x = randomX;
    }
    
    update(time, delta)
    {
        player.setVelocity(0);

        if (cursors.left.isDown) {
            player.setVelocityX(-300);
            player.setScale(-0.1, 0.1);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(300);
            
            player.setScale(0.1, 0.1);
        }

        //working but not working
        // %%$$&&
        if (player.scaleX > 0) {
            player.body.setSize(400, 200);
            //
            player.body.setOffset(800, 0);
        }
        else if (player.scaleX < 0) {
            player.body.setSize(400, 200);
            //
            player.body.setOffset(800+400, 0);
        }

        this.moveDragon(hamBurnt, 2);
        this.moveDragon(appleRaw, 3);
        this.moveDragon(chickenRaw, 1);
        this.moveDragon(orangeRaw, 1.5);
        this.moveDragon(bomb, 1);
        this.moveDragon(hamRaw, 2);

        if (timer > 0) {
            timer = timer - delta;
            if (timer < 0) {
                timer = 0;
                //gameover
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
            }
            else if (player.x > areaX) {
                player.setVelocityX(-300);
            }
        }

    }
}
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




Helper = {
    _scene: "Not initialized",

    _initialize: function() {
        console.log("Init HELPER...");

        
        this.AR = game.config.width / 720;
    },

    ChangeScene: function(key, data) {
        this._scene = game.scene.keys[key];
        //
        console.log("[" + key + "] scene is beginning...");
        //
        game.scene.start(key, data);
        //
        console.log("... [" + key + "] scene has begun.");
    },

    PlaceSprite: function(x, y, key) {
        console.log(this);

        var s = this._scene.add.sprite(x, y, key);
        s.setOrigin(0, 0);
        //
        s.scaleX = Helper.AR;
        s.scaleY = Helper.AR;
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
        return s;
    },
};

