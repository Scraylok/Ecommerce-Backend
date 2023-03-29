import { Router } from "express";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/product.manager.js'

const routerProduct = Router()

routerProduct.get("/", getProducts)
routerProduct.get("/:id", getProduct)
routerProduct.post("/", createProduct)
routerProduct.put("/:id", updateProduct)
routerProduct.delete("/:id", deleteProduct)


export default routerProduct