import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import injectReducer from "utils/injectReducer";
import { makeSelectLoading, makeSelectError } from "containers/App/selectors";
import { generateRectangles } from "./actions";
import reducer from "./reducer";
import HomePage from "./HomePage";

const mapDispatchToProps = dispatch => ({
  onGenerateRectangles: () => dispatch(generateRectangles())
});

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "home", reducer });

export default compose(
  withReducer,
  withConnect
)(HomePage);
export { mapDispatchToProps };
