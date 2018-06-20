/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

//input: integer representing the number of rooks and board length
//output: Nested Array that represents a board state that is correct
//constraints: time complexity?
//edge cases: n = 1 -> always true

window.findNRooksSolution = function(n) {
  let start = new Date();
  let result = [];
  //iterate through rows
  for (let i = 0; i < n; i++) {
    let temp = [];
    //iterate through columns
    for (let j = 0; j < n; j++) {
      //toggle if i === j
      if (i === j) {
        temp.push(1);
      } else {
        temp.push(0);
      }
    }
    result.push(temp);
  }  
  let end = new Date();
  let runTime = end - start;
  resultString = JSON.stringify(result);
  // console.log(`Single solution for ${n} rooks: ${result}`);
  // console.log(runTime);
  return result;
};

// Input = integer denoting the number of rooks and size of board
// Output = integer denoting the numbers of answers for the given n
// Constraints = Time/Space complexity?
// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let start = new Date();
  let result = 0;
  let rooks = n;
  let boards = [];

  if (n === 1) {
    result++;
    return result;
  }
  
  // create possibilty array
  var rows = [];
  let rowCount = 0;
  for (let i = 0; i < n; i++) {
    rows.push(rowCount);
    rowCount++;
  }
  
  // create permutations
  var sequences = [];
  var makeSequences = function (piecesToGo, playedSoFar) {
    if (piecesToGo === 0) {
      if (new Set(playedSoFar).size === playedSoFar.length) {
        sequences.push(playedSoFar);
      }
      return;
    }
    for (var i = 0; i < rows.length; i++) {
      var currentVal = rows[i];
      makeSequences(piecesToGo - 1, playedSoFar.concat(currentVal));
    }
  };
  makeSequences(n, []);
  
  // create board states
  sequences.forEach(seq => {
    let board = new Board({n: n});
    seq.forEach((item, idx) => {
      board.togglePiece(item, idx);
    });
    boards.push(board);
  });


  // validate boards
  for (let i = 0; i < boards.length; i++) {
    if (boards[i].hasAnyRooksConflicts() === false) {
      result++;
    }
  }
  
  // end process and time trials
  let end = new Date();
  let runTime = end - start;
  resultString = JSON.stringify(result);
  console.log(`Number of solutions for ${n} rooks: ${result}`);
  console.log(`It took ${runTime}ms to run`);
  return result;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme
  let board = new Board({ n: n });
  console.log(
    'Single solution for ' + n + ' queens:',
    JSON.stringify(solution)
  );
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme
  let board = new Board({ n: n });
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
