const selectedDB = process.env.DBSELECTION

export const getManagerMessages = async () => {
    const messageModel = selectedDB === 1 ? await import('./MongoDB/models/Message.js') :
    await import('./MongoDB/models/Message.js').then(module => module.default) 
    return messageModel
}

export const getManagerProducts = async () => {
    const productModel = selectedDB === 1 ? await import('./MongoDB/models/Product.js') :
    await import('./MongoDB/models/Product.js').then(module => module.default) 
    return productModel
}
export const getManagerCart = async() => {
    const cartModel = selectedDB === 1 ? await import('./MongoDB/models/Cart.js') :
    await import('./MongoDB/models/Cart.js').then(module => module.default) 
    return cartModel
}