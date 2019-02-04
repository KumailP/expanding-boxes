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
      rectangles: []
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
    this.forceUpdate();
  };

  getColumnCount = () => {
    let browserWidth = Math.max(
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
    return maxCols;
  };

  render() {
    console.log("Rectangle #:", this.props.match.params.id);

    const { rectangles } = this.state;

    return (
      <div className="home" style={{ columnCount: this.getColumnCount() }}>
        {rectangles.map((rect, i) => (
          <div
            key={i}
            className="rect"
            style={{ height: `${rect.height}px`, backgroundColor: rect.color }}
          />
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
