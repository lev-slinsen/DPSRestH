import React, {useEffect, useState} from 'react';
import style from './StickyBar.module.css';
// @ts-ignore
import {Fade} from "react-reveal";
import CartBtn from "../Header/CartBtn";

interface I_Props {
    totalQuantity: number,
    totalPrice: number,
}

const StickyBar: React.FC<I_Props> = React.memo(({totalQuantity, totalPrice}: I_Props) => {
    let [opened, setOpened] = useState(false);
    let [visible, setVisible] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, []);

    const hideMenu = () => {
        setOpened(false)
    };

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const visible = 400 < currentScrollPos;

        setVisible(visible);
    };
    let stickyCard = visible ? style.visible : '';
    return (
        <div className={style.navButton}>
            <div className={stickyCard} style={{display: visible ? 'block' : 'none'}}>
                <Fade right big when={visible}>
                    <div onClick={hideMenu}>
                        <CartBtn totalQuantity={totalQuantity} totalPrice={totalPrice}/>
                    </div>
                </Fade>
            </div>
        </div>
    )
});

export default StickyBar;
