const Grid = require('./grid');
const fs = require('fs');

// input grid is considered as grid 0
const input = readInputFile('./1.txt');

// initial grid is grid 1, with the input grid as a parent
let gridIdCounter = 1;
const initialGrid = new Grid(input, gridIdCounter, 0, 0, false);
gridIdCounter++;
console.log(`Initial score: ${initialGrid.calculateCompleteness()}%`);
initialGrid.updateGridWithoutBranching();
initialGrid.findNextUnsolvedCell();


// list of all grids
const grids = [];
grids.push(initialGrid);
let currentGeneration = initialGrid.generation;
console.log(`Gen 0 score: ${initialGrid.calculateCompleteness()}%`);

if(!initialGrid.isComplete()) {
    generateValidChildren(initialGrid)
}

console.log(currentGeneration)

// console.log(grids)



















// helper methods

function generateValidChildren(parentGrid) {
    const nextCell = parentGrid.nextUnsolvedCell;
    const options = parentGrid.getOptionsForCell(nextCell.row, nextCell.column);
    currentGeneration = parentGrid.generation + 1;

    for (let i = 0; i < options.length; i++) {
        const childGrid = new Grid(parentGrid.gridArray, gridIdCounter, parentGrid.gridId, currentGeneration, true)
        childGrid.updateCell(nextCell.row, nextCell.column, options[i]);

        if (childGrid.isValid()) {
            childGrid.updateGridWithoutBranching();
            childGrid.findNextUnsolvedCell();
            grids.push(childGrid);
            gridIdCounter++;
        }
    }
}

// grids.filter(g => g.gridId === 1) 

function readInputFile(filepath) {
    return fs.readFileSync(filepath).toString('utf8').split(' \n').map(r => r.split(' ').map(c => parseInt(c)));
}
