// import logo from './logo.svg';
import './App.css';
import ToDo from './components/ToDo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import { useState } from 'react';
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  function addTask(name){
    setTasks([
      ...tasks, 
      { id: 'todo-'+nanoid(), name: name, completed: false }
    ]);
  }

  function toggleTaskCompleted(id) {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        console.log(task)
        return ({
          ...task,
          completed: !task.completed
        });
      }
      return task;
    }));
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function editTask(id, name) {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return ({
          ...task,
          name: name
        })
      }
      return task;
    }));
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form
        addTask={addTask}
      ></Form>
      {FILTER_NAMES.map(name =>
        <FilterButton
          key={name}
          name={name}
          isPressed={name === filter}
          setFilter={setFilter}
        ></FilterButton>
      )}
      <h2 id="list-heading">{tasks.length} {tasks.length !== 1 ? 'tasks' : 'task'} remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {tasks
          .filter(FILTER_MAP[filter])
          .map(task => 
          <ToDo 
            key={task.id}
            id={task.id}
            name={task.name}
            completed={task.completed}
            toggleTaskCompleted={toggleTaskCompleted}
            deleteTask={deleteTask}
            editTask={editTask}
          ></ToDo>
        )}
      </ul>
    </div>
  );
}

export default App;
