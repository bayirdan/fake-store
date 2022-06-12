import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductType } from "./types/index";

import Header from "./components/Header/Header";
import Product from "./components/Product/Product";

function App() {
  const [products, setProducts] = useState<ProductType[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const getAllProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get<ProductType[]>(
        "https://api.escuelajs.co/api/v1/products"
      );
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Something is wrong!");
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className="App">
      <Header />
      <h1 className="title">{loading ? "Loading..." : "Products"}</h1>
      <div className="products">
        {products &&
          products?.map((product) => {
            if (product.images[1]) {
              return <Product product={product} key={product.id} />;
            }
          })}
      </div>
    </div>
  );
}

export default App;
