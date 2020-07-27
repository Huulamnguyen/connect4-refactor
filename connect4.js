// TODO: PART ONE: MAKE GAME INTO A CLASS
class Game {
  constructor(HEIGHT, WIDTH){
    this.HEIGHT = HEIGHT;
    this.WIDTH = WIDTH;    
    this.currPlayer = 1; //* active player 1 or 2       
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
    piece.setAttribute("class", `piece p${this.currPlayer}`);
    piece.style.top = -50 * (y + 2);  
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  };

  //* endGame() function: announce game end
  endGame(msg) {
    setTimeout(function(){
      alert(msg);
    }, 1000);  
  };

  //* handleClick() function: handle click of column top to play piece:
  handleClick(evt) {
    //TODO: get x from ID of clicked cell
    let x = +evt.target.id;
  
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
      return this.endGame(`Player ${this.currPlayer} won!`);
    }
    
    //TODO: check for tie
    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }
      
    //TODO: switch players
    this.currPlayer = this.currPlayer === 1 ? 2 : 1;
  };

  //* checkForWin() function: check board cell-by-cell for "does a win start here?"
  checkForWin() {
    function _win(cells) {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer  
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          this.board[y][x] === this.currPlayer
      );
    }
  
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
new Game (6,7).makeBoard();
new Game (6,7).makeHtmlBoard();













