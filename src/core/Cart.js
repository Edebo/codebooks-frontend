import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {getCart} from './Carthelper'
import Card from './Card'
import Layout from './Layout'
import Checkout from './Checkout'


const Cart = () => {
    const [items,setItems]=useState([])

    useEffect(()=>{
            setItems(getCart())
    },[items])

const showItems=(items)=>
 
         (     
         <div>
                    <h2>You have {items.length} item{items.length>1?'s':''} in  Cart</h2>
                    { items.map((item,i)=>{
                        return <div className="col-12 mb-3" key={i}>
                                        <Card  
                                            product={item} 
                                            showCartButton={false} 
                                            cartUpdate={true}
                                            cartDelete={true}/>  
                        </div>
                    })}
        </div>
       
     )
    

    const noItemMessage=()=>{
            return <h2>Your cart is empty.<br/><Link to='/shop'>Continue Shopping.</Link></h2>
    }

  return (

    <Layout title="Cart page" description="All your cart items are available here" className="container">

        <div className="row">
            <div className="col-md-6">
                {items.length>0 ? showItems(items) : noItemMessage()}
            </div>
            <div className="col-md-6">
                <h2>Your Cart Summary</h2>
                <Checkout products={items}/>
            </div>
        </div>
      
    </Layout>
  
  )
}

export default Cart
