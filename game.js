class Level1 extends Phaser.Scene{
    constructor(){
        super('level1');
    }
    preload() {
        this.load.path = 'assets/';
        this.load.image('green_ball', 'green ball.png');
        this.load.image('peg', 'pinkpeg25.png');
        this.load.image('floor', 'gamefloor.png')
    }
    create() {
        //cannon + cannon physics
        //const cannonHead = this.add.rectangle(960, 150, 100, 100, 0x685f35);
        const cannon = this.add.rectangle(960, 0, 250, 100, 0x685f35);
        const ball = this.physics.add.sprite(cannon.x, cannon.y, 'green_ball').setScale(0.25)
            .setBounce(1,1)
            .setCircle(50)
            .setCollideWorldBounds(true);
        const graphics = this.add.graphics({lineStyle: {width: 10, color: 0xdae97c, alpha: 0.5}});
        const line = new Phaser.Geom.Line();

        ball.disableBody(true, true);
        let angle = 0;
        let shoot = true;

        //set ball count
        let ball_count = 0;
        

        this.input.on('pointermove', (pointer) => {
            if (shoot==true) {
                angle = Phaser.Math.Angle.BetweenPoints(cannon, pointer);
                cannon.rotation = angle;
                Phaser.Geom.Line.SetToAngle(line, cannon.x, cannon.y, angle, 500);
                graphics.clear(). strokeLineShape(line);
            }
        });

        this.input.on('pointerup', () => {
            if (shoot==true) {
                ball.enableBody(true, cannon.x, cannon.y, true, true);
                ball.body.onCollide = true;
                ball.setGravityY(100);
                shoot = false;
                this.physics.velocityFromRotation(angle, 600, ball.body.velocity);
                ball_count +=1;
            }
        })

        //when ball collides with bottom of screen, reenable mouse input (idk what's wrong with this section)
        const floor = this.physics.add.image(960, 1055, 'floor')
            .setImmovable(true);
        this.physics.add.collider(floor, ball, () => shoot = true);

        //add pegs, when ball hits peg, peg is destroyed
        const pegs = this.physics.add.staticGroup({
            key: 'peg',
            frameQuantity: 20,
        });

        Phaser.Actions.PlaceOnLine(
            pegs.getChildren(),
            new Phaser.Geom.Line(25, 750, 1920, 750),
        );
        pegs.refresh();

        this.physics.add.collider(ball, pegs);

        //when ball hits peg, peg is destroyed. When corrent # of pegs is destroyed, move to summary screen
        let rem_pegs = 20;
        this.physics.world.on('collide', (gameObject1, gameObject2, body1, body2) => {
            if (gameObject2==ball) {
                ball.setPosition(960, 0);
                ball.setVelocity(0, 0);
                ball.setGravityY(0);
            } else {
                gameObject2.destroy();
                rem_pegs = rem_pegs - 1;
                if(rem_pegs==0) {
                    ball.destroy();
                    this.add.text(240, 400,`    Level
 Complete`, {color: "#ffee00"})
                        .setFontSize(125);
        
                    this.add.text(1060, 550, 'Next Stage', {color: "#ffee00"})
                        .setFontSize(60)
                        .setInteractive()
                        .on('pointerdown', () => {
                            this.time.delayedCall(1000, () => this.scene.start('level2'))
                    });
        
                    let ball_count_text = this.add.text(1060, 400, 'Balls Used: 0', {color: "#ffee00"})
                        .setFontSize(60);
                    
                    ball_count_text.setText('Balls Used: ' + ball_count);
                }

            }
        });
    }
}

class Level2 extends Phaser.Scene{
    constructor(){
        super('level2');
    }
    preload() {
        this.load.path = 'assets/';
        this.load.image('green_ball', 'green ball.png');
        this.load.image('peg', 'pinkpeg25.png');
        this.load.image('floor', 'gamefloor.png')
    }
    create() {
        //cannon + cannon physics
        //const cannonHead = this.add.rectangle(960, 150, 100, 100, 0x685f35);
        const cannon = this.add.rectangle(960, 0, 250, 100, 0x685f35);
        const ball = this.physics.add.sprite(cannon.x, cannon.y, 'green_ball').setScale(0.25)
            .setBounce(1,1)
            .setCircle(50)
            .setCollideWorldBounds(true);
        const graphics = this.add.graphics({lineStyle: {width: 10, color: 0xdae97c, alpha: 0.5}});
        const line = new Phaser.Geom.Line();

        ball.disableBody(true, true);
        let angle = 0;
        let shoot = true;

        //set ball count
        let ball_count = 0;
        

        this.input.on('pointermove', (pointer) => {
            if (shoot==true) {
                angle = Phaser.Math.Angle.BetweenPoints(cannon, pointer);
                cannon.rotation = angle;
                Phaser.Geom.Line.SetToAngle(line, cannon.x, cannon.y, angle, 500);
                graphics.clear(). strokeLineShape(line);
            }
        });

        this.input.on('pointerup', () => {
            if (shoot==true) {
                ball.enableBody(true, cannon.x, cannon.y, true, true);
                ball.body.onCollide = true;
                ball.setGravityY(100);
                shoot = false;
                this.physics.velocityFromRotation(angle, 600, ball.body.velocity);
                ball_count +=1;
            }
        })

        //when ball collides with bottom of screen, reenable mouse input (idk what's wrong with this section)
        const floor = this.physics.add.image(960, 1055, 'floor')
            .setImmovable(true);
        this.physics.add.collider(floor, ball, () => shoot = true);

        //add pegs, when ball hits peg, peg is destroyed
        const pegs = this.physics.add.staticGroup({
            key: 'peg',
            frameQuantity: 20,
        });

        Phaser.Actions.PlaceOnEllipse(
            pegs.getChildren(),
            new Phaser.Geom.Ellipse(960, 540, 1000, 500),
        );
        pegs.refresh();

        this.physics.add.collider(ball, pegs);

        //when ball hits peg, peg is destroyed. When corrent # of pegs is destroyed, move to summary screen
        let rem_pegs = 20;
        this.physics.world.on('collide', (gameObject1, gameObject2, body1, body2) => {
            if (gameObject2==ball) {
                ball.setPosition(960, 0);
                ball.setVelocity(0, 0);
                ball.setGravityY(0);
            } else {
                gameObject2.destroy();
                rem_pegs = rem_pegs - 1;
                if(rem_pegs==0) {
                    ball.destroy();
                    this.add.text(240, 400,`    Level
 Complete`, {color: "#ffee00"})
                        .setFontSize(125);
        
                    this.add.text(1060, 550, 'Next Stage', {color: "#ffee00"})
                        .setFontSize(60)
                        .setInteractive()
                        .on('pointerdown', () => {
                            this.time.delayedCall(1000, () => this.scene.start('level2'))
                    });
        
                    let ball_count_text = this.add.text(1060, 400, 'Balls Used: 0', {color: "#ffee00"})
                        .setFontSize(60);
                    
                    ball_count_text.setText('Balls Used: ' + ball_count);
                }

            }
        });
    }
}

class Level3 extends Phaser.Scene{
    constructor(){
        super('level3');
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
    scene: [Level2, Level1, Level3],
}

const game = new Phaser.Game(config);