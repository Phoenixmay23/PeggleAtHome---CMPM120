class Level1 extends Phaser.Scene{
    constructor(){
        super('level1');
    }
    create() {

    }
}

class Level2 extends Phaser.Scene{
    constructor(){
        super('level2');
    }
    create() {

    }
}

class Level3 extends Phaser.Scene{
    constructor(){
        super('level3');
    }
    create() {

    }
}

class Summary extends Phaser.Scene{
    constructor(){
        super('summary');
    }
    create() {

    }
}

const config = {
    type: Phaser.AUTO, 
    width: 1920,
    height: 1080,
    backgroundColor: 0xd6bae0,
    physics: {
        default: 'arcade',
        arcade: {debug: false}
    },
    scene: [Level1, Level2, Level3, Summary],
}

const game = new Phaser.Game(config);