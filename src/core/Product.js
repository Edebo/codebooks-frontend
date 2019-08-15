import React ,{useState,useEffect} from 'react'
import Layout from './Layout'
import { getProduct,getRelatedProduct} from './apiCore';
import Card from './Card'

const Product = (props) => {
    //using object because i am wexpecting a single product whcih is a object type
    const [product,setProduct]=useState({})
    const [relatedProduct,setRelatedProduct]=useState([])
    const [error,setError]=useState(false)

    const loadProduct=(productId)=>{
        getProduct(productId).then(data=>{
            if(data.error){
                setError(data.error)
            }
            else{
                console.log(product,data.product,'inside product component')
                
                setProduct(data.product)
               
                getRelatedProduct(data.product._id).then(res=>{
                    if(res.error){
                        setError(res.error)
                    }
                    else{
                        console.log(res.products,'inside related product')
                       setRelatedProduct(res.products) 
                    }
                })
                
            }
        })
    }

    useEffect(()=>{
        const id=props.match.params.productId
        loadProduct(id)
    },[props])


  return (
      <Layout title={product && product.name} description={product && product.description && product.description.substring(0,100)} className="container">
      <h2 className="mb-4">A Single Product page</h2>
      
        
            <div className="row">
            <div className="col-8">
                  <Card product={product} showViewProductButton={false}/>
              </div>
              <div className="col-4">
                <h2>Related Product{+ relatedProduct.length>1?'s':''}</h2>
                { relatedProduct.map((product,i)=>{
                    return <Card product={product} key={i}/>
                })}
              </div>
            </div>
              
          
     
    </Layout>
  )
}

export default Product
