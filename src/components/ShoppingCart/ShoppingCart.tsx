import "./ShoppingCartStyle.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { RootState } from "../../app/store";
import { ShoppingCartType } from "../../types";
import { IoMdClose } from "react-icons/io";
import {
  changeCartStatus,
  deleteCart,
  clearCart,
} from "../../features/cartSlice";

const ShoppingCart = () => {
  const { cart } = useSelector((store: RootState) => store.cart);
  const [totalPrice, setTotalPrice] = useState<number>(0);
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

  const onClear = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#373737",
      cancelButtonColor: "#dc143c",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Toast.fire({
          icon: "warning",
          title: "Your cart has been cleaned.",
        });

        dispatch(clearCart());
        dispatch(changeCartStatus());
      }
    });
  };

  const onDelete = (product: ShoppingCartType) => {
    dispatch(deleteCart(product));
    Toast.fire({
      icon: "warning",
      title: "Product deleted!",
    });
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    dispatch(clearCart());
    dispatch(changeCartStatus());

    Swal.fire({
      title: "Successfully",
      text: "Shopping Completed Successfully",
      icon: "success",
      confirmButtonColor: "#373737",
      confirmButtonText: "OK",
    });
  };

  const onTotalPrice = (): void => {
    setTotalPrice(() =>
      cart.reduce((sum, item) => sum + item.product.price * item.amount, 0)
    );
  };

  useEffect(() => {
    onTotalPrice();
  }, [cart]);

  return (
    <>
      <div className="shopping-cart-box">
        <div className="shopping-cart">
          <div className="titles">
            <h1>
              Shopping Cart
              <div
                className="close"
                onClick={() => dispatch(changeCartStatus())}
              >
                <IoMdClose />
              </div>
            </h1>
          </div>
          {cart.length ? (
            <>
              <h2>Products</h2>
              <div className="products">
                <ul>
                  {cart.length &&
                    cart.map((item, index) => {
                      return (
                        <li key={index}>
                          <img
                            className="images"
                            src={item.product.images[0]}
                            alt={item.product.title}
                          />
                          <span className="amount">{item.amount}</span>
                          <div className="item-title">{item.product.title}</div>
                          <span className="price">
                            ${item.product.price * item.amount}
                          </span>
                          <button onClick={() => onDelete(item)}>Delete</button>
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div className="buy">
                <span>Total Price: ${totalPrice}</span>
                <button onClick={onSubmit}>Buy</button>
                <a onClick={onClear}>Clear All</a>
              </div>
            </>
          ) : (
            <h2>No products have been added yet!</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
