import React,{useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import {addItem,updateItem, removeItem} from './Carthelper'


const Card= ({product,showViewProductButton=true,showCartButton=true,cartUpdate=false,cartDelete=false}) => {
    const [redirect,setRedirect]=useState(false)
    const [count, setCount]= useState(product.count)
    const showViewButton=(showViewProductButton)=>{
        return (
           showViewProductButton&&   <Link to={`/product/${product._id}`}>
            <button className="btn btn-outline-primary my-2 mr-2">
                View Product
            </button>
        </Link>
        )}

        const handleChange=id=>(event)=>{
            let value=event.target.value
                if(value>=1){
                    setCount(value)
                    updateItem(id,value)
                }
        }
            const addToCart=()=>{
                    addItem(product,()=>{
                        setRedirect(true)
                    })
            }

            const shouldRedirect=(redirect)=>{
                   if(redirect){
                       return <Redirect to='/cart'/>
                   }
            }
    const showAddToCart=(showCartButton)=>{
        if(showCartButton){
         return   <button onClick={addToCart} className="btn btn-outline-primary my-2">
             Add to cart
         </button>
       }
        
    }
    const deleteItem=()=>{
console.log('i got here inside delete item')
        removeItem(product._id)
    }

    const showDeleteFromCart=(deletefromcart)=>{
        if(deletefromcart){
         return   <button onClick={deleteItem} className="btn btn-outline-danger my-2">
            Delete from Cart
         </button>
       }
        
    }

    const showCartUpdate=(cartUpdate)=>{
            if(cartUpdate){
                return <div>
                  <div className="input-group mb-3">
                      <div className="input-group-prepend">
                          <span className="input-group-text">Adjust Quantity</span>
                      </div>
                      <input type="number" className="form-control" value={count} onChange={handleChange(product._id)}/>
                  </div>
                </div>
            }
    }

                  


    const showInStock=(quantity)=>{
       return (quantity >0?
       <span className="badge badge-primary badge-pill">In stock</span>:
       <span className="badge badge-primary badge-pill">Out of stock</span> )
    }
    
  return (
    
        <div className="card h-100">
            <div className="card-header name">
                {product.name}
            </div>
            <div className="card-body">
                    {shouldRedirect(redirect)}
                    <ShowImage item={product} url="products"/>
                    <p className="lead mt-2">{showViewProductButton?product.description.substring(0,15)+'...':product.description}</p>
                    <p className="black-10">#{product.price}</p>
                    <p className="black-9">
                     Category:{product.category && product.category.name}
                     </p>
                     <p className="black-8">
                        Added on: {moment(product.createdAt).fromNow()}
                    </p>
                    {showInStock(product.quantity)}
                    <br/>
                    {showViewButton(showViewProductButton)}
                   {showAddToCart(showCartButton)}
                   {showDeleteFromCart(cartDelete)}
                   {showCartUpdate(cartUpdate)}
            </div>
        </div>
      
    
  )
}

export default Card
