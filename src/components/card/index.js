import React from 'react'
import { useDrag } from 'react-dnd'
const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  margin: '10px auto',
  cursor: 'move',
  width: '80%',
  float: 'left',
  color: 'black'
}

const Card = ({ card }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { ...card, type: 'card' },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        console.log(card)
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0.4 : 1
  return (
    <div ref={drag} style={{ ...style, opacity }} id={card.id}>
      {card.name}
    </div>
  )
}

export default Card
  