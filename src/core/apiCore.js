import {API} from '../config'
import queryString from 'query-string'

  export const getProducts=(sortBy)=>{
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`,{
      method:"GET"
    }).then(response=>{
      return response.json()
    }).catch(error=>{
      console.log(error)
    })
  }

  export const getProduct=(productId)=>{

    return fetch(`${API}/product/${productId}`,{
      method:"GET"
    }).then(response=>{
      return response.json()
    }).catch(error=>{
      console.log(error)
    })
  }

  export const getRelatedProduct=(productId)=>{

    return fetch(`${API}/products/related/${productId}`,{
      method:"GET"
    }).then(response=>{
      return response.json()
    }).catch(error=>{
      console.log(error)
    })
  }

  export const list=(param)=>{
    const query=queryString.stringify(param)
    console.log(query)
    return fetch(`${API}/products/search?${query}`,{
      method:"GET"
    }).then(response=>{
      return response.json()
    }).catch(error=>{
      console.log(error)
    })
  }

export const getFilteredProduct=(skip,limit,filters)=>{

return fetch(`${API}/products/by/search`,{
  method:"POST",
  headers:{
    Accept:"application/json",
    "Content-Type":"application/json",
    
  
  },
  body:JSON.stringify({skip,limit,filters})
})
.then(result=> {
  
  return result.json()})
.catch(err=>{
  console.log(err)
})


}



export const getClientToken=(userId,token)=>{

  return fetch(`${API}/braintree/getToken/${userId}`,{
    method:"GET",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}` 
    }
   
  })
  .then(response=> {
    
    return response.json()
  })
  .catch(err=>{
    console.log(err)
  })
}



export const processPayment=(userId,token,paymentData)=>{

  return fetch(`${API}/braintree/payment/${userId}`,{
    method:"POST",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}` 
    },
    body:JSON.stringify(paymentData)


   
  })
  .then(response=> {
    
    return response.json()
  })
  .catch(err=>{
    console.log(err)
  })
}


export const createOrder=(userId,token,orderData)=>{

  return fetch(`${API}/order/create/${userId}`,{
    method:"POST",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}` 
    },
    body:JSON.stringify(orderData) 
  })
  .then(response=> {
    
    return response.json()
  })
  .catch(err=>{
    console.log(err)
  })
}