import {Cloth as Cloth} from "./Title/Cloth.js"
// settings

var physics_accuracy = 20,
    mouse_influence = 20,
    mouse_cut = 5,
    gravity = 1200,
    cloth_height = 20,
    cloth_width = 100,
    start_y = 20,
    spacing = 5,
    tear_distance = 40;


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

//Constrains


//Clothes



function getPositionsForText(cloth) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 100px serif";                    // clear canvas so we can
    ctx.fillText("STIFFTY", 50, 100);           // draw the text (default 10px)

    // get a Uint32 representation of the bitmap:
    let data32 = new Uint32Array(ctx.getImageData(0, 0, canvas.width, canvas.height).data.buffer);

    let approvedSquares = [];

    // loop through each pixel. We will only store the ones with alpha = 255
    for (let i = 0; i < data32.length; i++) {
        if (data32[i] & 0xff000000) {

            for (let j = 0; j < cloth.squares.length; j++) {
                var sq = cloth.squares[j];


                if (sq.p2.x == i % canvas.width && sq.p2.y == ((i / canvas.width) | 0)) {
                    approvedSquares.push(cloth.squares[j]);
                }
            }

            ctx.fillRect(i % canvas.width, ((i / canvas.width) | 0), 1, 1);
        }
    }

    cloth.squares = approvedSquares;
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    cloth.update(tear_distance,physics_accuracy,mouse,mouse_cut,mouse_influence,gravity,boundsx,boundsy);
    cloth.draw(ctx);

    requestAnimFrame(update);
}

function start() {
    canvas.onmousedown = function (e) {
        mouse.button = e.which;
        mouse.px = mouse.x;
        mouse.py = mouse.y;
        var rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left,
            mouse.y = e.clientY - rect.top,
            mouse.down = true;
        e.preventDefault();
    };

    canvas.onmouseup = function (e) {
        mouse.down = false;
        e.preventDefault();
    };

    canvas.onmousemove = function (e) {
        mouse.px = mouse.x;
        mouse.py = mouse.y;
        var rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left,
            mouse.y = e.clientY - rect.top,
            e.preventDefault();
    };

    canvas.oncontextmenu = function (e) {
        e.preventDefault();
    };

    boundsx = canvas.width - 1;
    boundsy = canvas.height - 1;

    ctx.fillStyle = "#FFFFFF";

    cloth = new Cloth(canvas,cloth_width,cloth_height,spacing,start_y);

    getPositionsForText(cloth);

    update();
}



window.onload = function () {
    canvas = document.getElementById('c');
    ctx = canvas.getContext('2d');

    canvas.width = 560;
    canvas.height = 350;

    start();
};

