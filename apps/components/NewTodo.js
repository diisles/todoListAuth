/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Octicons';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  TextInput,
} from 'react-native';

import { createTodo } from '../actions';


const NewTodo = React.createClass({
  getInitialState() {
    return {
      newTodoText: undefined,
      loading: false
    };
  },
  addNewTodo() {
    const { newTodoText } = this.state;
    const { dispatch } = this.props;
    if (newTodoText && newTodoText !== '') {
      this.setState({ loading: true });
      dispatch(createTodo(newTodoText)).then(() => {
        this.setState({ loading: false });
        this.props.navigator.pop();
      });
    }
  },
  onBack() {
    this.props.navigator.pop();
  },
  render() {
    const renderScrollViewOrLoading = () => {
      if (this.setState.loading) {
        return (
          <View style={{ flex: 1 }}>
            <Text>
              Creating todo...
            </Text>
          </View>
        );
      } else {
        return (
          <ScrollView
            automaticallyAdjustContentInsets={false}
            contentContainerStyle={styles.scrollViewContainer}
          >
            <View style={styles.inputContainer}>
              <TextInput
              onChangeText={(newTodoText) => {
                this.setState({ newTodoText });
              }}
              placeholder='New To-Do Text'
              style={styles.input}
              />
            </View>
          </ScrollView>
        );
      }
    };

    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={this.onBack}>
            <Icon name='chevron-left' size={20} color='white' />
          </TouchableOpacity>
          <Text style={styles.title}>
            New To-Do
          </Text>
          <TouchableOpacity onPress={this.addNewTodo}>
            <Icon name='check' size={20} color='white' />
          </TouchableOpacity>
        </View>
        {renderScrollViewOrLoading()}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  topBar: {
    padding: 16,
    paddingTop: 28,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2ecc71'
  },
  title: {
    color: 'white',
    fontSize: 20
  },
  inputContainer: {
    padding: 5,
    paddingLeft: 10,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#2ecc71'
  },
  input: {
    height: 26
  },
});

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  };
};

module.exports = connect(mapStateToProps)(NewTodo);
