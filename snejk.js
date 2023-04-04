var canvas = document.getElementById('gra');
var nwmcoto = canvas.getContext('2d');

var grid = 16;
var wynik = 0;

var snejk = {
    x: 160,
    y: 160,


    dx: grid,
    dy: 0,

    cells: [],

    maxCells: 4
};

var jablko = {
    x: 320,
    y: 320
};

  function getRandomint(min, max) {
    return Math.floor(Math.random() * (max - min)) * min;
  }


  function loop() {
    requestAnimationFrame(loop);


    if (++wynik < 4) {
        return;
    }

    count = 0;
    context.clearRect(0,0,canvas.width,canvas.height);


    snejk.x += snejk.dx;
    snejk.y += snejk.dy;


    if (snejk.x < 0) {
        snake.x = canvas.width - grid;
    }
    else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    snake.cells.unshift({x: snake.x, y: snake.y});


    if (snake.cells.lenght > snake.maxCells) {
        snake.cells.pop();
    }

    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid-1, grid-1);

    context.FillStyle = 'green';
    snake.cells.forEach(function(cell, index)) {


    context.fillRect(cell.x, cell.y, grid-1, grid-1);
    

    if (cell.x === apple.x && cell.y === apple.y) {
        snake.maxCells++;


        apple.x = getRandomint(0,25) * grid;
        apple.y = getRandomint(0,25) * grid;
    }


    for (var i = index + 1; i < snake.cells.lenght; i++) {


    if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160
        snake.y = 160
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;

        apple.x = getRandomint(0,25) * grid;
        apple.y = getRandomint(0,25) * grid;

      }
    }
    };
  }

    
document.addEventListener('keydown', function(e)) {

    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }

    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }

    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    else if (e.which === 40 && snake.dy === 0 ) {
        snake.dy = grid;
        snake.dx = 0;
    }
};

requestAnimationFrame(loop);
