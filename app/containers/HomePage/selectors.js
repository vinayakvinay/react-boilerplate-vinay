/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectUsername = () =>
  createSelector(
    selectHome,
    homeState => homeState.username,
  );

const makeSelectRepos = () =>
  createSelector(
    selectHome,
    homeState => homeState.repos,
  );

export { selectHome, makeSelectUsername, makeSelectRepos };
