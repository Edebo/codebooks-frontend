import React,{useState} from 'react'
import Layout from '../core/Layout'
// import {API} from '../config'

const Signup=() =>{
const [values,setValues]=useState({
  name:'',
  email:'',
  password:'',
  error:'',
  success:false
})

const {name,email,password}=values

const signup=(name,email,password)=>{
  console.log(name,email,password)
}

const handleChange= name => event=>{
  if(name==='email'){
    
  }
setValues({...values,error:false,[name]:event.target.value})
}

const clickSubmit=(event)=>{
  event.preventDefault()
  signup(name,email,password)
}

  const signUpForm=()=>(
    <form>
      {/* name */}
      <div className="form-group">
        <label className='text-muted'>Name</label>
        <input className='form-control' type='text' onChange={handleChange('name')}/>
      </div>
      {/* email */}
      <div className="form-group">
        <label className='text-muted'>Email</label>
        <input className='form-control' type='Email' onChange={handleChange('email')}/>
      </div>

      <div className="form-group">
        <label className='text-muted'>password</label>
        <input className='form-control' type='password' onChange={handleChange('password')}/>
      </div>
      <button onClick={clickSubmit} className='btn btn-primary'>Sign Up</button>
    </form>

  )
return(
 <Layout title="Signup" description="Node react E-commerce App" className='container col-md-8 offset-2'>
  {signUpForm()}
  {JSON.stringify(values)}
</Layout>
)
}

export default Signup