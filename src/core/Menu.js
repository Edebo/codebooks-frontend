import React from 'react'
import {Link,withRouter} from 'react-router-dom'


const isActive=(history,path)=>{
    return history.location.pathname===path ? {'color':'#ff9900'} : {'color':'white'}
    
}
const Menu=({history}) =>{
  return (
   <ul className="nav nav-tabs bg-primary">
       <li className="nav-item">
           <Link className="nav-link" to='/' style={isActive(history,'/')}>Home</Link>
       </li>

       <li className="nav-item">
           <Link className="nav-link" to='/signin' style={isActive(history,'/signin')}>Signin</Link>
       </li>

       <li className="nav-item">
           <Link className="nav-link" to='/signup' style={isActive(history,'/signup')}>signup</Link>
       </li>

   </ul>
  )
}

export default withRouter(Menu)