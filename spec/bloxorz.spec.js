const source = require('../bloxorz');
const bloxorz = source.bloxorz;
const move = source.move;
const findPositionOnMap = source.findPositionOnMap;
const isPositionValid = source.isPositionValid;

describe('isPositionValid', function() {
  it('validates good one-block positions', function() {
    expect(isPositionValid([
     '000001111110000',
  	 '000001001110000',
  	 '000001001111100',
  	 'B11111000001111',
  	 '0000111000011X1',
  	 '000011100000111',
  	 '000000100110000',
  	 '000000111110000',
  	 '000000111110000',
  	 '000000011100000'], [[0,6]])).toEqual(true);
     expect(isPositionValid([
      '1110000000',
   	  '1B11110000',
   	  '1111111110',
   	  '0111111111',
   	  '0000011X11',
   	  '0000001110'], [[2,1]])).toEqual(true);
  });
  it('invalidates bad one-block positions', function() {
    expect(isPositionValid([
     '00011111110000',
  	 '00011111110000',
  	 '11110000011100',
  	 '11100000001100',
  	 '11100000001100',
  	 '1B100111111111',
  	 '11100111111111',
  	 '000001X1001111',
  	 '00000111001111'], [[0,0]])).toEqual(false);
    expect(isPositionValid([
      '000000111111100',
   	  '111100111001100',
   	  '111111111001111',
   	  '1111000000011XB',
   	  '111100000001111',
   	  '000000000000111'], [[3,6]])).toEqual(false);
  });
  it('validates good two-block horizontal positions', function() {
    expect(isPositionValid([
      '000000111111100',
   	  '111100111001100',
   	  '111111111001111',
   	  '1111000000011XB',
   	  '111100000001111',
   	  '000000000000111'], [[0,6],[0,7]])).toEqual(true);
    expect(isPositionValid([
      '1110000000',
      '1B11110000',
      '1111111110',
      '0111111111',
      '0000011X11',
      '0000001110'], [[1,1],[1,2]])).toEqual(true);
  });
  it('invalidates bad two-block horizontal positions', function() {
    expect(isPositionValid([
      '000000111111100',
   	  '111100111001100',
   	  '111111111001111',
   	  '1111000000011XB',
   	  '111100000001111',
   	  '000000000000111'], [[5,2],[5,3]])).toEqual(false);
    expect(isPositionValid([
      '1110000000',
      '1B11110000',
      '1111111110',
      '0111111111',
      '0000011X11',
      '0000001110'], [[0,2],[0,3]])).toEqual(false);
  });
  it('validates good two-block vertical positions', function() {
    expect(isPositionValid([
     '000001111110000',
  	 '000001001110000',
  	 '000001001111100',
  	 'B11111000001111',
  	 '0000111000011X1',
  	 '000011100000111',
  	 '000000100110000',
  	 '000000111110000',
  	 '000000111110000',
  	 '000000011100000'], [[0,5],[1,5]])).toEqual(true);
    expect(isPositionValid([
     '00011111110000',
   	 '00011111110000',
   	 '11110000011100',
   	 '11100000001100',
   	 '11100000001100',
   	 '1B100111111111',
   	 '11100111111111',
   	 '000001X1001111',
   	 '00000111001111'], [[6,6],[7,6]])).toEqual(true);
  });
  it('invalidates bad two-block vertical positions', function() {
    expect(isPositionValid([
     '000001111110000',
  	 '000001001110000',
  	 '000001001111100',
  	 'B11111000001111',
  	 '0000111000011X1',
  	 '000011100000111',
  	 '000000100110000',
  	 '000000111110000',
  	 '000000111110000',
  	 '000000011100000'], [[1,1],[2,1]])).toEqual(false);
    expect(isPositionValid([
     '00011111110000',
   	 '00011111110000',
   	 '11110000011100',
   	 '11100000001100',
   	 '11100000001100',
   	 '1B100111111111',
   	 '11100111111111',
   	 '000001X1001111',
   	 '00000111001111'], [[2,3],[3,3]])).toEqual(false);
  });
});

