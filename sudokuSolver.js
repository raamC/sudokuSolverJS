const Grid = require('./grid');
const fs = require('fs');

const grids = depthFirstSearch('./1.txt', false);

const initialGrid = grids[0][0]
const finalGrid = grids[grids.length - 1][0]

console.log(`Initial Array: ${initialGrid.calculateCompleteness()}% \n`);
console.log(initialGrid.gridArray)
console.log(`\nFinal Array: ${finalGrid.calculateCompleteness()}% \n`);
console.log(finalGrid.gridArray)

console.log(`\nNo. of generations: ${grids.length}`)
console.log(`No of grids created: ${finalGrid.gridId}`)




// helper methods
function depthFirstSearch(filepath, isOptimized) {

    const input = readInputFile(filepath);
    let gridIdCounter = 1;
    const initialGrid = new Grid(input, gridIdCounter, 0);
    gridIdCounter++;
    let grids = [];

    if (isOptimized) {
        initialGrid.updateGridWithoutBranching();
    }
    initialGrid.findNextUnsolvedCell();
    grids.push([initialGrid]);

    while (!grids[grids.length - 1][0].isComplete()) {
        // while 1st child of final generation is not complete

        if (grids[grids.length - 1].length == 1) {
            // if there is only 1 child in the generation
            const children = generateValidChildren(grids[grids.length - 1][0], gridIdCounter, isOptimized);

            if (children.length === 0) {
                // if that child has no valid children of it's own, delete the generation and delete and any ancestors 
                pruneToBranchPoint(grids)
            } else {
                // if there are valid children, create a new generation
                grids.push(children);
            }
        }

        else {
            // if there are multiple children in a generation, take the first child
            const children = generateValidChildren(grids[grids.length - 1][0], gridIdCounter, isOptimized)
            if (children.length > 0) {
                // if that child has valid children, create a new generation
                grids.push(children);
            } else {
                // otherwise delete it from the generation
                grids[grids.length - 1].shift();
            }
        }
    }
    return grids;
}

function generateValidChildren(parentGrid, gridIdCounter, isOptimized) {
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

function pruneToBranchPoint(grids) {
    let lastGridToBePruned;
    while (grids[grids.length - 1].length === 1) {
        lastGridToBePruned = grids[grids.length - 1][0]
        grids.pop()
    }
    const parentId = lastGridToBePruned.parentId;
    grids[grids.length - 1] = grids[grids.length - 1].filter(g => g.gridId != parentId)
}

function readInputFile(filepath) {
    return fs.readFileSync(filepath).toString('utf8').split(' \n').map(r => r.split(' ').map(c => parseInt(c)));
}
