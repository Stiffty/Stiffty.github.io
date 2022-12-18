import { Constraint as Constraint } from "./Constraint.js";

var Point = function (x, y) {
    this.x      = x;
    this.y      = y;
    this.px     = x;
    this.py     = y;
    this.vx     = 0;
    this.vy     = 0;
    this.pin_x  = null;
    this.pin_y  = null;
    
    this.constraints = [];
    this.constraintUp = null;
    this.constraintLeft = null;
};

Point.prototype.update = function (delta,mouse,mouse_cut,mouse_influence,gravity) {
    if (mouse.down) {
        var diff_x = this.x - mouse.x,
            diff_y = this.y - mouse.y,
            dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y);

        if (mouse.button == 1) {
            if (dist < mouse_influence) {
                this.px = this.x - (mouse.x - mouse.px) * 1.8;
                this.py = this.y - (mouse.y - mouse.py) * 1.8;
            }
          
        } else if (dist < mouse_cut) this.constraints = [];
    }

    this.add_force(0, gravity);

    delta *= delta;
    var nx = this.x + ((this.x - this.px) * .99) + ((this.vx / 2) * delta);
    var ny = this.y + ((this.y - this.py) * .99) + ((this.vy / 2) * delta);

    this.px = this.x;
    this.py = this.y;

    this.x = nx;
    this.y = ny;

    this.vy = this.vx = 0
};

Point.prototype.draw = function (ctx) {
    if (!this.constraints.length) return;



    var i = this.constraints.length;
    while (i--) this.constraints[i].draw(ctx);
};

Point.prototype.resolve_constraints = function (tear_distance,boundsx,boundsy) {
    if (this.pin_x != null && this.pin_y != null) {
        this.x = this.pin_x;
        this.y = this.pin_y;
        return;
    }

    var i = this.constraints.length;
  while (i--) this.constraints[i].resolve(tear_distance);

    this.x > boundsx ? this.x = 2 * boundsx - this.x : 1 > this.x && (this.x = 2 - this.x);
    this.y < 1 ? this.y = 2 - this.y : this.y > boundsy && (this.y = 2 * boundsy - this.y);
};

Point.prototype.attach = function (point,direction,spacing) {
      var con = new Constraint(this, point,spacing);

      if(direction == 0)
          this.constraintUp =  this.constraints.length;
      else 
          this.constraintLeft = this.constraints.length;

      this.constraints.push(con);
};

Point.prototype.remove_constraint = function (constraint) {
    this.constraints.splice(this.constraints.indexOf(constraint), 1);
};

Point.prototype.add_force = function (x, y) {
    this.vx += x;
    this.vy += y;
  
    var round = 400;
    this.vx = ~~(this.vx * round) / round;
    this.vy = ~~(this.vy * round) / round;
};

Point.prototype.pin = function (pinx, piny) {
    this.pin_x = pinx;
    this.pin_y = piny;
};

export {Point};
