BasicGame.Game = function (game) {};

//Graphical objects
var ship;
var ufos; //group of enemy ufo which drop from the top of the screen
var lives; //group of lives which are collected

var bullets; //Bullets which your spaceship fires
var fireRate = 100; //Rate at which bullets are fired
var nextFire = 0;

//Misc Variables
var cursors; //Keyboard control

BasicGame.Game.prototype = {

	create: function () {
       //Specify the physics of the game to ARCADE
			 this.physics.startSystem(Phaser.Physics.ARCADE);
			 //Add the starfield and logo on screen
			 this.starfield = this.add.tileSprite(0, 0, 800, 600, 'starfield');
			 //Add the ship onto the screen, set physics and the boundaries
			 ship = this.add.sprite((this.world.width / 2), this.world.height - 50, 'ship');
			 ship.anchor.setTo(0.5,0);
			 this.physics.enable(ship, Phaser.Physics.ARCADE);
			 ship.body.collideWorldBounds = true;

       //Creating groups
			 //create the ufos group, set the physics and the boundaries
			 ufos = this.add.group();
			 this.physics.enable(ufos, Phaser.Physics.ARCADE);

			 ufos.setAll('outOfBoundsKill', true);
			 ufos.setAll('checkWorldBounds', true);
			 ufos.setAll('anchor.x', 0.5);
			 ufos.setAll('anchor.y', 0.5);

			 //create the lives group, set the physics and the boundaries
			 lives = this.add.group();
			 this.physics.enable(lives, Phaser.Physics.ARCADE);

			 lives.setAll('outOfBoundsKill', true);
			 lives.setAll('checkWorldBounds', true);
			 lives.setAll('anchor.x', 0.5);
			 lives.setAll('anchor.y', 0.5);


			 //Create the bullets group, set the physics, multiples and boundaries
			 bullets = this.add.group();
			 bullets.enableBody = true;
			 bullets.physicsBodyType = Phaser.Physics.ARCADE;
			 bullets.createMultiple(30, 'bullet', 0, false);
			 bullets.setAll('anchor.x', 0.5);
			 bullets.setAll('anchor.y', 0.5);
			 bullets.setAll('outOfBoundsKill', true);
			 bullets.setAll('checkWorldBounds', true);

			 //Setting the keyboard to accept LEFt, RIGHT and SPACE input
			 this.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard, SPACEBAR]);
			      cursors = this.input.keyboard.createCursorKeys();
	},

	update: function () {
		//execute 'createUfo','createLife','moveShip','collisionDetection' function
      this.moveShip();
			this.createUfo();
			this.createLife();
		},
			//moves the ship and fires bullet from keyboard controls
			moveShip: function() {
				//if left arrow key pressed move players ship left
				if (cursors.left.isDown) {
					//move to the left
					ship.body.velocity.x = -200;
				}
				//if right arrow key pressed move players to the right
				else if (cursors.right.isDown) {
					ship.body.velocity.x = 200;
				}
				//else stop ship
				else {
					ship.body.velocity.x = 0;
				}
				//if space bar is pressed execute the 'fireBullet' function
				if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
					this.fireBullet();
				}
			},

			//function executed during playing the game to create a ufo
			createUfo: function () {
				//Generate a random number between 0 and 20
				var random = this.rnd.intergerInRange(0, 20);
				//if random number equals 0 then create a ufo in a random x position and random y velocity
				if (random === 0) {
					//Generating random position in the X axis
					var randomX = this.rnd.intergerInRange(0, this.world.width - 150);
					//Creating a ufo from the ufos group and seting physics
					var ufo = ufos.create(randomX, -50, 'ufo');
					this.physics.enable(ufo, Phaser.Physics.ARCADE);
					//Generating a random velocity
					ufo.body.velocity.y = this.rnd.intergerInRange(100, 600);
				}
			}

      //function executed during playing the game to create a life
			createLife: function () {
				//generate random number between 0 and 500
				var random = this.rnd.intergerInRange(0, 500);
				//if random number equals 0 then create a life in a random x position
				if (random === 0) {
					//generating random position in the X axis
					var randomX = this.rnd.intergerInRange(0, this.world.width - 150);
					//creating a ufo from the ufos group and setting physics
					var life = lives.create(randomX, -50, 'life');
					this.physics.enable(life, Phaser.Physics.ARCADE);
					//Generating a random velocity
					life.body.velocity.y = 150;
				}
			}
			//Generate bullet and position in the x axis, set the velocity and play the audio
			fireBullet: function () {
				if (this.time.now > nextFire && bullets.countDead() > 0) {
					nextFire = this.time.now + fireRate;
					var bullet = bullets.getFirstExists(false);
					bullet.reset(ship.x, ship.y);
					bullet.body.velocity.y = -400;
				}
			}


};
