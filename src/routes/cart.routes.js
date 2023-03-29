import { Router } from "express";
import { getManagerCart } from "../dao/daoManager.js";

const routerCart = Router();
const data = await getManagerCart();
const managerCart = new data.ManagerCartMongoDB;

routerCart.get("/", async (req, res) => {
  try {
    const cart = await managerCart.getElements();
    res.status(200).json({ result: "success", payload: cart });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

routerCart.get("/:cId", async (req, res) => {
  try {
    const cart = await managerCart.getElementById(req.params.cId);
    const cartPopulate = await cart.populate("products.productId");
    res.status(200).json({ result: "success", payload: cartPopulate });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

routerCart.post("/", async (req, res) => {
  try {
    const newCart = await managerCart.addElements(req.body);
    res.status(200).json({
      result: "success",
      payload: newCart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

routerCart.post("/:cartId/products/:prodId", async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const prodId = req.params.prodId;
    const newProdInCart = await managerCart.addProduct(cartId, prodId);
    res.status(200).json({ result: "success", payload: newProdInCart });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

routerCart.delete("/:cartId/products/:prodId", async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const prodId = req.params.prodId;
    const delProdInCart = await managerCart.deleteProductById(cartId, prodId);
    res.status(200).json({ result: "success", payload: delProdInCart });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

routerCart.delete("/:cId", async (req, res) => {
  try {
    const deletedCart = await managerCart.deleteAllProducts(req.params.cId);
    res.status(200).json({
      result: "success",
      payload: deletedCart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

routerCart.put("/:cId", async (req, res) => {
  try {
    const cartId = req.params.cId;
    const updatedArr = await managerCart.updateAllProducts(cartId, req.body);
    res.status(200).json({ result: " success", payload: updatedArr });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

routerCart.put("/:cartId/products/:prodId", async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const prodId = req.params.prodId;
    const { quantity } = req.body;
    const updateProd = await managerCart.updateProductById(
      cartId,
      prodId,
      quantity
    );
    res.status(200).json({ result: "success", payload: updateProd });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default routerCart;