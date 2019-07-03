import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";
import { Colors } from "@blueprintjs/core";
import { LogLevel } from "./LogsFilterProvider";
import { showCustomAlert } from "../CustomAlertProvider";

const bgcolorForLevel = (level: LogLevel) =>
  ({
    [LogLevel.DEBUG]: `transparent`,
    [LogLevel.INFO]: `transparent`,
    [LogLevel.WARNING]: `rgba(166, 121, 8, 0.05)`,
    [LogLevel.ERROR]: `rgba(206, 17, 38, 0.05)`,
    [LogLevel.CRITICAL]: `rgba(206, 17, 38, 0.05)`
  }[level]);

export const Cell = styled.div<{ level: LogLevel }>`
  font-size: 0.85em;
  width: 100%;
  height: 100%;
  max-height: 17em;
  padding: 4px 8px;
  word-break: break-all;
  white-space: pre-wrap;
  font-family: monospace;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${Colors.LIGHT_GRAY3};
  background: ${props => bgcolorForLevel(props.level)};
  color: ${props =>
    ({
      [LogLevel.DEBUG]: Colors.GRAY3,
      [LogLevel.INFO]: Colors.DARK_GRAY2,
      [LogLevel.WARNING]: Colors.GOLD2,
      [LogLevel.ERROR]: Colors.RED3,
      [LogLevel.CRITICAL]: Colors.RED3
    }[props.level])};
`;

export const StructuredContent = styled.div`
  box-sizing: border-box;
  box-shadow: 0 0.7px 0.5px rgba(0, 0, 0, 0.25);
  margin: -4px;
  margin-bottom: -5px;
  border-bottom: 1px solid ${Colors.LIGHT_GRAY4};
  padding: 4px;
  word-break: break-all;
  white-space: pre-wrap;
  overflow-y: hidden;
  font-family: monospace;
  flex: 1;
  display: flex;
  flex-direction: row;
  background: white;
  color: ${Colors.DARK_GRAY2};
`;

const OverflowFade = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  user-select: none;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgba(245, 248, 250, 0) 0%,
    rgba(245, 248, 250, 255) 100%
  );
`;

const OverflowBanner = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  user-select: none;
  background: ${Colors.LIGHT_GRAY3};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  padding: 2px 12px;
  color: ${Colors.BLACK};
  &:hover {
    color: ${Colors.BLACK};
    background: ${Colors.LIGHT_GRAY1};
  }
`;

export class CellTruncationProvider extends React.Component<
  { style: React.CSSProperties },
  { isOverflowing: boolean }
> {
  state = {
    isOverflowing: false
  };

  componentDidMount() {
    this.detectOverflow();
  }

  componentDidUpdate() {
    this.detectOverflow();
  }

  detectOverflow() {
    const el = ReactDOM.findDOMNode(this);
    if (!(el && "clientHeight" in el)) return;

    const isOverflowing = el.scrollHeight > this.props.style.height!;
    if (isOverflowing !== this.state.isOverflowing) {
      this.setState({ isOverflowing });
    }
  }

  onView = () => {
    const el = ReactDOM.findDOMNode(this) as HTMLElement;
    const message = el.firstChild && el.firstChild.textContent;
    if (!message) return;
    showCustomAlert({ message: message, pre: true });
  };

  render() {
    const { style } = this.props;

    return (
      <div style={style}>
        {this.props.children}
        {this.state.isOverflowing && (
          <>
            <OverflowFade />
            <OverflowBanner onClick={this.onView}>
              View Full Message
            </OverflowBanner>
          </>
        )}
      </div>
    );
  }
}
