var c;//console overlay
var player;//player object
var blocks = []//array holding block objects

//variables holding sprite sheets
var img1;//idle
var img2;//run
var img3;//turn
var img4;//jump

//background images
var bg = []
var groundImg;
var groundBack = [];

var animation = 
{
    idle: [],
    run: [],
	turn: [],
    jump: [],
    slide: []

};
var pixDem = 80*4
var flippedAnimation = 
{
    idle: [],
    run: [],
	turn: [],
    jump: [],
    slide: []

};

const GAME_VERSION = '1.1';




function setup()
{
	pixDem = createVector(80*4,80*4);
	createCanvas(windowWidth,windowHeight);



	

	//createConsole object to have on screen;
	c = new Console(10,10,400,200)
	c.print("Game loaded // ", (GAME_VERSION));
	frameRate(100)
	player = new Player(width/2,height-100);



	blocks.push(new Block(-width*20,height-10,width*40,20))
	blocks.push(new Block(width-width/4,height-height/8,width/8,height/8))
	blocks.push(new Block(width-width/2,2*height/3,width/8,height/8))
	
	//get sprites from image sheets
	animation.idle = cropImageIntoFrames(img1,18,0,animation.idle);
	flippedAnimation.idle = cropImageIntoFrames(img1,18,0,flippedAnimation.idle,true);
	animation.run = cropImageIntoFrames(img2,24,0,animation.run);
	flippedAnimation.run = cropImageIntoFrames(img2,24,0,flippedAnimation.run,true);



	animation.jump = cropImageIntoFrames(img4,19,0,animation.jump);
	flippedAnimation.jump = cropImageIntoFrames(img4,19,0,flippedAnimation.jump,true);




	//do these last cause they weird
	pixDem.y = 64*4;
	//pixDem.x = 320
	animation.turn = cropImageIntoFrames(img3,5,0,animation.turn);
	flippedAnimation.turn = cropImageIntoFrames(img3,5,0,flippedAnimation.turn,true);
	
	pixDem.y = 80*4;
	load2();
}

function draw()
{
	background(color('#0c1122'));
	//put all drawing code here
	push();
	
	translate(width/2,height/2)
	//scale(0.5)
	translate(-player.pos.x,-player.pos.y);
	bgr();
	player.update();
	player.draw();
	//translate(-player.pos);
	for (i of blocks)
	{
		i.update();
		i.draw();
	}

	

	pop();
	
	c.update()
	c.draw()

	
}


function bgr()
{
	const scalar = 1;
	const bgSize = createVector(928*2,723*2);

	randomSeed(5);
	var l = 0;
	
	//image(groundImg,gx,gy);
	for (var i of bg)
	{
		//push();
		var pan = l/(bg.length-1);
		var b = pan;
		pan = abs(pan-1);
		var pan2 = pan*(player.pos.y-(height-100));
		pan*=player.pos.x+width;




		
		var y = -height/2+pan2;
		var x = floor(player.pos.x/bgSize.x)*bgSize.x+(pan);
		var x2 = (floor(player.pos.x/bgSize.x)-1)*bgSize.x+(pan);
		var x3 = (floor(player.pos.x/bgSize.x)+1)*bgSize.x+(pan);

		image(i,x,y,bgSize.x,bgSize.y)
		image(i,x2,y,bgSize.x,bgSize.y)
		image(i,x3,y,bgSize.x,bgSize.y)

		const offset = random(700);
		var c = color('rgba(82, 102, 123)');
		c[3] = 255 * b;

		//tint(color(c))
		if (l < 10){
		image(groundBack[l],x+offset,y,bgSize.x,bgSize.y)
		image(groundBack[l],x2+offset,y,bgSize.x,bgSize.y)
		image(groundBack[l],x3+offset,y,bgSize.x,bgSize.y)
		}
		l++;
		//noTint();
		//pop();
		
	}
}










//file for handling animation frames




