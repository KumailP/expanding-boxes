/**
 * Homepage selectors
 */

import { createSelector } from "reselect";

const selectHome = state => state.get("home");

const makeSelectRectangles = () =>
  createSelector(
    selectHome,
    homeState => homeState.get("rectangles")
  );

export { selectHome, makeSelectRectangles };
