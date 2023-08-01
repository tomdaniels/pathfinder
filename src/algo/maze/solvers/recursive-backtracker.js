export function recursiveBacktracker(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  
  // Define the recursive function
  function solveMaze(currentNode, nodesInShortestPathOrder = []) {
    // Base case: If the current node is the finish node, return the visited nodes in order
    if (currentNode === finishNode) {
      return { visitedNodesInOrder, nodesInShortestPathOrder };
    }

    if (currentNode.isWall) {
      return null; // Skip if the current node is a wall
    }
    
    // Mark the current node as visited and add it to the visited nodes in order
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);
    
    // Get the neighbors of the current node
    const neighbors = getUnvisitedNeighbors(currentNode, grid);
    shuffle(neighbors); // Shuffle the neighbors randomly
    
    // For each neighbor, continue the recursive process
    for (const neighbor of neighbors) {
      const result = solveMaze(neighbor, [...nodesInShortestPathOrder, neighbor]); // Recursive call
      
      // If the recursive call returns a result, return it to propagate up the call stack
      if (result !== null) {
        return result;
      }
    }
    
    // Backtrack: return null if none of the neighbors lead to a solution
    return null;
  }
  
  // Start solving the maze from the start node
  return solveMaze(startNode, [startNode]);
  
}

// Helper functions...
function getUnvisitedNeighbors(cell, grid) {
  let neighbors = [];
  let {row, col} = cell;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0]?.length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

