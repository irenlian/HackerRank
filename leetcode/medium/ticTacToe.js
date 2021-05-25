// https://leetcode.com/problems/design-tic-tac-toe/

const ROW = [[-1, 0], [1, 0]];
const VERTICAL = [[0, 1], [0, -1]];
const MAJOR_DIAGONAL =  [[-1, -1], [1, 1]];
const MINOR_DIAGONAL = [[1, -1], [-1, 1]];

class TicTacToe {
  board;
  n;
  /**
   * Initialize your data structure here.
   */
  constructor(n) {
    this.board = Array.from(new Array(n)).map(i => new Array(n).fill(0));
    this.n = n;
  }

  /**
   * Player {player} makes a move at ({row}, {col}).
   @param row The row of the board.
   @param col The column of the board.
   @param player The player, can be either 1 or 2.
   @return The current winning condition, can be either:
   0: No one wins.
   1: Player 1 wins.
   2: Player 2 wins.
   */
  move(row, col, player) {
    this.board[row][col] = player;
    let possibleWaysToWin = [ROW, VERTICAL];
    if (row === col) possibleWaysToWin = [...possibleWaysToWin, MAJOR_DIAGONAL];
    if (row === this.n - col - 1) possibleWaysToWin = [...possibleWaysToWin, MINOR_DIAGONAL];
    for (const possibleRow of possibleWaysToWin) {
      let isWinner = true;
      for (const direction of possibleRow) {
        let i = row;
        let j = col;
        while (i >= 0 && j >= 0 && i < this.n && j < this.n) {
          if (this.board[i][j] !== player) {
            isWinner = false;
            break;
          }
          i += direction[0];
          j += direction[1];
        }
        if (!isWinner) break;
      }
      if (isWinner) return player;
    }
    return 0;
  }
}

const ticTacToe = new TicTacToe(3);
const args = [
  [0, 0, 1], [0, 2, 2], [2, 2, 1], [1, 1, 2], [2, 0, 1], [1, 0, 2], [2, 1, 1]
];
args.forEach(a => console.log(ticTacToe.move(...a)));


