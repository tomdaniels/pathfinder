const MAZE_COMPLEXITY = 2;

const wallsToAnimate = [];
function recursiveDivisionMaze(
  grid,
  rowStart,
  rowEnd,
  colStart,
  colEnd,
  orientation = "vertical",
  surroundingWalls
) {
  if (rowEnd < rowStart || colEnd < colStart) {
    return wallsToAnimate;
  }
  if (!surroundingWalls) {
    grid.forEach((row) => {
      row.forEach((cell, idx) => {
        const { row: r, col: c } = cell;
        if (
          r === 0 ||
          c === 0 ||
          r === grid.length - 1 ||
          c === row.length - 1
        ) {
          wallsToAnimate.push(cell);
        }
      });
    });
    surroundingWalls = true;
  }
  if (orientation === "horizontal") {
    let possibleRows = [];
    for (
      let number = rowStart;
      number <= rowEnd - 2;
      number += MAZE_COMPLEXITY
    ) {
      possibleRows.push(number);
    }
    let possibleCols = [];
    for (
      let number = colStart - 1;
      number <= colEnd;
      number += MAZE_COMPLEXITY
    ) {
      possibleCols.push(number);
    }
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];
    grid.forEach((row) => {
      row.forEach((cell, idx) => {
        const { row: r, col: c } = cell;

        if (
          r === currentRow &&
          c !== colRandom &&
          c >= colStart - 1 &&
          c <= colEnd + 1
        ) {
          if (!cell.isStart && !cell.isFinish) {
            wallsToAnimate.push(cell);
          }
        }
      });
    });
    if (currentRow - 2 - rowStart > colEnd - colStart) {
      recursiveDivisionMaze(
        grid,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        "vertical",
        surroundingWalls
      );
    } else {
      recursiveDivisionMaze(
        grid,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        "vertical",
        surroundingWalls
      );
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      recursiveDivisionMaze(
        grid,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        "vertical",
        surroundingWalls
      );
    } else {
      recursiveDivisionMaze(
        grid,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        "vertical",
        surroundingWalls
      );
    }
  } else {
    let possibleCols = [];
    for (let number = colStart; number <= colEnd; number += MAZE_COMPLEXITY) {
      possibleCols.push(number);
    }
    let possibleRows = [];
    for (
      let number = rowStart - 1;
      number <= rowEnd;
      number += MAZE_COMPLEXITY
    ) {
      possibleRows.push(number);
    }
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let currentCol = possibleCols[randomColIndex];
    let rowRandom = possibleRows[randomRowIndex];
    grid.forEach((row, idx) => {
      row.forEach((cell) => {
        const { row: r, col: c } = cell;
        if (
          c === currentCol &&
          r !== rowRandom &&
          r >= rowStart - 1 &&
          r <= rowEnd + 1
        ) {
          if (!cell.isStart && !cell.isFinish) {
            wallsToAnimate.push(cell);
          }
        }
      });
    });

    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      recursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        "horizontal",
        surroundingWalls
      );
    } else {
      recursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        "vertical",
        surroundingWalls
      );
    }
    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      recursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        "horizontal",
        surroundingWalls
      );
    } else {
      recursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        "vertical",
        surroundingWalls
      );
    }
  }
  return wallsToAnimate;
}

export default recursiveDivisionMaze;
