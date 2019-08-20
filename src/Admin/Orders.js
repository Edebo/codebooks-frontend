import React,{useState,useEffect} from 'react'
import {listOrder} from './apiAdmin'
import {isAuth} from '../auth'
import {Link} from 'react-router-dom'
import Layout from '../core/Layout'

const Orders = () => {

    const [orders,setOrders]=useState([])
    const [error,setError] =useState('')

    const userId=isAuth() && isAuth().user._id
    const token=isAuth() && isAuth().token

    const getOrders=()=>{
        listOrder(userId,token).then(data=>{
                setOrders(data)
        }).catch(err=>{
            setError(err)
        })
    }

    const showOrder=()=>{

        if(orders.length>0){
            return (
                <h2 className="text-danger display-2">Total Order :{orders.length}</h2>
            )
        }
        return orders.length<1?<h4>No orders</h4>:null
    }

    useEffect(()=>{
            getOrders()
    },[])
  
  return (
   <Layout title="" description="" className="container">
      
            {showOrder()}
            {JSON.stringify(orders)}
     
    </Layout>
  )
}

export default Orders
