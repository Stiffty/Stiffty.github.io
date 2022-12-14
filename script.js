import { Cloth as Cloth } from "./Title/Cloth.js"
// settings

var physics_accuracy = 20,
    mouse_influence = 10,
    mouse_cut = 5,
    gravity = 1200,
    cloth_height = 18,
    cloth_width = 86,
    start_y = 20,
    spacing = 5,
    tear_distance = 20,
    text = "STIFFTY",
    bloom = 10


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


function getPositionsForText(cloth) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 100px serif";
    let textWidth = ctx.measureText(text);
    let textPos = (canvas.width / 2) - (textWidth.width / 2);
    ctx.fillText(text, textPos, 100);

    // get a Uint32 representation of the bitmap:
    let data32 = new Uint32Array(ctx.getImageData(0, 0, canvas.width, canvas.height).data.buffer);

    let approvedSquares = [];

    // loop through each pixel. We will only store the ones with alpha = 255
    let length = data32.length;
    for (let i = 0; i < length; i++) {
        if (data32[i] & 0xff000000) {

            let sqLength = cloth.squares.length;
            for (let j = 0; j < sqLength; j++) {
                var sq = cloth.squares[j];


                if (sq.p2.x == i % canvas.width && sq.p2.y == ((i / canvas.width) | 0)) {
                    approvedSquares.push(cloth.squares[j]);
                }
            }

            ctx.fillRect(i % canvas.width, ((i / canvas.width) | 0), 1, 1);
        }
    }

    length = cloth.squares.length;

    for (let index = 0; index < length; index++) {
        if (approvedSquares.indexOf(cloth.squares[index]) === -1)
            cloth.squareLines.push(cloth.squares[index]);
    }

    cloth.squares = approvedSquares;
}


function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    cloth.update(tear_distance, physics_accuracy, mouse, mouse_cut, mouse_influence, gravity, boundsx, boundsy);

    ctx.shadowBlur = 0;
    cloth.drawLines(ctx);


    let rand = Math.random() * 10;


    ctx.shadowBlur = bloom + rand;
    ctx.shadowColor = "white";
    cloth.draw(ctx);

    requestAnimFrame(update);
}

function start() {

    //Mouse events
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

    canvas.onmouseout = function (e) {
        mouse.down = false;
        e.preventDefault();
    }

    //Touch events

    canvas.ontouchstart = function (e) {
        mouse.button = 1;
        mouse.px = mouse.x;
        mouse.py = mouse.y;
        var rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left,
            mouse.y = e.touches[0].clientY - rect.top,
            mouse.down = true;
        e.preventDefault();
    };

    canvas.ontouchend = function (e) {
        mouse.down = false;
        e.preventDefault();
    };

    canvas.ontouchmove = function (e) {
        mouse.px = mouse.x;
        mouse.py = mouse.y;
        var rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left,
            mouse.y = e.touches[0].clientY - rect.top,
            e.preventDefault();
    };

    boundsx = canvas.width - 1;
    boundsy = canvas.height - 1;

    var gradient = ctx.createLinearGradient((canvas.width / 2) - (cloth_width * spacing) / 2, start_y + cloth_height / 2, (canvas.width + cloth_width * spacing) / 2, start_y + cloth_height / 2);
    gradient.addColorStop(0, "black");
    gradient.addColorStop(0.25, "#2e1c54");
    gradient.addColorStop(0.5, "#5661ff");
    gradient.addColorStop(0.75, "#4048bc");
    gradient.addColorStop(1, "black");



    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#66ffff";
    ctx.strokeStyle = "rgba(102, 255, 255, 0.5)";
    ctx.strokeStyle = gradient;



    cloth = new Cloth(canvas, cloth_width, cloth_height, spacing, start_y);

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

