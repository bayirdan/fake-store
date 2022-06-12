import "./DetailStyle.css";
import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { addCart } from "../../features/cartSlice";
import { ProductType } from "../../types";
import { IoMdClose } from "react-icons/io";

interface IProps {
  product: ProductType;
  onDetail: () => void;
}

const Detail: FunctionComponent<IProps> = (props) => {
  const { product, onDetail } = props;
  const dispatch = useDispatch();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const onSubmit = (e: { preventDefault: () => void }) => {
    dispatch(addCart({ product, amount: 1 }));
    Toast.fire({
      icon: "success",
      title: "Product added",
    });
  };

  return (
    <>
      <div className="detail-box">
        <div className="detail">
          <div className="top">
            <h2>{product.title}</h2>
            <div className="close" onClick={onDetail}>
              <IoMdClose />
            </div>
          </div>
          <div className="img">
            <img src={product.images[0]} alt={product.title} />
          </div>
          <div className="description">
            <p>{product.description}</p>
          </div>
          <div className="price">
            <span>Price: ${product.price}</span>
            <button onClick={onSubmit}>Add Cart</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
