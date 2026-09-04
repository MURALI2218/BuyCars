import React from "react"
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'
import Notfound404 from './pages/Notfound'
import Owncarslist from "./pages/owncars"
import ProtectedRoute from "./components/ProtectedRoute"
import { BrowserRouter, Navigate, Route , Routes} from "react-router-dom"


function Logout() {
  localStorage.clear()
  return <Navigate to='/login' />
}
function RegisterandLogout(){
  localStorage.clear()
  return <Register ></Register>
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<ProtectedRoute> <Home/></ProtectedRoute>} />
        <Route path='/login' element = {<Login></Login>}></Route>
        <Route path='/register' element= { <RegisterandLogout></RegisterandLogout>}></Route>
        <Route path='/logout' element={<Logout></Logout>}> </Route>
        <Route path="*" element={<Notfound404></Notfound404>}></Route>
        <Route path='/owncarslist' element={<ProtectedRoute><Owncarslist/></ProtectedRoute>}></Route>
       </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
