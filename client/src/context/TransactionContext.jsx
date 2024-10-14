import { BrowserProvider, Contract } from 'ethers'
import { createContext, useEffect, useState } from 'react'

import { contractABI, contractAdress } from '../utils/constants'

export const TransactionContext = createContext()

const ethereum = window.ethereum

const getEthereumContract = () => {
  const provider = new BrowserProvider(ethereum)
  const signer = provider.getSigner()
  const contract = new Contract(contractAdress, contractABI, signer)

  console.log({
    provider,
    signer,
    contract
  })
}

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState()

  const asMetamaskWallet = async () => {
    if (!ethereum) {
      alert("Instale a metamask wallet!")
    }
  }

  const checkIfWalletIdConnected = async () => {
    try {
      await asMetamaskWallet();

      const accounts = await ethereum.request({
        method: 'eth_accounts'
      })

      if (accounts.length) {
        setCurrentAccount(accounts[0])
      } else {
        console.log('No account found')
      }
    } catch (error) {
      console.error('No ETH object', error)
    }
  }

  const connectWallet = async () => {
    try {
      await asMetamaskWallet();

      const requestAccounts = await ethereum.request({
        method: 'eth_requestAccounts'
      })

      setCurrentAccount(requestAccounts[0])
    } catch (error) {
      console.error('No ETH object', error)
    }
  }

  useEffect(() => {
    checkIfWalletIdConnected()
  }, [])

  return (
    <TransactionContext.Provider value={{ currentAccount, connectWallet, getEthereumContract }}>
      {children}
    </TransactionContext.Provider>
  )
}