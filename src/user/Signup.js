import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import Layout from '../core/Layout'
import {signup} from '../auth/index'

const Signup=() =>{
const [values,setValues]=useState({
  name:'',
  email:'',
  password:'',
  error:'',
  success:false
})

const {name,email,password,error,success}=values



const handleChange= name => event=>{
setValues({...values,error:false,[name]:event.target.value})
}


const clickSubmit=(event)=>{
  event.preventDefault()//to prevent page reload of browser
  setValues({...values,error:false})
 signup({name,email,password}).then(data=>{
   console.log(data)
  if(data.error){
    setValues({...values,error:data.error,success:false})
  }

  else{
    setValues({...values,name:'',email:'',password:'',success:true})
    
  }
 })

  
}

const showError=()=>(
   <div className="alert alert-danger" style={{display:error?'':'none'}}>
    {error}
  </div>
)


const showSuccess=()=>(
   <div className="alert alert-info" style={{display:success?'':'none'}}>
    Signup Successful.You can now <Link to='/signin'>Signin</Link>
  </div>
)

  const signUpForm=()=>(

    <div className="wrapper fadeInDown w-md-50 my-5">
    <h2 className= "my-2 text-muted">SignUp</h2>
    <form>
     
      <div className="form-group">
        <label className='text-muted'>Name</label>
        <input className='form-control fadeIn first my-1' type='text' onChange={handleChange('name')} value={name} />
       
      </div>
      {/* email */}
      <div className="form-group">
        <label className='text-muted'>Email</label>
        <input className='form-control fadeIn second my-1' type='Email' onChange={handleChange('email')} value={email}/>
      </div>

      <div className="form-group">
        <label className='text-muted'>password</label>
        <input className='form-control fadeIn third my-1' type='password' onChange={handleChange('password')} password={password}/>
      </div>
      <button onClick={clickSubmit} className='btn btn-primary'>Sign Up</button>
    </form>
    </div>
   

  )
return(
 <Layout title="Signup" description="Node react E-commerce App" className='container col-md-6 offset-md-3'>
   {showSuccess()}
   {showError()}
  {signUpForm()}
  {/* {JSON.stringify(values)} */}
</Layout>
)
}

export default Signup