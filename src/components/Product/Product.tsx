import "./ProductStyle.css";
import { FunctionComponent } from "react";
import { useState } from "react";

import { ProductType } from "../../types";
import Detail from "../Detail/Detail";

interface IProductProps {
  product: ProductType;
}

const Products: FunctionComponent<IProductProps> = (props) => {
  const { product } = props;
  const [detailStatus, setDetailStatus] = useState(false);

  const onDetail = (): void => {
    setDetailStatus(!detailStatus);
  };

  return (
    <>
      {detailStatus && <Detail product={product} onDetail={onDetail} />}
      <div className="product" onClick={onDetail}>
        <div className="img">
          <img src={product.images[0]} alt={product.title} />
        </div>
        <h3>{product.title}</h3>
        <span>Price: ${product.price}</span>
      </div>
    </>
  );
};

export default Products;
