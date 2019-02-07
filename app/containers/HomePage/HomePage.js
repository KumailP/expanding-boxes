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
    this.generateLayout();
    if (this.props.match.params.id != undefined)
      this.setState({ activeRect: this.props.match.params.id });
    window.addEventListener("resize", this.generateLayout);
  }

  componentDidUpdate() {
    if (this.props.rectangles.size != 0) {
      this.setState({ rectangles: this.props.rectangles });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.generateLayout);
  }

  updateColumns = () => {
    const browserWidth = Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
    let maxCols = 1;
    if (Math.floor(browserWidth / 220) > maxCols) {
      maxCols = Math.floor(browserWidth / 220);
    }

    this.setState({ cols: maxCols });
    return maxCols;
  };

  updateInitialYValues = cols => {
    let yValues = new Array(cols);
    yValues.fill(0);
    this.setState({ yValues });
  };

  generateLayout = () => {
    const cols = this.updateColumns();
    this.updateInitialYValues(cols);
  };

  generateRectangles = () => {
    const { rectangles, cols, yValues, activeRect } = this.state;
    let currentX = 0;
    let col = 0;
    for (let i = 0; i < rectangles.length; i++) {
      if (col < cols) {
        rectangles[i].x = currentX;
        rectangles[i].y = yValues[col];
        currentX += 210;
        yValues[col] += rectangles[i].height + 10;
        col++;
      } else {
        col = 0;
        currentX = 0;
        rectangles[i].x = 0;
        rectangles[i].y = yValues[0];
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
          zIndex: 0
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
      <div className="home">
        <div className="rectangles" style={{ width: `${cols * 210}px` }}>
          {this.generateRectangles()}
        </div>

        <div
          className="overlay"
          style={activeRect !== null ? { opacity: 0.8 } : { opacity: 0 }}
        />
      </div>
    );
  }
}

HomePage.propTypes = {
  rectangles: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onGenerateRectangles: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
};
