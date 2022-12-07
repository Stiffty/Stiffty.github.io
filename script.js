
  // settings
  
  var physics_accuracy  = 100,
      mouse_influence   = 20,
      mouse_cut         = 5,
      gravity           = 1200,
      cloth_height      = 30,
      cloth_width       = 100,
      start_y           = 20,
      spacing           = 5,
      tear_distance     = 60;
  
  
  window.requestAnimFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
          window.setTimeout(callback, 1000 / 60);
  };
  
  var canvas,
      ctx,
      cloth,
      boundsx,
      boundsy,
      mouse = {
          down: false,
          button: 1,
          x: 0,
          y: 0,
          px: 0,
          py: 0
      };
  //Points 
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
  
  Point.prototype.update = function (delta) {
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
      nx = this.x + ((this.x - this.px) * .99) + ((this.vx / 2) * delta);
      ny = this.y + ((this.y - this.py) * .99) + ((this.vy / 2) * delta);
  
      this.px = this.x;
      this.py = this.y;
  
      this.x = nx;
      this.y = ny;
  
      this.vy = this.vx = 0
  };
  
  Point.prototype.draw = function () {
      if (!this.constraints.length) return;
  
      var i = this.constraints.length;
      while (i--) this.constraints[i].draw();
  };
  
  Point.prototype.resolve_constraints = function () {
      if (this.pin_x != null && this.pin_y != null) {
          this.x = this.pin_x;
          this.y = this.pin_y;
          return;
      }
  
      var i = this.constraints.length;
      while (i--) this.constraints[i].resolve();
  
      this.x > boundsx ? this.x = 2 * boundsx - this.x : 1 > this.x && (this.x = 2 - this.x);
      this.y < 1 ? this.y = 2 - this.y : this.y > boundsy && (this.y = 2 * boundsy - this.y);
  };
  
  Point.prototype.attach = function (point,direction) {
        var con = new Constraint(this, point);

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

  //Constrains
  var Constraint = function (p1, p2) {
      this.p1     = p1;
      this.p2     = p2;
      this.length = spacing;
  };
  
  Constraint.prototype.resolve = function () {
      var diff_x  = this.p1.x - this.p2.x,
          diff_y  = this.p1.y - this.p2.y,
          dist    = Math.sqrt(diff_x * diff_x + diff_y * diff_y),
          diff    = (this.length - dist) / dist;
  
      if (dist > tear_distance) this.p1.remove_constraint(this);
  
      var px = diff_x * diff * 0.5;
      var py = diff_y * diff * 0.5;
  
      this.p1.x += px;
      this.p1.y += py;
      this.p2.x -= px;
      this.p2.y -= py;
  };
 
  Constraint.prototype.draw = function () {
    
      ctx.moveTo(this.p1.x, this.p1.y);
      ctx.lineTo(this.p2.x, this.p2.y);
      
  };
  
  var Square = function(p1,p2,p3,p4){

    //p4  p3
    //p1  p2
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.p4 = p4;
  }

  Square.prototype.draw = function() {

    if(this.p2.constraints.length!=2||this.p3.constraints[this.p3.constraintLeft] == null||this.p1.constraints[this.p1.constraintUp]== null)
        return;

    ctx.moveTo(this.p4.x,this.p4.y);
    ctx.lineTo(this.p3.x,this.p3.y);
    ctx.lineTo(this.p2.x,this.p2.y);
    ctx.lineTo(this.p1.x,this.p1.y);
    ctx.lineTo(this.p4.x,this.p4.y);
  }

  //Clothes
  var Cloth = function () {
      this.points = [];
      this.squares = [];
  
      var start_x = canvas.width / 2 - cloth_width * spacing / 2;
  
      for (var y = 0; y <= cloth_height; y++) {
          for (var x = 0; x <= cloth_width; x++) {
                var p = new Point(start_x + x * spacing, start_y + y * spacing);
    
                x != 0 && p.attach(this.points[this.points.length - 1],1);
                y == 0 && p.pin(p.x, p.y);
                y != 0 && p.attach(this.points[x + (y - 1) * (cloth_width + 1)],0)
    
                //4  3
                //1  2
               
                if(x!=0&&y!=0){
                    var s = new Square(this.points[this.points.length - 1],p,this.points[x + (y - 1) * (cloth_width + 1)],this.points[(x-1) + (y - 1) * (cloth_width + 1)]);
                    this.squares.push(s);
                }
              this.points.push(p);
          }
      }
  };
  
  Cloth.prototype.update = function () {
      var i = physics_accuracy;
  
      while (i--) {
          var p = this.points.length;
          while (p--) this.points[p].resolve_constraints();
      }
  
      i = this.points.length;
      while (i--) this.points[i].update(.016);
  };
  
  function distance(x,y){
    return Math.sqrt(Math.pow((y.x-x.x),2)+Math.pow((y.y-x.y),2));
  }

  Cloth.prototype.draw = function () {
      ctx.beginPath();
  
      var i = cloth.squares.length;
      while (i--) cloth.squares[i].draw();
      ctx.fill();
  };

  Cloth.prototype.drawLines = function () {
    ctx.beginPath();

    var i = cloth.squares.length;
    while (i--) cloth.squares[i].draw();
    ctx.stroke();
};


Cloth.prototype.drawExp= function () {
    ctx.beginPath();

    
    for (let i = 0; i < cloth.squares.length; i = i+2) {
        cloth.squares[i].draw();
    }

    ctx.fill();

   
    //ctx.fillText("Hello world", 100, 100);
};
  

    function getPositionsForText(cloth){
        ctx.clearRect(0, 0, canvas.width,canvas.height);    
        ctx.font = "100px serif";                    // clear canvas so we can
        ctx.fillText("STIFFTY", 50, 150);           // draw the text (default 10px)
    
        // get a Uint32 representation of the bitmap:
        data32 = new Uint32Array(ctx.getImageData(0, 0, canvas.width,canvas.height).data.buffer);
        
        let approvedSquares = [];

        // loop through each pixel. We will only store the ones with alpha = 255
        for(i = 0; i < data32.length; i++) {
            if (data32[i] & 0xff000000) { 
                
                for (let j = 0; j < cloth.squares.length; j++) {
                    var  sq = cloth.squares[j];

                    
                    if(sq.p2.x == i % canvas.width&&sq.p2.y == ((i / canvas.width)|0)){
                        approvedSquares.push( cloth.squares[j]);
                    }
                }

                ctx.fillRect(i % canvas.width, ((i / canvas.width)|0), 1, 1);
            }
        }

        cloth.squares = approvedSquares;
    }

  function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      cloth.update();
      cloth.draw();
  
      requestAnimFrame(update);
  }
  
  function start() {
      canvas.onmousedown = function (e) {
          mouse.button  = e.which;
          mouse.px      = mouse.x;
          mouse.py      = mouse.y;
          var rect      = canvas.getBoundingClientRect();
          mouse.x       = e.clientX - rect.left,
          mouse.y       = e.clientY - rect.top,
          mouse.down    = true;
          e.preventDefault();
      };
  
      canvas.onmouseup = function (e) {
          mouse.down = false;
          e.preventDefault();
      };
  
      canvas.onmousemove = function (e) {
          mouse.px  = mouse.x;
          mouse.py  = mouse.y;
          var rect  = canvas.getBoundingClientRect();
          mouse.x   = e.clientX - rect.left,
          mouse.y   = e.clientY - rect.top,
          e.preventDefault();
      };
  
      canvas.oncontextmenu = function (e) {
          e.preventDefault();
      };
  
      boundsx = canvas.width - 1;
      boundsy = canvas.height - 1;
  
      ctx.strokeStyle = '#888';
    
      cloth = new Cloth();
    
      getPositionsForText(cloth);

      update();
  }
  
  function test(){
    //Smiley 
    ctx.beginPath();
    ctx.moveTo(50,50);
    ctx.lineTo(50,100);

    ctx.moveTo(75,50);
    ctx.lineTo(75,100);

    ctx.moveTo(88,120);
    
    ctx.arc(62.5,120,25,0,Math.PI,false);
    ctx.fill();
  }

  window.onload = function () {
      canvas  = document.getElementById('c');
      ctx     = canvas.getContext('2d');
  
      canvas.width  = 560;
      canvas.height = 350;

      //test();
  
      start();
  };
  
  