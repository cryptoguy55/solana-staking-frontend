import React from 'react'
import Vinny from "../images/vianney.jpg"
const list = [
 {
   image: Vinny,
   name: "Vinny",
   price: 333
 }, 
 {
   image: Vinny,
   name: "Vinny",
   price: 333
 }, 
 {
   image: Vinny,
   name: "Vinny",
   price: 333
 } 
]

const TodoList: React.FC = () => {
 
  return (
    <div className='market'>
      {
        list.map( item => (
          <div className='card'>
            <img src={item.image} />
            <section>
              <span>{item.name}</span>
              <span>{item. price} Tek</span>
            </section>
            <footer>
              <button className='btn'>buy</button>
            </footer>
          </div>
        ))
      }
    </div>
  )
}

export default TodoList