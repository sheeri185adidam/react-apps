import { normalize, schema } from 'normalizr';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import './index.css';

const TODO_ADD = 'TODO_ADD';
const TODO_TOGGLE = 'TODO_TOGGLE';
const FILTER_SET = 'FILTER_SET';

const todos = [
  { id: '1', name: 'Redux Standalone with advanced Actions' },
  { id: '2', name: 'Redux Standalone with advanced Reducers' },
  { id: '3', name: 'Bootstrap App with Redux' },
  { id: '4', name: 'Naive Todo with React and Redux' },
  { id: '5', name: 'Sophisticated Todo with React and Redux' },
  { id: '6', name: 'Connecting State Everywhere' },
  { id: '7', name: 'Todo with advanced Redux' },
  { id: '8', name: 'Todo but more Features' },
  { id: '9', name: 'Todo with Notifications' },
  { id: '10', name: 'Hacker News with Redux' },
];

// normalizing the state
const todoSchema = new schema.Entity('todo');
const normalizedTodos = normalize(todos, [todoSchema]);
const initialTodoState = {
  entities: normalizedTodos.entities.todo,
  ids: normalizedTodos.result
};

function todoReducer(state = initialTodoState, action) {
  switch (action.type) {
    case TODO_ADD: {
      return applyAddTodo(state, action);
    }
    case TODO_TOGGLE: {
      return applyToggleTodo(state, action);
    }
    default: return state;
  }
}

function applyAddTodo(state, action) {
  const todo = {...action.payload, completed: false };
  const entities = {...state.entities, [todo.id]: todo};
  const ids = [...state.ids, action.payload.id]
  return {
    entities,
    ids
  };
}

function applyToggleTodo(state, action) {
  const todo = state.entities[action.payload.id];
  if (todo === undefined) {
    return state;
  }

  const newTodo = {...todo, completed: !todo.completed};

  return {
    ...state,
    entities: {
      ...state.entities,
      [newTodo.id]: newTodo
    }
  }
}

function filterReducer(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case FILTER_SET: {
      return applySetFilter(state, action);
    }
    default: return state;
  }
}

function applySetFilter(state, action) {
  return action.payload;
}

function createAddTodoAction(id, name) {
  return {
    type: TODO_ADD,
    payload: { id, name },
  };
}

function createToggleTodoAction(id) {
  return {
    type: TODO_TOGGLE,
    payload: {
      id
    }
  }
}

function createSetFilterAction(filter) {
  return {
    type: FILTER_SET,
    payload: filter
  }
}

const rootReducer = combineReducers({
  todoState: todoReducer,
  filterState: filterReducer
});

function mapStateToProps(state) {
  return {
    todos: Object.keys(state.todoState.entities).map((key) => state.todoState.entities[key])
  }
}

function dispatchToggle(dispatch) {
  return {
    onToggleTodo: id => dispatch(createToggleTodoAction(id)),
  };
}

function dispatchAdd(dispatch) {
  return {
    onAddTodo: name => dispatch(createAddTodoAction(Math.floor(Math.random() * 100).toString(), name)),
  }
}

const TodoApp = ({onAddTodo}) => {
  console.log('TodoApp');
  const [text, setText] = useState('');

  return <div>
    <input type="text" value={text} onChange={(event) => setText(event.target.value)} />
    <button type="button" onClick={() => {
      onAddTodo(text);
      setText('');
      }}>
        Add Todo
    </button>
    <ConnectedTodoList />
  </div>
}

const TodoList = ({ todos }) => {
  console.log('TodoList');
  return (
    <div>
      {todos.map(todo => <ConnectedTodoListItem
        key={todo.id}
        todo={todo}
      />)}
    </div>
  );
}

const TodoListItem = ({ todo, onToggleTodo }) => {
  console.log('TodoListItem');
  const { name, id, completed } = todo;
  return (
    <div>
      {name}
      <button
        type="button"
        onClick={() => onToggleTodo(id)}
      >
        {completed ? "Incomplete" : "Complete"}
      </button>
    </div>
  );
}

const ConnectedTodoApp = connect(null, dispatchAdd)(TodoApp);
const ConnectedTodoList = connect(mapStateToProps)(TodoList);
const ConnectedTodoListItem = connect(null, dispatchToggle)(TodoListItem);


const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedTodoApp />
  </Provider>,
  document.getElementById('root')
);