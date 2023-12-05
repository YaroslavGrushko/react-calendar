import React, { useState } from "react";
import styled from "styled-components";

import { ContextMenuPosition, ContextMenu } from "./ContextMenu/ContextMenu";

const GRID_SIZE = 35;
const DATES = new Array(GRID_SIZE).fill(null);

interface Square {
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
  const [taskSquares, setTaskSquares] = useState<Square[]>([
    { id: 1, x: 0, y: -500 },
  ]);
  const [isDragging, setDragging] = useState(false);
  const [currentCell, setCurrentCell] = useState({ x: 0, y: -500 });

  // useEffect(() => {
  //   localStorage.setItem("taskSquares", JSON.stringify(taskSquares));
  // }, [taskSquares]);

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const gridRect = e.currentTarget.getBoundingClientRect();
    const cellX = gridRect.left;
    const cellY = gridRect.top + window.scrollY;

    setContextMenuPosition({ top: e.clientY, left: e.clientX });
    setCurrentCell({ x: cellX, y: cellY });
    setIsContextMenuOpen(true);
  };

  const handleClickEvent = (event: React.MouseEvent) => {
    if (event.type === "mousedown") {
      setDragging(true);
    } else {
      setDragging(false);
    }
  };

  const handleDrag = (e: React.MouseEvent, index: number) => {
    if (!isDragging) return;

    const gridRect = e.currentTarget.getBoundingClientRect();
    const x = gridRect.left;
    const y = gridRect.top + window.scrollY;

    setTaskSquares((prevSquares) =>
      prevSquares.map((square) =>
        square.id === index ? { ...square, x, y } : square
      )
    );
  };

  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] =
    useState<ContextMenuPosition>({
      top: 0,
      left: 0,
    });

  const onTaskCreate = (e: React.MouseEvent) => {
    setIsContextMenuOpen(false);
    setTaskSquares((prevSquares) => [
      ...prevSquares,
      { id: prevSquares.length + 1, x: currentCell.x, y: currentCell.y },
    ]);
  };

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
            onContextMenu={(e) => handleContextMenu(e)}
            onMouseMove={(e) => handleDrag(e, index)}
          >
            {value}
          </Cell>
        ))}
        {taskSquares.map((square) => (
          <TaskSquare
            key={square.id}
            style={{ left: square.x, top: square.y }}
            onMouseDown={(e) => handleClickEvent(e)}
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
