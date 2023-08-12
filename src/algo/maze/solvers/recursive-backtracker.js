export function recursiveBacktracker(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];

  function solveMaze(currentNode, nodesInShortestPathOrder = []) {
    if (currentNode === finishNode) {
      return { visitedNodesInOrder, nodesInShortestPathOrder };
    }

    if (currentNode.isWall) {
      return null;
    }

    if (!currentNode.isWall) currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    const neighbors = getUnvisitedNeighbors(currentNode, grid);
    shuffle(neighbors);

    for (const neighbor of neighbors) {
      const result = solveMaze(neighbor, [
        ...nodesInShortestPathOrder,
        neighbor,
      ]);

      if (result !== null) {
        return result;
      }
    }

    return null;
  }

  return solveMaze(startNode, [startNode]);
}

// Helper functions...
function getUnvisitedNeighbors(cell, grid) {
  let neighbors = [];
  let { row, col } = cell;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0]?.length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter(
    (neighbor) => !neighbor.isVisited && !neighbor.isWall
  );
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
