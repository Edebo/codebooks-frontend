import React,{useState,useEffect} from 'react'

const Checkbox = ({categories,handleFilters}) => {

    const [checked,setChecked]=useState([])

    const handleToggle=id=>()=>{

        const currentCategoryId=checked.indexOf(id)
        const newChecked=[...checked]
        if(currentCategoryId===-1){
                newChecked.push(id)
        }
        else{
            newChecked.splice(currentCategoryId,1)
        }
        console.log(newChecked)
        setChecked(newChecked)
        console.log(checked)
        handleFilters(newChecked)
    }

  return categories.map((category,i)=>{
   return   <li key={i} className="list-unstyled">
          <input type='checkbox' onChange={handleToggle(category._id)} value={checked.indexOf(category._id)===-1} className="form-check-input"/>
            <label className="form-check-label">{category.name}</label>
      </li>
  })
}

export default Checkbox
