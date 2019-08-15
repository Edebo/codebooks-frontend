import React ,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getProducts} from './apiCore'
import Card from './Card'
import Search from './Search'

const Home=() =>{
const [productBySell,setProductBySell]=useState([])
const [productByArrival,setProductByArrival]=useState([])
const [error,setError]=useState('')

const loadProductsBySell=()=>{
  getProducts('sold').then(data=>{
    if(data.error){
      setError(data.error)
    }
    else{
      
      setProductBySell(data.products)
    }
  })
}


const loadProductsByArrival=()=>{
  getProducts('createdAt').then(data=>{
    if(data.error){
      setError(data.error)
    }
    else{
      console.log(data)
      setProductByArrival(data.products)
    }
  })
}


useEffect(()=>{
  loadProductsByArrival()
  loadProductsBySell()
},[])
  return (
    <Layout title="Home page" description="Node react E-commerce App" className="container">
      <Search/>
      
      <h2 className="mb-4"> New Arrival</h2>
        <div className="row">
        
      {productByArrival.map((product,i)=>{
       return <div className="col-md-4 mb-3" key={i}>
             <Card  product={product}/>  
       </div>
      })}
      </div>
      
    <hr/>
    <h2 className="mb-4"> Best Seller</h2>

      <div className='row'>
          {productBySell.map((product,i)=>{
        return   <div className="col-md-4 mb-3" key={i}>
             <Card  product={product}/>  
       </div>
          })}
      </div>
     
      
      
    </Layout>
  )
}

export default Home