import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { getClassName } from '../../utils/component';

import './ResizableTiles.scss';

interface OwnProps {
  children: any;
}

interface StateProps {
  isDragging: boolean;
  panels: number[];
  initialPos: number | null;
  delta: number | null;
  currentPanel: number | null;
  resizerWidth: number;
}

type Props = OwnProps;

const ccn = getClassName('resizable-tiles');


class ResizableTiles extends React.Component<Props> {
  eventHandler: MouseEvent | null = null;

  state: StateProps = {
    isDragging: false,
    panels: [300, 900],
    initialPos: null,
    delta: null,
    currentPanel: null,
    resizerWidth: 8
  };

  private table = React.createRef<HTMLDivElement>();

  componentDidMount() {
    const width = this.table.current.offsetWidth;
    this.setState({
      panels: [width * 0.3, width * 0.7]
    });

    ReactDOM.findDOMNode(this).addEventListener('mousemove', this.resizePanel);
    ReactDOM.findDOMNode(this).addEventListener('mouseup', this.stopResize);
    ReactDOM.findDOMNode(this).addEventListener('mouseleave', this.stopResize);
  }

  componentWillUnmount() {
    ReactDOM.findDOMNode(this).removeEventListener('mousemove', this.resizePanel);
    ReactDOM.findDOMNode(this).removeEventListener('mouseup', this.stopResize);
    ReactDOM.findDOMNode(this).removeEventListener('mouseleave', this.stopResize);
  }

  startResize = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    this.setState({
      isDragging: true,
      currentPanel: index,
      initialPos: event.clientX
    });
  };

  stopResize = () => {
    if (this.state.isDragging) {
      this.setState(({ panels, currentPanel, delta }: any) => ({
        isDragging: false,
        panels: {
          ...panels,
          [currentPanel]: (panels[currentPanel] || 0) - delta,
          [currentPanel - 1]: (panels[currentPanel - 1] || 0) + delta
        },
        delta: 0,
        currentPanel: null
      }));
    }
  };

  resizePanel = (event: MouseEvent) => {
    if (this.state.isDragging) {
      const delta = event.clientX - this.state.initialPos;
      this.setState({
        delta: delta
      });
    }
  };

  render() {
    const rest = this.props.children.slice(1);

    return (
      <div ref={this.table} className={ccn()} onMouseUp={() => this.stopResize()}>
        <div
          className={ccn("panel")}
          style={{ width: `calc(100% - ${this.state.panels[1]}px - ${this.state.resizerWidth}px)` }}
        >
          {this.props.children[0]}
        </div>
        {rest.map((child: any, i: number) => {
          return [
            <div
              onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                this.startResize(e, i + 1)
              }
              key={'resizer_' + i}
              style={{
                width: this.state.resizerWidth,
                left: this.state.currentPanel === i + 1 ? this.state.delta : ''
              }}
              className={ccn("resizer")}
            />,
            <div
              key={'panel_' + i}
              className={ccn("panel")}
              style={{ width: this.state.panels[i + 1] }}
            >
              {child}
            </div>
          ];
        })}
      </div>
    );
  }
}

export default ResizableTiles;
