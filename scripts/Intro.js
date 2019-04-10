var cursors;
var player;
var ship2; 
var ship3; 

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
        this.add.image(375, 300, "background.png");

        ship2 = this.add.image(150, 150, "ship2.png");
        ship3 = this.add.image(200, 200, "ship3.png");

        cursors = this.input.keyboard.createCursorKeys();

        player = this.physics.add.image(100, 100, "ship.png");

        player.setCollideWorldBounds(true);

    }

    moveShip(ship, speed) {
        ship.y += speed;
        if (ship.y > 600) {
            this.resetShipPos(ship);
        }
    }

    resetShipPos(ship) {
        ship.y = 0;
        var randomX = Phaser.Math.Between(0, 800);
        ship.x = randomX;
    }

    update(time, delta)
    {
        player.setVelocity(0);

        if (cursors.left.isDown) {
            player.setVelocityX(-300);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(300);
        }

        this.moveShip(ship2, 2);
        this.moveShip(ship3, 3);
    }

    
}