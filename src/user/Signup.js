import React,{useState} from 'react'
import Layout from '../core/Layout'
import {API} from '../config'

const Signup=() =>{
const [values,setValues]=useState({
  name:'',
  email:'',
  password:'',
  error:'',
  success:false
})

const {name,email,password,error,success}=values


const signup=(user)=>{
  // console.log(name,email,password)
return fetch(`${API}/signup`,{
  method:"POST",
  headers:{
    Accept:"application/json",
    "Content-Type":"application/json"
  },
  body:JSON.stringify(user)
})
.then(result=> {
  console.log(result)
  return result.json()})
.catch(err=>{
  console.log(err)
})


}

const handleChange= name => event=>{
setValues({...values,error:false,[name]:event.target.value})
}

const clickSubmit=(event)=>{
  event.preventDefault()//to prevent page reload of browser
  const data = signup({name,email,password})
  console.log(data)
  if(data.error){
    setValues({...values,error:data.errors,success:false})
  }

  else{
    setValues({...values,name:'',email:'',password:'',success:true})
    
  }
}

const showError=()=>(
   <div className="alert alert-danger" style={{display:error?'':'none'}}>
    {error}
  </div>
)


const showSuccess=()=>(
   <div className="alert alert-info" style={{display:success?'':'none'}}>
    Signup Successful
  </div>
)

  const signUpForm=()=>(
    <form>
      {/* name */}
      <div className="form-group">
        <label className='text-muted'>Name</label>
        <input className='form-control' type='text' onChange={handleChange('name')} value={name}/>
        
      </div>
      {/* email */}
      <div className="form-group">
        <label className='text-muted'>Email</label>
        <input className='form-control' type='Email' onChange={handleChange('email')} value={email}/>
      </div>

      <div className="form-group">
        <label className='text-muted'>password</label>
        <input className='form-control' type='password' onChange={handleChange('password')} password={password}/>
      </div>
      <button onClick={clickSubmit} className='btn btn-primary'>Sign Up</button>
    </form>

  )
return(
 <Layout title="Signup" description="Node react E-commerce App" className='container col-md-8 offset-2'>
   {showSuccess()}
   {showError()}
  {signUpForm()}
  {JSON.stringify(values)}
</Layout>
)
}

export default Signup