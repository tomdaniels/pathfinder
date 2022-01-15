import nodeStyles from "../../styles/Node.module.css";

const MAZE_COMPLEXITY = 2;

function skewedMaze(
  grid,
  rowStart,
  rowEnd,
  colStart,
  colEnd,
  skew = "horizontal",
  surroundingWalls
) {
  if (rowEnd < rowStart || colEnd < colStart) {
    return;
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
          setTimeout(() => {
            let currentHTMLNode = document.getElementById(`node-${r}-${c}`);
            currentHTMLNode.className = `${nodeStyles.node} ${nodeStyles.nodeWall}`;
            cell.isWall = true;
          }, 145 * idx);
        }
      });
    });
    surroundingWalls = true;
  }
  if (skew === "horizontal") {
    let possibleRows = [];
    for (let number = rowStart; number <= rowEnd; number += MAZE_COMPLEXITY) {
      possibleRows.push(number);
    }
    let possibleCols = [];
    for (
      let number = colStart - 1;
      number <= colEnd + 1;
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
            setTimeout(() => {
              let currentHTMLNode = document.getElementById(`node-${r}-${c}`);
              currentHTMLNode.className = `${nodeStyles.node} ${nodeStyles.nodeWall}`;
              cell.isWall = true;
            }, (20 + rowEnd) * idx * 3);
          }
        }
      });
    });
    if (currentRow - 2 - rowStart > colEnd - colStart) {
      skewedMaze(
        grid,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        "horizontal",
        surroundingWalls
      );
    } else {
      skewedMaze(
        grid,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        skew === "vertical" ? "vetical" : "horizontal",
        surroundingWalls
      );
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      skewedMaze(
        grid,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        skew === "vertical" ? "vertical" : "horizontal",
        surroundingWalls
      );
    } else {
      skewedMaze(
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
      number <= rowEnd + 1;
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
          setTimeout(() => {
            if (!cell.isStart && !cell.isFinish) {
              let currentHTMLNode = document.getElementById(`node-${r}-${c}`);
              currentHTMLNode.className = `${nodeStyles.node} ${nodeStyles.nodeWall}`;
              cell.isWall = true;
            }
          }, (100 + colEnd) * idx * 3);
        }
      });
    });
    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      skewedMaze(
        grid,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        "horizontal",
        surroundingWalls
      );
    } else {
      skewedMaze(
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
      skewedMaze(
        grid,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        skew === "vertical" ? "vertical" : "horizontal",
        surroundingWalls
      );
    } else {
      skewedMaze(
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
}

export default skewedMaze;
