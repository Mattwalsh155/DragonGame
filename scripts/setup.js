
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
        var s = this.add.sprite(0, 0, "einstein");
        s.setOrigin(0, 0);
        s.rotation = 0.14;
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
        var s = this.add.sprite(0, 0, "einstein");
        s.setOrigin(0, 0);
        s.rotation = 0.14;
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
