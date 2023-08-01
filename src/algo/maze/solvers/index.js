import { dijkstra } from "./dijkstra";
import { recursiveBacktracker } from "./recursive-backtracker";

const mazeSolvers = new Map([
  ['dijkstra', dijkstra],
  ['backtracker', recursiveBacktracker]
])

export default mazeSolvers;