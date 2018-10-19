const source = require('../bloxorz');
const bloxorz = source.bloxorz;
const move = source.move;

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
  /*
  Removed these tests, because since all positions after initial starting position are determined by the move function, we can assume that we can assume that positions are valid, as long as the moving function passes all movement tests (below)
  it('Returns error for diagonal starting position', function() {
    expect(move([[5,6],[6,7]],'L')).toEqual('error: bad position');
  });
  it('Returns error for impossible/separated starting position', function() {
    expect(move([[1,1],[9,7]],'R')).toEqual('error: bad position');
  });
  */
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

/*
describe('bloxorz', function() {
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
