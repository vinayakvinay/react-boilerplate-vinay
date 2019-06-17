/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { changeUsername } from './actions';
import { makeSelectUsername, makeSelectRepos } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'home';

export function HomePage({ username, onChangeUsername, repos }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  return (
    <div>
      <h1>HomePage</h1>
      <br />
      <input
        id="username"
        type="text"
        placeholder="Fetch Github Repos"
        value={username}
        onChange={onChangeUsername}
      />
      <br />
      {repos.length ? JSON.stringify(repos, null, 2) : ''}
    </div>
  );
}

HomePage.propTypes = {
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
  repos: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
  repos: makeSelectRepos(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
