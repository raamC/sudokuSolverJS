const Grid = require('./grid');
const fs = require('fs');

function readInputFile(filepath) {
    return fs.readFileSync(filepath).toString('utf8').split(' \n').map(r => r.split(' ').map(c => parseInt(c)));
}

// input grid is considered as grid 0
const input = readInputFile('./hard.txt');

// initial grid is grid 1, with the input grid as a parent
let gridCounter = 1;
const initialGrid = new Grid(input, gridCounter, 0);
const initialCompleteness = initialGrid.calculateCompleteness();
console.log(initialCompleteness);

// list of all grids
const grids = [];
grids.push(initialGrid);

initialGrid.updateGridWithoutBranching();
console.log(initialGrid.calculateCompleteness())



// const nextCell = initialGrid.findNextUnsolvedCell();
// const options = initialGrid.getOptionsForCell(nextCell.row, nextCell.column);
// console.log(options);

// for (let i = 0; i < options.length; i++) {
//     const childGrid = new Grid(initialGrid.gridArray, gridCounter, 1)
//     childGrid.updateCell(nextCell.row, nextCell.column,options[i]);
//     console.log(childGrid.isValid())
//     grids.push(childGrid);
//     gridCounter++;

// }



// set up a grid class
// to hold a snapshot in time
// it potentially has a parent and children. This helps to move up and down branches in the tree
// it has methods on it to determine if it is valid and complete