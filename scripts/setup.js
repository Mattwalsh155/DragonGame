
console.log("Initial setting up...");

var cursors;
var player; 
var food1;
var food2;
var food3;
var food4;
var fireball;

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

    create(data)
    {
        this.add.text(20, 20, "Loading game...");
        var s = this.add.sprite(0, 0, "sampleBackground.png");
        s.setOrigin(0, 0);
        s.rotation = 0;
        //this.add.image(375, 300, "background.png");

        //ship2 = this.add.image(150, 150, "ship2.png");
        //ship3 = this.add.image(200, 200, "ship3.png");
        food1 = this.physics.add.image(300, 500, "Burnt_Ham.png");
        food1.setScale(.05);
        food2 = this.physics.add.image(150, 150, "RawApple.png");
        food2.setScale(.02);
        food3 = this.physics.add.image(250, 100, "RawChicken.svg");
        food3.setScale(.5);
        food4 = this.physics.add.image(300, 200, "RawOrange.png");
        food4.setScale(.02);


        var foodGroup = this.physics.add.group({
            allowGravity: false
        });
        foodGroup.add(food1, true);
        foodGroup.add(food2, true);
        foodGroup.add(food3, true);
        foodGroup.add(food4, true);


        cursors = this.input.keyboard.createCursorKeys();

        player = this.physics.add.image(100, 700 -170, "DragonInGame.png");
        player.setScale(0.1);

        player.setCollideWorldBounds(true);
        player.body.setSize(400, 200);
        player.body.setOffset(800, 0);

        // this.physics.add.collider(player, foodGroup, this.collectFood, null, this);
        this.physics.add.overlap(player, foodGroup, this.collectFood, null, this);
        //this.physics.add.overlap(player, food1, collectFood, null, this);

        //fireball = this.input.keyboard.addkey(Phaser.keyboard.SPACEBAR);

    }

    collectFood(player, food1) {
        // food1.disableBody(true, true);
        food1.y = 0;
        var randomX = Phaser.Math.Between(0, 400);
        food1.x = randomX;
    }

    moveDragon(dragon, speed) {
        dragon.y += speed;
        if (dragon.y > 600) {
            this.resetDragonPos(dragon);
        }
    }

    resetDragonPos(dragon) {
        dragon.y = 0;
        var randomX = Phaser.Math.Between(0, 400);
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

        this.moveDragon(food1, 2);
        this.moveDragon(food2, 3);
        this.moveDragon(food3, 1);
        this.moveDragon(food4, 1.5);
    }

    
}
// *** The first acknowledgement of the game. This is the title card or that "press start" sorta screen.
class Scene_Title extends Phaser.Scene {
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
        //var background = this.add.image(0, 0, "background");
        //background.setOrigin(0,0);
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
    }

    update(time, delta)
    {
    }
}
class Scene_Gameplay extends Phaser.Scene {
    Scene_Gameplay()
    {
        Phaser.Scene.call(this, { key: 'gameplay' });
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
