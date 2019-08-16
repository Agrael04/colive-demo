import React from 'react'
import { useDrop } from 'react-dnd'
import classnames from 'classnames'

import classes from './style.module.css'

import Card from '../card'

const Column = ({ title, cards, onDrop }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'card',
    drop: (value) => onDrop(value),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

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
      <div>
        add card here
      </div>
    </div>
  )
}
export default Column
