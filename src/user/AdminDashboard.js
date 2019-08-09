import React from 'react'
import Layout from '../core/Layout'
import {isAuth} from '../auth'

import AdminLinks from '../Admin/AdminLinks'

const AdminDashboard=()=>{

   const {user:{_id,name,email,role}}= isAuth()



   const adminInfo=()=>{
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

   
   return <Layout title='AdminDashboard' description={`Good day ${name}`} className='container-fluid'>
       <div className="row">
           <div className="col-md-3">
    <AdminLinks/>
           </div>

           <div className="col-md-9">
    {adminInfo()}
   
           </div>
       </div>

 
    </Layout>
}

export default AdminDashboard