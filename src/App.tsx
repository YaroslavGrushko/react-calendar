import React, { useState } from "react";
import styled from "styled-components";

const GRID_SIZE = 42;
const DATES = new Array(GRID_SIZE).fill(null);

const Wrapper = styled.section.attrs({
  className: `Wrapper`,
})`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 3% 20px;
  background: #eeeff1;
`;

const Grid = styled.div.attrs({
  className: `Grid`,
})`
  display: flex;
  width: 100%;
  padding: 5px;
  flex-wrap: wrap;
  gap: 5px;
`;
const Cell = styled.div.attrs({
  className: `Cell`,
})`
  position: relative;
  width: 15.8%;
  aspect-ratio: 1/1;
  border-radius: 3px;
  background: #e3e4e6;
`;

const TaskSquare = styled.div.attrs({
  className: "TaskSquare",
})`
  position: absolute;
  width: 15.8%;
  aspect-ratio: 1/1;
  background: blue;
  border-radius: 3px;
  cursor: grab;
  user-select: none;
`;

const App = () => {
  const [taskSquarePosition, setTaskSquarePosition] = useState({ x: 0, y: 0 });

  const [isDragging, setDragging] = useState(false);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the default context menu

    // Calculate the position of the task square based on the cell index
    const gridRect = e.currentTarget.getBoundingClientRect();
    const x = gridRect.left;
    const y = gridRect.top;

    setTaskSquarePosition({ x, y });
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

    // Calculate the position of the task square based on the mouse coordinates
    // You may need to adjust these calculations based on your specific layout and requirements
    const x = e.clientX;
    const y = e.clientY;

    // Perform logic to determine the cell index based on x, y coordinates
    // ...

    // Update the state or perform other actions based on the calculated cell index
    // ...
    setTaskSquarePosition({ x, y });
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
    </Wrapper>
  );
};

export default App;
