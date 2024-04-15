import React from 'react'
import { ShoppingCartTable } from '../components/cart/ShoppingCartTable'

export default function MyCart() {
  return (
    <div className='md:container mx-auto lg:px-10 px-[15px] my-5'>
      <div>
        <ShoppingCartTable/>
      </div>
    </div>
  )
}
