import React from 'react';
import style from './Header.module.css';
import {NavLink} from "react-router-dom";

interface IProps {
    totalQuantity: number,
    totalPrice: number
}

const CartBtn:React.FC<IProps> = React.memo(({totalQuantity, totalPrice}:IProps) => {

    return (
        <NavLink to="/cart" className={style.cartBtnWrapper}>
            <div className={style.cartName}>
                <span>Корзина</span>
            </div>
            <div className={style.calculate}>
                <span>{totalQuantity}</span>
            </div>
        </NavLink>
    );
});

export default CartBtn;
