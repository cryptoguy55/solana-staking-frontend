import React from 'react'
import { Outlet, Link } from "react-router-dom";
import {
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import Logo from "../images/logo.png"


const TodoList: React.FC = () => {
 
  return (    
      <Outlet />
  )
}

export default TodoList