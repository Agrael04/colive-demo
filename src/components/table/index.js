import React from 'react'

import Column from '../column'
import Card from '../card'

import classes from './style.module.css'

const tasks = [
  { id: 0, name: 'Melon' },
  { id: 1, name: 'Orange' },
  { id: 2, name: 'Apple' },
  { id: 3, name: 'Banana' },
]

function App() {
  const [todo, setTodo] = React.useState(tasks)
  const [inProgress, setInProgress] = React.useState([])
  const [qa, setQa] = React.useState([])
  const [done, setDone] = React.useState([])

  const handleDrop = (columnName) => (card) => {
    const values = {
      todo,
      inProgress,
      qa,
      done
    }

    const setters = {
      todo: setTodo,
      inProgress: setInProgress,
      qa: setQa,
      done: setDone
    }

    Object.keys(setters).map(key => {
      if (key === columnName) {
        if (!values[key].find(c => c.id === card.id)) {
          setters[key]([...values[key], card])
        }
      } else {
        setters[key](values[key].filter(c => {
          return c.id !== card.id
        }))
      }
    })
  }

  return (
    <div className={ classes.table }>
      <div className={ classes.columns }>
        <Column title='To do' cards={todo} onDrop={handleDrop('todo')}/>
        <Column title='In progress' cards={inProgress} onDrop={handleDrop('inProgress')}/>
        <Column title='QA' cards={qa} onDrop={handleDrop('qa')}/>
        <Column title='Done' cards={done} onDrop={handleDrop('done')}/>
      </div>
    </div>
  )
}

export default App
