

var rawImages = [
    "albert_einstein_head.jpg",
    
    "MockDesign_Credits.jpg",
    "MockDesign_GameScreen.jpg",
    "MockDesign_Instructions.jpg",
    "MockDesign_MainMenu.jpg",

    "RawApple.png",

    "sampleBackground.png",
    "background.png",
    "ship.png",
    "ship2.png",
    "ship3.png",
    "Burnt_Ham.png",
    "RawChicken.svg",
    "Dragon_Logo.png",
    "RawOrange.png",
    "RawApple.png",
    "DragonInGame.png",
    "Gauge.png",
    "TouchArea.png",
    "Background_Temp.png",
    "RawHam.png",
    "cannonball.png",
];
var rawSpritesheets = [
    ["button_sprite_sheet.png", 197, 71],
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
        console.log("ON: Spritesheets");

        for (var i = 0; i < rawSpritesheets.length; i++) {
            Q = rawSpritesheets[i][0];
            Q = this.load.spritesheet(Q.slice(0, Q.indexOf('.')), "assets/pics/" + Q, {
                frameWidth: rawSpritesheets[i][1],
                frameHeight: rawSpritesheets[i][2]
            });
            console.log(Q);
        }

        // -----------------------------------------------------------------------------------------------------------------------------
        // *** The game's resources and stuff. Images, audio, etc...
        console.log("ON: Images");

        for (var i = 0; i < rawImages.length; i++) {
            Q = rawImages[i];
            Q = this.load.image(Q.slice(0, Q.indexOf('.')), "assets/pics/" + rawImages[i]);
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
        Helper.ChangeScene("gameplay", { wasCreatedAtGameStart: true });
    }
}


var game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 450, // (window.innerWidth * window.devicePixelRatio)
    height: 800, // (window.innerHeight * window.devicePixelRatio)
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: Scene_Loader,
});
//
//
Helper._initialize();
