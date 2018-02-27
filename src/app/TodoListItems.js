import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { store } from './store/store.js';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
    width: '100%',
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

export default class LeftNav extends Component {
  constructor(props) {
    super(props);
    this.listItemsInViewedList = this.listItemsInViewedList.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
    this.deleteThis = this.deleteThis.bind(this);
    this.addTodoItem = this.addTodoItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.inputValid = this.inputValid.bind(this);

    this.state = {
      listName: '',
    };
  }
  inputValid() {
    if (this.state.listName.length > 0) {
      return false;
    }
    return true;
  }
  addTodoItem(e) {
    if (this.state.listName != '') {
      store.dispatch({
        type: 'ADDTODOITEM', todoListName: store.getState().currentViewing, todoItem: this.state.listName,
      });
    }
    this.setState({ listName: '' });
  }
  handleChange(e) {
    this.setState({ listName: e.target.value });
  }

  listItemsInViewedList(e) {
    const selectedPlaceholder = this.props.value;
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
    let todoListNameHolderForList = '';
    const todoItemHolder = this.listItemsInViewedList();
    if (todoItemHolder != null) {
      let iterator = 0;
      todoListNameHolderForList = todoItemHolder[0].map((TodoTasks) => {
        if (TodoTasks) {
          return (
            <Card>
              <CardText className={todoItemHolder[1][iterator].toString()} data-id={iterator} onClick={this.handleClick.bind(this)}>
                <FloatingActionButton secondary mini className="deleteButton button" data-id={iterator++} onClick={this.deleteThis.bind(this)}>
                  x
                </FloatingActionButton>
                {TodoTasks}
              </CardText>
            </Card>
          );
        }
      });
    }
    if (store.getState().currentViewing != '' && store.getState().currentViewing != undefined) {
      return (<Router>
        <span>
          <MuiThemeProvider muiTheme={muiTheme}>
            <ul className="NAVBAR">
              <Card>
                <CardText><FloatingActionButton className="button selectedListBtn" mini onClick={() => test(store.getState().currentViewing)}>x</FloatingActionButton>
                  <h2>
                    {store.getState().currentViewing}
                  </h2>
                </CardText>
              </Card>

              {todoListNameHolderForList}
              <RaisedButton disabled={this.inputValid()} onClick={this.addTodoItem.bind(this)} className="addButton" label="ADD TODO" />
              <TextField onChange={this.handleChange.bind(this)} className="todoListText" floatingLabelText="Type Todo Item Here" type="text" name="name" value={this.state.listName} />
            </ul>
          </MuiThemeProvider>
        </span>
      </Router>);
    }
    return (<MuiThemeProvider muiTheme={muiTheme}>
      <Card>
        <CardText>
                  No List is selected
        </CardText>
      </Card>
            </MuiThemeProvider>);
  }
}
function test(e) {
  store.dispatch({
    type: 'REMTODOLIST', name: e,
  });
}
