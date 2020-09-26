import React, {useCallback, useState} from 'react';
import style from './ProductItem.module.css';
import ProductImage from "./ProductImage";
import {I_productItem} from "../../types/types";
import ButtonMain from "../../common/Buttons/ButtonMain";

interface I_props {
    product: I_productItem,
    addProductToOrder: (product: I_productItem, quantity: number) => void
    calculateOrder: () => void
    openPopup: (product: I_productItem, option: boolean) => void
}

const ProductCard = ({product, addProductToOrder, calculateOrder, openPopup}: I_props) => {
    let [quantity, setQuantity] = useState<number>(1);
    const decreaseQuantity = () => {
        if (quantity !== 1) {
            setQuantity(quantity - 1)
        }
    };

    const onAddToCart = () => {
        addProductToOrder(product, quantity);
        calculateOrder();
        setQuantity(1);
    };
    const onOpenPopup = () => {openPopup(product, true)};
    return (
        <div className={style.productCardWrapper}>
            <ProductImage
                imgUrl={product.photo}
                altText={product.text_short}
                openPopup={onOpenPopup}
                imgThumbnail={product.photo_thumbnail}
            />
            <div className={style.container}>
                <h5>{product.name}</h5>
            </div>
            <div className={style.rowDiscr}>
                <span>{product.text_short}</span>
            </div>
            <div className={style.row}>
                <div className={style.calculator}>
                    <div className={style.row}>
                        <button className={style.btnSmallMinus} onClick={decreaseQuantity}>-</button>
                        <span>{quantity}</span>
                        <button className={style.btnSmall} onClick={() => {
                            setQuantity(quantity + 1)
                        }}>+
                        </button>
                    </div>
                    <div className={style.price}>
                        <span>{(product.price * quantity).toFixed(2)}</span>
                        <span style={{marginLeft: '5px'}}>BYN</span>
                    </div>
                </div>
                <div>
                    <ButtonMain onClickCallback={onAddToCart} buttonText={"Добавить в корзину"}/>
                </div>
            </div>
        </div>
    )
};

export default ProductCard;
