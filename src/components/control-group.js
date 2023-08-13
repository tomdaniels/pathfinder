import { useState } from "react";
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
  const [showInfo, setShowInfo] = useState("");

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
          <button
            disabled={!activeMaze || locked || isSolved}
            onClick={() => clear()}
          >
            Clear
          </button>
        </div>
      </div>

      {children}

      <div className={styles["solver-controls"]}>
        <div
          onMouseEnter={() => setShowInfo("dijkstra")}
          onMouseLeave={() => setShowInfo("")}
        >
          <button
            disabled={locked || isSolved}
            onClick={() => visualiseAlgo("dijkstra")}
          >
            Solve using Dijkstra
          </button>
          {showInfo === "dijkstra" && (
            <>
              <p>The shortest path is guaranteed with this solution.</p>
              <p>
                Dijkstra&apos;s algorithm will search every available node in
                each possible direction until it reaches the target node.
              </p>
            </>
          )}
        </div>
        <div
          onMouseEnter={() => setShowInfo("dijkstra")}
          onMouseLeave={() => setShowInfo("")}
        >
          <button
            disabled={locked || isSolved}
            onMouseEnter={() => setShowInfo("backtracker")}
            onClick={() => visualiseAlgo("backtracker")}
          >
            Solve using recursive backtracking
          </button>
          {showInfo === "backtracker" && (
            <>
              <p>The shortest path is not guaranteed with this solution.</p>
              <p>
                Recursive backtracking is a Depth First Search algorithm, which
                randomly selects a path to exhaust until it traps it self. At
                which point, it &quot;backtracks&quot; to the last branch with
                another possible solution and repeats until the maze is solved.
              </p>
              <p>
                Due to this random nature, the speed can vary drastically and
                results may be inconsisten
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
