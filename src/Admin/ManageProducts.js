import React,{useState,useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuth} from '../auth'
import {getProducts,deleteProduct} from './apiAdmin'
import {Link} from 'react-router-dom'
import {API} from '../config'

import AdminLinks from './AdminLinks'

const ManageProducts=()=>{
    const [products,setProducts]=useState([])

    const userId=isAuth() && isAuth().user._id
    const token=isAuth() && isAuth().token

    const loadProducts=()=>{
        getProducts().then(data=>{
          if(data.error){
            console.log(data.error)
          }
          else{
            
            setProducts(data)
          }
        })
      }

      const deleteAProduct=(productId)=>{
          deleteProduct(userId,token,productId)
          .then(data=>{
                if(data.error){
                    console.log(data.error)
                }
                else{
                   loadProducts()
                }
          })
          .catch(err=>{
              console.log(err)
          })
      }
   
      useEffect(()=>{
          loadProducts()
      },[])
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
            {/* <ul className="list-group">
                {products.length>0 && products.map((product,i)=>{
                return    <li key={i} className="list-group-item">
                        <strong>{product.name}</strong>
                        <Link to={`/admin/product/update/${product._id}`}>
                            <span className="badge badge-warning bage-pill">
                                update
                            </span>
                        </Link>
                        <span   onClick={()=>deleteAProduct(product._id)} className="badge badge-danger bage-pill">
                                delete
                            </span>
                    </li>
                })}
            </ul> */}
    <table className="table table-bordered">
            <thead className="tablehead">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Product Name</th>    
                <th scope="col">Image</th> 
                <th scope="col">Update</th>   
                <th scope="col">Delete</th>           
                </tr>
            </thead>
            <tbody>
             {products.length>0 && products.map((product,i)=>{
                return     <tr key={i}>
                <th scope="row" >{i+1}</th>
                <td>{product.name}</td>
                <td><img src={`${API}/products/photo/${product._id}`} style={{'maxwidth':'2em','maxheight':"4em"}}/></td>
                <td>   
                     <Link to={`/admin/product/update/${product._id}`}>
                            <button className="btn btn-warning " style={{'borderRadius':'5px'}}>
                                update
                            </button>
                        </Link>
                </td>
                <td>
                <button   onClick={()=>deleteAProduct(product._id)} className="btn" style={{'cursor':'pointer','background':'#ee7752','borderRadius':'5px'}}>
                                delete
                            </button>
                </td>
                </tr>
            
                })}
                
            </tbody>
</table>

       </div>
   </div>


</Layout>
}

export default ManageProducts