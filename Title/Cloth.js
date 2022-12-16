import {Point as Point} from "./Point.js";
import { Square as Square } from "./Square.js";

var Cloth = function (canvas,cloth_width,cloth_height,spacing,start_y) {
    this.points = [];
    this.squares = [];
    this.squareLines = [];

    var start_x = canvas.width / 2 - cloth_width * spacing / 2;

    for (var y = 0; y <= cloth_height; y++) {
        for (var x = 0; x <= cloth_width; x++) {
            var p = new Point(start_x + x * spacing, start_y + y * spacing);

            x != 0 && p.attach(this.points[this.points.length - 1], 1,spacing);
            y == 0 && p.pin(p.x, p.y);
            y != 0 && p.attach(this.points[x + (y - 1) * (cloth_width + 1)], 0,spacing)

            //4  3
            //1  2

            if (x != 0 && y != 0) {
                var s = new Square(this.points[this.points.length - 1], p, this.points[x + (y - 1) * (cloth_width + 1)], this.points[(x - 1) + (y - 1) * (cloth_width + 1)]);
                this.squares.push(s);
            }
            this.points.push(p);
        }
    }
};

Cloth.prototype.update = function (tear_distance,physics_accuracy,mouse,mouse_cut,mouse_influence,gravity,boundsx,boundsy) {
    var i = physics_accuracy;

    while (i--) {
        var p = this.points.length;
        while (p--) this.points[p].resolve_constraints(tear_distance,boundsx,boundsy);
    }

    i = this.points.length;
    while (i--) this.points[i].update(.016,mouse,mouse_cut,mouse_influence,gravity);
};


Cloth.prototype.draw = function (ctx) {
    ctx.beginPath();
    
    var i = this.squares.length;
    while (i--) {
        let square = this.squares[i];

        if(square === null)
            continue;
            
        if (square.p2.constraints.length != 2 || square.p3.constraints[square.p3.constraintLeft] == null || square.p1.constraints[square.p1.constraintUp] == null){
            this.squareLines.push(square);
            this.squares[i] = null;
            continue;
        }

        square.draw(ctx);
    }
    ctx.fill();
};

Cloth.prototype.drawLines = function (ctx) {
    ctx.beginPath();

    var i = this.points.length;
    while (i--)
        this.points[i].draw(ctx);

    ctx.stroke();
};


Cloth.prototype.drawExp = function (ctx) {
    ctx.beginPath();


    for (let i = 0; i < this.squares.length; i = i + 2) {
        this.squares[i].draw(ctx);
    }

    ctx.fill();
};

export {Cloth};