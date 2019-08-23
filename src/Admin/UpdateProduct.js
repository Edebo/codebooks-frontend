import React ,{useState,useEffect}from 'react'
import Layout from '../core/Layout'
import {isAuth} from '../auth'
import AdminLinks from './AdminLinks'
import {updateProduct,getCategories} from './apiAdmin'
import {getProduct} from '../core/apiCore'
import { Redirect } from "react-router-dom";

const UpdateProduct=(props)=> {
    const productId=props.match.params.productId
   console.log(productId)
    const {user,token}=isAuth()
const [values,setValues]=useState({
  name:'',
  description:'',
  price:'',
  categories:[],
  category:'',
  shipping:'',
  quantity:'',
  photo:'',
  error:'',
  loading:'',
  success:'',
  redirectToProfile:false,
  createdProduct:'',
  formData:new FormData()


})




const {
  name,
  description,
  price,
category,
shipping,
quantity,
categories,
photo,
error,
loading,
success,
redirectToProfile,
createdProduct,
formData
}=values


//using formdata available in the browser,
//doing that after component did mount
//there we use useeffect

//load categories

const loadCategories=()=>{
getCategories().then(data=>{
  if(data.error){
    setValues({...values,error:data.error})
  }
  else{
    setValues({categories:data.categories})
    
    
  }
})
}

const loadProduct=(productId)=>{
    getProduct(productId).then(data=>{
        if(data.error){
            setValues({...values,error:data.error})
        }
        else{
            setValues({...values,
                name:data.product,
                description:data.product.description,
                price:data.product.price,
                category:data.product.category._id,
                shipping:data.product.shipping,
                quantity:data.product.quantity,
              
                photo,
            })  
            loadCategories()       
          }
    })
}

const init=()=>{
   
    loadProduct(productId)
}

//useeffect
useEffect(()=>{
  init()
  
},[])

const handleChange=nm=>event=>{
  const value = nm=== 'photo'?event.target.files[0]:event.target.value
  formData.set(nm,value)
  setValues({...values,[nm]:value})
 
}

const clickUpdate=(event)=>{

        event.preventDefault()
      
        setValues({...values,error:'',loading:true})
        for(let pair of formData.entries()){
          console.log(pair[0],pair[1])
}
    updateProduct(productId,user._id ,token,formData)
        .then(data=>{
                if(data.error){
                 setValues({...values,error:data.error})
                 }

                    else{
                    setValues({ ...values,
                    name:'',
                description:'',
                price:'',
                catgerories:[],
                category:'',
                shipping:'',
                quantity:'',
                photo:'',
                createdProduct:data.name,
                loading:false,
                redirectToProfile:true

                    })
                }
                })

}

const showError=()=>{
  return <div className="alert alert-danger" style={{display:error?'':'none'}}>{error}</div>
}

const showSuccess=()=>{
  return <div className="alert alert-info" style={{display:success?'':'none'}}>{`${createdProduct} is created`}</div>
}

const showLoading=()=>{
return (loading && (<div className="alert alert-success"> <h2>Loading ...</h2></div>))
}
const newProduct=()=>{
   return (
     <form className="mb-3" >
      <div className="form-group">
            <label className='btn btn-secondary'>
                <input className='form-control' 
                        type='file'
                        name='photo'
                        onChange={handleChange('photo')} 
                        accept="image/*" />
            </label>
            
      </div>

      <div className="form-group">
        <label className='text-muted'>Name</label>
        <input className='form-control' 
                type='text' 
                onChange={handleChange('name')} 
                value={name} />
      </div>

      <div className="form-group">
        <label className='text-muted'>Description</label>
        <textarea className='form-control'                 
                onChange={handleChange('description')} 
                value={description} />
      </div>

      <div className="form-group">
        <label className='text-muted'>Price</label>
        <input className='form-control' 
                type='number' 
                onChange={handleChange('price')} 
                value={price} />
      </div>

      <div className="form-group">
        <label className='text-muted'>Category</label>
        <select className='form-control'                 
                onChange={handleChange('category')} 
                >
                
                <option>Please select</option>
             { 
               categories &&
              categories.map((kategory,i)=>{
            return <option key={i} value={kategory._id}>{kategory.name}</option> 
             })
             }
         </select>
      </div>

      <div className="form-group">
        <label className='text-muted'>Quantity</label>
        <input className='form-control' 
                type='number' 
                onChange={handleChange('quantity')} 
                value={quantity} />
      </div>

      <div className="form-group">
        <label className='text-muted'>Shipping</label>
        <select className='form-control'                 
                onChange={handleChange('shipping')} 
                >
             <option>Please select shipping option</option>
             <option value='0'>False</option>
             <option value='1'>True</option>
     
         </select>
      </div>

      <button className="btn btn-outline-primary" onClick={clickUpdate}>
        Update Product
      </button>

  </form>
   )
}

const redirecting=()=>{
    if(redirectToProfile){
       return <Redirect to="/"/>
    }
}
  return (
  <Layout title="Update Product" description="Node react E-commerce App" className='container-fluid'>
   
  
   <div className="row">
   <div className="col-md-3">
<AdminLinks/>
</div>

<div className="col-md-7 offset-md-1">
      {showLoading()}
      {showSuccess()}
      {showError()}
      {newProduct()}

</div>
   </div>


</Layout>

  )
  }

export default UpdateProduct