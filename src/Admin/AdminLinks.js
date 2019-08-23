import React from 'react'
import {Link} from 'react-router-dom'

const AdminLinks=()=>{
    return (
     <div className="card">
         <h3 className="card-header">Admin Links</h3>
             <ul className="list-group">
                 <li className="list-group-item">
                     <Link className='nav-link' to='/create/category'>Create Categories</Link>
                 </li>

                 <li className="list-group-item">
                     <Link className='nav-link' to='/create/product'>Create Product</Link>
                 </li>

                 <li className="list-group-item">
                     <Link className='nav-link' to='/order'>View Order</Link>
                 </li>

                 <li className="list-group-item">
                     <Link className='nav-link' to='/manageproduct'>Manage Order</Link>
                 </li>
             
             </ul>
 </div>
    )

}

export default AdminLinks