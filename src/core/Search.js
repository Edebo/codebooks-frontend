import React,{useState,useEffect} from 'react'
import {getCategories} from '../Admin/apiAdmin'
import {getProducts,list} from './apiCore'
import Card from './Card'

const Search = () => {
    const [data,setData]=useState({
        categories:[],
        category:'',
        search:'',
        result:[],
        searched:false
    })

    const {categories,category,search,result,searched}=data
    const loadCategories=()=>{
        getCategories().then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setData({...data,categories:data.categories})
            }
        })
    }

    const handleChange=name=>(event)=>{
        
        setData({...data,[name]:event.target.value,searched:false})

    }


    const searchedMessage=(searched,result)=>{
            if(searched&&result.length>0){
                return `${result.length} product(s) found`
            }
            if(search&& result.length==0){
                return 'No product found'
            }
    }
    const searchedResult=(result=[])=>{
            return (
              <div>
                  <h2 className="my-4">
                      {searchedMessage(searched,result)}
                  </h2>
                  <div className="row">
                    {result!==[]?result.map((product,i)=>{
                    return <Card product={product} key={i}/>
                    }):''}
                </div>
              </div>
            )
    }

    const searchData=()=>{
        
        if(search){
         list({search:search||undefined,category:category})
         .then(response=>{
             if(data.error){
                 console.log(data.error)
             }
             else{console.log(response,'inside searched product')
                 setData({...data,result:response,searched:true})
             }
         })
            
        }
       
    }

    const searchSubmit=(e)=>{
            e.preventDefault()
            searchData()
    }

    const searchForm=()=>(
        <form onSubmit={searchSubmit} className="mb-2">

            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange('category')}>
                            <option value="All">All categories</option>
                            { 
                                categories &&
                                categories.map((kategory,i)=>{
                                return <option key={i} value={kategory._id}>{kategory.name}</option> 
                                })
                            }
                        </select>

                                <input 
                                    type="search" 
                                    placeholder="search by name" 
                                    className="form-control"
                                    onChange={handleChange('search')}/>
                    </div>
                            
                </div>
                <div className="input-group-append" style={{border:'none'}}>
                    <button className="input-group-text">
                        Search
                    </button>
                </div>
            </span>
            
        </form>
    )


    useEffect(()=>{
        loadCategories()
    },[])
  return (
    <div className='row'>
     <div className='container'>
         {searchForm()}
         
     </div>
     <div className="container-fluid">
         {searchedResult(result)}
     </div>
    </div>
  )
}

export default Search
