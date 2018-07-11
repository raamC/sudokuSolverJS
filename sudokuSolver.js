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
let grids = [];
grids.push([initialGrid]);

while (!grids[grids.length - 1][0].isComplete()) {
    // while 1st child of final generation is not complete

    if (grids[grids.length - 1].length == 1) {
        // if there is only 1 child in the generation
        
        const children = generateValidChildren(grids[grids.length - 1][0]);

        if (children.length === 0) {
            // if that child has no valid children of it's own, delete the generation
            // and delete and any ancestors that have no siblings
            console.log('a')

            console.log(grids[grids.length-1][0])
            grids.pop()
            console.log(grids[grids.length-1][0])
            grids[grids.length - 1].shift()
            console.log(grids[grids.length-1][0])
            
        
        } else {
            // if there are valid children, create a new generation
            console.log('b')
            grids.push(children);
        }
    }
    
    else {
        // if there are multiple children in a generation
        // take the first child
        const children = generateValidChildren(grids[grids.length-1][0])
        if(children.length >0) {
            console.log('c')
            // if that child has valid children, create a new generation
            
            grids.push(children);
        } else {
            console.log('d')
            // otherwise delete it from the generation
            grids[grids.length - 1].shift();
        }
    }

    console.log(`Number of generations: ${grids.length}`)
    console.log(`Number of grids in each generation: ${grids.map(gen => gen.length)}`)
    console.log(`Grid IDs in each generation: ${grids.map(gen => gen.map(grid => grid.gridId))} \n`)
}


// helper methods

function generateValidChildren(parentGrid) {
    const nextCell = parentGrid.findNextUnsolvedCell();
    const options = parentGrid.getOptionsForCell(nextCell.row, nextCell.column)
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