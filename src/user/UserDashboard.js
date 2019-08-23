import React,{useState,useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuth} from '../auth'
import {Link} from 'react-router-dom'
import {getPurchaseHistory} from "./apiUser"
import moment from 'moment'

const Dashboard=()=>{
    const [history,setHistory]=useState([])
   const {user:{_id,name,email,role}}= isAuth()
   const token=isAuth() && isAuth().token
   const init=(userId,token)=>{

    getPurchaseHistory(userId,token)
    .then(data=>{
        console.log(data)
        if(data.error){
                console.log(data.error)
        }

        setHistory(data)

    }).catch(error=>{
        console.log(error)
    })

   }

   useEffect(()=>{
        init(_id,token)
   },[])
   const userLinks=()=>{
       return (
        <div className="card">
            <h3 className="card-header">Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className='nav-link' to='/cart'>My Cart</Link>
                    </li>

                    <li className="list-group-item">
                        <Link className='nav-link' to={`/profile/${_id}`}>Update profile</Link>
                    </li>
                
                </ul>
    </div>
       )

   }

   const userInfo=()=>{
       return   (
            <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
        <li className="list-group-item">
                {_id}
            </li>
            <li className="list-group-item">
                {name}
            </li>
            <li className="list-group-item">
               {email}
            </li>
            <li className="list-group-item">
                {role===1?'Admin':'Registered User'}
            </li>
        </ul>
    </div>
       )
   }

   const purchaseHistory = history => {
    return (
        <div className="card mb-5">
            <h3 className="card-header">Purchase history</h3>
            <ul className="list-group">
                <li className="list-group-item">
                  { history.length>0 && history.map((h, i) => {
                        return (
                            <div>
                                <hr />
                                {h.products.map((p, i) => {
                                    return (
                                        <div key={i}>
                                            <h6>Product name: {p.name}</h6>
                                            <h6>Product price: ${p.price}</h6>
                                            <h6>
                                                Purchased date:{" "}
                                                {moment(p.createdAt).fromNow()}
                                            </h6>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </li>
            </ul>
        </div>
    );
};
   return <Layout title='User Dashboard' description={`Good day ${name}`} className='container-fluid'>
       <div className="row">
           <div className="col-md-3">
    {userLinks()}
           </div>

           <div className="col-md-9">
    {userInfo()}
    {purchaseHistory(history)}
           </div>
       </div>

 
    </Layout>
}

export default Dashboard