import { useContext, useState } from 'react'

import { BsInfoCircle } from 'react-icons/bs'
import { SiEthereum } from 'react-icons/si'

import metamaskLogo from '../../assets/icons/metamask.svg'

import { TransactionContext } from '../../context/TransactionContext'

import { Input } from './Input'
import { Spinner } from './Spinner'

export const Welcome = () => {
  const [isLoading, ] = useState(false)
  const { connectWallet, currentAccount } = useContext(TransactionContext)

  function handleSubmit() {
    console.log('Submited')
  }

  return (
    <div className='flex w-full justify-center items-center'>
      <div className='flex 2xl:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>
        <div className='flex flex-1 justify-start flex-col md:mr-10'>
          <h1 className="font-bold text-3xl sm:text-4xl text-gradient py-1">Envie ETH <br /> para <b>todo o mundo.</b></h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 ">Explore o mundo das criptomoedas. Transfira agora mesmo ETH entre carteiras!</p>
          
          <button type="button" onClick={connectWallet} className="font-semibold flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer">
            {currentAccount ? 'Carteira conectada' : 'Conectar carteira '}
          <img src={metamaskLogo} className='w-8 ml-4' />
          </button>
        </div>

        <div className='flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10'>
          <div className='p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-96 w-full my-5 eth-card white-glassmorphism'>
            <div className='flex justify-between  flex-col w-full h-full'>
              <div className='flex justify-between items-start'>
                <div className='w-10 h-10 rounded-full border-2 border-white flex justify-center items-center'>
                  <SiEthereum fontSize={21} color='#fff' />
                </div>
                <BsInfoCircle fontSize={21} color='#fff' />
              </div>

              <div>
                <p className="text-white font-light text-sm">
                  {currentAccount}
                </p>
                <p className="text-white font-semibold text-md">
                  ETH
                </p>
              </div>
            </div>
          </div>

          <div className='p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism'>
            <div className='flex justify-start w-full'>
              <h3 className='font-bold text-xl mb-5'>Tranferir ETH</h3>
            </div>

            <div className='flex flex-col w-full'>
              <Input placeholder="Endereço" type="text" name="adressTo" handleChange={() => {}} />
              <Input placeholder="Quantidade (ETH)" type="number" name="amount" handleChange={() => {}} />
              <Input placeholder="Mensagem" type="text" name="message" handleChange={() => {}} />

              <div className='mt-4 flex w-full justify-center'>
                {isLoading ? <Spinner /> : (
                  <button className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer font-semibold' onClick={handleSubmit}>Transferir</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}