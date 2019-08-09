import React from 'react'
import {Link} from 'react-router-dom'
import ShowImage from './ShowImage'

const Core = ({product}) => {
  return (
    <div className="col-md-4 mb-3">
        <div className="card h-100">
            <div className="card-header">
                {product.name}
            </div>
            <div className="card-body">
                    <ShowImage item={product} url="products"/>
                    <p>{product.description}</p>
                    <p>#{product.price}</p>
                    <Link to='/'>
                        <button className="btn btn-outline-primary my-2 mr-2">
                            View Product
                        </button>
                    </Link>
                    <Link to='/'>
                         <button className="btn btn-outline-primary my-2">
                            Add to cart
                        </button></Link>
            </div>
        </div>
      
    </div>
  )
}

export default Core
