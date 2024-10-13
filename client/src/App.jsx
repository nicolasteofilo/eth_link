import { Footer } from './view/components/Footer'
import { Services } from './view/components/Services'
import { Transactions } from './view/components/Transactions'
import { Welcome } from './view/components/Welcome'

const App = () => {
  return (
    <main className='min-h-screen'>
      <div className="gradient-bg-welcome w-full">
        <Welcome />
      </div>

      <Services />
      <Transactions />
      <Footer />
    </main>
  )
}

export default App
