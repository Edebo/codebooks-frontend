import React,{useState,useEffect} from 'react'
import {listOrders,getStatusValues,updateStatus} from './apiAdmin'
import {isAuth} from '../auth'
import {Link} from 'react-router-dom'
import Layout from '../core/Layout'
import moment from 'moment'

const Orders = () => {

    const [orders,setOrders]=useState([])
    const [statusValues,setStatusValues]=useState([])
    const [error,setError] =useState('')

    const userId=isAuth() && isAuth().user._id
    const token=isAuth() && isAuth().token

    const getOrders=()=>{
        listOrders(userId,token).then(data=>{
                setStatusValues(data)
        }).catch(err=>{
            setError(err)
        })
    }

    const getStatus=()=>{
        getStatusValues(userId,token).then(data=>{
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

    const showInput=(key,value)=>{
      return  <div className="input-group mb-2 mr-2">
            <div className="input-group-prepend">
                <div className="input-group-text">
                    {key}
                </div>

                <input type="text" value={value} className="form-control" readOnly/>
            </div>
        </div>
    }

    const handleStatusChange=(e,id)=>{
        updateStatus(userId,token,id,e.target.value).then(data=>{
            if(data.error){
                console.log('status updat failed')
            }
            getOrders()

        }).catch(err=>{

        })
    }

    const showStatus=(order)=>{
        return <div className="form-group">
            <h3 className="mark">Status:{order.status}</h3>
            <select onChange={()=>handleStatusChange(order._id)} className="form-control">
                <option>Update Status</option>
                {statusValues.map((status,i)=>{
                  return  <option key={i} value={status}>{status}</option>
                })}
            </select>
        </div>
    }

    useEffect(()=>{
            getOrders()
            getStatus()
    },[])
  
  return (
   <Layout title="" description="" className="container">
      
            {showOrder()}
            
            {orders.map((order,i)=>{
                return (
                    <div className="mt-5" key={i} style={{'borderBottom':'5px solid indigo'}}>
                        <h2 className="mb5">
                            <span className="bg-primary">
                                Order Id:order._id
                            </span>
                        </h2>

                        <ul className="list-group">
                            <li className="list-group-item">
                               Status :{showStatus(order)}
                            </li>
                            <li className="list-group-item">
                             Transaction Id:{order.transaction_id}
                            </li>
                            <li className="list-group-item">
                             Amount:{order.amount}
                            </li>
                            <li className="list-group-item">
                             Ordered by:{order.user.name}
                            </li>
                            <li className="list-group-item">
                             Ordered On:{moment(order.createdAt).fromNow()}
                            </li>

                            <li className="list-group-item">
                             Delivery Address:{order.address}
                            </li>


                        </ul>

                        <h3 className="my-4 font-italic">
                            Total Product in the Order:{order.products.length}
                        </h3>

                        {order.products.map((product,i)=>{
                           return <div className="mb-4" style={{'padding':'20px','border':"1px solid indigo"}}>
                                    {showInput('Product Name',product.name)}
                                    {showInput('Product Price',product.price)}
                                    {showInput('Product Total',product.count)}
                                    {showInput('Product Id',product._id)}
                            </div>
                        })}
                    </div>
                )
            })}
     
    </Layout>
  )
}

export default Orders
