import { ethers } from 'ethers'
import { createContext, useEffect, useState } from 'react'

import { contractABI, contractAddress } from '../utils/constants'

export const TransactionContext = createContext()

const ethereum = window.ethereum

const createEthereumContract = async () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
}

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [, setTransactionCount] = useState(0)
  const [formData, setFormData] = useState({
    addressTo: '',
    amount: '',
    message: ''
  })

  const handleChangeFormData = (e, name) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value }))
  }

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

  const sendTransaction = async () => {
    try {
      await asMetamaskWallet()

      const { addressTo, amount, message } = formData
      const transactionsContract = await createEthereumContract()
      const parsedAmount = ethers.utils.parseEther(amount)

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x5208', // 2100 GWEI
          value: parsedAmount._hex,
        }]
      })

      const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message)
      setIsLoading(true)
      await transactionHash.wait()
      setIsLoading(false)

      const transactionsCount = await transactionsContract.getTransactionCount()
      setTransactionCount(transactionsCount.toNumber())

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    checkIfWalletIdConnected()
  }, [])

  return (
    <TransactionContext.Provider value={{ currentAccount, connectWallet, sendTransaction, handleChangeFormData, formData, isLoading, setIsLoading }}>
      {children}
    </TransactionContext.Provider>
  )
}