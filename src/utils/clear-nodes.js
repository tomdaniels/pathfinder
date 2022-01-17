/**
 * Clear all properties each node of a grid (excluding start&finish nodes)
 * @param {*} grid original grid to clone
 * @returns copy of the grid with new walls
 */
function clearNodes(grid) {
  const _grid = grid.slice();

  for (let row of grid) {
    for (let cell of row) {
      const node = {
        ...cell,
        previousNode: null,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        isMaze: false,
      };
      _grid[cell.row][cell.col] = node;
    }
  }

  return _grid;
}

export default clearNodes;
