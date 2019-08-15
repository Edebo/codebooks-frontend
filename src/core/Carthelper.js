export const addItem=(item,next)=>{
    let cart=[]
    if(typeof window!==undefined){
        if(localStorage.getItem('cart')){
            cart=JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...item,
            count:1
        })

        //remove duplicates
        //build an array using new SET AND TO IT BACK INTO AN ARRAY
        //SO WE CAN RE-MAP IT LATER
        //NEW SET WILL ONLY ALLOW UNIQUE VALUE IN IT
        //SO PASS THE ID OF EACH UNIQUE OBJECT PRODUCT
         cart=Array.from(new Set(cart.map(p=>p._id))).map(id=>{
             return cart.find(p=>p._id===id)
         })
         
         localStorage.setItem('cart',JSON.stringify(cart))
         next()
    }
}

export const getTotalItems=()=>{
    if(typeof window !==undefined){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart')).length
        }
    }
    return 0;

}

export const getCart=()=>{
    if(typeof window !==undefined){
        if(localStorage.getItem('cart')){
        
            return JSON.parse(localStorage.getItem('cart'))
        }
    }
    return [];

}

export const updateItem=(productId,value)=>{
    let cart
        if(typeof window !==undefined){
            if(localStorage.getItem('cart')){
        
                 cart=JSON.parse(localStorage.getItem('cart'))
                 cart.map((product,i)=>{
                     if(productId===product._id){
                         cart[i].count=value
                     }
                 })

                 localStorage.setItem('cart',JSON.stringify(cart))
            }
        }   
}

export const removeItem=(productId)=>{
    let cart
        if(typeof window !==undefined){
            if(localStorage.getItem('cart')){
        
                 cart=JSON.parse(localStorage.getItem('cart'))
                 console.log('inside remove item form cart')
                cart= cart.filter((product)=>{
                     return product._id!==productId
                 })

                 localStorage.setItem('cart',JSON.stringify(cart))
            }
        }   

        return cart
}

exports.emptyCart=(next)=>{
    if(typeof window!=undefiined){
        localStorage.removeItem('cart')
        next()
    }
}