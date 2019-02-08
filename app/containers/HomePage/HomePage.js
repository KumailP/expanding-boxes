/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

export default class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rectangles: [],
      cols: null,
      activeRect: null,
      yValues: []
    };
  }

  componentDidMount() {
    this.props.onGenerateRectangles();
    window.addEventListener("resize", this.generateLayout);
    if (this.props.match.params.id != undefined)
      this.setState({ activeRect: parseInt(this.props.match.params.id, 10) });
    this.generateLayout();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.rectangles.size != 0) {
      this.setState({ rectangles: this.props.rectangles });
    }
    if (prevState.cols !== this.state.cols) {
      this.generateLayout();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.generateLayout);
  }

  updateColumns = () => {
    const browserWidth = document.documentElement.clientWidth;

    let maxCols = 1;
    if (Math.floor(browserWidth / 220) > maxCols) {
      maxCols = Math.floor(browserWidth / 220);
    }

    this.setState({ cols: maxCols });
    return maxCols;
  };

  updateInitialYValues = cols => {
    let yValues = new Array(cols);
    yValues.fill(20);
    this.setState({ yValues });
  };

  generateLayout = () => {
    const cols = this.updateColumns();
    this.updateInitialYValues(cols);
  };

  getLeftMargin = () => {
    const { cols } = this.state;
    const widthWithCols = cols * 210;
    const browserWidth = document.documentElement.clientWidth;
    const freeWidth = browserWidth - widthWithCols;
    return freeWidth / 2;
  };

  generateRectangles = () => {
    const { rectangles, cols, yValues, activeRect } = this.state;
    let initialX = this.getLeftMargin();
    let col = 0;
    let minY = 0;
    for (let i = 0; i < rectangles.length; i++) {
      minY = yValues.indexOf(Math.min(...yValues));
      if (col < cols) {
        rectangles[i].x = initialX + 210 * minY;
        rectangles[i].y = yValues[minY];
        yValues[minY] += rectangles[i].height + 10;
        col++;
      } else {
        col = 0;
        initialX = this.getLeftMargin();
        rectangles[i].x = initialX;
        rectangles[i].y = yValues[minY];
        i--;
      }
    }

    return rectangles.map((rect, i) => (
      <div
        key={i}
        className={`rect ${activeRect === rect.i ? "active" : ""}`}
        onClick={() => this.updateActiveRect(rect.i)}
        style={{
          height: `${rect.height}px`,
          backgroundColor: rect.color,
          top: rect.y,
          left: rect.x,
          zIndex: 1
        }}
      >
        {i}
      </div>
    ));
  };

  updateActiveRect = activeRect => {
    if (this.state.activeRect === activeRect) {
      this.setState({ activeRect: null }, () => this.generateLayout());
      this.props.history.push(`/`);
    } else {
      this.setState({ activeRect: activeRect }, () => this.generateLayout());
      this.props.history.push(`/open/${activeRect}`);
    }
  };

  render() {
    const { activeRect, cols } = this.state;
    // console.log("Rectangle #:", activeRect);

    return (
      <React.Fragment>
        <div
          className="home"
          style={
            activeRect != null ? { height: "100vh", overflow: "hidden" } : {}
          }
        >
          <div className="rectangles" style={{ width: `${cols * 210}px` }}>
            {this.generateRectangles()}
          </div>

          <div
            className="overlay"
            style={activeRect !== null ? { opacity: 0.8 } : { opacity: 0 }}
          />
        </div>
        <div className="underlay" />
      </React.Fragment>
    );
  }
}

HomePage.propTypes = {
  rectangles: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onGenerateRectangles: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
};
