import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import SignIn from './components/SignIn.jsx'
import Home from './pages/Home.jsx'
import CreateChannel from './components/CreateChannel.jsx'
import NotFound from './pages/NotFound.jsx'
const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    errorElement:<NotFound/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"/signin",
        element:<SignIn />
      },
      {
        path:"/createChannel",
        element:<CreateChannel/>
      }
      
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
  
  </StrictMode>,
)
