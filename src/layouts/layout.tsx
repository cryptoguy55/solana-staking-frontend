// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { Outlet, Link } from "react-router-dom";
import {
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import * as SPLToken from "@solana/spl-token";
import Logo from "../images/logo.png"


const TodoList: React.FC = () => {
  const { publicKey } = useWallet();
  const [ balance, setBalance ] = useState()
  useEffect( () => {
    const getBalance = async () => {  
      const connection = new Connection(clusterApiUrl('mainnet-beta'));
      
      let response = await connection.getTokenAccountsByOwner(
        new PublicKey("GqzmE2tv6GexJwC6Vjux7pt3oPUXtUcPRgrhTaXz11ZY"), // owner here
        {
          programId: TOKEN_PROGRAM_ID,
        }
      );
      let k = response.value.find( e => {
         const accountInfo = SPLToken.AccountLayout.decode(e.account.data);
         return new PublicKey(accountInfo.mint).toString() == "B3DRD16zzuybK5Ku4Vv79hp6cxkBmZvTnrDx16N5D5ct" 
      })
      const accountInfo = SPLToken.AccountLayout.decode(k.account.data);
      
    setBalance(parseInt(accountInfo.amount) / 10**6)
    }
    getBalance()
  }, [])
  console.log(balance)
  return (
    <div className='App'>
      <div className='nav'>
        <nav>
          <img src = {Logo} />
          <Link to="/">Home</Link>
          <Link to="/market">Marketplace</Link>
          <Link to="/vault">Vault</Link> 
          <Link to="/admin">Airdrop</Link> 
          <Link to="/admin/list">List NFTS</Link>
          <span style={{flexGrow: 1}} />
          { publicKey && <span>balance: {balance} TEK</span> }
          <WalletMultiButton /> 
        </nav>
      </div>            
      <Outlet />
    </div>
  )
}

export default TodoList