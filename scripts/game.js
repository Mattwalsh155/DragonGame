
// ~~~ { Khori } ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var rawImages = [
    "albert_einstein_head.jpg",
    
    "MockDesign_Credits.jpg",
    "MockDesign_GameScreen.jpg",
    "MockDesign_Instructions.jpg",
    "MockDesign_MainMenu.jpg",

    "RawApple.png",

    "sampleBackground.png",
    "background.png",
    "Burnt_Ham.png",
    "RawChicken.png",
    "Dragon_Logo.png",
    "RawOrange.png",
    "RawApple.png",
    "DragonInGame.png",
    "Gauge.png",
    "TouchArea.png",
    "Background_Temp.png",
    "RawHam.png",
    "cannonball.png",
    "PlaceHolderBG.png",
    "CreditsButton.png",
    "HighScoreButton.png",
    "InstructionButton.png",
    "StartButton.png",
    "MenuButton.png",
    "Start_Button.png",
    "Dragon2.png",
    "PlaceHolderBG.png",
    "Background_Credits.png",
    "BackButton.png",
    "Background_Final.png",
    "Background_Main.png",

    "Background_Instructions.png",
    "Screen_Intro.png",
];
var rawSpritesheets = [
    ["button_sprite_sheet.png", 197, 71],
];
// ??? <-- This loads a little different because "phaser"... ... ...
var rawAudios = [
    [
        // 'test.ogg',
        // 'test.mp3',
        'assets/audio/test.wav',
    ],
    [
        'assets/audio/chomp.wav',
    ],
    [
        'assets/audio/boom.wav',
    ],
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








// ~~~ { Khori } ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
        // *** The game's resources and stuff. Images, audio, etc...
        // -----------------------------------------------------------------------------------------------------------------------------
        
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
        console.log("ON: Images");

        for (var i = 0; i < rawImages.length; i++) {
            Q = rawImages[i];
            Q = this.load.image(Q.slice(0, Q.indexOf('.')), "assets/pics/" + rawImages[i]);
            console.log(Q);
        }

        // -----------------------------------------------------------------------------------------------------------------------------
        console.log("ON: Audios");

        for (var i = 0; i < rawAudios.length; i++) {

            console.log(rawAudios[i]);
            console.log(rawAudios[i][0]);

            Q = rawAudios[i][0];
            Q = Q.slice(0, Q.indexOf('.'));
            Q = Q.slice(Q.lastIndexOf('/')+1, Q.length);
            Q = this.load.audio(Q, rawAudios[i]);
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
        Helper.ChangeScene("intro", { wasCreatedAtGameStart: true });
        //
        //
        // Helper.Sound_Play('test');
    }
}

// ~~~ { Khori } ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
    audio: {
        disableWebAudio: true
    },
});
//
//
Helper._initialize();
