import React, { useState, useEffect } from "react";

import ProductService from "../../services/ProductService";

const Product = () => {
  const [dataTabla, setDataTable] = useState({});

  useEffect(() => {
    const service = new ProductService();
    service.productGet().then((data) => setDataTable(data.data.resulset));
  }, []);

  console.log(111, dataTabla);
  if (dataTabla.length > 0) return dataTabla.map((item, key) => <li key={key}>{item.nombre}</li>);
  else return null;
};

export default Product;
