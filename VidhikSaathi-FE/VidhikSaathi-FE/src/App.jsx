import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Navbar from './componenets/Navbar'
import ProviderRegForm from './componenets/ProviderRegForm'
import UserRegister from './componenets/UserRegister'

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<><Navbar/></>
    },
    {
      path:"/userRegister",
      element:<><Navbar/><UserRegister/></>
    }
  ])

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
