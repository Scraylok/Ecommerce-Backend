
import { Router } from "express";
import { createCart, getProductsCart, addProductCart } from '../controllers/cart.manager.js'

const routerCart = Router()

routerCart.get("/:id", getProductsCart)
routerCart.post("/:id", addProductCart)
routerCart.put("/:id", createCart)
routerCart.put("/product/:id", createCart)
routerCart.delete("/:id", createCart)
routerCart.delete("/product/:id", createCart)
routerCart.post("/", createCart)

export default routerCart