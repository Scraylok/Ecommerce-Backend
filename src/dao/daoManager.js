

export const getManagerMessages = async()=> {
    const modelMessage = process.env.DBSELECTION === 1 
    ? await import('../dao/MongoDB/models/Message.js').then(module => module.default)
    : await import('./Postgresql/models/Message.js').then(module => module.default)
    return modelMessage
}

export const getManagerProducts = async()=> {
    const modelProduct = process.env.DBSELECTION === 1 
    ? await import("../dao/MongoDB/models/Product.js").then(module => module.default)
    : await import('./Postgresql/models/Product.js').then(module => module.default)
    return modelProduct
   
}


export const getManagerCart = async()=> {
    const modelCart = process.env.DBSELECTION === 1 
    ? await import('../dao/MongoDB/models/Cart.js').then(module => module.default) 
    : await import('./Postgresql/models/Cart.js').then(module => module.default)
    return modelCart
}
export const getManagerUsers = async () => {
    const modelUser = process.env.DBSELECTION == 1 
    ? await import('../dao/MongoDB/models/user.js').then(module => module.default) 
    : await import('./Postgresql/models/User.js').then(module => module.default)

    return modelUser
}