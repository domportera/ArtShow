//SEE THIS APPLICATION IN ACTION AT:
// http://tcnj.edu/~porterd4/trentonmakes/

//------------------------------------------------------------------------------------------------------
// Editable Values - change the program through these values
//------------------------------------------------------------------------------------------------------

//TIMER AND COUNT VARIABLES
 var TIMER_MAX = 60; // amount of time each slideshow image stays on screen. the duration of the TrentonMakes slide is also a function of this value
 var MAX_CYCLES = 2; // the number of times the slideshow will cycle through the artist's photos before moving on to the next artist
 
 //TRANSITION CONSTANTS
 var MULTIPLIER = 1.4; //controls uneven sliding of contents. Set to 1 for even, static sliding
 var SLOWMULTI = .9; //values for uneven sliding within the middle panel
 var FASTMULTI = 1.1; // ''           ''               ''           ''
 var FADE_SPEED = 15; // fading speed
 var MAX_SPEED = 80; //max sliding speed
 var MIN_SPEED = 12; //min sliding speed
 
 //ABOUT TRENTON MAKES
 var ABOUT = "TrentonMakes is a campaign aiming to show the world that Trenton still makes. Learn more about the creators and support the campaign by visiting us at TrentonMakes.com*.";

 //DIMENSION CONSTANTS 
 var WIDTH = 3840; // canvas width
 var HEIGHT = 1024; // canvas height
 
 //FONT SIZES
 var nameSize = 150;  // font size for name
 var occupationSize = 80; // font size for occupation
 var quoteSize = 80;   // font size for quote and TrentonMakes ABOUT
 
 //middle slide heights
 var nameHeight = HEIGHT/4;  // vertical position of name
 var occupationHeight = nameHeight + 2*nameSize + 20; // vertical position of occupation
 
//------------------------------------------------------------------------------------------------------
// Various constants and variables - altering these values is not recommended and can cause problems
//------------------------------------------------------------------------------------------------------

 //COLOR PALETTE
 var BLACK;
 var BLUE;
 var WHITE;
 var YELLOW;
 var RED;
 
 //LOGO
 var LOGO;
 var BIG_LOGO;
 
 var artists; //this will be an array list of artist in artists[]
 

 //MISC FUNCTIONALITY VARIABLES
 var pnum = 0;
 var a = 0; //alpha for slideshow image fading in
 //var pa = 255; //alpha for slideshow image fading out
 
 
 //STATE VARIABLES and CONSTANTS
 var state; // where the global state will be stored
 var slideState; // where the slideshow's state will be stored
 var trentonState;
 var DISPLAY = 0;
 var SLIDEOFF = 1;
 var SLIDEON = 2;
 var FADE = 3;
 var TRENTONMAKES = 4;
 var canChange = true; //controls the expression of TrentonMakes slide
 
 //COUNTER & CONTROL VARIABLES
 var cycleTimer = TIMER_MAX;
 var cycleCount = 0;
 var MAX_ARTIST;
 var whichArtist = 0; // starting on first artist
 var slideSpeed = 0; // current sliding speed of the transitions

 
 //POSITION VARIABLES
 var relativeZero = 0; //used to move all contents relative to this x-coordinate point
 //center coordinate values
 var middleRightX = 2*WIDTH/3 - WIDTH/12;
 var middleLeftX = WIDTH/3 + WIDTH/12
  
 
