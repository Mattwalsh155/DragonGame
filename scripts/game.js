

var rawImages = [
    "albert_einstein_head.jpg",
];
var rawScenes = [
    ['intro', Scene_Intro],
    ['title', Scene_Title],
    ['instructions', Scene_Instructions],
    ['highscore', Scene_Highscore],
    ['credits', Scene_Credits],
    ['gameplay', Scene_Gameplay],
    ['results', Scene_Results],
];




// *** Loads in all the necessary thing for the games to run. Basically, the loading screen.
class Scene_Loader extends Phaser.Scene {
    Scene_Loader()
    {
        Phaser.Scene.call(this, { key: 'loader' });
    }

    preload()
    {
        console.log("Game started loading...");
        //
        var Q;
        // -----------------------------------------------------------------------------------------------------------------------------
        // *** The game's resources and stuff. Images, audio, etc...
        console.log("ON: Images");

        for (var i = 0; i < rawImages.length; i++) {
            Q = this.load.image("einstein", "assets/pics/" + rawImages[i]);
            console.log(Q);
        }

        // -----------------------------------------------------------------------------------------------------------------------------
        // *** Add the game's various scenes AFTER all the resources have been loaded in for sanity reasons.
        console.log("ON: Scenes");

        for (var i = 0; i < rawScenes.length; i++) {
            var Q = game.scene.add(rawScenes[i][0], rawScenes[i][1], false, {
                original: true,
            });
            console.log(Q);
        }
        //
        console.log("... Game finished loading.");
    }

    create(data)
    {
        console.log("Starting intro...");
        game.scene.start("intro", { wasCreatedAtGameStart: true });
    }

}



var game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: Scene_Loader,
});

