var Square = function (p1, p2, p3, p4) {

    //p4  p3
    //p1  p2
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.p4 = p4;
}

Square.prototype.draw = function (ctx) {

    if (this.p2.constraints.length != 2 || this.p3.constraints[this.p3.constraintLeft] == null || this.p1.constraints[this.p1.constraintUp] == null)
        return;

    ctx.moveTo(this.p4.x, this.p4.y);
    ctx.lineTo(this.p3.x, this.p3.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.lineTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p4.x, this.p4.y);
}

export {Square};