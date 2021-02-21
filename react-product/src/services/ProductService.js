import axios from "axios";
import { API_PRODUCT } from "../services/config";

class ProductService {
  /**
   * productGet:  Permite la consulta de productos
   */
  productGet = () =>
    axios.get(`${API_PRODUCT}/product`).then((res) => {
      return res;
    });
}
export default ProductService;
