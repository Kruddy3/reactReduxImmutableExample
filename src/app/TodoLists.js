import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Immutable from 'immutable';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

export default class ListBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listName: '',
      open: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.addList = this.addList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.inputValid = this.inputValid.bind(this);
  }
  inputValid() {
    if (this.state.listName.length > 0) {
      return false;
    }
    return true;
  }
  handleClick(e) {
    // when one is clicked change the selected value
    this.props.callBackFunction('currentlyViewingChanger', e.currentTarget.dataset.id)
  }
  addList(e) {
    if (this.state.listName != '') {
      this.props.callBackFunction('addList', this.state.listName)
    }
    this.setState({ listName: '' });
  }
  handleChange(e) {
    this.setState({ listName: e.target.value });
  }
  
  componentDidMount() {
    const currentUrlPath = this.props.topicId;
    if (this.props.inputArray.includes(currentUrlPath)) {
      this.props.callBackFunction('currentlyViewingChanger', currentUrlPath)
    } else {
        this.props.callBackFunction('currentlyViewingChanger', "")
    }
  }


  render() {
    let todoListNameHolder = '';
    todoListNameHolder = this.props.inputArray.map((iteratedTodoList) => {
      if (iteratedTodoList == this.props.highlighted) {
        return (<span>
          <Link to={`/reactReduxImmutableExample/${iteratedTodoList}`}>
            <MenuItem data-id={iteratedTodoList} onClick={this.handleClick.bind(this)} style={{ color: 'red', overflow: 'hidden' }}>
              <h2>
                {iteratedTodoList}
              </h2>
            </MenuItem>
          </Link>
        </span>
        );
      }
      return (<span>
        <Link to={`/reactReduxImmutableExample/${iteratedTodoList}`}>
          <MenuItem data-id={iteratedTodoList} className = "unselected" onClick={this.handleClick.bind(this)} style={{ color: 'black', overflow: 'hidden' }}>
            <h2>
              {iteratedTodoList}
            </h2>
          </MenuItem>
        </Link>
      </span>
      );
    });
    return (<Router>
              <span>
                <MuiThemeProvider muiTheme={muiTheme}>
                  <ul className="NAVBAR">
                    <TextField floatingLabelText="Type Todo List Name Here" onChange={this.handleChange.bind(this)} className="todoListText" type="text" name="name" value={this.state.listName} />
                    <RaisedButton disabled={this.inputValid()} label="add Todo list" onClick={this.addList.bind(this)} className="listAdd addButton" style={{ width: '100%' }} />
                    {todoListNameHolder}
                  </ul>
                </MuiThemeProvider>
              </span>
            </Router>);
  }
}
