import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
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
    this.toggleCompletion = this.toggleCompletion.bind(this);
    this.deleteThis = this.deleteThis.bind(this);
    this.addTodoItem = this.addTodoItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.inputValid = this.inputValid.bind(this);
    this.removeList = this.removeList.bind(this);

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
      this.props.callBackFunction('addTodoItem', this.state.listName)
    }
    this.setState({ listName: '' });
  }
  handleChange(e) {
    this.setState({ listName: e.target.value });
  }

  deleteThis(e) {
    e.stopPropagation();
    this.props.callBackFunction('remTodoItem', e)
  }
  handleClick(e) {
    this.toggleCompletion(e.currentTarget.dataset.id);
  }
  toggleCompletion(e) {
    this.props.callBackFunction('toggleCompletion', e)
  }
  removeList(e) {
    this.props.callBackFunction('remTodoList', e)
  }
  render() {
    let todoListNameHolderForList = '';
    if (this.props.arrayOfItems != null) {
      let iterator = 0;
      todoListNameHolderForList = this.props.arrayOfItems[0].map((TodoTasks) => {
        if (TodoTasks) {
          return (
            <Card>
              <CardText className={this.props.arrayOfItems[1][iterator].toString()} data-id={iterator} onClick={this.handleClick.bind(this)}>
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
    if (this.props.currentlyViewing != '' && this.props.currentlyViewing != undefined) {
      return (<Router>
        <span>
          <MuiThemeProvider muiTheme={muiTheme}>
            <ul className="NAVBAR">
              <Card>
                <CardText><FloatingActionButton className="button selectedListBtn" mini onClick={() => this.removeList(this.props.currentlyViewing)}>x</FloatingActionButton>
                  <h2>
                    {this.props.currentlyViewing}
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
    // this is rendered if there is no currently viewing
    return (<MuiThemeProvider muiTheme={muiTheme}>
              <Card>
                <CardText>
                  No List is selected
                </CardText>
              </Card>
            </MuiThemeProvider>);
  }
}
