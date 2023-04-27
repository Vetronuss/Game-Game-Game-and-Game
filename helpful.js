


function lerpPoint(c1,c2,bias)
{
    var c = createVector(lerp(c1.x,c2.x,bias),lerp(c1.y,c2.y,bias));
    return c;

}

function drawArrow(obj1, obj2) {
    let angle = atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    let length = 40;
  
    push();
    translate(obj1.x, obj1.y);
    rotate(angle);
  
    // Draw arrow
    line(0, 0, length, 0);
    triangle(length, 0, length - 10, -5, length - 10, 5);
  
    pop();
  }

function calculateAngle(pos1, pos2) {
    let angle = atan2(pos2.y - pos1.y, pos2.x - pos1.x);
    
    // Round the angle to the nearest cardinal direction
    if (angle > -PI/4 && angle < PI/4) {
      angle = 0;
    } else if (angle > PI/4 && angle < 3*PI/4) {
      angle = PI/2;
    } else if (angle > -3*PI/4 && angle < -PI/4) {
      angle = -PI/2;
    } else {
      angle = PI;
    }
    
    return angle;
  }

function drawArrow2(obj1, obj2) {
    let angle = calculateAngle(obj1, obj2);
    let length = 40;
    
    push();
    translate(obj1.x, obj1.y);
    rotate(angle);
    
    // Draw arrow
    line(0, 0, length, 0);
    triangle(length, 0, length - 10, -5, length - 10, 5);
    
    pop();
}
/*
function rectCollision(obj1, obj2, width, height) {
    // Convert the top left corner position to center position
    const obj1Center = createVector(obj1.pos.x + obj1.size.x / 2, obj1.pos.y + obj1.size.y / 2);
    const obj2Center = createVector(obj2.pos.x + obj2.size.x / 2, obj2.pos.y + obj2.size.y / 2);
  
    // Calculate the half sizes of each object
    const obj1HalfWidth = obj1.size.x / 2;
    const obj1HalfHeight = obj1.size.y / 2;
    const obj2HalfWidth = obj2.size.x / 2;
    const obj2HalfHeight = obj2.size.y / 2;
  
    // Calculate the distance between the centers of the objects
    let dx = obj1Center.x - obj2Center.x;
    let dy = obj1Center.y - obj2Center.y;
  
    // Wrap the distance if needed to account for screen edges
    if (dx > width / 2) dx -= width;
    if (dx < -width / 2) dx += width;
    if (dy > height / 2) dy -= height;
    if (dy < -height / 2) dy += height;
  
    const combinedHalfWidths = obj1HalfWidth + obj2HalfWidth;
    const combinedHalfHeights = obj1HalfHeight + obj2HalfHeight;
  
    // Check for a collision
    if (abs(dx) < combinedHalfWidths && abs(dy) < combinedHalfHeights) {
      // Calculate the amount of overlap in the x and y directions
      const overlapX = combinedHalfWidths - abs(dx);
      const overlapY = combinedHalfHeights - abs(dy);
  
      // Determine which side obj1 collided with obj2
      const sideX = (dx > 0) ? -1 : 1;
      const sideY = (dy > 0) ? -1 : 1;
      const diffX = overlapX - obj1HalfWidth;
      const diffY = overlapY - obj1HalfHeight;
  
      // Move obj1 to resolve the collision
      if (diffX > diffY) {
        // Move obj1 vertically
        obj1.pos.y = obj2Center.y + (obj2HalfHeight + obj1HalfHeight) * sideY - obj1HalfHeight;
        obj1.vel.y = 0;
      } else {
        // Move obj1 horizontally
        obj1.pos.x = obj2Center.x + (obj2HalfWidth + obj1HalfWidth) * sideX - obj1HalfWidth;
        obj1.vel.x = 0;
      }
  
      // Return the corrected position and velocity for obj1
      return {
        pos: obj1.pos,
        vel: obj1.vel
      };
    } else {
      // No collision
      return false;
    }
  }
*/





class BlockCollisionResult{
    normal;
    did_collide=false;
    correction;
}

function rectCollision(dynamic,static){
    var dyn={
        left:dynamic.pos.x,
        right:dynamic.pos.x+dynamic.size.x,
        top:dynamic.pos.y,
        bottom:dynamic.pos.y+dynamic.size.y
    }
    var stat={
        left:static.pos.x,
        right:static.pos.x+static.size.x,
        top:static.pos.y,
        bottom:static.pos.y+static.size.y
    }

    var corr={
        up:dyn.bottom-stat.top,
        down:stat.bottom-dyn.top,
        left:dyn.right-stat.left,
        right:stat.right-dyn.left
    }

    if(corr.up < 0 || corr.down < 0 ||
        corr.left < 0 || corr.right < 0){
            return new BlockCollisionResult();
        }

    var ret=new BlockCollisionResult();
    ret.did_collide=true;
    
    if( corr.up < corr.down && corr.up < corr.left &&
        corr.up < corr.right){
            dynamic.pos.y-=corr.up;
            dynamic.vel.y=0;
            dynamic.canJump=true;
        }
    else if( corr.down < corr.up && corr.down < corr.left &&
        corr.down < corr.right){
            dynamic.pos.y+=corr.down;
            dynamic.vel.y=0;
        }
    else if( corr.left < corr.down && corr.left < corr.up &&
        corr.left < corr.right){
            dynamic.pos.x-=corr.left;
            dynamic.vel.x=0;
        }
    else{
            dynamic.pos.x+=corr.right;
            dynamic.vel.x=0;
        }
}