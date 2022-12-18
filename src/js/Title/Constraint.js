var Constraint = function (p1, p2,spacing) {
    this.p1 = p1;
    this.p2 = p2;
    this.length = spacing;
};

Constraint.prototype.resolve = function (tear_distance) {
    var diff_x = this.p1.x - this.p2.x,
        diff_y = this.p1.y - this.p2.y,
        dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y)

    if (dist > tear_distance) this.p1.remove_constraint(this);

    var diff = (this.length - dist) / dist;



    var px = diff_x * diff * 0.5;
    var py = diff_y * diff * 0.5;

    this.p1.x += px;
    this.p1.y += py;
    this.p2.x -= px;
    this.p2.y -= py;
};

Constraint.prototype.draw = function (ctx) {

    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);

};

export {Constraint};