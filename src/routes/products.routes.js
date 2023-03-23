import { Router } from "express";
import { getManagerProducts } from "../dao/daoManager.js";


const routerProduct = Router()
const data = await getManagerProducts()
const productManager = new data.ManagerProductMongoDB()

routerProduct.get('/', async (req, res) => { 
    try {
        let { limit, page, category, sort } = req.query;
        let filter = {};
        limit = limit ? parseInt(limit) : 10;
        page = page ? parseInt(page) : 1;
        category ? (filter.category = category) : (filter = {});
        let ord = sort == "asc" ? 1 : -1;
        const products = await productManager.getProducts(
          filter,
          limit,
          page,
          ord
        );
    
          const catLink = category ? `&category=${category}` : "";
          const limitLink = limit ? `&limit=${limit}` : "";
          const sortLink = sort ? `&sort=${sort}` : "";
          const prevPageLink = products.hasPrevPage ? `/products?page=${products.prevPage}${catLink}${limitLink}${sortLink}` : "";
          const nextPageLink = products.hasNextPage ? `/products?page=${products.nextPage}${catLink}${limitLink}${sortLink}` : "";
    
        res.status(200).json({
          status:"success",
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: (products.page -1),
        nextPage: (products.page -1),
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: prevPageLink,
        nextLink: nextPageLink
        })
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
})
  
routerProduct.get('/:id', async (req, res) => { 
    try {
        const product = await productManager.getElementById(req.params.id);
        if (product) {
          res.status(200).json(product);
        } else {
          res.status(200).json({
            message: "Product not found",
          });
        }
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
})
  
routerProduct.post('/', async (req, res) => { 
    try {
        const product = await productManager.addElements(req.body);
        res.status(200).json(product);
    } catch(error){
        res.status(500).json({
            message: error.message,
          });
    }
   
})
  
routerProduct.delete('/:id', async (req, res) => {
    try {
        const product = await productManager.deleteElement(req.params.id);
        res.status(200).json(product);
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
})
  
routerProduct.put('/:id', async (req, res) => { 
    try {
        const product = await productManager.updateElement(
          req.params.id,
          req.body
        );
        res.status(200).json(product);
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
})

export default routerProduct