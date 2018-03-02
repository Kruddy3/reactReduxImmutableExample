import React, { Component } from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Items from './TodoListItems';
import ReactDOM from 'react-dom';
import { store } from './store/store.js';
import Immutable from 'immutable';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import RaisedButton from 'material-ui/RaisedButton';
import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';


export default class LeftNav extends Component {
  constructor(props) {
    super(props);
    this.listItemsInViewedList = this.listItemsInViewedList.bind(this);
    this.deleteThis = this.deleteThis.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);

  }

  callBackFunction(typeOfRequest, e) {
    if (typeOfRequest == 'addTodoItem') {
      store.dispatch({
        type: 'ADDTODOITEM', todoListName: store.getState().currentViewing, todoItem: e,
      });
    }
    else if (typeOfRequest == 'remTodoList') {
      // working
      store.dispatch({
        type: 'REMTODOLIST', name: e,
      });
    }
    else if (typeOfRequest == 'remTodoItem') {
      store.dispatch({
        type: 'REMTODO', todoListName: store.getState().currentViewing, arrayPosition: e.currentTarget.dataset.id,
      });
    }
    else if (typeOfRequest == 'toggleCompletion') {
      store.dispatch({
        type: 'TOGGLECOMPLETION', todoListName: store.getState().currentViewing, arrayPosition: e,
      });
    }
  }
  listItemsInViewedList(e) {
    const selectedPlaceholder = store.getState().currentViewing;
    const itemsWithinList = store.getState().toDoLists[selectedPlaceholder];
    if (itemsWithinList != null) {
      return [(itemsWithinList.map(a => a.todo)), (itemsWithinList.map(a => a.completed))];
    }
  }
  deleteThis(e) {
    e.stopPropagation();
    store.dispatch({
      type: 'REMTODO', todoListName: store.getState().currentViewing, arrayPosition: e.currentTarget.dataset.id,
    });
  }
  handleClick(e) {
    this.toggleCompletion(e.currentTarget.dataset.id);
  }
  toggleCompletion(e) {
    store.dispatch({
      type: 'TOGGLECOMPLETION', todoListName: store.getState().currentViewing, arrayPosition: e,
    });
  }
  render() {
    const todoItemHolder = this.listItemsInViewedList();

    return (<Items
              currentlyViewing={store.getState().currentViewing}
              arrayOfItems = {todoItemHolder} //this shouldnt be formatted just an array of objects [ [1stval, 2ndval] [1ststatus, 2ndstatus]]
              callBackFunction = {this.callBackFunction.bind(this)}
            />)
  }
}
