class Level1 extends Phaser.Scene{
    constructor(){
        super('level1');
    }
    create() {

    }
}

let config = {
    type: Phaser.WEBGL, 
    width: 1920,
    height: 1080,
    backgroundColor: 0xd6bae0,
    scene: [Level1],
}

let game = new Phaser.Game(config);