function recursiveDivisionMaze(...args) {
  let wallsToAnimate = [];

  function mazeGenerator(
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
      for (let number = rowStart; number <= rowEnd - 2; number += 2) {
        possibleRows.push(number);
      }
      let possibleCols = [];
      for (let number = colStart - 1; number <= colEnd; number += 2) {
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
        mazeGenerator(
          grid,
          rowStart,
          currentRow - 2,
          colStart,
          colEnd,
          "vertical",
          surroundingWalls
        );
      } else {
        mazeGenerator(
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
        mazeGenerator(
          grid,
          currentRow + 2,
          rowEnd,
          colStart,
          colEnd,
          "vertical",
          surroundingWalls
        );
      } else {
        mazeGenerator(
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
      for (let number = colStart; number <= colEnd; number += 2) {
        possibleCols.push(number);
      }
      let possibleRows = [];
      for (let number = rowStart - 1; number <= rowEnd; number += 2) {
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
        mazeGenerator(
          grid,
          rowStart,
          rowEnd,
          colStart,
          currentCol - 2,
          "horizontal",
          surroundingWalls
        );
      } else {
        mazeGenerator(
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
        mazeGenerator(
          grid,
          rowStart,
          rowEnd,
          currentCol + 2,
          colEnd,
          "horizontal",
          surroundingWalls
        );
      } else {
        mazeGenerator(
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
  return mazeGenerator(...args);
}

export default recursiveDivisionMaze;
