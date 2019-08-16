import React ,{useState,useEffect} from 'react'
import {isAuth } from '../auth'
import {Link} from 'react-router-dom'
import {getClientToken,processPayment} from './apiCore'
import DropIn from "braintree-web-drop-in-react";
import {emptyCart} from './Carthelper'


const Checkout = ({products}) => {

  const [data,setData]=useState({
      success:false,
      error:'',
      loading:false,
      clientToken:null,
      instance:{},
      address:''
  })
    const userId=isAuth() && isAuth().user._id
    const token=isAuth() && isAuth().token

    const getToken=(userId,token)=>{

      getClientToken(userId,token).then(data=>{
        
        if(data.error){
          setData({...data,error:data.error})
          
         
        }
        console.log(data.clientToken)
        setData({clientToken:data.clientToken})
        setData({...data,loading:false})
      })

    }


    useEffect(()=>{
      console.log(userId)
      setData({...data,loading:true})
      getToken(userId,token)

    },[])


    const buy=()=>{
      //send nounce
      setData({...data,loading:true})
    let nonce;
    data.instance.requestPaymentMethod().then(data=>{
      console.log(data)
      nonce=data.nonce

      //once you have nonce(card number and card type) send nonce as payment method nonce
      console.log('send nonce and total price',nonce ,getTotal())
      const paymentData={
        paymentMethodNonce:nonce,
        amount:getTotal()
      }
        processPayment(userId,token,paymentData)
        .then(response=>{
          setData({loading:false})
          setData({...data,success:response.success})

           emptyCart(()=>{
             console.log('payment successfull and cart is empty')
           })
        }).catch(error=>{ 
          setData({...data,error:error})
        })

    }).catch(error=>{
     setData({...data,error})
    })
    }
    const showDropIn=()=>{
    
       {return data.clientToken!==null && products.length>0?(
        <div> 
          <DropIn 
             options={{ authorization: data.clientToken ,
                      paypal:{
                        flow:"vault"
                      }
                    }}
            onInstance={instance => (data.instance = instance)}/>
            <button className="btn btn-success btn-block" onClick={buy}>Checkout</button></div>
           
        ):''}
      
    }

    const showLoading=(loading)=>{
      return loading?<div className="spinner-grow text-warning" role="status">
      <span className="sr-only">Loading...</span>
    </div>:null
    }
    const getTotal=()=>{

      return  products.reduce((total,product)=>{
                return total + product.count*product.price
        },0)

    }

    const checkOrSignIn=()=>{
        return(isAuth()?<div >{showDropIn()}</div>:
        <Link to='/signin'>
        <button className="btn btn-primary">Sign In</button>
        </Link>)

    }

    const showError=(error)=>{
        return <div className="alert alert-danger" style={{'display':error?'':'none'}}>{error}</div>
    }

    const showSuccess=(success)=>{
      return <div className="alert alert-info" style={{'display':success?'':'none'}}>Thanks! you payment is successful</div>
  }


  return (
    <div>
      <h3>Total:# {getTotal()}</h3>
      {showLoading(data.loading)}
      {showError(data.error)}
      {showSuccess(data.success)}
     
      {checkOrSignIn()}
  </div>
  )
}

export default Checkout
