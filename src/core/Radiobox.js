import React ,{useState,Fragment} from 'react'

const Radiobox = ({prices,handleFilters}) => {

    const [value,setValue]=useState([])


    const handleChange=(event)=>{
        handleFilters(event.target.value)
        setValue(event.target.value)
    }

  return prices.map((price,i)=>{
    return   <div key={i} className="list-unstyled">
           <input type='radio' name={price} onChange={handleChange} value={`${price._id}`} className='mr-2 ml-4'/>
             <label className="form-check-label">{price.name}</label>
       </div>
   })
}

export default Radiobox
