import React ,{useState,useEffect,Fragment} from 'react'
import {Link,withRouter} from 'react-router-dom'
import {signout,isAuth} from '../auth'
import {getTotalItems} from './Carthelper'


const isActive=(history,path)=>{
    return history.location.pathname===path ? {'color':'#ff9900'} : {'color':'white'}
    
}

const Menu=({history}) =>{
    const [isScrolled,setIsScrolled]=useState(false)
    const notScrolled="navbar navbar-expand-lg sticky-top navbar-light bg-primary"
    useEffect(()=>{

        window.addEventListener('scroll',()=>{          
            if(window.scrollY>100){
                setIsScrolled(true)
            }
            else{
                setIsScrolled(false)
            }
        })
    })
  return (

   <nav className={isScrolled? `${notScrolled} scrolledNavbar`:notScrolled}>
                <Link className="navbar-brand" to="/">CodeBooks</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="nav navbar-nav ml-auto">
      <li className="nav-item">
           <Link className="nav-link" to='/' style={isActive(history,'/')}>Home</Link>
       </li>
       <li className="nav-item">
           <Link className="nav-link" to='/shop' style={isActive(history,'/shop')}>Shop</Link>
       </li>
       <li className="nav-item">
           <Link className="nav-link" to='/cart' style={isActive(history,'/cart')}>
                Cart    <sup><small className="cart-badge">{getTotalItems()}</small></sup>
           </Link>
       </li>
     {isAuth()&& isAuth().user.role===1 && <li className="nav-item">
           <Link className="nav-link" to='/admin/dashboard' style={isActive(history,'/admin/dashboard')}>Dashboard</Link>
       </li>}
        {!isAuth()&&
        
        <Fragment>

       <li className="nav-item">
           <Link className="nav-link" to='/signin' style={isActive(history,'/signin')}>Signin</Link>
       </li>

       <li className="nav-item">
           <Link className="nav-link" to='/signup' style={isActive(history,'/signup')}>Signup</Link>
       </li>
        </Fragment>}

        {isAuth()&& isAuth().user.role===0 &&
        
            <li className="nav-item">
           <Link className="nav-link" to='/user/dashboard' style={isActive(history,'/user/dashboard')}>Dashboard</Link>
       </li>}

      {isAuth() &&  <Fragment>
        
        <li className="nav-item">
           <span className="nav-link" onClick={()=>signout(()=>{
               history.push('/')})} style={{color:'#fff',cursor:'pointer'}}>Signout</span>
       </li>
       </Fragment>}

    </ul>
    </div>
    </nav>
  )
}

export default withRouter(Menu)