import React ,{Fragment} from 'react'
import {Link,withRouter} from 'react-router-dom'
import {signout,isAuth} from '../auth'


const isActive=(history,path)=>{
    return history.location.pathname===path ? {'color':'#ff9900'} : {'color':'white'}
    
}
const Menu=({history}) =>{
  return (
   <ul className="nav nav-tabs bg-primary">
       <li className="nav-item">
           <Link className="nav-link" to='/' style={isActive(history,'/')}>Home</Link>
       </li>

        {!isAuth()&&
        
        <Fragment>

       <li className="nav-item">
           <Link className="nav-link" to='/signin' style={isActive(history,'/signin')}>Signin</Link>
       </li>

       <li className="nav-item">
           <Link className="nav-link" to='/signup' style={isActive(history,'/signup')}>Signup</Link>
       </li>
        </Fragment>}

      {isAuth() &&  <div >
          
        <li className="nav-item">
           <span className="nav-link" onClick={()=>signout(()=>{
               history.push('/')})} style={{color:'#fff',cursor:'pointer'}}>Signout</span>
       </li>
       </div>}

   </ul>
  )
}

export default withRouter(Menu)