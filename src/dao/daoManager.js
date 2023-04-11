

export const getManagerMessages = async()=> {
    const modelMessage = process.env.DBSELECTION === 1 ? await import('../dao/MongoDB/models/Message.js') :
    await import('./Postgresql/models/Message.js')
    return modelMessage
}

export const getManagerProducts = async()=> {
    const modelProduct = process.env.DBSELECTION === 1 ? await import("../dao/MongoDB/models/Product.js") :
    await import('./Postgresql/models/Product.js')
    return modelProduct
   
}


export const getManagerCart = async()=> {
    const modelCart = process.env.DBSELECTION === 1 ? await import('../dao/MongoDB/models/Cart.js') :
    await import('./Postgresql/models/Cart.js')
    return modelCart
}
export const getManagerUsers = async () => {
    const modelUser = process.env.DBSELECTION == 1 ? await import('../dao/MongoDB/models/user.js') :
        await import('./Postgresql/models/User.js')

    return modelUser
}