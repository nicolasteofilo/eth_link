
import logo from '../../assets/logo.png'

export const Navbar = () => {
  return (
    <nav className='w-full flex p-2 justify-center md:p-0'>
        <img src={logo} alt="logotipo" className='w-32 cursor-pointer mt-2' />
    </nav>
  )
}