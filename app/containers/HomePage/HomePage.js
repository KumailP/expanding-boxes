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
      cols: 5,
      activeRect: null
    };
  }

  componentDidMount() {
    this.props.onGenerateRectangles();
    window.addEventListener("resize", this.updateComponent);
  }

  componentDidUpdate() {
    if (this.props.rectangles.size != 0) {
      this.setState({ rectangles: this.props.rectangles });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateComponent);
  }

  updateComponent = () => {
    this.updateColumns();
  };

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
  };

  updateActiveRect = activeRect => {
    if (this.state.activeRect === activeRect) {
      this.setState({ activeRect: null });
      this.props.history.push(`/`);
    } else {
      this.setState({ activeRect });
      this.props.history.push(`/open/${activeRect}`);
    }
  };

  reorder = (arr, columns) => {
    const cols = columns;
    const out = [];
    let col = 0;
    while (col < cols) {
      for (let i = 0; i < arr.length; i += cols) {
        let _val = arr[i + col];
        if (_val !== undefined) out.push(_val);
      }
      col++;
    }
    this.setState({ cols: columns });
    return out;
  };

  render() {
    // console.log("Rectangle #:", this.props.match.params.id);

    const { rectangles, cols } = this.state;

    return (
      <div className="home" style={{ columnCount: cols }}>
        {rectangles.length > 0 &&
          this.reorder(rectangles, cols).map((rect, i) => (
            <div
              key={i}
              className="rect"
              onClick={() => this.updateActiveRect(rect.i)}
              style={{
                height: `${rect.height}px`,
                backgroundColor: rect.color
              }}
            >
              {rect.i}
            </div>
          ))}
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
