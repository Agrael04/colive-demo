import React from 'react'
import { useDrop } from 'react-dnd'
import classnames from 'classnames'

import classes from './style.module.css'

import Card from '../card'

const Column = ({ title, cards, onDrop, addCard, reorderList }) => {
  const [showTextInput, setShowTextInput] = React.useState(false)
  const [cardTitle, setCardTitle] = React.useState('')
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'card',
    drop: (value, mon) => {
      if (cards.find(c => c.id === value.id)) {
        const coords = cards
          .map(c => document.getElementById(c.id).getBoundingClientRect())
          .map(i => i.y + i.height / 2)
        const dropY = mon.getClientOffset().y
        let i

        for (i = 0; i < coords.length; i++) {
          const y = coords[i]

          if (dropY <= y) {
            break
          }
        }

        for (let coord in coords) {
          if (dropY < coord) {
            return
          }
        }

        reorderList(i, value)
      } else {
        onDrop(value)
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const handleSubmit = () => {
    addCard(cardTitle)
    setCardTitle('')
    setShowTextInput(false)
  }

  const isActive = canDrop && isOver

  return (
    <div ref={drop} className={ classnames(classes.column, isActive && classes.activeColumn) }>
      <div>
        <div>
          {title}
        </div>
        <div className={ classes.cardsBlock }>
          {
            cards.map(card => (
              <Card card={card} />
            ))
          }
        </div>
      </div>
      {
        !showTextInput
        ? <div className={ classes.addHereBlock } onClick={() => setShowTextInput(true)}>
          add card here
        </div>
        : <div className={ classes.addHereInputBlock }>
          <input type='text' className={ classes.input } value={ cardTitle } onChange={(e) => setCardTitle(e.target.value)}/>
          <button onClick={handleSubmit}>add</button>
        </div> 
      }
      
    </div>
  )
}
export default Column
