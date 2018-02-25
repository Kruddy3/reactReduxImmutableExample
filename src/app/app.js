import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Todos from './TodoLists'; // Our custom react component
import Items from './TodoListItems';
import ReactDOM from 'react-dom';
import { store } from './store/store.js';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const TodoListsComponent = ( {match} ) => (
  <Todos
    value={Object.keys(store.getState().toDoLists)} urlId = {match.params.topicId}
  />
);

const Test = (
<Router>
  <div>
    <Route path="/reactReduxImmutableExample/:topicId" component={TodoListsComponent}/>
  </div>
</Router>)

const renderLeftNav = () => {
  ReactDOM.render(
    Test,
    document.getElementById('leftNav'),
  );
};

const renderListItems = () => {
  ReactDOM.render(
    <Items
      value={store.getState().currentViewing}
    />,
    document.getElementById('mainBody'),
  );
};



store.subscribe(renderListItems);
store.subscribe(renderLeftNav);
renderLeftNav();
renderListItems();
