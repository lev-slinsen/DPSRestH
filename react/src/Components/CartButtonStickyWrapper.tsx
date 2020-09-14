import React from "react";
import CartBtn from "./Header/CartBtn";
import style from './Main.module.css';

const CartButtonStickyWrapper: React.FC = () => {
    return (
        <div className={style.stickyWrapper}>
            <CartBtn totalQuantity={2} totalPrice={2}/>
        </div>
    )
};

export default CartButtonStickyWrapper;