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
        this.change = 0;//timer to control whether or not to change player state; <0: good
        this.jump = false;
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
            //this.state = "jump";
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
        if (this.change < 0){
            


            if (this.pos.x-this.lastPos.x<-1)
            {
                if (this.direction==true)
                {
                    frameCount = 0;
                    this.state = "turn"
                    this.change = 10;
                    this.direction = false;
                    return;
                }
                this.direction = false;
                
                
            }else if (this.pos.x-this.lastPos.x>1)
            {
                if (this.direction!=true)
                {

                    frameCount = 0;
                    this.state = "turn"
                    this.change = 10;
                    this.direction = true;
                    return;
                }
                this.direction = true;
                
            }
            if (abs(this.pos.x-this.lastPos.x)<3 && this.change < 0)
            {
                this.state = "idle"
                if (this.jump)
                {
                    this.jump = false;
                    this.change = 8;
                    this.state = "landing"
                }
            }else
            {
                
                this.state = "run"
            }
        }else
        {

        }
        if (!this.canJump)
        {
            this.state = "jump"
            
            if (this.state != "landing"){
                this.jump = true;
            }
        }




        if (this.vel.y > 1)
        {
            
            this.canJump = false;
            
        }
        

        //if (this.canJump == false){}
        //c.print(this.change)
        //c.print(this.pos.x-this.lastPos.x)
        //c.print(this.direction)

    }
    
    draw()
    {
        //c.print(this.state);
        //c.print(this.change)
        push();
        //fill('crimson');
        stroke(this.debugColor);
        noFill();
        strokeWeight(5)
        //rect(this.pos.x,this.pos.y,this.size.x,this.size.y);
        var scaler = 60;
        var x = this.pos.x-scaler+19;
        var y = this.pos.y-scaler;
        var w = this.size.x * (1+1/3)+(scaler*2) ;//60
        var h = this.size.y * (8/9)+(scaler*2)   ;//90
        if (this.state == "idle")
        {
            //frameCount+=random([0,0,0,-1]);
            var part = floor(map(frameCount%60,0,60-1,0,17));
            
            
            if (this.direction){
            
	        image(animation.idle[part],x,y,w,h);
            }else
            {
                x = this.pos.x-scaler-37;
                
                image(flippedAnimation.idle[part],x,y,w,h)
            }
            
        }
        if (this.state == "run")
        {
            //frameCount+=random([0,0,0,-1]);
            var part = floor(map(frameCount%45,0,45-1,0,23));
            if (this.direction){
            
	        image(animation.run[part],x,y,w,h);
            }else
            {
                x = this.pos.x-scaler-37;
                image(flippedAnimation.run[part],x,y,w,h)
            }
            
        }
        if (this.state == "turn")
        {
            scaler = 30
            x = this.pos.x-scaler-37;
            var part = floor(map(this.change,10,0,0,4));
            //c.print(part)
            if (this.direction){
            
	        image(animation.turn[part],x,y+5,w,h-5);
            }else
            {
                x = this.pos.x-scaler-37;
                image(flippedAnimation.turn[part],x,y+5,w,h-5)
            }
            
        }
        if (this.state == "jump")
        {
            //negative should be up
            //pos should be fall

            var part = floor(map(this.vel.y,-this.jumpHeight,this.jumpHeight*2,0,18))
            if (part >= 14)
            {
                part = 14;
                part-=random([0,0,0,1,2])
            }
            part = constrain(part,0,14);
            //c.print(part);
            if (this.direction){
            
	        image(animation.jump[part],x,y,w,h);
            }else
            {
                x = this.pos.x-scaler-37;
                image(flippedAnimation.jump[part],x,y,w,h)
            }
        }
        if (this.state == "landing")
        {
            //negative should be up
            //pos should be fall

            var part = floor(map(this.change,8,0,15,18))
            part = constrain(part,14,18);
            //c.print(part);
            if (this.direction){
            
	        image(animation.jump[part],x,y,w,h);
            }else
            {
                x = this.pos.x-scaler-37;
                image(flippedAnimation.jump[part],x,y,w,h)
            }
        }
        /*
        rect(x,y,w,h)
        textAlign(LEFT,TOP);
        fill(255)
        stroke(0)
        strokeWeight(2)
        text("Image Size",x,y-20)*/
        pop();
        this.change--;
    }

};


function keyReleased()
{

    if (keyCode == player.keyBinds.jump)
    {
        spaceRelease = true;
    }
}