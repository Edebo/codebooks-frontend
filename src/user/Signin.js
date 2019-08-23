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

     <div className="wrapper fadeInDown w-40 my-5">
       <h2 className= "my-2 text-muted">SignIn</h2>
     <form>
      
      <div className="form-group">
        <label className='text-muted'>Email</label>
        <input className='form-control fadeIn second my-1' type='Email' onChange={handleChange('email')} value={email}/>
      </div>

      <div className="form-group">
        <label className='text-muted'>Password</label>
        <input className='form-control fadeIn third my-1' type='password' onChange={handleChange('password')} password={password}/>
      </div>
      <button onClick={clickSubmit} className='btn btn-primary signin'>Sign In</button>
    </form>

     </div>
   
  )

return(
 <Layout title="Signin" description="Node react E-commerce App" className='container col-md-6 offset-md-3'>
   {showLoading()}
   {showError()}
  {signInForm()}
  {redirectUser()}
  {/* {JSON.stringify(values)} */}
</Layout>
)
}

export default Signin