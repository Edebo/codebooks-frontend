import React,{useState,useEffect} from 'react'
import Layout from '../core/Layout'
import {Redirect,Link} from 'react-router-dom'
import {isAuth} from '../auth'
import {readUser,updateUser,updateUserInCart} from './apiUser'


const Profile = (match) => {
    const [values,setValues] =useState({
        name:'',
        email:'',
        password:"",
        error:'',
        success:false

    })

    const {name,email,password,error,success}=values
    // const [profile,setProfile]=useState({})
    const token=isAuth() && isAuth().token
    const init=(userId)=>{
            readUser(userId,token).then(data=>{
                if(data.error){
                    setValues({...values,error:data.error})
                }

                setValues({...values,name:data.name,email:data.email,success:true})
            })
    }

    useEffect(()=>{
        init(match.params.userId)
    },[])

   
  return (
    <Layout title="Profile page" description="Node react E-commerce App" className="container">
     
      
     {}
      
    </Layout>
  )
}

export default Profile
