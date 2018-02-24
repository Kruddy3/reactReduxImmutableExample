import Immutable from 'immutable';
import { loadState, saveState } from '../loadState'


const todoListManager = (state = { currentViewing: '', toDoLists: { todoname: [], todoname2: [{ todo: 'brush Teeth', completed: false }, { todo: 'brush Teeths', completed: false }, { todo: 'brush Teethss', completed: false }] } }, action) => {
  let immutableStore = Immutable.fromJS(state);
  switch (action.type) {
    case 'NEWTODOLIST':
      return immutableStore
        .setIn(['toDoLists', action.name], [])
        .toJS();
    case 'REMTODOLIST':
      if (store.getState().currentViewing == action.name) {
        immutableStore = immutableStore.set('currentViewing', '');
      }

      return immutableStore
        .deleteIn(['toDoLists', action.name])
        .toJS();
    case 'ADDTODOITEM':
      return immutableStore
        .updateIn(['toDoLists', action.todoListName], arr => arr.push({ todo: action.todoItem, completed: false }))
        .toJS();
    case 'TOGGLECOMPLETION':
      var x = immutableStore.getIn(['toDoLists', action.todoListName, action.arrayPosition, 'completed']);
      return immutableStore
        .setIn(['toDoLists', action.todoListName, action.arrayPosition, 'completed'], !x)
        .toJS();
    case 'REMTODO':
      return immutableStore
        .deleteIn(['toDoLists', action.todoListName, action.arrayPosition])
        .toJS();
    case 'UPDATECURRENTLYVIEWING':
      return immutableStore
        .set('currentViewing', action.whatViewing)
        .toJS();
    default:
      return state;
  }
};
import { createStore } from 'redux';

const persistedState = loadState();
const store = createStore(todoListManager, loadState());
store.subscribe(() => {
  saveState(store.getState())
})
export { store };
