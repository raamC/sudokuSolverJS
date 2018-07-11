const Grid = require('./grid');
const fs = require('fs');

// input grid is considered as grid 0
const input = readInputFile('./1.txt');
const isOptimized = false;

// initial grid is grid 1, with the input grid as a parent
let gridIdCounter = 1;
const initialGrid = new Grid(input, gridIdCounter, 0);
gridIdCounter++;
console.log(`Initial score: ${initialGrid.calculateCompleteness()}%`);
if (isOptimized) {
    initialGrid.updateGridWithoutBranching();
}
initialGrid.findNextUnsolvedCell();

// list of all grids
const grids = [];
grids.push([initialGrid]);

let latestGeneration = grids[grids.length - 1];
while (latestGeneration.length != 1 || !latestGeneration[0].isComplete()) {
    
    if (latestGeneration.length == 1) {
        grids.push(generateValidChildren(latestGeneration[0]));

        // and has valid children then create them and carry on
        // if no valid children, delete it and it's parent
    } else {
        const parentGrid = latestGeneration[0];
        const children = generateValidChildren(parentGrid)

        if (children.length > 0) {
            grids.push(children)
        } else {
            grids[grids.length - 1] = latestGeneration.filter(g => g.gridId != parentGrid.gridId);

            // remove a grid from generation if you have tried but were unable to create successful children
            // if this is the lasst grid of that generation and it doesn't have valid children, 
            // then you also need to removve it's parent
        }
        latestGeneration = grids[grids.length - 1];
    }
}

console.log(initialGrid.gridArray);
console.log(latestGeneration[0].gridArray);
console.log('Grid complete');



// console.log(grids)









// helper methods

function generateValidChildren(parentGrid) {
    const nextCell = parentGrid.findNextUnsolvedCell();
    const options = parentGrid.getOptionsForCell(nextCell.row, nextCell.column);
    const children = [];
    for (let i = 0; i < options.length; i++) {
        const childGrid = new Grid(parentGrid.gridArray, gridIdCounter, parentGrid.gridId)
        childGrid.updateCell(nextCell.row, nextCell.column, options[i]);

        if (childGrid.isValid()) {
            if (isOptimized) {
                childGrid.updateGridWithoutBranching();
            }
            children.push(childGrid);
            gridIdCounter++;
        }
    }
    return children;
}

function readInputFile(filepath) {
    return fs.readFileSync(filepath).toString('utf8').split(' \n').map(r => r.split(' ').map(c => parseInt(c)));
}
