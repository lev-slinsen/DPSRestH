import React, {useState} from 'react';
import style from './Header.module.css';
import {Link} from "react-router-dom";
import CartBtn from "./CartBtn";
import logoImg from "./../../assets/icons/logo.svg"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {Drawer} from 'antd';
import HeaderMenu from "./HeaderMenu";
import {I_languagePage} from "../../types/types";

interface IProps {
    totalQuantity: number,
    totalPrice: number,
    languageData: I_languagePage
}

function Header(props: IProps) {
    const [visible, setVisible] = useState(false);

    return (
        <header className={style.headerWrapper}>
            <Link to="/">
                <div className={style.label}>
                    <img src={logoImg} alt={"Pekarnya Pechorin"}/>
                </div>
            </Link>
           <HeaderMenu languageData={props.languageData}/>
            <CartBtn {...props}/>
            <div className={style.menuBtn} onClick={() => setVisible(!visible)}>
                <FontAwesomeIcon icon={faBars}/>
            </div>
            <Drawer
                placement={'right'}
                closable={false}
                onClose={() => setVisible(false)}
                visible={visible}
                getContainer={false}
                className={style.drawer}
            >
                <HeaderMenu languageData={props.languageData} setVisible={setVisible}/>
            </Drawer>
        </header>
    );
}

export default Header;