function setup() {
	createCanvas(WIDTH,HEIGHT);
	imageMode(CENTER);
  
//--------------------------------------------------------------------------------------------------------------------------------------------
// Content Management
// In order to add content, you must create a new object, following the format of those below.
// See the Content Management Guide for details.
//--------------------------------------------------------------------------------------------------------------------------------------------

	bruceLindsay = new Artist_5("Bruce Lindsay", "Sculptor",
								"\"This is a very exciting time for the arts in Trenton for a lot of different initiatives at play which are creating a type of synergy.\"",
								"./images/brucelindsay/BruceLindsay.png",
								"./images/brucelindsay/LINDSAY-1.png",
								"./images/brucelindsay/LINDSAY-4.jpeg",
								"./images/brucelindsay/LINDSAY-5.jpeg",
								"./images/brucelindsay/LINDSAY-7.JPG",
								"./images/brucelindsay/LINDSAY-6.jpg");
								
	aylinGreen = new Artist_4("Aylin Green", "Painter & Sculptor",
								"\"Welcoming other artists in is the next big change to be made.\"",
								"./images/aylingreen/AylinGreen.png",
								"./images/aylingreen/GREEN-1.png",
								"./images/aylingreen/GREEN-2.png",
								"./images/aylingreen/GREEN-3.png",
								"./images/aylingreen/GREEN-4.JPG");
								
	willKasso = new Artist_3("Will Kasso", "Mural Artist",
								"\"Graffiti is freedom. We do what we want and when we want.\"",
								"./images/willkasso/WillKasso.png",
								"./images/willkasso/KASSO-1.png",
								"./images/willkasso/KASSO-2.png",
								"./images/willkasso/KASSO-3.png");
								
	artists = [bruceLindsay,aylinGreen,willKasso]; //array of artists
	MAX_ARTIST = artists.length; //number of artists used
	
//--------------------------------------------------------------------------------------------------------------------------------------------
//Loading and setting
//--------------------------------------------------------------------------------------------------------------------------------------------
	
	//LOAD LOGO
	LOGO = loadImage("./images/logo-small.png");
	BIG_LOGO = loadImage("./images/logo-big.png");
	
	//SET COLORS
	 BLACK = color(14,14,14);
     BLUE = color(32,155,186);
     WHITE = color(255,255,255);
     YELLOW = color(238,208,72);
     RED = color(231,39,55);
	 
	noStroke(); // sets stroke to none for shapes drawn
	textAlign(CENTER); //text align
	
	state = DISPLAY; // begin state;
	frameRate(30); //framerate caps at 30
}

//--------------------------------------------------------------------------------------------------------------------------------------------
//Draw function. This is what loops the program
//--------------------------------------------------------------------------------------------------------------------------------------------
function draw() {
	noTint();//ensures other images aren't affected by tints in other functions
	drawBackground();
	slideshow();
	noTint();
	drawArtist();
	drawMidLeft();
	drawRight();
	slideControl();
	trentonMakes();
	//drawBorders();
}

function trentonMakes(){ //Controls TrentonMakes slide
	if(whichArtist%3 == 0 && state == SLIDEON && canChange){
		state = TRENTONMAKES;
		trentonState = SLIDEON;
		cycleTimer = TIMER_MAX*3;
	}
	if (state == TRENTONMAKES){
		if(a < 255 && trentonState == SLIDEON)
			a += FADE_SPEED;
		else if(trentonState == SLIDEON)
			a = 255;
		if (cycleTimer < 25){
			a -= FADE_SPEED;
			trentonState = SLIDEOFF;
		}
		
		background(BLACK); //cover up possible artifacts
		rectMode(CENTER);
		tint(255,a);
		image(BIG_LOGO,width/3 + 24, height/2);
		rectMode(CORNER);
		fill(255,a);
		textAlign(CENTER);
		text(ABOUT,5*width/6,height/4,width/3 - 40, height);  //DISPLAY TRENTON MAKES INFO
		cycleTimer -= 1;
		
		if (cycleTimer <= 0){
			state = SLIDEON;
			canChange = false;
			a = 0;
		}
	}
}

function drawBorders(){ // optional function to display the borders of the projections
	strokeWeight = 3;
	stroke(RED);
	line(width/3,0,width/3,height);
	line(2*width/3,0,2*width/3,height);
}

//draws the background and the background of the artist's portrait
function drawBackground(){
	background(BLACK);
	fill(BLUE);
	rectMode(CENTER);
	if(!(state == SLIDEOFF))
		rect(relativeZero*MULTIPLIER*SLOWMULTI + middleRightX,height/2,width/6,height);
	else
		rect(relativeZero*MULTIPLIER*FASTMULTI + middleRightX,height/2,width/6,height);
}

