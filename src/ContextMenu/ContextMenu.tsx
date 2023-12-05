import styled from "styled-components";

interface ContextMenuProps {
  position: ContextMenuPosition;
  onCreate: React.MouseEventHandler<HTMLDivElement>;
  onClose: React.MouseEventHandler<HTMLDivElement>;
}

export interface ContextMenuPosition {
  top: number;
  left: number;
}

export const ContextMenuStyled = styled.div<ContextMenuPosition>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  background-color: white;
  border: 1px solid #ccc;
  padding: 8px 0px;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 5px -3px,
    rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px;
  transform: none;
  transition: opacity 251ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    transform 167ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  z-index: 1000;
`;

export const ContextMenuItem = styled.div`
  padding: 6px 16px;
  cursor: pointer;
  &:hover {
    background: #dae2ed;
  }
`;
export const ContextMenu = (props: ContextMenuProps) => {
  const { position, onCreate, onClose } = props;
  return (
    <ContextMenuStyled top={position.top} left={position.left}>
      <ContextMenuItem onClick={onCreate}>Create Task</ContextMenuItem>
      <ContextMenuItem onClick={onClose}>Labels</ContextMenuItem>
      <ContextMenuItem onClick={onClose}>Close</ContextMenuItem>
    </ContextMenuStyled>
  );
};
