const Grid = require('./grid');


var fs = require('fs');



function readInputFile(filepath) {
    return fs.readFileSync(filepath).toString('utf8').split(' \n').map(r => r.split(' ').map(c => parseInt(c)));
}





// input grid is considered as grid 0
// const input =
//     [[0, 4, 0, 0, 0, 0, 1, 7, 9],
//     [0, 0, 2, 0, 0, 8, 0, 5, 4],
//     [0, 0, 6, 0, 0, 5, 0, 0, 8],
//     [0, 8, 0, 0, 7, 0, 9, 1, 0],
//     [0, 5, 0, 0, 9, 0, 0, 3, 0],
//     [0, 1, 9, 0, 6, 0, 0, 4, 0],
//     [3, 0, 0, 4, 0, 0, 7, 0, 0],
//     [5, 7, 0, 1, 0, 0, 2, 0, 0],
//     [9, 2, 8, 0, 0, 0, 0, 6, 0]];

const input = readInputFile('./sudoku1.txt');


let gridCounter = 1;
const grids = [];

const initialGrid = new Grid(input, gridCounter, 0);
grids.push(initialGrid);
const initialCompleteness = initialGrid.calculateCompleteness();
console.log(initialCompleteness);


while(!initialGrid.isComplete()) {
    initialGrid.updateGridWithoutBranching();
}

console.log(initialGrid.gridArray)
console.log(initialGrid.calculateCompleteness())
console.log(initialGrid.isValid())




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