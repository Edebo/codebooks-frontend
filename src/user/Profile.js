import React,{useState,useEffect} from 'react'
import Layout from '../core/Layout'
import {Redirect,Link} from 'react-router-dom'
import {isAuth} from '../auth'
import {readUser,updateUser,updateUserInCart} from './apiUser'


const Profile = (props) => {
    const [values,setValues] =useState({
        name:'',
        email:'',
        password:"",
        error:'',
        success:false

    })
    const id=props.match.params.userId

    const {name,email,password,error,success}=values
    // const [profile,setProfile]=useState({})
    const token=isAuth() && isAuth().token

    const userLinks=()=>{
        return (
         <div className="card mb-2">
             <h3 className="card-header">Purchase history</h3>
                 <ul className="list-group">
                     <li className="list-group-item">
                         <Link className='nav-link' to='/cart'>My Cart</Link>
                     </li>
 
                     <li className="list-group-item">
                         <Link className='nav-link' to={`/profile/${id}`}>Update profile</Link>
                     </li>
                 
                 </ul>
     </div>
        )
 
    }
    const handleChange=value=>event=>{
            setValues({...value,error:false,[value]:event.target.value})
    }

    const clickSubmit=(e)=>{
            e.preventDefault()
            console.log({name,email,password})
            updateUser(id,token,{name,email,password})
            .then(data=>{
                if(data.error){
                    setValues({...values,error:data.error})
                }
                updateUserInCart(data,()=>{

                    setValues({...values,name:data.name,email:data.email,success:true})
                    console.log(success)
                   
                })

            }).catch(err=>{

            })
    }

    const redirectUser=(success)=>{
          if(success){
              return <Redirect to="/user/dashboard"/>
          }
            
    }

  const profileUpdate=(name,email,password)=> (
         

                <div className="card mb-5">
                <h3 className="card-header">Update Profile</h3>
                <form className="p-4">
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" value={name} onChange={handleChange('name')}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" className="form-control" value={email} onChange={handleChange('email')}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" className="form-control" value={password} onChange={handleChange('password')}/>
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">Update Profile</button>
        </form>
            </div>
        )
       
    

    const init=(userId)=>{
            readUser(userId,token).then(data=>{
                if(data.error){
                    setValues({...values,error:data.error})
                }

                setValues({...values,name:data.name,email:data.email})
            })
    }

    useEffect(()=>{
        init(id)
    },[])

   
  return (
    <Layout title="Profile Edit page" description="Node react E-commerce App" className="container-fluid">
     

     <div className="row">
           <div className="col-md-3">
                 {userLinks()}
           </div>

           <div className="col-md-9">
            
                {profileUpdate(name,email,password)}
                {redirectUser(success)}
           </div>
       </div>
      
    </Layout>
  )
}

export default Profile
