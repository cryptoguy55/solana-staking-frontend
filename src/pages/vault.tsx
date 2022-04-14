import React from 'react'
import { useWallet } from '@solana/wallet-adapter-react';
import close from "../images/close.png";
import open from "../images/open.png";

const TodoList: React.FC = () => {
  const { publicKey, sendTransaction } = useWallet();
  return (
    <div className='vault'>
      <section>
      {publicKey? 
        <>
        <img src={open} />        
        <div>
          <p>0.03 SOL</p>
          <button className='btn'>Withdraw</button>
        </div>
        </> : 
        <img src={close} />}
      </section>
    </div>
  )
}

export default TodoList