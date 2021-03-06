const bloxorz = (arr) => {
  // Should implement breadth-first search for solution
  const startPosition = findPositionOnMap(arr, 'B');
  const exitPosition = findPositionOnMap(arr, 'X');

  const paths = [[startPosition]];
  const visited = [];
  let searching = true;
  let solutionPath = [];

  let testI = 0;
  while (searching) {
    // This is the recursive(?) part -- keep on enqueing new nodes and visiting
    // them until I've found the solution! If and when solution is found, set
    // searching to false and return the moves!
    for (let path of paths) {

      // I'm getting stuck in this loop for some reason!

      const currentPos = path[path.length - 1];
      if (visited.indexOf(currentPos) === -1) {
        // If you're in a new place
        visited.push(currentPos);
        const adjacentPositions = ['U','R','D','L'].map(dir => move(currentPos, dir));
        for (let potentialPos of adjacentPositions) {
          if (isEqual(exitPosition, potentialPos)) {
            // Found it!!!
            searching = false;
            soltuionPath = [...path, potentialPos];
          }
          else if (visited.indexOf(potentialPos) === -1 && isPositionValid(arr, potentialPos)) {
            paths.push([...path, potentialPos]);
          }
        }
      }
    }
    testI++;
    if (testI >= 10) {
      searching = false;
      return paths;
    }
  }

  return solutionPath;
}

// isPositionValid takes position and board, and returns boolean indicating if
// it is within valid squares on the board
function isPositionValid(board, position) {
  const validBlockSigns = ['1','B','X'];
  for (let block of position) {
    if (block[0] < 0 || block[1] < 0 || block[0] >= board.length || block[1] >= board[0].length || validBlockSigns.indexOf(board[block[0]][block[1]]) === -1) {
      return false;
    }
  }
  return true;
}

// findPositionOnMap takes current board and returns position for provided
// target
function findPositionOnMap(board, target) {
  const matchedRows = board.filter(row => row.search(target) >= 0);

  // Case for one-block position
  if (matchedRows.length === 1 &&
      matchedRows[0].indexOf(target) === matchedRows[0].lastIndexOf(target)) {
        return [[board.indexOf(matchedRows[0]), matchedRows[0].indexOf(target)]]
      }

  // Case for horizontal two-block positions -- checks for invalid position
  else if (matchedRows.length === 1 &&
           matchedRows[0].split(target).length === 3) {
            const rowIndex = board.indexOf(matchedRows[0]);
            return [[rowIndex, matchedRows[0].indexOf(target)],
                    [rowIndex, matchedRows[0].lastIndexOf(target)]];
           }

  // Case for vertical two-block positions -- checks for invalid position
  else if (matchedRows.length === 2 &&
           matchedRows[0].indexOf(target) === matchedRows[0].lastIndexOf(target) &&
           matchedRows[1].indexOf(target) === matchedRows[1].lastIndexOf(target) &&
           board.indexOf(matchedRows[1]) - board.indexOf(matchedRows[0]) === 1) {
             return [[board.indexOf(matchedRows[0]), matchedRows[0].indexOf(target)],
                     [board.indexOf(matchedRows[1]), matchedRows[1].indexOf(target)]];
           }

  return 'error: invalid position'
}

// move takes position as an array containing 1 or 2 sub-arrays:
//    Y is the index of the string in the map array (vertical pos)
//    X is the index of the character in the string (horizontal pos)
//    1: [[y,x]]
//    2: [[y,x],[y,x]]
// Takes dir as 1-character string: U, D, L, or R
// Returns new position in same format as pos -- this position may or may not be
// valid on the map
// If there are two cells in the position, they should always be in ascending
// order (lower x or y should come first)
function move(pos, dir) {
  // Input tests
  if (arguments.length > 2) {
    return 'error: too many arguments';
  }
  if (typeof pos[0] !== 'object' && typeof pos[0][0] !== 'number') {
    return 'error: bad position';
  }
  if (typeof dir !== 'string' || dir.toUpperCase() !== dir || ['U','D','L','R'].indexOf(dir) === -1) {
    return 'error: invalid direction';
  }

  if (pos.length === 1) {
    // Case for movements starting with block standing upright
    const y = pos[0][0];
    const x = pos[0][1];
    switch (dir) {
      case 'U':
        return [[y - 2, x],[y - 1, x]];
      case 'D':
        return [[y + 1, x],[y + 2, x]];
      case 'L':
        return [[y, x - 2],[y, x - 1]];
      case 'R':
        return [[y, x + 1],[y, x + 2]];
      default:
        return 'error: invalid direction';
    }
  }

  if (pos[0][0] === pos[1][0]) {
    // Case for movements with block laying horizontally
    const y = pos[0][0];
    const x1 = pos[0][1];
    const x2 = pos[1][1];
    switch (dir) {
      case 'U':
        return [[y - 1, x1],[y -1, x2]];
      case 'D':
        return [[y + 1, x1],[y + 1, x2]];
      case 'L':
        return [[y, x1 - 1]];
      case 'R':
        return [[y, x2 + 1]];
      default:
        return 'error: invalid direction'
    }
  }

  // Case for movements with block laying vertically
  const y1 = pos[0][0];
  const y2 = pos[1][0];
  const x = pos[0][1];
  switch (dir) {
    case 'U':
      return [[y1 - 1, x]];
    case 'D':
      return [[y2 + 1, x]];
    case 'L':
      return [[y1, x - 1],[y2, x - 1]];
    case 'R':
      return [[y1, x + 1],[y2, x + 1]];
    default:
      return 'error: invalid direction';
  }
  return `error: no movement case triggered`;
}

// isEqual takes two arrays (representing positions), and determines whether
// or not they're the same.
// This is needed because comparing nested arrays with === doesn't work
// This function won't work for all arrays -- just ones in the format we have
// for positions
function isEqual(a, b) {
  // Case for if one is a one-block position and the other is two-block
  if (a.length !== b.length) {
    return false;
  }
  // Compare first block -- happens for one- or two-block positions
  if (a[0][0] !== b[0][0] || a[0][1] !== b[0][1]) {
    return false;
  }
  // Compare second block for two-block positions
  if (a.length === 2) { // We already established that a.length === b.length
    if (a[1][0] !== b[1][0] || a[1][1] !== b[1][1]) {
      return false;
    }
  }
  // If we've made it this far, positions are equal!
  return true;
}

module.exports = { bloxorz, move, findPositionOnMap, isPositionValid, isEqual };
