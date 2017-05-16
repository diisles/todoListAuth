/* @flow */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  NavigatorIOS
} from 'react-native';

// import { unauthUser } from '../actions';

// onLogout() {
//   this.props.dispatch(unauthUser);
// },
// <TouchableOpacity onPress={this.onLogout}>
// <Text>
// Logout
// </Text>
// </TouchableOpacity>

import TodoList from './TodoList';

const Main = React.createClass({
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: TodoList,
          title: 'Todo List',
          navigationBarHidden: true
        }}
        style={{ flex: 1 }}
      />
    );
  }
});


module.exports = Main;
