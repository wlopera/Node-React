const productContoller = require("../controllers/productController");
const router = require("express").Router();

// Consulta de todos los productos
router.get("/product", productContoller.productGet);

// // Consulta de producto por identificador
router.get("/product/:id", productContoller.productGetById);

// Agregar nuevo producto
router.post("/product", productContoller.addProduct);

// Actualizacion de datos de un producto
router.put("/product/:id", productContoller.updateProduct);

// Borrado de producto
router.delete("/product/:id", productContoller.deleteProduct);

module.exports = router;
