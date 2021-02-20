const ProductService = require("../services/productService");

// Manejo de archivo properties
const PropertiesReader = require("properties-reader");
const prop = PropertiesReader("config.properties");

/**
 * Permite la consulta de productos
 *
 * @param req Peticion realizada
 * @param res Respuesta a la peticion
 * @param query Query de consulta
 * @param params parametros requeridos por la consulta
 */
exports.productGet = async (req, res) => {
  const productService = new ProductService();
  const result = await productService.productGet(prop.get("query.get.product"));

  if (result.recordset != null) {
    const response = {
      resulset: result.recordset,
      size: result.rowsAffected,
    };
    res.send(response);
    console.log("Response: ", response);
  }
};

/**
 * Permite la consulta de producto X ID
 *
 * @param req Peticion realizada
 * @param res Respuesta a la peticion
 * @param query Query de consulta
 * @param params parametros requeridos por la consulta
 */
exports.productGetById = async (req, res) => {
  const productService = new ProductService();
  const { id } = req.params;
  const result = await productService.productGetById(req, res, prop.get("query.get.product.by.id"), [id]);

  if (result.recordset != null) {
    const response = {
      resulset: result.recordset,
      size: result.rowsAffected,
    };
    res.send(response);
    console.log("Response: ", response);
  }
};

/**
 * Permite borrar  un producto
 *
 * @param req Peticion realizada
 * @param res Respuesta a la peticion
 * @param query Query del borrado
 * @param id parametros requerido para el borrado
 * @param mesage Mensaje en caso de error
 */
exports.deleteProduct = async (req, res) => {
  const productService = new ProductService();
  const { id } = req.params;
  await productService.deleteProduct(
    req,
    res,
    prop.get("query.delete.product"),
    [id],
    prop.get("message.error.delete.product")
  );
};

/**
 * Agregar un producto
 *
 * @param req Peticion realizada
 * @param res Respuesta a la peticion
 * @param query Query para agregar
 * @param id parametros requerido para agregar
 * @param mesage Mensaje en caso de error
 */
exports.addProduct = async (req, res) => {
  const productService = new ProductService();
  const { codigo, nombre, precio } = req.body;
  await productService.addProduct(
    req,
    res,
    prop.get("query.post.product"),
    [codigo, nombre, precio],
    prop.get("message.error.post.product")
  );
};

/**
 * Modificar un producto
 *
 * @param req Peticion realizada
 * @param res Respuesta a la peticion
 * @param query Query para modificar
 * @param id parametros requerido para modificar
 * @param mesage Mensaje en caso de error
 */
exports.updateProduct = async (req, res) => {
  const productService = new ProductService();
  const { id } = req.params;
  const { codigo, nombre, precio } = req.body;

  await productService.updateProduct(
    req,
    res,
    prop.get("query.put.product"),
    [codigo, nombre, precio, id],
    prop.get("message.error.put.product")
  );
};
