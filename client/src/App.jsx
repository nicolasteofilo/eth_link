import { Footer, Navbar, Services, Transactions, Welcome, } from './view/components'

const App = () => {
  return (
    <main className='min-h-screen'>
      <div className="gradiant-bg-welcome">
        <Navbar />
        <Welcome />
      </div>

      <Services />
      <Transactions />
      <Footer />
    </main>
  )
}

export default App
