import { useEffect, useState } from "react";
import Visualiser from "../components/visualiser";

import styles from "../styles/Grid.module.css";

const START_NODE_COL = 10;
const START_NODE_ROW = 15;
const FINISH_NODE_ROW = 10;

export default function PathFinder() {
  const [initialising, setInitialising] = useState(true);
  const [landmarks, setLandMarks] = useState({
    gridWidth: 0,
    gridHeight: 0,
    finishCol: 0,
    finishRow: 0,
    startCol: 0,
    startRow: 0,
  });

  useEffect(() => {
    setInitialising(true);
    // build grid with start&finish node using screen size
    const GRID_COL_LENGTH = Math.floor(window.innerWidth / 22);
    const GRID_ROW_LENGTH = Math.floor(window.innerHeight / 30);

    const FINISH_NODE_COL =
      GRID_COL_LENGTH < 20 ? 2 : Math.floor(GRID_COL_LENGTH - 10);

    setLandMarks({
      gridWidth: GRID_COL_LENGTH,
      gridHeight: GRID_ROW_LENGTH,
      finishCol: FINISH_NODE_COL,
      finishRow: FINISH_NODE_ROW,
      startCol: START_NODE_COL,
      startRow: START_NODE_ROW,
    });

    setInitialising(false);
  }, []);

  return (
    <div className={styles.container}>
      {!initialising && <Visualiser landmarks={landmarks} />}
    </div>
  );
}
