import { useContext} from 'react'
import { AuthContext } from '../Authprovider'
import { Navigate } from 'react-router-dom'

const Privateroute = ({children}) => {
    const { isLoggedIn } =useContext(AuthContext)
  return isLoggedIn? (
    children
  ):(
    <Navigate to='/'/>
  )
}

export default Privateroute