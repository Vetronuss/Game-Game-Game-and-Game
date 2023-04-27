//block class represents a 2d collision field


class Block
{


    constructor(x,y,w,h)
    {

        var flatBias = 4;
        var sideBias = 6;
        this.pos = createVector(x,y);
        this.size = createVector(w,h);
        this.color = random(cssColors);
        this.lines = [];
        this.texture = null
        this.lines.push([createVector(x+sideBias,y),createVector(x+w-sideBias,y)]);
        this.lines.push([createVector(x+w,y+flatBias),createVector(x+w,y+h-flatBias)]);
        this.lines.push([createVector(x+w-sideBias,y+h),createVector(x+sideBias,y+h)]);
        this.lines.push([createVector(x,y+flatBias),createVector(x,y+h-flatBias)]);
    }  


    update()
    {


    }

    

    getMid()
    {

        var a = lerp(this.pos.x,this.pos.x+this.size.x,0.5);
        var b = lerp(this.pos.y,this.pos.y+this.size.y,0.5);
        push();
        circle(a,b,40)
        pop();
        return createVector(a,b);
    }

    draw()
    {

        push();
        if (this.texture == null)
        {
            fill(this.color);
            rect(this.pos.x,this.pos.y,this.size.x,this.size.y);  
        }else{
            image(this.texture, this.pos.x,this.pos.y,this.size.x,this.size.y);
        }
        
        stroke('red')
        
        for (var i of this.lines)
        {
            line(i[0].x,i[0].y,i[1].x,i[1].y)
        }
        pop();
    }

};