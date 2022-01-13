/**
 * Toggle the isWall property on a given cell within a grid
 * @param {*} grid original grid to clone
 * @param {*} row row position to update
 * @param {*} col col position to update
 * @returns copy of the grid with new walls
 */
function addWalls(grid, row, col) {
  const _grid = grid.slice();
  console.log(_grid);
  const node = _grid[row][col];
  const _node = {
    ...node,
    isWall: !node.isWall,
  };

  _grid[row][col] = _node;
  return _grid;
}

export default addWalls;
