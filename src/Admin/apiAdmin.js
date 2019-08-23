import {API} from '../config'

export const createCategory=(userId,token,category)=>{
    // console.log(name,email,password)
  return fetch(`${API}/category/create/${userId}`,{
    method:"POST",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify(category)
  })
  .then(result=> {
    
    return result.json()})
  .catch(err=>{
    console.log(err)
  })
  
  
  }


  export const createProduct=(userId,token,product)=>{
    // console.log(name,email,password)
  return fetch(`${API}/product/create/${userId}`,{
    method:"POST",
    headers:{
      Accept:"application/json",
      Authorization:`Bearer ${token}`
    },
    body:product
  })
  .then(result=> {
    
    return result.json()})
  .catch(err=>{
    console.log(err)
  })
  
  
  }

  export const getCategories=()=>{
    return fetch(`${API}/category/list`,{
      method:"GET"
    }).then(response=>{
      return response.json()
    }).catch(error=>{
      console.log(error)
    })
  }

  export const listOrders=(userId,token)=>{
    return fetch(`${API}/order/list/${userId}`,{
      method:"GET",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}` 
      }
    }).then(response=>{
      return response.json()
    }).catch(error=>{
      console.log(error)
    })
  }

  export const getStatusValues=(userId,token)=>{
    return fetch(`${API}/order/status-values/${userId}`,{
      method:"GET",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}` 
      }
    }).then(response=>{
      return response.json()
    }).catch(error=>{
      console.log(error)
    })
  }

  export const updateStatus=(userId,token,orderId,status)=>{
    return fetch(`${API}/order/${orderId}/status/${userId}`,{
      method:"PUT",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}` 
      },
      body:JSON.stringify({
        status,
        orderId
    })

    }).then(response=>{
      return response.json()
    }).catch(error=>{
      console.log(error)
    })
  }



  export const getProducts=()=>{
    return fetch(`${API}/products/`,{
      method:"GET",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      }
    }).then(response=>{
      return response.json()
    }).catch(error=>{
      console.log(error)
    })
  }


  export const updateProduct=(userId,token,productId,product)=>{
    return fetch(`${API}/product/${productId}/status/${userId}`,{
      method:"PUT",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}` 
      },
      body:product

    }).then(response=>{
      return response.json()
    }).catch(error=>{
      console.log(error)
    })
  }

  export const deleteProduct=(userId,token,productId)=>{
    return fetch(`${API}/product/${productId}/${userId}?limit=undefined`,{
      method:"DELETE",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}` 
      }

    }).then(response=>{
      return response.json()
    }).catch(error=>{
      console.log(error)
    })
  }