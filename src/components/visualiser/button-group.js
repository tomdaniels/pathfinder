import Button from "@leafygreen-ui/button";

import styles from "../../styles/ButtonGroup.module.css";

export default function ButtonGroup({
  visualiseAlgo,
  generateMaze,
  activeMaze,
  onClear,
}) {
  return (
    <div className={styles.buttons}>
      <Button disabled={activeMaze} onClick={() => generateMaze()}>
        Generate Maze
      </Button>
      <Button onClick={() => visualiseAlgo()}>Find path</Button>
      <Button onClick={() => onClear()}>Clear</Button>
    </div>
  );
}
