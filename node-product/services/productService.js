const mssql = require("mssql");

// Manejo de archivo properties
const PropertiesReader = require("properties-reader");
const prop = PropertiesReader("config.properties");

/**
 * Conexion a BD
 */
const config = {
  server: prop.get("mssql.host"),
  user: prop.get("mssql.user"),
  password: prop.get("mssql.password"),
  database: prop.get("mssql.database"),
  options: {
    enableArithAbort: true,
  },
};

// Conectar a labase de datos
mssql.connect(config);

// validar conexion
mssql.on("error", (err) => {
  console.error("Error de conxion: ", err);
});

class productService {
  constructor() {}
  /**
   * Permite la consulta de productos
   *
   * @param req Peticion realizada
   * @param res Respuesta a la peticion
   * @param query Query de consulta
   * @param params parametros requeridos por la consulta
   */
  productGet(query) {
    console.log("----- Consulta de Producto(s) -------- ");
    console.log("query: " + query);
    console.log("-------------------------------------- ");
    return new mssql.Request().query(query);
  }

  /**
   * Permite la consulta de producto X ID
   *
   * @param req Peticion realizada
   * @param res Respuesta a la peticion
   * @param query Query de consulta
   * @param params parametros requeridos por la consulta
   */
  productGetById(req, res, query, id) {
    console.log("----- Consulta de Producto x ID -------- ");
    console.log("query: " + query);
    console.log("param: " + id);
    console.log("-------------------------------------- ");
    return new mssql.Request().input("id", mssql.Int, id).query(query);
  }

  /**
   * Permite borrar  un producto
   *
   * @param req Peticion realizada
   * @param res Respuesta a la peticion
   * @param query Query del borrado
   * @param id parametros requerido para el borrado
   * @param mesage Mensaje en caso de error
   */
  deleteProduct(req, res, query, id, message) {
    console.log("--------------- Borrar Producto --------------- ");
    console.log("query: " + query);
    console.log("id: " + id);
    console.log("message-error: " + message);
    console.log("----------------------------------------------- ");

    new mssql.Request()
      .input("id", mssql.Int, id)
      .query(query)
      .then((result) => {
        const response = {
          resulset: "Borrado el producto satisfactoriamente! ",
          id,
          size: result.rowsAffected,
        };
        console.log(response);
        res.send(response);
      })
      .catch((err) => {
        console.error(message, ": ", err);
      });
  }

  /**
   * Agregar un producto
   *
   * @param req Peticion realizada
   * @param res Respuesta a la peticion
   * @param query Query para agregar
   * @param id parametros requerido para agregar
   * @param mesage Mensaje en caso de error
   */
  addProduct(req, res, query, params, message) {
    console.log("--------------- Agrear Producto --------------- ");
    console.log("query: " + query);
    console.log("params: " + params);
    console.log("message-error: " + message);
    console.log("----------------------------------------------- ");

    new mssql.Request()
      .input("codigo", mssql.Int, params[0])
      .input("nombre", mssql.VarChar, params[1])
      .input("precio", mssql.Float, params[2])
      .query(query)
      .then((result) => {
        const response = {
          resulset: "Producto agregado satisfactoriamente! ",
          name: params[1],
          size: result.rowsAffected,
        };
        console.log(response);
        res.send(response);
      })
      .catch((err) => {
        console.error(message, ": ", err);
      });
  }

  /**
   * Modificar un producto
   *
   * @param req Peticion realizada
   * @param res Respuesta a la peticion
   * @param query Query para modificar
   * @param id parametros requerido para modificar
   * @param mesage Mensaje en caso de error
   */
  updateProduct(req, res, query, params, message) {
    console.log("------------- Modificar Producto --------------- ");
    console.log("query: " + query);
    console.log("params: " + params);
    console.log("message-error: " + message);
    console.log("----------------------------------------------- ");

    new mssql.Request()
      .input("codigo", mssql.Int, params[0])
      .input("nombre", mssql.VarChar, params[1])
      .input("precio", mssql.Float, params[2])
      .input("id", mssql.Int, params[3])
      .query(query)
      .then((result) => {
        const response = {
          resulset: "Producto modificado satisfactoriamente! ",
          name: params[1],
          size: result.rowsAffected,
        };
        console.log(response);
        res.send(response);
      })
      .catch((err) => {
        console.error(message, ": ", err);
      });
  }
}

module.exports = productService;
