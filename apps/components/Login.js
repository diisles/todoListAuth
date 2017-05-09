/* @flow */

import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

import { loginUser, signupUser, addAlert, } from '../actions';

const Login = React.createClass({
  getInitialState: function() {
    return {
      loading: false
    };
  },

  onSignIn: function () {
    const { dispatch, fields: { email, password } } = this.props;
    this.setState({
      loading: true
    });
    dispatch(loginUser(email.value, password.value)).then(() => {
      this.setState({
        loading: false
      });
    });
  },
  onSignUp: function () {
    const { dispatch, fields: { email, password } } = this.props;
    this.setState({
      loading: true
    });
    dispatch(signupUser(email.value, password.value)).then(() => {
      this.setState({
        loading: false
      });
    });
  },

  render() {
    const { fields: { email, password } } = this.props;

    const renderError = (field) => {
      if (field.touched && field.error) {
        return (
          <Text style={styles.formError}>{field.error}</Text>
        );
      }
    };

    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <Text>
            Loading...
          </Text>
        </View>

      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
          <Text style={styles.title}>
            To-Do
          </Text>
          </View>
          <View style={styles.field}>
            <TextInput
              {...email}
              placeholder='Email'
              style={styles.textInput}
            />
              <View>
                {renderError(email)}
              </View>
          </View>
          <View style={styles.field}>
            <TextInput
              {...password}
              placeholder='Password'
              style={styles.textInput}
            />
            <View>
              {renderError(password)}
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.onSignIn}>
              <Text style={styles.button}>
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onSignUp}>
              <Text style={styles.button}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop: 20,
    backgroundColor: '#aaa'
  },
  titleContainer: {
    padding: 10
  },
  title: {
    color: 'white',
    fontSize: 35
  },
  field: {
    borderRadius: 5,
    padding: 5,
    paddingLeft: 8,
    margin: 7,
    marginTop: 0,
    backgroundColor: 'white'
  },
  textInput: {
    height: 26
  },
  buttonContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  button: {
    fontSize: 30,
    color: 'white'
  },
  formError: {
    color: 'red'
  },
});

const validate = (formProps) => {
  var errors = {};
  if (!formProps.email) {
    errors.email = 'Please enter an email.';
  }
  if (!formProps.password) {
    errors.password = 'Please enter a password.';
  }
  return errors;
};

module.exports = reduxForm({
  form: 'login',
  fields: ['email', 'password'],
  validate
}, null, null)(Login);