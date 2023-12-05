import React, { useState } from "react";
import styled from "styled-components";

import { ContextMenuPosition, ContextMenu } from "./ContextMenu/ContextMenu";

const GRID_SIZE = 35;
const DATES = new Array(GRID_SIZE).fill(null);

interface Task {
  id: number;
  cell_id?: number;
  x?: number;
  y?: number;
}
interface Cell {
  id: number;
  x: number;
  y: number;
}

const Wrapper = styled.section.attrs({
  className: `Wrapper`,
})`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 3%;
  margin: auto;
  background: #eeeff1;
`;

const Grid = styled.div.attrs({
  className: `Grid`,
})`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
`;
const Cell = styled.div.attrs({
  className: `Cell`,
})`
  position: relative;
  width: calc(97% / 7 - 2px);
  aspect-ratio: 1/1;
  border-radius: 3px;
  background: #e3e4e6;
`;

const TaskSquare = styled.div.attrs({
  className: "TaskSquare",
})`
  position: absolute;
  width: calc(90% / 7);
  aspect-ratio: 1/1;
  background: blue;
  border-radius: 3px;
  cursor: grab;
  user-select: none;
`;

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDragging, setDragging] = useState(false);
  const [currentCell, setCurrentCell] = useState<Cell>();
  const [currentTask, setCurrentTask] = useState<Task>();

  // useEffect(() => {
  //   localStorage.setItem("taskSquares", JSON.stringify(taskSquares));
  // }, [taskSquares]);

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    const gridRect = e.currentTarget.getBoundingClientRect();
    const cellX = gridRect.left;
    const cellY = gridRect.top + window.scrollY;

    setContextMenuPosition({ top: e.clientY, left: e.clientX });
    setCurrentCell({ id: index, x: cellX, y: cellY });
    setIsContextMenuOpen(true);
  };

  const onTaskCreate = (e: React.MouseEvent) => {
    setIsContextMenuOpen(false);
    if (!currentCell) return;

    setTasks((prevCells) => [
      ...prevCells,
      {
        id: prevCells.length + 1,
        cell_id: currentCell.id,
        x: currentCell.x,
        y: currentCell.y,
      },
    ]);
  };

  const handleDrag = (e: React.MouseEvent) => {
    if (!isDragging || !currentCell || !currentTask) return;

    const gridRect = e.currentTarget.getBoundingClientRect();
    const x = gridRect.left;
    const y = gridRect.top + window.scrollY;
    const cell_id = currentCell.id;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === currentTask.id ? { ...task, cell_id, x, y } : task
      )
    );
  };

  const handleClickEvent = (event: React.MouseEvent, task_id?: number) => {
    if (event.type === "mousedown" && task_id) {
      setCurrentTask({ id: task_id });
      setDragging(true);
    } else {
      setDragging(false);
    }
  };

  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] =
    useState<ContextMenuPosition>({
      top: 0,
      left: 0,
    });

  const handleContextMenuClose = () => {
    setIsContextMenuOpen(false);
  };

  return (
    <Wrapper>
      <div>December 2023</div>
      <Grid>
        {DATES.map((value, index) => (
          <Cell
            key={index}
            onContextMenu={(e) => handleContextMenu(e, index)}
            onMouseMove={(e) => handleDrag(e)}
          >
            {value}
          </Cell>
        ))}
        {tasks.map((tasks) => (
          <TaskSquare
            key={tasks.id}
            style={{ left: tasks.x, top: tasks.y }}
            onMouseDown={(e) => handleClickEvent(e, tasks.id)}
            onMouseUp={(e) => handleClickEvent(e)}
          />
        ))}
      </Grid>

      {isContextMenuOpen && (
        <ContextMenu
          position={contextMenuPosition}
          onCreate={(e) => onTaskCreate(e)}
          onClose={handleContextMenuClose}
        />
      )}
    </Wrapper>
  );
};

export default App;
