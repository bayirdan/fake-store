import "./HeaderStyle.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { RootState } from "../../app/store";
import { FaShoppingBag } from "react-icons/fa";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import { changeCartStatus } from "../../features/cartSlice";

const Header = () => {
  const { cart, cartStatus } = useSelector((store: RootState) => store.cart);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const dispatch = useDispatch();

  const onTotalAmount = (): void => {
    setTotalAmount(cart.length);
  };

  useEffect(() => {
    onTotalAmount();
  }, [cart]);

  return (
    <>
      {cartStatus && <ShoppingCart />}
      <div className="header-box">
        <header className="flex a-center j-between">
          <div className="logo">
            <span>M</span>arket
          </div>
          <div className="box" onClick={() => dispatch(changeCartStatus())}>
            <i>
              <FaShoppingBag />{" "}
              <div className={`total-amount ${totalAmount && "show-total"}`}>
                {totalAmount}
              </div>
            </i>
            <span>Shopping Cart</span>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
