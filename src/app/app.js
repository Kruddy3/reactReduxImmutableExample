import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Todos from './TodoLists'; // Our custom react component
import Items from './TodoListItems';
import ReactDOM from 'react-dom';
import { store } from './store/store.js';


const renderLeftNav = () => {
  ReactDOM.render(
    <Todos
      value={Object.keys(store.getState().toDoLists)}
    />,
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
