import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
const Navbar = () => {
  return (
    <div className='flex flex-col md:flex-row justify-center md:justify-start
    items-center py-2'>
      <div className="logo mx-5">
        <Image width={100} height={40} src="/home.jpg" alt="Logo" />
      </div>
      <div className="nav">
        <ul className='flex  items-center space-x-2 font-bold md:text-xl'>
            <Link href={'/tshirts'}><li>Tshirts</li></Link>
            <Link href={'/hoodies'}><li>Hoodies</li></Link>
            <Link href={'/stickers'}><li>Stickers</li></Link>
            <Link href={'/mugs'}><li>Mugs</li></Link>
        </ul>
      </div>
      <div className="cart absolute right-0 top-4 mx-5">
        <AiOutlineShoppingCart className='text-xl md:text-3xl '/>
      </div>
    </div>
  )
}

export default Navbar
