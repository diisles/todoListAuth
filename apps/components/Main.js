/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { unauthUser } from '../actions';

const Main = React.createClass({
  onLogout() {
    this.props.dispatch(unauthUser);
  },

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to Main!</Text>
        <TouchableOpacity onPress={this.onLogout}>
          <Text>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = connect()(Main);
