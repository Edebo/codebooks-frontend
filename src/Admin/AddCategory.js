import React ,{useState}from 'react'
import Layout from '../core/Layout'
import {isAuth} from '../auth'
import AdminLinks from './AdminLinks'
import {createCategory} from './apiAdmin'
const AddCategory=()=>{

        const [name,setName]=useState('')
         const [error,setError]=useState(false)
          const [success,setSuccess]=useState(false)

          const {token,user}=isAuth()

         const showError=()=>{
           if(error){
             return <h3 className="text-danger">{name} already exists</h3>
           }

          }

          const showSuccess=()=>{
            if(success){
              return <h3 className="text-success">{name} is created successfully</h3>
            }
 
           }

          
      const handleChange=(event)=>{
            setError('')
            setSuccess(false)
            setName(event.target.value)
        }

    const clickSubmit=(e)=>{
            e.preventDefault()
             setError('')
             setSuccess(false)

             createCategory(user._id,token,{name})
             .then(data=>{
               if(data.error){
                 setError(data.error)
               }
               else{
                 console.log(data)
                 setError('')
                 setSuccess(true)
                 
               }
             })
    }

        const  newCategoryForm=()=>{
              return(
                  <form>
      
      {/* email */}
      <div className="form-group">
        <label className='text-muted'>Name</label>
        <input className='form-control' type='text' onChange={handleChange} value={name} autoFocus/>
      </div>

      
      <button onClick={clickSubmit} className='btn btn-outline-primary'>Create Category</button>
    </form>
              )
          }



          return(
            <Layout title="Create Category" description="Node react E-commerce App" className='container-fluid'>
   
  
                <div className="row">
                <div className="col-md-3">
    <AdminLinks/>
           </div>

           <div className="col-md-7 offset-md-1">
                    {showSuccess()}
                    {showError()}
                  {newCategoryForm()}
   
           </div>
                </div>

 
            </Layout>
          )
}


export default AddCategory