import React from 'react'

import Column from '../column'

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
        setters[key]([...values[key], card])
      } else {
        setters[key](values[key].filter(c => {
          return c.id !== card.id
        }))
      }
    })
  }
  
  const addCard = (columnName) => (name) => {
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
        setters[key]([...values[key], { name, id: (new Date()).getTime() }])
      }
    })
  }
  
  const reorderList = (columnName) => (newIndex, card) => {
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
        if (values[key].findIndex(item => item.id === card.id) !== newIndex) {
          let arr = values[key].filter(item => item.id !== card.id)
          arr.splice(newIndex, 0, card)
          setters[key](arr)
        }
      }
    })
  }
  return (
    <div className={ classes.table }>
      <div className={ classes.columns }>
        <Column title='To do' cards={todo} onDrop={handleDrop('todo')} addCard={addCard('todo')} reorderList={reorderList('todo')}/>
        <Column title='In progress' cards={inProgress} onDrop={handleDrop('inProgress')} addCard={addCard('inProgress')} reorderList={reorderList('inProgress')}/>
        <Column title='QA' cards={qa} onDrop={handleDrop('qa')} addCard={addCard('qa')} reorderList={reorderList('qa')}/>
        <Column title='Done' cards={done} onDrop={handleDrop('done')} addCard={addCard('done')} reorderList={reorderList('done')}/>
      </div>
    </div>
  )
}

export default App
