var player,
    facing = 'left',
    jumpTimer = 0,
    jumpButton,
    cursors;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.time.desiredFps = 30;

    game.physics.arcade.gravity.y = 250;

    player = this.add.image(100, 100, "ship.png");
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 32, 5, 16);

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.keyboard.SPACEBAR);
}

function update() {
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -150;

        if (facing != 'left') {
            player.animations.play('left');
            facing = 'left';
        }
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150;

        if (facing != 'right') {
            player.animations.play('right');
            facing = 'right';
        }
    } else {
        if (facing != 'idle') {
            player.animations.stop();

            if (facing == 'left') {
                player.frame = 0;
            } else {
                player.frame = 5;
            }

            facing = 'idle';
        }
    }

    if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
    {
        player.body.velocty.y = -250;
        jumpTimer = game.time.now + 750;
    }

}

function render() {
    game.debug.text(game.time.suggestedFps, 32, 32);
}