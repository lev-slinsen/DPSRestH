import React, {useEffect} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {I_orderItem} from "../../types/types";
import {getOrder, getTotalPrice, getTotalQuantity} from "../../Redux/selectors";
import {AppStateType} from "../../Redux/Store";
import style from './Cart.module.css';
import ButtonMain from "../../common/Buttons/ButtonMain";
import {decreaseQuantity, increaseQuantity, removeFromOrder} from "../../Redux/actions";

interface IConnectProps {
    order: Array<I_orderItem>,
    totalQuantity: number,
    totalPrice: number
}

interface IDispatchProps {
    decreaseQuantity: (id: string) => void;
    increaseQuantity: (id: string) => void;
    removeFromOrder: (id: string) => void;
}

interface ICartItemProps {
    product: I_orderItem,
    decreaseQuantity: (id: string) => void;
    increaseQuantity: (id: string) => void;
    removeFromOrder: (id: string) => void;
}

const Cart = ({order, decreaseQuantity, increaseQuantity, removeFromOrder, totalPrice, totalQuantity}: IDispatchProps & IConnectProps) => {

    let tableItems = order.map((po, i) => <tr key={po.id + 'product_in_cart' + i}>
            <TableItem product={po} decreaseQuantity={decreaseQuantity}
                       increaseQuantity={increaseQuantity} removeFromOrder={removeFromOrder}/>
        </tr>
    );

    useEffect(
        () => {
            window.scrollTo(0, 0);
        }, []);

    return (
        <div className={style.cartWrapper}>
            {!order.length ? <h2>Ваша корзина пуста.</h2> : <h2>В корзине товаров: {totalQuantity}</h2>}
            {order.length ?
                <React.Fragment>
                    <div className={style.cartTableWrapper}>
                        <table className={style.cartTable}>
                            <thead>
                            <tr>
                                <div className={style.cartRowGrid}>
                                    <div></div>
                                    <span style={{textAlign: "start"}}>Название</span>
                                    <div>Цена</div>
                                    <div>Шт.</div>
                                    <div>Сумма</div>
                                </div>
                            </tr>
                            </thead>
                            <tbody>
                            {tableItems}
                            </tbody>
                        </table>
                    </div>
                    <div className={style.rowBetween}>
                        <div className={style.col}>
                            <span>Доставка бесплатная!</span>
                            <span className={style.bold}>К оплате: {totalPrice} BYN</span>
                        </div>
                    </div>
                </React.Fragment> : ""}
            <div className={style.rowBetween}>
                <NavLink to="/" className={style.btnToMenu}>
                    <ButtonMain buttonText={"В Меню"}/>
                </NavLink>
                <NavLink
                    style={!order.length ? {pointerEvents: 'none'} : {}}
                    to={order.length ? "/order" : ''} className={style.btnOrder}
                >
                    <ButtonMain buttonText={"Заказать"} disabled={!order.length}/>
                </NavLink>
            </div>
        </div>
    )
};

const TableItem = ({product, decreaseQuantity, increaseQuantity, removeFromOrder}: ICartItemProps) => {
    return (
        <div className={style.cartRowGrid}>

            <span className={style.mainImg}>
                <img src={product.photo_thumbnail ? product.photo_thumbnail : product.photo} alt={product.text_short}/>
            </span>


            <span className={style.description}>
                <h6>{product.name}</h6>
                <span className={style.descText}>{product.text_short}</span>
            </span>

            <div className={style.purpose}>
                <span>{product.price}</span>
            </div>

            <div className={style.colCalc}>
                <button
                    onClick={() => {
                        increaseQuantity(product.id)
                    }}
                    className={style.btnSmall}
                >+
                </button>
                <span><b>{product.quantity}</b></span>
                <button
                    onClick={() => {
                        decreaseQuantity(product.id)
                    }}
                    className={style.btnSmallMinus}
                >-
                </button>
            </div>


            <div className={style.colPrice}>
                <span>{(product.price * product.quantity).toFixed(2)}</span>
                <span><b>BYN</b></span>
                <button
                    onClick={() => {
                        //console.log(product.id);
                        removeFromOrder(product.id)
                    }}
                    className={style.btnSmallClose}>X
                </button>
            </div>
        </div>
    )
};

const mapStateToProps = (state: AppStateType) => {
    return {
        order: getOrder(state),
        totalQuantity: getTotalQuantity(state),
        totalPrice: getTotalPrice(state),
    }
};

export default compose(
    connect(mapStateToProps, {increaseQuantity, decreaseQuantity, removeFromOrder})
)(Cart);
