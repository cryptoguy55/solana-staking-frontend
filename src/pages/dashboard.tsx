import React from 'react'
import { Outlet } from "react-router-dom";
import {
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import Title from "../images/title.png"


const TodoList: React.FC = () => {
 
  return (
    <div className='dashboard'>
      <img src={Title} />
      <p>
        This place is a secret place, forbidden to the general public and away from prying eyes...<br/>

        Here you will find all the creatures and things the wolves have captured and stolen.<br/>

        All can be exchanged for $tequila, the Wolves Club ecosystem token.<br/>
      </p>
    </div>
  )
}

export default TodoList