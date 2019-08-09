import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getProducts} from './apiCore'
import Card from './Card'
import {getCategories} from '../Admin/apiAdmin'
import {getFilteredProduct} from './apiCore'
import Checkbox from './Checkbox'
import {prices} from './fixedPrice'
import Radiobox from './Radiobox'
const Shop = () => {
  const [myFilters,setMyFilters]=useState({
        filters:{
          category:[],
          price:[]
        }
  })
  const [categories,setCategories]=useState([])
  const [error,setError]=useState('')
  const [limit,setLimit]=useState(6)
  const [skip,setSkip]=useState(0)
  const [filteredResult,setFilteredResult]=useState([])


  const init=()=>{
    getCategories().then(data=>{
      if(data.error){
        setError(data.error)
      }
      else{
        console.log(data.categories)
        setCategories(data.categories)
        
        
      }
    })
    }

    useEffect(()=>{
        init()
       getFilteredProduct(skip,limit,myFilters.filters)
    },[])

    const handleFilters=(filters,filterBy)=>{
                        // console.log('shop',filters,filterBy)
                        const newFilters={...myFilters}
                        newFilters.filters[filterBy]=filters
                        if(filterBy==='price'){
                            newFilters.filters[filterBy]=handlePrice(filters)
                        }
                        //initially myfilters is empty.but will be update when user clicks
                        loadFilterResult(newFilters)
                        setMyFilters(newFilters)
          }

          //convert price id to the array value
        const handlePrice=value=>{
          let data=prices
          let array=[]
          for(let key in data){
            if(data[key]._id===parseInt(value)){
            return array=data[key].array
            }
          }
        }

        const loadFilterResult=(filter)=>{
            getFilteredProduct(skip,limit,filter).then(data=>{
              if(data.error){
                setError(data.error)
              }
              else{
                console.log(data)
                setFilteredResult(data.data)
              }
            })
        }



  return (
   <Layout title="Shop" description="Search and find book of your choice" className="container-fluid">

      
        <div className="row">
          <div className="col-md-4 mb-4">
            <h4>Filter by categories</h4>
            <ul>
              <Checkbox categories={categories} handleFilters={filters=>handleFilters(filters,'category')}/>
            </ul>

            <h4>Filter by price range</h4>
            <div>
              <Radiobox prices={prices} handleFilters={filters=>handleFilters(filters,'price')}/>
            
            </div>
          </div>
          <div className="col-md-8">
           
           {JSON.stringify(filteredResult)}
            
          </div>
        </div>



</Layout>
  )
}

export default Shop
