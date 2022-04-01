import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter'; //Counter inside {} is a component
import './App.css';

//It is recommended to split your components into separate files. To do that, create a new file with a .tsx file extension and put the code inside it
//for ex, this is the separate file for App components. *** Note that the filename must start with an uppercase character.***
//This is called function component
function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <Counter /> {/*this is how u call a function*/}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className='App-link'
            href='https://reactjs.org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            React
          </a>
          <span>, </span>
          <a
            className='App-link'
            href='https://redux.js.org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Redux
          </a>
          <span>, </span>
          <a
            className='App-link'
            href='https://redux-toolkit.js.org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className='App-link'
            href='https://react-redux.js.org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