//draws artist name and occupation
function drawMidLeft(){
	textLeading(nameSize);
	rectMode(CORNER);
	textFont("Francois One");
	fill(WHITE);
	textSize(nameSize);
	if(!(state == SLIDEOFF))
		text(artists[whichArtist].name,relativeZero*MULTIPLIER*FASTMULTI + middleLeftX,nameHeight,width/7,height/2);
	else
		text(artists[whichArtist].name,relativeZero*MULTIPLIER*SLOWMULTI + middleLeftX,nameHeight,width/7,height/2);
	textLeading(occupationSize);
	textFont("Open Sans");
	fill(YELLOW);
	textSize(occupationSize);
	if(!(state == SLIDEOFF))
		text(artists[whichArtist].occupation,relativeZero*MULTIPLIER*FASTMULTI + middleLeftX,occupationHeight,width/7,height);
	else
		text(artists[whichArtist].occupation,relativeZero*MULTIPLIER*SLOWMULTI + middleLeftX,occupationHeight,width/7,height);
}

//draws the artist's portrait
function drawArtist(){
	rectMode(CENTER);
	if(!(state == SLIDEOFF))
		image(artists[whichArtist].profile,relativeZero*MULTIPLIER*SLOWMULTI + middleRightX,height/2);
	else
		image(artists[whichArtist].profile,relativeZero*MULTIPLIER*FASTMULTI + middleRightX,height/2);
}

//draws artist's quote and the Trenton Makes logo
function drawRight(){
	if (!(state == SLIDEOFF))
		image(LOGO, relativeZero + width - width/6, 4*height/5);
	else
		image(LOGO, relativeZero*MULTIPLIER*MULTIPLIER + width - width/6, 4*height/5);
	fill(WHITE);
	textFont("Open Sans");
	textSize(quoteSize);
	rectMode(CORNER);
	if (!(state == SLIDEOFF))
		text(artists[whichArtist].quote,relativeZero + 5*width/6,height/4,width/3 - 40, height);
	else
		text(artists[whichArtist].quote,relativeZero*MULTIPLIER*MULTIPLIER + 5*width/6,height/4,width/3 - 40, height);
		
}

//--------------------------------------------------------------------------------------------------------------------------------------------
// Slideshow control
//--------------------------------------------------------------------------------------------------------------------------------------------
function slideshow(){
	
	if (cycleCount == MAX_CYCLES){
		state = SLIDEOFF;
		slideSpeed = 0;		//slide artist off the screen
		cycleCount = -1;
	}
	
	artists[whichArtist].artDisplay();
}

//--------------------------------------------------------------------------------------------------------------------------------------------
// Slideshow display, takes object variables
//--------------------------------------------------------------------------------------------------------------------------------------------
function artDisplay(){
	//var pnum;
	if (state == DISPLAY){
	//cycles through timer, and cycles through artist's images
		if (cycleTimer > 0){
			cycleTimer -= 1;
		}else{
			cycleTimer = TIMER_MAX;
			if (this.num < this.MAXNUM){
				pnum = this.num;
				this.num += 1;
				state = FADE;
				pa = 255;
			}else{
				pnum = this.num
				cycleCount += 1;
				if (!(cycleCount == MAX_CYCLES)){
					this.num = 0;
					state = FADE;
				}
				pa = 255;
			}
		}
	}
	
	if (state == FADE){
		/*if (pa > 0 + FADE_SPEED){  This commented out code allows for the image behind to fade out as the other fades in.
			pa -= FADE_SPEED;        this caused significant performance issues, though, so it has been disabled.
		}else{					     Instead, it is just a good idea to keep all images the same size (1280x1024) and ignore that problem.
			pa = 0;
		}
		tint(255,pa);*/
		image(this.art[pnum],relativeZero*MULTIPLIER*MULTIPLIER + width/3/2,height/2);
		
		if (a < 255 - FADE_SPEED){
			a += FADE_SPEED;
			tint(255,a);
		}else{
			a = 0;
			noTint();
			state = DISPLAY;
		}
	}
	if(!(state == SLIDEOFF))
		image(this.art[this.num],relativeZero*MULTIPLIER*MULTIPLIER + width/3/2,height/2);
	else
		image(this.art[this.num],relativeZero + width/3/2,height/2);
}

