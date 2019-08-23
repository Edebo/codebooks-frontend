import React,{useState} from 'react'
import Layout from '../core/Layout'
import {Redirect} from 'react-router-dom'
import {signin,authenticate,isAuth} from '../auth/index'

const Signin=() =>{
const [values,setValues]=useState({
  email:'',
  password:'',
  error:'',
  loading:false,
  redirectToReferrer:false
})

const {email,password,error,loading,redirectToReferrer}=values
const {user}=isAuth()


const handleChange= name => event=>{
setValues({...values,error:false,[name]:event.target.value})
}


const clickSubmit=(event)=>{
  event.preventDefault()//to prevent page reload of browser
  setValues({...values,error:false,loading:true})
 signin({email,password}).then(data=>{
   console.log(data)
  if(data.error){
    setValues({...values,error:data.error,loading:false})
  }

  else{
    authenticate(data,()=>{
      setValues({...values,redirectToReferrer:true,loading:false})
    })
    
  }
 })

  
}

const showError=()=>(
   <div className="alert alert-danger" style={{display:error?'':'none'}}>
    {error}
  </div>
)


const showLoading=()=>(
   loading && (<div className="alert alert-info"><h2>Loading...</h2></div>)
)

const redirectUser=()=>{
  if(redirectToReferrer){
    if(user && user.role===1){
      return <Redirect to='/admin/dashboard'/>
    }
    return <Redirect to='/user/dashboard'/>
  }
  if(isAuth()){
    return <Redirect to='/'/>
  }
}
  const signInForm=()=>(

     <div className="wrapper fadeInDown">
     <form>
      
      <div className="form-group">
        <label className='text-muted'>Email</label>
        <input className='form-control fadeIn second' type='Email' onChange={handleChange('email')} value={email}/>
      </div>

      <div className="form-group">
        <label className='text-muted'>password</label>
        <input className='form-control fadeIn third' type='password' onChange={handleChange('password')} password={password}/>
      </div>
      <button onClick={clickSubmit} className='btn btn-primary'>Sign In</button>
    </form>

     </div>
   
  )

//   const login=()=>{
//     <div className="wrapper fadeInDown">
//   <div id="formContent">
   

  
//     <div className="fadeIn first">
//       <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
//     </div>

   
//     <form>
//       <input type="text" id="login" className="fadeIn second" name="login" placeholder="login">
//       <input type="text" id="password" className="fadeIn third" name="login" placeholder="password">
//       <input type="submit" className="fadeIn fourth" value="Log In">
//     </form>


//     <div id="formFooter">
//       <a class="underlineHover" href="#">Forgot Password?</a>
//     </div>

//   </div>
// </div>
//   }
return(
 <Layout title="Signin" description="Node react E-commerce App" className='container col-md-8 offset-2'>
   {showLoading()}
   {showError()}
  {signInForm()}
  {redirectUser()}
  {/* {JSON.stringify(values)} */}
</Layout>
)
}

export default Signin