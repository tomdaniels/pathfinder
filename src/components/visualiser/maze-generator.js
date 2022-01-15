import {
  SegmentedControl,
  SegmentedControlOption,
} from "@leafygreen-ui/segmented-control";
import { MAZE_TYPES } from "../../constants";

import styles from "../../styles/MazeGenerator.module.css";

export default function MazeGenerator({ activeMaze, generateMaze }) {
  return (
    <div className={styles.container}>
      <SegmentedControl
        label="maze"
        size={"default"}
        darkMode={false}
        followFocus={true}
        disabled={activeMaze}
        defaultValue="maze"
        onChange={(type) => {
          generateMaze(type);
        }}
      >
        <SegmentedControlOption value={MAZE_TYPES.RECURSIVE}>
          Recursive Division
        </SegmentedControlOption>

        <SegmentedControlOption value={MAZE_TYPES.VERTICAL}>
          Vertial Skew
        </SegmentedControlOption>

        <SegmentedControlOption value={MAZE_TYPES.HORIZONTAL}>
          Horizontal skew
        </SegmentedControlOption>
      </SegmentedControl>
    </div>
  );
}
