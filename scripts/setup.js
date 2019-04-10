
console.log("Initial setting up...");


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
        // var s = this.add.sprite(0, 0, "albert_einstein_head");
        // s.setOrigin(0, 0);
        // s.rotation = 0.14;


        // this.add.button(200, 300, 'button_sprite_sheet', function(){}, this, 2, 1, 0);
    }

    update(time, delta)
    {
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
        Helper.PlaceSprite(0, 0, "MockDesign_MainMenu");
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
        Helper.PlaceSprite(0, 0, "MockDesign_Credits");
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
        // this.load.image('mushroom', 'assets/sprites/mushroom2.png');
        // this.load.image('ball', 'assets/sprites/shinyball.png');
    }

    create()
    {
        // Helper.PlaceSprite(0, 0, "MockDesign_GameScreen");


        sprite = this.physics.add.image(400, 300, 'RawApple');

        group = this.physics.add.staticGroup({
            key: 'RawApple',
            frameQuantity: 30
        });



        Phaser.Actions.PlaceOnRectangle(group.getChildren(), new Phaser.Geom.Rectangle(84, 84, 616, 416));

        //  We need to call this because placeOnRectangle has changed the coordinates of all the children
        //  If we don't call it, the static physics bodies won't be updated to reflect them
        group.refresh();

        sprite.setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true).setGravityY(200);

        this.physics.add.collider(sprite, group);


        sprite.setCollideCallback(this.onSpriteCollide, this);
    }

    onSpriteCollide() {
        alert("BABY!");
    }

    update(time, delta)
    {
    }



    hitSprite (sprite1, sprite2) {
        
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

