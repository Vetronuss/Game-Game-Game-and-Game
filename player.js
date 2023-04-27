//file to control player code


var spaceRelease = false;
class Player
{

    constructor(x,y)
    {
        this.pos = createVector(x,y);
        this.vel = createVector(0,0);
        this.grav = 1;
        this.speed = 4;
        this.terminalVel = createVector(100,100);
        this.jumpHeight = 20;
        this.keyBinds = {
            up:UP_ARROW,
            down:DOWN_ARROW,
            left:LEFT_ARROW,
            right:RIGHT_ARROW,
            jump:32,//space
            tp:192
        };

        this.canJump = false;
        this.friction = 1.4;
        this.size = createVector(15*4,45*2)
        this.airFriction = 1.1;
        this.lastPos = this.pos;
        this.debugColor=color(0, 0, 255)
        this.state = "idle";//animation state
        this.direction = true; //true = right, false = left
    }

    update()
    {
        


        

        //gravity0
        if (abs(this.vel.y)>this.terminalVel.y)
        {
            
        }else
        {

            this.vel.y+=this.grav;

            

        }
        //jump key
        if (keyIsDown(this.keyBinds.jump) && this.canJump && spaceRelease)
        {
            this.canJump = false;
            spaceRelease = false;
            this.vel.y=-this.jumpHeight;
        }

        if (keyIsDown(this.keyBinds.tp))
        {
            this.vel.set(0);
            this.pos.x = mouseX-this.size.x/2;
            this.pos.y = mouseY-this.size.y/2;
            
        }
        

        //handle keyBinds
        //c.print(this.canJump)
        if (keyIsDown(this.keyBinds.right))
        {
            if (this.vel.x< this.terminalVel.x)
            {
                if (this.canJump){
                    this.vel.x+=this.speed;
                }else
                {
                    this.vel.x+=this.speed/3;
                }
            }
            
        }
        if (keyIsDown(this.keyBinds.left))
        {
            if (abs(this.vel.x)< this.terminalVel.x)
            {
                if (this.canJump){
                    this.vel.x-=this.speed;
                }else
                {
                    this.vel.x-=this.speed/5;
                }
            }
            
        }
        //friction
        if (this.canJump){
        this.vel.x/=(this.friction);
        }else
        {
            this.vel.x/=(this.airFriction)
        }

        //update pos
        this.lastPos = this.pos.copy();
        this.pos.add(this.vel);
        
        //collision
        
        for (var i of blocks)
        {

            rectCollision(this,i);
        }


        //update direction/state
        if (this.pos.x-this.lastPos.x<-1)
        {
            this.direction = false;
        }else if (this.pos.x-this.lastPos.x>1)
        {
            this.direction = true;
        }
        if (abs(this.pos.x-this.lastPos.x)<3)
        {
            this.state = "idle"
        }else
        {
            this.state = "run"
        }
        //c.print(this.pos.x-this.lastPos.x)
        //c.print(this.direction)

    }
    
    draw()
    {
        push();
        //fill('crimson');
        stroke(this.debugColor);
        noFill();
        strokeWeight(5)
        rect(this.pos.x,this.pos.y,this.size.x,this.size.y);

        if (this.state == "idle")
        {
            //frameCount+=random([0,0,0,-1]);
            var part = floor(map(frameCount%60,0,60-1,0,17));
            
            const scaler = 60;
            var x = this.pos.x-scaler+19;
            var y = this.pos.y-scaler;
            var w = this.size.x * (1+1/3)+(scaler*2) ;//60
            var h = this.size.y * (8/9)+(scaler*2)   ;//90
            
            
            
            if (this.direction){
            
	        image(animation.idle[part],x,y,w,h);
            }else
            {
                x = this.pos.x-scaler-37;
                y = this.pos.y-scaler;
                w = this.size.x * (1+1/3)+(scaler*2) ;//60
                h = this.size.y * (8/9)+(scaler*2)   ;//90
                image(flippedAnimation.idle[part],x,y,w,h)
            }
            rect(x,y,w,h)
            textAlign(LEFT,TOP);
            fill(255)
            stroke(0)
            strokeWeight(2)
            text("Image Size",x,y-20)
        }

        pop();
    }

};


function keyReleased()
{

    if (keyCode == player.keyBinds.jump)
    {
        spaceRelease = true;
    }
}