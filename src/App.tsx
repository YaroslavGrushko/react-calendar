import React, { useState } from "react";
import styled from "styled-components";

import { ContextMenuPosition, ContextMenu } from "./ContextMenu/ContextMenu";

const GRID_SIZE = 35;
const DATES = new Array(GRID_SIZE).fill(null);

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

const App = () => {
  const [taskSquarePosition, setTaskSquarePosition] = useState({
    x: 0,
    y: -500,
  });
  const [isDragging, setDragging] = useState(false);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] =
    useState<ContextMenuPosition>({
      top: 0,
      left: 0,
    });
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenuPosition({ top: e.clientY, left: e.clientX });
    setIsContextMenuOpen(true);
  };

  const handleClickEvent = (event: React.MouseEvent) => {
    if (event.type === "mousedown") {
      setDragging(true);
    } else {
      setDragging(false);
    }
  };

  const handleDrag = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const gridRect = e.currentTarget.getBoundingClientRect();
    const x = gridRect.left;
    const y = gridRect.top + window.scrollY;

    setTaskSquarePosition({ x, y });
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
            onMouseMove={handleDrag}
          >
            {value}
          </Cell>
        ))}
        {taskSquarePosition && (
          <TaskSquare
            style={{ left: taskSquarePosition.x, top: taskSquarePosition.y }}
            onMouseDown={(e) => handleClickEvent(e)}
            onMouseUp={(e) => handleClickEvent(e)}
          />
        )}
      </Grid>

      {isContextMenuOpen && (
        <ContextMenu
          position={contextMenuPosition}
          onClose={handleContextMenuClose}
        />
      )}
    </Wrapper>
  );
};

export default App;
