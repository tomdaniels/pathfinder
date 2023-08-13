import styles from "../styles/ButtonGroup.module.css";

export default function ControlGroup({
  generateMaze,
  visualiseAlgo,
  activeMaze,
  isSolved,
  locked,
  clear,

  children,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles["header-text"]}>
          <h1>Pathfinder</h1>
          <p>A maze generator and solver playground</p>
        </div>
        <div className={styles["header-controls"]}>
          <button
            disabled={locked || activeMaze}
            onClick={() => generateMaze("recursive-division")}
          >
            Generate a maze
          </button>
          <button disabled={locked} onClick={() => clear()}>
            Clear
          </button>
        </div>
      </div>

      {children}

      <div className={styles["solver-controls"]}>
        <button
          disabled={locked || isSolved}
          onClick={() => visualiseAlgo("dijkstra")}
        >
          Solve using Dijkstra
        </button>
        <button
          disabled={locked || isSolved}
          onClick={() => visualiseAlgo("backtracker")}
        >
          Solve using recursive backtracking
        </button>
      </div>
    </div>
  );
}