function preload()
{
	console.log("Loading images");
	var f = false;
    img1 = loadImage('Assets/redHood2/UPSCALE/idele.png');
	img2 = loadImage('Assets/redHood2/UPSCALE/run.png');
	img3 = loadImage('Assets/redHood2/UPSCALE/turn.png');
	img4 = loadImage('Assets/redHood2/UPSCALE/jump.png');
	groundImg = loadImage('Assets/background/Background layers/layer2.png',()=>{
		
		console.log("good")
	},()=>{console.log("fail")});
	//while(!f){}
	
	for (var i = 1; i < 13; i++)
	{
		var name = 'Assets/background/Background layers/layer'+i+'.png';
		console.log("Loaded ", name)
		bg.push(loadImage(name));
	}
	bg.reverse();

	groundBack.push(groundImg)
	
	
	
	
	



}
function load2()
{
	for (var i = 0; i < 12; i++)
	{
		var k = i/11; //0:1
		//tintImage(temp,color('#4f6379'),k)
		var g = createImage(groundImg.width,groundImg.height);
		copyImage(groundImg,g);
		var col = color('rgb(77, 96, 118)')
		//tintImage(g,col,k);
		groundBack.push(g)

	}
	
}
function flipImage(img) {
	const flipped = createImage(img.width, img.height);
  
	flipped.loadPixels();
	img.loadPixels();
  
	// Loop through each row of pixels
	for (var y = 0; y < img.height; y++) {
	  // Loop through each pixel column
	  for (var x = 0; x < img.width; x++) {
		// Get the current pixel index
		const index = (x + y * img.width) * 4;
  
		// Get the corresponding pixel index in the flipped position
		const flippedIndex = ((img.width - x - 1) + y * img.width) * 4;
  
		// Copy the pixel values to the flipped image
		flipped.pixels[flippedIndex] = img.pixels[index];
		flipped.pixels[flippedIndex + 1] = img.pixels[index + 1];
		flipped.pixels[flippedIndex + 2] = img.pixels[index + 2];
		flipped.pixels[flippedIndex + 3] = img.pixels[index + 3];
	  }
	}
  
	flipped.updatePixels();
	return flipped;
  }

function cropImageIntoFrames(sourceImage, numFrames, startingPoint, frameArray, flip) {
    // Calculate the number of frames in each row/column
    
	//console.log(pixDem);
	var framesPerRow = sourceImage.width / pixDem.x;
    var framesPerColumn = sourceImage.height / pixDem.y;
  
    // Calculate the total number of frames in the image
    var totalFrames = framesPerRow * framesPerColumn;
    
    // Loop through each frame
    for (var i = startingPoint; i < startingPoint + numFrames; i++) {
      // Check if the current frame index is within the total number of frames
      if (i < totalFrames) {
        // Calculate the position of the current frame
        var frameX = (i % framesPerRow) * pixDem.x;
        var frameY = Math.floor(i / framesPerRow) * pixDem.y;
        
        // Create a new p5.js image object and copy the cropped portion
        var croppedImage = createImage(pixDem.x, pixDem.y);
        croppedImage.copy(sourceImage, frameX, frameY, pixDem.x, pixDem.y, 0, 0, pixDem.x, pixDem.y);
        
        // Add the cropped image to the array
		if (flip)
		{
			console.log("Flipped")
			croppedImage = flipImage(croppedImage);
		}
        frameArray.push(croppedImage);
      }
    }
	return frameArray;
  }

  function tintImage(image, tintCol, intensity) {
	image.loadPixels();
	intensity = abs(1-intensity)
  	
	// Iterate through each pixel in the image
	for (var y = 0; y < image.height; y++)
	{
		for (var x = 0; x < image.width; x++)
		{
			var col = image.get(x,y);
			var r = lerp(red(col),red(tintCol),intensity);
			var g = lerp(green(col),green(tintCol),intensity);
			var b = lerp(blue(col),blue(tintCol),intensity);
			var col2 = color(r,g,b,col[3]);
			image.set(x,y,col2);
		}
	}
  
	image.updatePixels();
	console.log("tinted")
  }
 

  function copyImage(source, target) {
	source.loadPixels();
	target.loadPixels();
  
	// Iterate through each pixel in the source image
	for (let x = 0; x < source.width; x++) {
	  for (let y = 0; y < source.height; y++) {
		// Get the color of the current pixel in the source image
		let index = (x + y * source.width) * 4;
		let r = source.pixels[index];
		let g = source.pixels[index + 1];
		let b = source.pixels[index + 2];
		let a = source.pixels[index + 3];
		
		// Set the color of the corresponding pixel in the target image
		let targetIndex = (x + y * target.width) * 4;
		target.pixels[targetIndex] = r;
		target.pixels[targetIndex + 1] = g;
		target.pixels[targetIndex + 2] = b;
		target.pixels[targetIndex + 3] = a;
	  }
	}
  
	target.updatePixels();
  }