//Controls sliding of elements on screen
function slideControl(){

	if (state == SLIDEOFF){
		slideSpeed += 2; //accelerate sliding off
		
		relativeZero += slideSpeed;
		if (relativeZero > width){
			relativeZero = -width;
			state = SLIDEON;
			slideSpeed = MAX_SPEED;
		}
		canChange = true; //allows for TrentonMakes slide to come on again next time
	}
	
	if (state == SLIDEON){
	
		if (cycleCount == -1){  // change artist when display slides onto the screen
			if (whichArtist < MAX_ARTIST - 1)
				whichArtist += 1;
			else
				whichArtist = 0;		
			cycleCount = 0; // ensure artist doesnt change again until next slideon
			artists[whichArtist].num = 0;
		}
	
		if (relativeZero > -width/3 && slideSpeed > MIN_SPEED)
			slideSpeed -= 2.5;
			
		if (relativeZero + slideSpeed > 0){ // put projection in place if it is going to pass 0
			relativeZero = 0;
			state = DISPLAY;
		}else if (relativeZero < 0) // move to the right otherwise
			relativeZero += slideSpeed;
	}
		
}


//--------------------------------------------------------------------------------------------------------------------------------------------
// Artist Classes
//--------------------------------------------------------------------------------------------------------------------------------------------
//holds all the artist information and the methods associated with it
function Artist_3(name,occupation,quote,artistPhoto,photo1,photo2,photo3){ //3 art pieces
	this.name = name;
	this.occupation = occupation;
	this.quote = quote;
	this.profile = loadImage(artistPhoto);
	this.art1 = loadImage(photo1);
	this.art2 = loadImage(photo2);
	this.art3 = loadImage(photo3);
	this.art = [this.art1,this.art2,this.art3];
	this.artDisplay = artDisplay;
	this.num = 0;
	this.MAXNUM = 2;
}
function Artist_4(name,occupation,quote,artistPhoto,photo1,photo2,photo3,photo4){ //4 art pieces
	this.name = name;
	this.occupation = occupation;
	this.quote = quote;
	this.profile = loadImage(artistPhoto);
	this.art1 = loadImage(photo1);
	this.art2 = loadImage(photo2);
	this.art3 = loadImage(photo3);
	this.art4 = loadImage(photo4);
	this.art = [this.art1,this.art2,this.art3,this.art4];
	this.artDisplay = artDisplay;
	this.num = 0;
	this.MAXNUM = 3;
}
function Artist_5(name,occupation,quote,artistPhoto,photo1,photo2,photo3,photo4,photo5){ //5 art pieces
	this.name = name;
	this.occupation = occupation;
	this.quote = quote;
	this.profile = loadImage(artistPhoto);
	this.art1 = loadImage(photo1);
	this.art2 = loadImage(photo2);
	this.art3 = loadImage(photo3);
	this.art4 = loadImage(photo4);
	this.art5 = loadImage(photo5);
	this.art = [this.art1,this.art2,this.art3,this.art4,this.art5];
	this.artDisplay = artDisplay;
	this.num = 0;
	this.MAXNUM = 4;
}
function Artist_6(name,occupation,quote,artistPhoto,photo1,photo2,photo3,photo4,photo5,photo6){ //6 art pieces
	this.name = name;
	this.occupation = occupation;
	this.quote = quote;
	this.profile = loadImage(artistPhoto);
	this.art1 = loadImage(photo1);
	this.art2 = loadImage(photo2);
	this.art3 = loadImage(photo3);
	this.art4 = loadImage(photo4);
	this.art5 = loadImage(photo5);
	this.art6 = loadImage(photo6);
	this.art = [this.art1,this.art2,this.art3,this.art4,this.art5,this.art6];
	this.artDisplay = artDisplay;
	this.num = 0;
	this.MAXNUM = 5;
}

function Artist_7(name,occupation,quote,artistPhoto,photo1,photo2,photo3,photo4,photo5,photo6,photo7){ //6 art pieces
	this.name = name;
	this.occupation = occupation;
	this.quote = quote;
	this.profile = loadImage(artistPhoto);
	this.art1 = loadImage(photo1);
	this.art2 = loadImage(photo2);
	this.art3 = loadImage(photo3);
	this.art4 = loadImage(photo4);
	this.art5 = loadImage(photo5);
	this.art6 = loadImage(photo6);
	this.art7 = loadImage(photo7);
	this.art = [this.art1,this.art2,this.art3,this.art4,this.art5,this.art6,this.art7];
	this.artDisplay = artDisplay;
	this.num = 0;
	this.MAXNUM = 6;
}
