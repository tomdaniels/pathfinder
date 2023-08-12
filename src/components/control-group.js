import styles from "../styles/ButtonGroup.module.css";

export default function ControlGroup({
  generateMaze,
  visualiseAlgo,
  locked,
  clear,

  children,
}) {
  return (
    <div className={styles.container}>
      <button
        disabled={locked}
        onClick={() => generateMaze("recursive-division")}
      >
        Generate a maze
      </button>
      <button disabled={locked} onClick={() => clear()}>
        Clear
      </button>
      <button disabled={locked} onClick={() => visualiseAlgo("dfs")}>
        Solve using DFS
      </button>
      <button disabled={locked} onClick={() => visualiseAlgo("dijkstra")}>
        Solve using Dijkstra
      </button>
      <button disabled={locked} onClick={() => visualiseAlgo("backtracker")}>
        Solve using recursive backtracking
      </button>
    </div>
  );
}
