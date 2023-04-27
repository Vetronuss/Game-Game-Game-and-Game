
var _textwidth = 10
class Console
{
	constructor(x,y,w,h)
	{
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.headerHeight = 30;
		this.headerText = "Console"
		this.canCollapse = true;
		this.lines = []
		this.margins = 10
		this.maxLines = 90
		this.charMax = 43;
		this.mouseDown = false;
		this.showFps = true
		//console.log(textWidth('='))
		_textwidth = textWidth('=')
		//console.log(textAscent())
	}
	print(txt,txt2 = "",txt3 = "",txt4 = "",txt5 = "")
	{
		
		if (txt2 != "")
			txt = txt+txt2+txt3+txt4+txt5
		this.lines.push(txt);
		console.log(txt);
		var textHeight = 15
		for (var i = 0; i < this.lines.length; i++)
		{
			
			if ((this.headerHeight+textHeight/2)+(i*textHeight*1.7)>this.h) 
			{
				this.maxLines = i;
				return;
			}
			
		}
		this.maxLines++;
	}

	update()
	{
		while (this.lines.length > this.maxLines)
		{
			this.lines.splice(0,1)
			
		} 
		this.charMax = (this.w-this.margins)/_textwidth-2
		for (var i = 0; i < this.lines.length; i++)
		{
			if (this.lines[i].length > this.charMax)
			{
				this.lines[i]= this.lines[i].substring(0,this.charMax)+"-";
			}
		}

		//mouse moving and such
		if (!this.mouseDown2&&mouseIsPressed && mouseButton == LEFT && (collidePointRect(mouseX,mouseY,this.x,this.y,this.w,this.headerHeight)||this.mouseDown))
		{
			this.mouseDown = true
			this.x+=mouseX-pmouseX
			this.y+=mouseY-pmouseY
		}else
		{
			this.mouseDown = false
		}
		
		if (mouseIsPressed && mouseButton == LEFT && (distance(mouseX,mouseY,this.x+this.w-5,this.y+this.h-5)<10||this.mouseDown2))
		{
			this.mouseDown2 = true
			this.w+=mouseX-pmouseX
			this.h+=mouseY-pmouseY
			this.w = constrain(this.w,100,1023123)
			this.h = constrain(this.h,60,1023123)
		}else
		{
			this.mouseDown2 = false
		}
	}
	draw()
	{
		push()
		textFont("Fira Code")
		var textHeight = 15
		textSize(textHeight+3)
		stroke(0)
		fill(41-20, 42-20, 61-20,200)
		rect(this.x,this.y,this.w,this.h);
		rect(this.x,this.y,this.w,this.headerHeight)
		fill(255)
		textAlign(CENTER,CENTER)
		text(this.headerText,this.x,this.y,this.w,this.headerHeight)
		textSize(textHeight)
		textAlign(LEFT,CENTER)
		var k = getFps(true)
		if (k < 50)
		fill(lerpColor(color(255),color('red'),abs(k/50-1)))
		text("FPS: " + k,this.x+this.margins,this.y,this.w,this.headerHeight);
		fill(255)
		for (var i = 0; i < this.lines.length; i++)
		{
			
			if ((this.headerHeight+textHeight/2)+(i*textHeight*1.7)>this.h)
			{
				this.maxLines = i;
				break;
			}
			text(this.lines[i],this.x+this.margins,(this.y+this.headerHeight+textHeight/2)+(i*textHeight*1.5),this.w-this.margins*2,textHeight+0.1)
			

			if (i == this.lines.length-1)
			{
				continue
			}
			push()
			stroke(41+20, 42+20, 61+20)
			line(this.x,(this.y+this.headerHeight+textHeight*1.63)+(i*textHeight*1.5),this.x+this.w,(this.y+this.headerHeight+textHeight*1.63)+(i*textHeight*1.5))
			
			pop()
		}
		stroke(41+70, 42+70, 61+70)
		line(this.x+this.w-5,this.y+this.h-4,this.x+this.w-4,this.y+this.h-5)
			line(this.x+this.w-9,this.y+this.h-4,this.x+this.w-4,this.y+this.h-9)
		//stroke('red')
		line(this.x+this.w-4,this.y+this.h-13,this.x+this.w-13,this.y+this.h-4)
		pop();
		if (distance(mouseX,mouseY,this.x+this.w-5,this.y+this.h-5)<10)
		{
			cursor('nwse-resize')
		}else
		{
			cursor()
		}
	}
}