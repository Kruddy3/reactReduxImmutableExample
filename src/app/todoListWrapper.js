import React, { Component } from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Todos from './TodoLists'; // Our custom react component
import ReactDOM from 'react-dom';
import { store } from './store/store.js';
import Immutable from 'immutable';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export default class LeftNav extends Component {
  constructor(props) {
    super(props);
  }

  callBackFunction(typeOfRequest, e) {
    if (typeOfRequest == 'addList') {
      store.dispatch({
        type: 'NEWTODOLIST', name: e,
      });
    }
    else if (typeOfRequest == 'currentlyViewingChanger') {
      store.dispatch({
        type: 'UPDATECURRENTLYVIEWING', whatViewing: e,
      });
    }
  }

  render() {
    // topicId is url, input array can be any array, highlighted is the array
    // callback function is required if you want to highlighted changed or when new lists added 
    return (<Todos
                topicId={this.props.match.params.topicId}
                inputArray={Object.keys(store.getState().toDoLists)}
                highlighted = {store.getState().currentViewing}
                callBackFunction = {this.callBackFunction.bind(this)}
              />)
  }
}
