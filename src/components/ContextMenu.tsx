import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";

const Cover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  transform: translateZ(0);
`;

const Menu = styled.div`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.9);
  display: inline-block;
  border-radius: 3px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 3px 0;
`;

interface ContextMenuProps {
  onClose: { (): any };
  x: number;
  y: number;
}

class ContextMenu extends React.PureComponent<ContextMenuProps> {
  render() {
    const { onClose, x, y, children } = this.props;

    function handleEvent(event: React.MouseEvent) {
      event.stopPropagation();
      onClose();
    }

    return ReactDOM.createPortal(
      <Cover onClick={handleEvent} onContextMenu={handleEvent}>
        <Menu style={{ top: y - 10, left: x + 1 }}>{children}</Menu>
      </Cover>,
      document.body
    );
  }
}

export const ContextMenuItem = styled.div`
  padding: 4px;
  cursor: default;

  &:hover {
    background-color: #2980b9;
    color: #fff;
  }
`;

export default ContextMenu;
