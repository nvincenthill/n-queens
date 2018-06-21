// Dissecting Ruan Pethiyagoda's bitwise solution from Twitter

// Bitwise AND ---	a & b	Returns a 1 in each bit position for which the corresponding bits of both operands are 1's.
// Bitwise OR ---	a | b	Returns a 1 in each bit position for which the corresponding bits of either or both operands are 1's.
// Bitwise XOR ---	a ^ b	Returns a 1 in each bit position for which the corresponding bits of either but not both operands are 1's.
// Bitwise NOT ---	~ a	Inverts the bits of its operand.
// Left shift --- 	a << b	Shifts a in binary representation b (< 32) bits to the left, shifting in 0's from the right.
// Sign-propagating right shift ---	a >> b	Shifts a in binary representation b (< 32) bits to the right, discarding bits shifted off.
// Zero-fill right shift ---	a >>> b	Shifts a in binary representation b (< 32) bits to the right, discarding bits shifted off, and shifting in 0's from the left.

// Q is the size of a board side/number of queens we must place on the board but later becomes the binary representation of a full board
// u, ee, and n are each a number that is the bit pattern to what left diagonals, columns, and right diagonals are being currently attacked by queens on the board
// s maintains the count of the number of solutions found
// H is a bit pattern that represents all a board
// R is the bit pattern of the right most possible position to place a queen

// example invocation --- N(15);

function nQueens(Q, u = 0, ee = 0, n = 0, s = 0, H = 0, R = 0) {
  let start = new Date();
  s = 0;
  Q = u ? Q : (1 << Q) - 1;
  H = ~(u | ee | n) & Q;
  while (H) H ^= R = -H & H, s += nQueens(Q, (u | R) << 1, ee | R, (n | R) >> 1);
  let end = new Date();
  let runTime = end - start;
  if (true) {
    console.log(`It took ${runTime}ms to run`);
  }
  return s += ee === Q;
}

// There are 1 solutions to 1-queens problem --- 3ms runtime
// There are 0 solutions to 2-queens problem --- 5ms runtime
// There are 0 solutions to 3-queens problem --- 3ms runtime
// There are 2 solutions to 4-queens problem --- 4ms runtime
// There are 10 solutions to 5-queens problem --- 6ms runtime
// There are 4 solutions to 6-queens problem --- 14ms runtime
// There are 40 solutions to 7-queens problem --- 24ms runtime
// There are 92 solutions to 8-queens problem --- 48ms runtime
// There are 352 solutions to 9-queens problem --- 119ms runtime
// There are 724 solutions to 10-queens problem --- 477ms runtime
// There are 2680 solutions to 11-queens problem --- 1914ms runtime
// There are 14200 solutions to 12-queens problem --- 14200ms runtime


// log solution given n queens
// n = 15 has a 2-3min runtime
console.log(nQueens(12));