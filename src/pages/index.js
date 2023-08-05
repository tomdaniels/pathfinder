import { useEffect, useState } from "react";
import Visualiser from "../components";

import { randomNumberBetween } from "../utils";

import styles from "../styles/Grid.module.css";

export default function PathFinder() {
  const [initialising, setInitialising] = useState(true);
  const [cnfg, setGridCnfg] = useState({
    gridWidth: 0,
    gridHeight: 0,
    finishCol: 0,
    finishRow: 0,
    startCol: 0,
    startRow: 0,
  });

  useEffect(() => {
    const GRID_COL_LENGTH = Math.floor(window.innerWidth / 22);
    const GRID_ROW_LENGTH = Math.floor(window.innerHeight / 30);

    setGridCnfg({
      gridWidth: GRID_COL_LENGTH,
      gridHeight: GRID_ROW_LENGTH,
      finishCol: randomNumberBetween(
        GRID_COL_LENGTH - GRID_COL_LENGTH / 4,
        GRID_COL_LENGTH - 2
      ),
      finishRow: randomNumberBetween(GRID_ROW_LENGTH / 4, GRID_ROW_LENGTH - 2),
      startCol: randomNumberBetween(4, GRID_COL_LENGTH / 8),
      startRow: randomNumberBetween(4, GRID_ROW_LENGTH - 2),
    });

    setInitialising(false);
  }, []);

  return (
    <div className={styles.container}>
      {!initialising && <Visualiser gridCnfg={cnfg} />}
    </div>
  );
}
