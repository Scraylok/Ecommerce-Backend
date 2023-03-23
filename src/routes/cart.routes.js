import { Router } from "express";
import { getManagerCart } from "../dao/daoManager.js";

const routerCart = Router()
const data = await getManagerCart();
const cartManager = new data.ManagerCartMongoDB();


routerCart.get('/:cid', async (req, res) => { 
    try {
        const cart = await cartManager.getElementById(req.params.cId)
        const cartPopulate = await cart.populate('products.productId')
        res.send({ result: "success", payload: cartPopulate });
    
      } catch (error) {
        res.status(500).json({
          message: error.message
        })
        
      }
})

routerCart.post('/', async (req, res) => { 
    try {
        const newCart = await cartManager.addElements(req.body);
        res.send({
          result: "success",
          payload: newCart,
        });
      } catch (error) {
        res.status(500).json({
          message: error.message
        })
      }
})

routerCart.post('/:cid/product/:pid', async (req, res) => { 
    try {
        const cartId = req.params.cartId;
        const prodId = req.params.prodId;
        const newProdInCart = await cartManager.addProduct(cartId, prodId);
        res.send({ result: "success", payload: newProdInCart });
      } catch (error) {
        res.status(500).json({
          message: error.message
        })
      }
    
})

routerCart.delete('/:cid', async (req, res) => {
    try {
        const deletedCart = await cartManager.deleteElement(req.params.cId);
        res.send({
          result: "success",
          payload: deletedCart,
        });
      } catch (error) {
        res.status(500).json({
          message: error.message
        })
      }
})
routerCart.delete('/:cid/product/:pid', async (req, res) => { 
    try {
        const cartId = req.params.cartId;
        const prodId = req.params.prodId;
        const delProdInCart = await cartManager.deleteProductById(cartId, prodId);
        res.send({ result: "success", payload: delProdInCart });
      } catch (error) {
        res.status(500).json({
          message: error.message
        })
      }
    
})

routerCart.put("/:cid", async (req, res) => {
    try {
      const cartId = req.params.cid;
      const updatedArr = await cartManager.updateAllProducts(cartId, req.body);
      res.send({ result: " success", payload: updatedArr });
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
  })
  routerCart.put('/:cid/product/:pid', async (req, res) => {
    try {
      const cartId = req.params.cartId;
      const prodId = req.params.prodId;
      const { quantity } = req.body;
      const updateProd = await cartManager.updateProductById(
        cartId,
        prodId,
        quantity
      );
      res.send({ result: "success", payload: updateProd });
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
});

export default routerCart