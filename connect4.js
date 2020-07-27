// TODO: PART ONE: MAKE GAME INTO A CLASS
class Game {
  constructor(p1, p2, HEIGHT = 6, WIDTH = 7){
    this.players = [p1, p2];
    this.HEIGHT = HEIGHT;
    this.WIDTH = WIDTH;    
    this.currPlayer = p1; //* active player 1 or 2
    this.makeBoard(); 
    this.makeHtmlBoard();
    this.gameOver = false;         
  };     

  //* makeBoard() function: to make the board of the game.
  makeBoard() {
    this.board = []; //*array of rows, each row is array of cells.
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length: this.WIDTH }));
    }
  };

  //* makeHtmlBoard()function: make HTML table and row of column tops.
  makeHtmlBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';  
    //TODO: make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', this.handleClick.bind(this));  
    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }  
    board.append(top);  
    //TODO: make main part of board
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement('tr');  
      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }  
      board.append(row);
    }
  };

  //* findSpotForCol() function: given column x, return top empty y (null if filled)
  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) { //!Cannot read property '5' of undefined at Game.findSpotForCol
        return y;
      }
    }
    return null;
  };

  //* placeInTable() function: update DOM to place piece into HTML table of board
  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');   
    piece.style.backgroundColor = this.currPlayer.color;    
    piece.style.top = `${ -50 * (y + 2)}px`;  
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  };

  //* endGame() function: announce game end
  endGame(msg) {
    this.gameIsRunning = false; 
    setTimeout(function(){
      alert(msg);
    }, 1500);  
  };

  //* handleClick() function: handle click of column top to play piece:
  handleClick(evt) {
    if (this.gameOver === true){
      return;
    }

    //TODO: get x from ID of clicked cell
    const x = +evt.target.id;
  
    //TODO: get next spot in column (if none, ignore click)    
    let y = this.findSpotForCol(x); //!Cannot read property '5' of undefined at Game.findSpotForCol
    if (y === null) {
      return;
    }
  
    //TODO: place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);
    
    //TODO: check for win
    if (this.checkForWin()) {
      this.gameOver = true;
      return this.endGame(`Player ${this.currPlayer.color} won!`);
    }
    
    //TODO: check for tie
    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }
      
    //TODO: switch players
    this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
  };

  //* checkForWin() function: check board cell-by-cell for "does a win start here?"
  checkForWin() {
    const _win = (cells) =>   
      cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          this.board[y][x] === this.currPlayer
      );    
  
    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
  
        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    };
  };  
};

class Player {
  constructor(color){
    this.color = color;
  };
};

const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', () => {
  startBtn.innerText = "Again";
  let p1 = new Player(document.getElementById('p1').value);
  let p2 = new Player(document.getElementById('p2').value);
  new Game (p1, p2);
});

const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener('click', () => { 
  const board = document.getElementById('board');
    board.innerHTML = '';
  const startBtn = document.getElementById('start-btn');
    startBtn.innerText = "Start Game";
});





















