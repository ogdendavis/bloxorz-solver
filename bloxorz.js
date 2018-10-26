const bloxorz = (arr) => {
  // Should implement breadth-first search for solution

}

function findPositionOnMap(board, target) {
  // Takes current board and returns location for either player or exit
  const matchedRows = board.filter(row => row.search(target) >= 0);

  // Case for one-block position
  if (matchedRows.length === 1 &&
      matchedRows[0].indexOf(target) === matchedRows[0].lastIndexOf(target)) {
        return [[board.indexOf(matchedRows[0]), matchedRows[0].indexOf(target)]]
      }

  // Case for horizontal two-block positions -- checks for invalid position
  else if (matchedRows.length === 1 && matchedRows[0].split(target).length === 3) {
            const rowIndex = board.indexOf(matchedRows[0]);
            return [[rowIndex,matchedRows[0].indexOf(target)],
                    [rowIndex,matchedRows[0].lastIndexOf(target)]];
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

function move(pos, dir) {
  // Takes position as an array containing 1 or 2 sub-arrays:
  //    Y is the index of the string in the map array (vertical pos)
  //    X is the index of the character in the string (horizontal pos)
  //    1: [[y,x]]
  //    2: [[y,x],[y,x]]
  // Takes dir as 1-character string: U, D, L, or R
  // Returns new position in same format as pos -- this position may or may not be valid on the map
  // If there are two cells in the position, they should always be in ascending order (lower x or y should come first)

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

module.exports = { bloxorz, move, findPositionOnMap };
