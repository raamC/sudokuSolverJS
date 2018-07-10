class Grid {
    constructor(gridArray, gridId, parent) {
        this.gridArray = gridArray;
        this.gridId = gridId;
        this.parent = parent;
    }

    getColumns() {
        const columns = [];
        for (let c = 0; c < 9; c++) {
            const col = [];
            for (let r = 0; r < 9; r++) {
                col.push(this.gridArray[r][c]);
            }
            columns.push(col);
        }
        return columns;
    }

    getRows() {
        return this.gridArray;
    }

    getBoxes() {
        const boxes = [];
        for (let r = 0; r < 9; r += 3) {
            for (let c = 0; c < 9; c += 3) {
                boxes.push(this.getBox(r, c));
            }
        }
        return boxes;
    };

    getBox(topLeftElementRow, topLeftElementCol) {
        const box = [];
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                box.push(this.gridArray[topLeftElementRow + r][topLeftElementCol + c]);
            }
        }
        return box;
    }

    isValid() {
        let isValid = true;

        this.getRows().map(r => { if (!this.isSetValid(r)) { isValid = false } })
        this.getColumns().map(c => { if (!this.isSetValid(c)) { isValid = false } })
        this.getBoxes().map(b => { if (!this.isSetValid(b)) { isValid = false } })

        return isValid;
    }

    isComplete() {
        let isComplete = true;

        this.getRows().map(r => { if (!this.isSetComplete(r)) { isComplete = false } })
        this.getColumns().map(c => { if (!this.isSetComplete(c)) { isComplete = false } })
        this.getBoxes().map(b => { if (!this.isSetComplete(b)) { isComplete = false } })

        return isComplete;
    }

    isSetValid(set) {
        let isValid = true;
        for (let i = 1; i < 9; i++) {
            const indices = [];
            let index = set.indexOf(i);
            while (index != -1) {
                indices.push(index);
                index = set.indexOf(i, index + 1);
            }
            if (indices.length > 1) {
                isValid = false;
            }
        }
        return isValid;
    }

    isSetComplete(set) {
        let isComplete = true;
        for (let i = 1; i < 9; i++) {
            if (!set.includes(i)) {
                isComplete = false;
            }
        }
        return isComplete;
    }

    findNextUnsolvedCell() {
        let rowIndex = 0;
        while (this.gridArray[rowIndex].indexOf(0) == -1) {
            rowIndex++;
            if (rowIndex == 9) {
                return null;
            }
        }
        return { row: rowIndex, column: this.gridArray[rowIndex].indexOf(0) }
    }

    getOptionsForSet(set) {
        const options = [];
        for (let i = 1; i < 10; i++) {
            if (!set.includes(i)) {
                options.push(i);
            }
        }
        return options;
    }

    getBoxFromCell(r, c) {
        return this.getBox(Math.floor(r / 3) * 3, Math.floor(c / 3) * 3);
    }

    getOptionsForCell(r, c) {
        const rowOptions = this.getOptionsForSet(this.getRows()[r]);
        const columnOptions = this.getOptionsForSet(this.getColumns()[c]);
        const boxOptions = this.getOptionsForSet(this.getBoxFromCell(r, c));

        const cellOptions = [];
        for (let i = 1; i < 10; i++) {
            if (rowOptions.indexOf(i) != -1 && columnOptions.indexOf(i) != -1 && boxOptions.indexOf(i) != -1) {
                cellOptions.push(i)
            }
        }
        return cellOptions;
    }

    updateCellWithoutBranching(r, c) {
        const options = this.getOptionsForCell(r, c);
        if (this.gridArray[r][c] == 0 && options.length == 1) {
            this.updateCell(r, c, options[0])
        }
    }

    updateGridOnceWithoutBranching() {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                this.updateCellWithoutBranching(r, c);
            }
        }
    }

    updateGridWithoutBranching() {
        let previousScore = this.calculateCompleteness();
        this.updateGridOnceWithoutBranching();
        let currentScore = this.calculateCompleteness();

        while(previousScore != currentScore) {
            previousScore = currentScore;
            this.updateGridWithoutBranching();
            currentScore = this.calculateCompleteness();
        }
    }

    updateCell(r, c, value) {
        this.gridArray[r][c] = value;
    }

    calculateCompleteness() {
        let numberOfZeros = 0;
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (this.gridArray[r][c] == 0) {
                    numberOfZeros++;
                }
            }
        }
        return (100 * (81 - numberOfZeros) / 81).toFixed(2)
    }
}

module.exports = Grid;

