import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Navbar from './componenets/Navbar'
import ProviderNavbar from './componenets/ProviderNavbar'
import LoginPage from './componenets/LoginPage'
import UserRegister from './componenets/UserRegister'
import ProviderList from './componenets/ProviderList'
import RegisterSuccess from './componenets/RegisterSuccess'
import ProviderProfile from './componenets/ProviderProfile'
import ProviderDashboard from './componenets/ProviderDashboard'
import ProviderHome from './componenets/ProviderHome'
import UserHome from './componenets/UserHome'
import UserRequestsList from './componenets/UserRequestsList'
import CompleteProviderProfile from './componenets/CompleteProviderProfile'

function App() {
  const router = createBrowserRouter([
    {
      path:"/userhome",
      element:<><Navbar/><UserHome/></>
    },
    {
      path:"/providerhome",
      element:<><ProviderNavbar/><ProviderHome/></>
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
    },
    {
      path:"/login",
      element:<><Navbar/><LoginPage/></>
    },
    {
      path:"/",
      element:<><Navbar/><LoginPage/></>
    },
    {
      path:"/userRequests",
      element:<><Navbar/><UserRequestsList/></>
    },
    {
      path:"/provider/:id",
      element:<><Navbar/><ProviderProfile/></>
    },
    {
      path:"/providerDashboard",
      element:<><ProviderNavbar/><ProviderDashboard/></>
    },
    {
      path:"/myProviderProfile",
      element:<><ProviderNavbar/><CompleteProviderProfile/></>
    }
  ])

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
