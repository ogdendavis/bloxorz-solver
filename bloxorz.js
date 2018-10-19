const bloxorz = (arr) => {

}

function move(pos, dir) {
  // Takes position as an array containing 1 or 2 sub-arrays:
  //    Y is the index of the string in the map array
  //    X is the index of the character in the string
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
  return `I ain't programmed that yet!`;
}

module.exports = { bloxorz, move };
