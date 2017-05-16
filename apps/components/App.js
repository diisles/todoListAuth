/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  StatusBar,
  StyleSheet,
} from 'react-native';

// import { addTodo, deleteTodo } from '../actions';
import Login from './Login';
import Main from './Main';
import AlertContainer from './alerts/AlertContainer';


const App = React.createClass({
  getInitialState() {
    return {};
  },
  render() {
    const renderMainView = () => {
      if (this.props.user_id) {
        return (
          <Main />
        );
      } else {
        return (
          <Login />
        );
      }
    };

    return (
      <View style={{ flex: 1 }}>
      <StatusBar barStyle='light-content' />
      {renderMainView()}
        <AlertContainer />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#ccc'
  },
});

const mapStateToProps = (state) => {
  return {
    user_id: state.auth.user_id
  };
};

module.exports = connect(mapStateToProps)(App);