/*
describe('move', function() {
  // Tests for valid input!
  it('Returns error for improperly nested single arrays', function(){
    expect(move([1,2],'U')).toEqual('error: bad position');
  });
  it('Returns error for improperly nested double arrays', function() {
    expect(move([5,8],[4,8],'U')).toEqual('error: too many arguments');
  });
  it('Returns error for invalid direction', function() {
    expect(move([[2,2]],9)).toEqual('error: invalid direction');
  });
  // Tests for standing up!
  it('Moves up from standing', function() {
    expect(move([[2,2]],'U')).toEqual([[0,2],[1,2]]);
  });
  it('Moves down from standing', function() {
    expect(move([[3,6]],'D')).toEqual([[4,6],[5,6]]);
  });
  it('Moves left from standing', function() {
    expect(move([[0,9]],'L')).toEqual([[0,7],[0,8]]);
  });
  it('Moves right from standing', function() {
    expect(move([[4,4]],'R')).toEqual([[4,5],[4,6]]);
  });
  // Test for laying down!
  it('Moves up from laying horizontal', function() {
    expect(move([[8,0],[8,1]],'U')).toEqual([[7,0],[7,1]]);
  });
  it('Moves down from laying horizontal', function() {
    expect(move([[6,7],[6,8]],'D')).toEqual([[7,7],[7,8]]);
  });
  it('Moves left from laying horizontal', function() {
    expect(move([[10,3],[10,4]],'L')).toEqual([[10,2]]);
  });
  it('Moves right from laying horizontal', function() {
    expect(move([[7,1],[7,2]],'R')).toEqual([[7,3]]);
  });
  it('Moves up from laying vertical', function() {
    expect(move([[8,8],[9,8]],'U')).toEqual([[7,8]]);
  });
  it('Moves down from laying vertical', function() {
    expect(move([[6,1],[7,1]],'D')).toEqual([[8,1]]);
  });
  it('Moves left from laying vertical', function() {
    expect(move([[2,3],[3,3]],'L')).toEqual([[2,2],[3,2]]);
  });
  it('Moves right from laying vertical', function() {
    expect(move([[7,8],[8,8]],'R')).toEqual([[7,9],[8,9]]);
  });
});

describe('findPositionOnMap', function() {
  it('finds one-block player positions', function() {
    expect(findPositionOnMap([
     '1110000000',
  	 '1B11110000',
  	 '1111111110',
  	 '0111111111',
  	 '0000011X11',
  	 '0000001110'], 'B')).toEqual([[1,1]]);
    expect(findPositionOnMap([
     '00011111110000',
  	 '00011111110000',
  	 '11110000011100',
  	 '11100000001100',
  	 '11100000001100',
  	 '1B100111111111',
  	 '11100111111111',
  	 '000001X1001111',
  	 '00000111001111'], 'B')).toEqual([[5,1]]);
    expect(findPositionOnMap([
     '000001111110000',
  	 '000001001110000',
  	 '000001001111100',
  	 'B11111000001111',
  	 '0000111000011X1',
  	 '000011100000111',
  	 '000000100110000',
  	 '000000111110000',
  	 '000000111110000',
  	 '000000011100000'], 'B')).toEqual([[3,0]]);
    expect(findPositionOnMap([
     '000000111111100',
  	 '111100111001100',
  	 '111111111001111',
  	 '1111000000011XB',
  	 '111100000001111',
  	 '000000000000111'], 'B')).toEqual([[3,14]]);
  });
  it('finds exit positions', function() {
    expect(findPositionOnMap([
     '1110000000',
  	 '1B11110000',
  	 '1111111110',
  	 '0111111111',
  	 '0000011X11',
  	 '0000001110'], 'X')).toEqual([[4,7]]);
    expect(findPositionOnMap([
     '00011111110000',
  	 '000X1111110000',
  	 '11110000011100',
  	 '11100000001100',
  	 '11100000001100',
  	 '1B100111111111',
  	 '11100111111111',
  	 '00000111001111',
  	 '00000111001111'], 'X')).toEqual([[1,3]]);
    expect(findPositionOnMap([
     '000001111110000',
  	 '000001001110000',
  	 '000001001111100',
  	 'B11111000001111',
  	 '0000111000011X1',
  	 '000011100000111',
  	 '000000100110000',
  	 '000000111110000',
  	 '000000111110000',
  	 '000000011100000'], 'X')).toEqual([[4,13]]);
    expect(findPositionOnMap([
     '000000111111100',
  	 '111100111001100',
  	 '111111111001111',
  	 '1111000000011XB',
  	 '111100000001111',
  	 '000000000000111'], 'X')).toEqual([[3,13]]);
  });
  it('finds horizontal two-block player positions', function() {
    expect(findPositionOnMap([
     '1110000000',
  	 '1BB1110000',
  	 '1111111110',
  	 '0111111111',
  	 '0000011X11',
  	 '0000001110'], 'B')).toEqual([[1,1],[1,2]]);
     expect(findPositionOnMap([
      '1110000000',
   	  'BB1110000',
   	  '1111111110',
   	  '0111111111',
   	  '0000011X11',
   	  '0000001110'], 'B')).toEqual([[1,0],[1,1]]);
    expect(findPositionOnMap([
     '00011111110000',
  	 '000X1111110000',
  	 '11110000011100',
  	 '11100000001100',
  	 '11100000001100',
  	 '11100111111111',
  	 '111001BB111111',
  	 '00000111001111',
  	 '00000111001111'], 'B')).toEqual([[6,6],[6,7]]);
  });
  it('finds vertical two-block player positions', function() {
    expect(findPositionOnMap([
     '000001111110000',
  	 '000001001110000',
  	 '000001001111100',
  	 'B11111000001111',
  	 'B000111000011X1',
  	 '000011100000111',
  	 '000000100110000',
  	 '000000111110000',
  	 '000000111110000',
  	 '000000011100000'], 'B')).toEqual([[3,0],[4,0]]);
    expect(findPositionOnMap([
     '000000111111100',
  	 '111100111001100',
  	 '111111111001111',
  	 '1111000000011X0',
  	 '11110000000111B',
  	 '00000000000011B'], 'B')).toEqual([[4,14],[5,14]]);
  });
});
*/
/*
describe('bloxorz -- final tests', function() {
  it('Passes test 1', function() {
    expect(bloxorz(['1110000000',
  	 '1B11110000',
  	 '1111111110',
  	 '0111111111',
  	 '0000011X11',
  	 '0000001110'])).toEqual('RRDRRRD');
  });
  it('Passes test 2', function() {
    expect(bloxorz(['000000111111100',
  	 '111100111001100',
  	 '111111111001111',
  	 '1B11000000011X1',
  	 '111100000001111',
  	 '000000000000111'])).toEqual('ULDRURRRRUURRRDDDRU');
  });
  it('Passes test 3', function() {
    expect(bloxorz(['00011111110000',
  	 '00011111110000',
  	 '11110000011100',
  	 '11100000001100',
  	 '11100000001100',
  	 '1B100111111111',
  	 '11100111111111',
  	 '000001X1001111',
  	 '00000111001111'])).toEqual('ULURRURRRRRRDRDDDDDRULLLLLLD');
  });
  it('Passes test 4', function() {
    expect(bloxorz(['11111100000',
  	 '1B111100000',
  	 '11110111100',
  	 '11100111110',
  	 '10000001111',
  	 '11110000111',
  	 '11110000111',
  	 '00110111111',
  	 '01111111111',
  	 '0110011X100',
  	 '01100011100'])).toEqual('DRURURDDRRDDDLD');
  });
  it('Passes test 5', function() {
    expect(bloxorz(['000001111110000',
  	 '000001001110000',
  	 '000001001111100',
  	 'B11111000001111',
  	 '0000111000011X1',
  	 '000011100000111',
  	 '000000100110000',
  	 '000000111110000',
  	 '000000111110000',
  	 '000000011100000'])).toEqual('RRRDRDDRDDRULLLUULUUURRRDDLURRDRDDR');
  });
});
*/
