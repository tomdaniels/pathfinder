/**
 * generate two dimensional array (aka "grid")
 * @param {*} rowL number of rows
 * @param {*} colL number of cols
 * @param {*} cb callback to execute on each cell
 * @returns 2D array colL x rowL
 */
function generateGrid(rowL, colL, cb) {
  const cells = [];
  for (let row = 0; row < rowL; row++) {
    const currentRow = [];
    for (let col = 0; col < colL; col++) {
      const currentNode = cb({ col, row });
      currentRow.push(currentNode);
    }
    cells.push(currentRow);
  }
  return cells;
}

export default generateGrid;
