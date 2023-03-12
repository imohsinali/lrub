import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Context } from '../context/context'

export default function Layout({children}) {
  console.log(Context)
  return (
    <>
    <Navbar/>
    <main>
        {
            children
        }
    </main>
    </>
  )
}