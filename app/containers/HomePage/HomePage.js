/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from "react";
import PropTypes from "prop-types";
import StackGrid from "react-stack-grid";
import "./style.scss";

export default class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rectangles: [],
      activeRect: null
    };
  }

  componentDidMount() {
    this.props.onGenerateRectangles();
  }

  componentDidUpdate() {
    if (this.props.rectangles.size != 0) {
      this.setState({ rectangles: this.props.rectangles });
    }
  }

  updateActiveRect = activeRect => {
    if (this.state.activeRect === activeRect) {
      this.setState({ activeRect: null });
      this.props.history.push(`/`);
    } else {
      this.setState({ activeRect });
      this.props.history.push(`/open/${activeRect}`);
    }
  };

  render() {
    // console.log("Rectangle #:", this.props.match.params.id);

    const { rectangles } = this.state;

    return (
      <div className="home">
        <StackGrid columnWidth={200} gutterWidth={15}>
          {rectangles.map((rect, i) => (
            <div
              key={i}
              className="rect"
              onClick={() => this.updateActiveRect(rect.i)}
              style={{
                height: `${rect.height}px`,
                backgroundColor: rect.color
              }}
            />
          ))}
        </StackGrid>
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
