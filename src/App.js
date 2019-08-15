import React from 'react'
import { useDrag, DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import logo from './logo.svg'
import './App.css'

import Table from './components/table'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Table />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </DndProvider>
  )
}

export default App
