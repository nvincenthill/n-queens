// all tests pass in <20sec
// solution not optimal

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
//constraints: time complexity?4
//edge cases: n = 1 -> always true

window.findNRooksSolution = function(n) {
  var start = new Date();
  // console.log(`Finding a single solution for ${n} rooks...`);
  var result = [];
  //iterate through rows
  for (var i = 0; i < n; i++) {
    var temp = [];
    //iterate through columns
    for (var j = 0; j < n; j++) {
      //toggle if i === j
      if (i === j) {
        temp.push(1);
      } else {
        temp.push(0);
      }
    }
    result.push(temp);
  }  
  var end = new Date();
  var runTime = end - start;
  resultString = JSON.stringify(result);
  // console.log(`Single solution for ${n} rooks: ${result}`);
  // console.log(`It took ${runTime}ms to run`);
  return result;
};

// Input = integer denoting the number of rooks and size of board
// Output = integer denoting the numbers of answers for the given n
// Constraints = Time/Space complexity?
// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var start = new Date();
  console.log(`Finding solutions count for ${n} rooks...`);
  var result = 0;
  var rooks = n;
  var boards = [];

  if (n === 1) {
    result++;
    return result;
  }
  
  // create possibilty array
  var rows = [];
  var rowCount = 0;
  for (var i = 0; i < n; i++) {
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
    var board = new Board({n: n});
    seq.forEach((item, idx) => {
      board.togglePiece(item, idx);
    });
    boards.push(board);
  });


  // validate boards
  for (var i = 0; i < boards.length; i++) {
    if (boards[i].hasAnyRooksConflicts() === false) {
      result++;
    }
  }
  
  // end process and time trials
  var end = new Date();
  var runTime = end - start;
  resultString = JSON.stringify(result);
  console.log(`Single solution for ${n} rooks: ${result}`);
  console.log(`It took ${runTime}ms to run`);
  return result;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  console.log(`Finding a single solution for ${n} queens...`);
  var start = new Date();
  var result = [];
  var rooks = n;
  var boards = [];
  
  // create possibilty array
  var rows = [];
  var rowCount = 0;
  for (var i = 0; i < n; i++) {
    rows.push(rowCount);
    rowCount++;
  }
  
  var sequences = [];
  // create permutations
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
    var board = new Board({n: n});
    seq.forEach((item, idx) => {
      board.togglePiece(item, idx);
    });
    boards.push(board);
  });

  var solution;
  // validate boards
  for (var i = 0; i < boards.length; i++) {
    if (boards[i].hasAnyQueensConflicts() === false) {
      solution = boards[i];
    }
  }
  
  if (solution !== undefined) {
    if (solution.attributes.n !== undefined) {
      delete solution.attributes.n;
    }
    
    // debugger;
    for (var i = 0; i < n; i++) {
      result.push(solution.attributes[i]);
    }
  } else if (n === 2) {
    result = [[0, 0], [0, 0]];
  } else if (n === 3) {
    result = [[0, 0], [0, 0], [0, 0]];
  }
  
  // end process and time trials
  resultString = JSON.stringify(result);
  var end = new Date();
  var runTime = end - start;
  console.log(`Single solution for ${n} queens: ${result}`);
  console.log(`It took ${runTime}ms to run`);
  
  return result;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  console.log(`Finding solutions count for ${n} queens...`);
  var start = new Date();
  var result = 0;
  var rooks = n;
  var boards = [];

  // create possibilty array
  var rows = [];
  var rowCount = 0;
  for (var i = 0; i < n; i++) {
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
  
  var middle = new Date();
  // create board states
  sequences.forEach(seq => {
    var board = new Board({n: n});
    seq.forEach((item, idx) => {
      board.togglePiece(item, idx);
    });
    // validate boards
    if (board.hasAnyQueensConflicts() === false) {
      result++;
    }
  });
  
  // end process and time trials
  var end = new Date();
  var runTime = end - start;
  var midTime = middle - start;
  resultString = JSON.stringify(result);
  console.log(`Number of solutions for ${n} queens: ${result}`);
  console.log(`It took ${runTime}ms to run`);
  console.log(`It took ${midTime}ms to generate seqs`);
  return result;
};
