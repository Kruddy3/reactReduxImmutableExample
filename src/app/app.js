import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Todos from './TodoLists'; // Our custom react component
import Items from './TodoListItems';
import ReactDOM from 'react-dom';
import { store } from './store/store.js';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import TodoWrapper from './todoListWrapper';
import ItemsWrapper from './ItemsWrapper';

const renderLeftNav = () => {
  ReactDOM.render(
    <Router>
      <div>
        <Route path="/reactReduxImmutableExample/:topicId" component={TodoWrapper}/>
      </div>
    </Router>,
    document.getElementById('leftNav'),
  );
};

const renderListItems = () => {
  ReactDOM.render(
    <ItemsWrapper />,
    document.getElementById('mainBody'),
  );
};



store.subscribe(renderListItems);
store.subscribe(renderLeftNav);
renderLeftNav();
renderListItems();
