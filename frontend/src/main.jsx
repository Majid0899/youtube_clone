import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import LogIn from './components/LogIn.jsx'
import Home from './pages/Home.jsx'
import CreateChannel from './components/CreateChannel.jsx'
import NotFound from './pages/NotFound.jsx'
import SignUp from './components/SignUp.jsx'
import ChannelPage from './components/ChannelPage.jsx'
import MyChannel from './components/MyChannel.jsx'
import WatchVideo from './components/WatchVideo.jsx'
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
        element:<LogIn/>
      },
      {
        path:"/createChannel",
        element:<CreateChannel/>
      },{
        path:"/signup",
        element:<SignUp />
      },{
        path:"/channel/:id",
        element:<ChannelPage />
      },{
        path:"/myChannel/:id",
        element:<MyChannel />
      },{
        path:"/watch/:id",
        element:<WatchVideo/>
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
