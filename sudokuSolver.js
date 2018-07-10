const Grid = require('./grid');
const fs = require('fs');

// input grid is considered as grid 0
const input = readInputFile('./medium.txt');

// initial grid is grid 1, with the input grid as a parent
let gridIdCounter = 1;
const initialGrid = new Grid(input, gridIdCounter, 0);
console.log(`Initial score: ${initialGrid.calculateCompleteness()}%`);

// list of all grids
const grids = [];
grids.push(initialGrid);

let currentGridId = 1;

initialGrid.updateGridWithoutBranching();
console.log(initialCompleteness);

generateValidChildren(initialGrid)
console.log(grids)



// set up a grid class
// to hold a snapshot in time
// it potentially has a parent and children. This helps to move up and down branches in the tree
// it has methods on it to determine if it is valid and complete

// helper methods

function generateValidChildren(parentGrid) {
    const nextCell = parentGrid.nextUnsolvedCell;
    const options = parentGrid.getOptionsForCell(nextCell.row, nextCell.column);
    
    for (let i = 0; i < options.length; i++) {
        const childGrid = new Grid(parentGrid.gridArray, gridIdCounter, parentGrid.gridId)
        childGrid.updateCell(nextCell.row, nextCell.column, options[i]);
        if (childGrid.isValid()) {
            grids.push(childGrid);
            gridIdCounter++;
        }
    }
}

// grids.filter(g => g.gridId === 1) 

function readInputFile(filepath) {
    return fs.readFileSync(filepath).toString('utf8').split(' \n').map(r => r.split(' ').map(c => parseInt(c)));
}
