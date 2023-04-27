var c;
var player;
var blocks = []
var img1;
var animation = 
{
    idle: [],
    run: [],
    jump: [],
    slide: []

};

var flippedAnimation = 
{
    idle: [],
    run: [],
    jump: [],
    slide: []

};

const GAME_VERSION = '1.1';




function setup()
{
	createCanvas(windowWidth,windowHeight);
	
	//createConsole object to have on screen;
	c = new Console(10,10,400,200)
	c.print("Game loaded // ", (GAME_VERSION));
	frameRate(60)
	player = new Player(width/2,height-100);
	blocks.push(new Block(0,height-10,width,20))
	blocks.push(new Block(width-width/4,height-height/8,width/8,height/8))
	blocks.push(new Block(width-width/2,2*height/3,width/8,height/8))
	
	//get sprites from image sheets
	animation.idle = cropImageIntoFrames(img1,18,0,animation.idle);
	flippedAnimation.idle = cropImageIntoFrames(img1,18,0,flippedAnimation.idle,true);
	//display sheet once for some reason
	//image(img1,0,0)
}

function draw()
{
	background(100);
	//put all drawing code here
	

	player.update();
	player.draw();

	for (i of blocks)
	{
		i.update();
		i.draw();
	}


	c.update()
	c.draw()

	
}











//file for handling animation frames




function preload()
{
    img1 = loadImage('Assets/redHood2/UPSCALE/idele.png');
}

function flipImage(img) {
	const flipped = createImage(img.width, img.height);
  
	flipped.loadPixels();
	img.loadPixels();
  
	// Loop through each row of pixels
	for (let y = 0; y < img.height; y++) {
	  // Loop through each pixel column
	  for (let x = 0; x < img.width; x++) {
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
    const pixDem = 80*4;
	console.log(pixDem);
	var framesPerRow = sourceImage.width / pixDem;
    var framesPerColumn = sourceImage.height / pixDem;
  
    // Calculate the total number of frames in the image
    var totalFrames = framesPerRow * framesPerColumn;
    
    // Loop through each frame
    for (var i = startingPoint; i < startingPoint + numFrames; i++) {
      // Check if the current frame index is within the total number of frames
      if (i < totalFrames) {
        // Calculate the position of the current frame
        var frameX = (i % framesPerRow) * pixDem;
        var frameY = Math.floor(i / framesPerRow) * pixDem;
        
        // Create a new p5.js image object and copy the cropped portion
        var croppedImage = createImage(pixDem, pixDem);
        croppedImage.copy(sourceImage, frameX, frameY, pixDem, pixDem, 0, 0, pixDem, pixDem);
        
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