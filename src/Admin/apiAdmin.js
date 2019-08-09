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