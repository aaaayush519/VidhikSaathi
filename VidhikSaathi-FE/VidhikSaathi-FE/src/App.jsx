import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Navbar from './componenets/Navbar'
import ProviderRegForm from './componenets/ProviderRegForm'
import UserRegister from './componenets/UserRegister'
import ProviderList from './componenets/ProviderList'
import RegisterSuccess from './componenets/RegisterSuccess'

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<><Navbar/></>
    },
    {
      path:"/userRegister",
      element:<><Navbar/><UserRegister/></>
    },
    {
      path:"/findProviders",
      element:<><Navbar/><ProviderList/></>
    },
    {
      path:"/register-success",
      element:<><Navbar/><RegisterSuccess/></>
    }
  ])

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
