import React, { useEffect } from 'react'
import axios from "axios"
import {
  resolveToWalletAddress,
  getParsedNftAccountsByOwner,
} from "@nfteyez/sol-rayz";
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
 useEffect(() => {
   const getNfts = async () => {
    const publicAddress = await resolveToWalletAddress({
      text: "GqzmE2tv6GexJwC6Vjux7pt3oPUXtUcPRgrhTaXz11ZY"
    });
    
    const nftArray = await getParsedNftAccountsByOwner({
      publicAddress,
    });
    console.log(nftArray)
    nftArray.forEach( item => {
      axios.get(item.data.uri)
      .then(res => {
        console.log(res)
      })
    })
   }
   getNfts()
 })
  return (
    <div className='market'>
      {
        list.map( (item, key) => (
          <div className='card' key={key}>
            <img src={item.image} />
            <section>
              <span>{item.name}</span>
              <span><input /> Tek</span>
            </section>
            <footer>
              <button className='btn'>List</button>
            </footer>
          </div>
        ))
      }
    </div>
  )
}

export default TodoList