/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { UPDATE_USERNAME, LOAD_REPOS } from './constants';

// The initial state of the App
export const initialState = {
  username: 'vinay',
  repos: [],
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_USERNAME:
        draft.username = action.username.toUpperCase().trim();
        break;

      case LOAD_REPOS:
        draft.repos = action.repos.map(repo => ({
          name: repo.name,
          issues: repo.open_issues_count,
        }));
        break;
    }
  });

export default homeReducer;
