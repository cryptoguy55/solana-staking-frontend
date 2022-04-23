import React, { useEffect, useState } from 'react'
import axios from "axios"
import {
  resolveToWalletAddress,
  getParsedNftAccountsByOwner,
} from "@nfteyez/sol-rayz";
import Vinny from "../images/vianney.jpg"
import { kill } from 'process';
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
  const [ collection, setCollection ] = useState<any[]>([])
 useEffect(() => {
   const getNfts = async () => {
    const publicAddress = await resolveToWalletAddress({
      text: "A6oomfmY99sEGUB8Rwr5Cc2VsRkAS6mj1MoN6J7VSy5G"
    });
    
    const nftArray = await getParsedNftAccountsByOwner({
      publicAddress,
    });
    console.log(nftArray)
    let k: any[] = []
    nftArray.forEach( item => {
      axios.get(item.data.uri)
      .then(res => {
        k.push(res.data)
        setCollection([...k])
      })
    })
   }
   getNfts()
 },[])
 console.log(collection)
  return (
    <div className='market'>
      {
        collection.map( (item, key) => (
          <div className='card' key={key}>
            <img src={item.image} />
            <section>
              <p>{item.name}</p>
              <span><input />&nbsp; Tek</span>
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