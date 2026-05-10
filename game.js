class Level1 extends Phaser.Scene{
    constructor(){
        super('level1');
    }
    preload() {
        this.load.path = 'assets/';
        this.load.image('green_ball', 'green ball.png');
    }
    create() {
        //cannon + cannon physics
        //const cannonHead = this.add.rectangle(960, 150, 100, 100, 0x685f35);
        const cannon = this.add.rectangle(960, 0, 250, 100, 0x685f35);
        const ball = this.physics.add.sprite(cannon.x, cannon.y, 'green_ball').setScale(0.25);
        const graphics = this.add.graphics({lineStyle: {width: 10, color: 0xdae97c, alpha: 0.5}});
        const line = new Phaser.Geom.Line();

        ball.disableBody(true, true);
        let angle = 0;

        this.input.on('pointermove', (pointer) => {
            angle = Phaser.Math.Angle.BetweenPoints(cannon, pointer);
            cannon.rotation = angle;
            Phaser.Geom.Line.SetToAngle(line, cannon.x, cannon.y, angle, 500);
            graphics.clear(). strokeLineShape(line);
        });

        this.input.on('pointerup', () => {
            ball.enableBody(true, cannon.x, cannon.y, true, true);
            this.physics.velocityFromRotation(angle, 600, ball.body.velocity);
            //this.input.mouse.disable();
        })

        //when ball collides with bottom of screen, reenable mouse input
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