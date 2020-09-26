import React from 'react';
import style from './Header.module.css';
import {NavLink} from 'react-router-dom';
import {I_languagePage} from "../../types/types";

const checkActive = (match: any, location: any) => {
    //some additional logic to verify you are in the home URI
    if(!location) return false;
    const {pathname} = location;
    return pathname === "/";
};

interface IProps {
    setVisible?: (param: boolean) => void
    languageData: I_languagePage
}

function HeaderMenu({setVisible, languageData}: IProps) {
    return (
        <div className={style.headerIn}>
            <div className={style.menu}>
                <NavLink onClick={() => setVisible?.(false)} to="/" isActive={checkActive} activeClassName={style.active}>
                    Меню
                </NavLink>
                <NavLink onClick={() => setVisible?.(false)} to="/about" activeClassName={style.active}>
                    О нас
                </NavLink>
            </div>
            <div className={style.info}>
                {languageData && languageData.front_text
                    ? languageData.front_text.filter(t => t.text_name.indexOf("header") >= 0).map(t => (
                        t.text_name === 'header time'
                            ? <span className={style.bold}>{t.text}</span>
                            : <span>{t.text}</span>
                    ))
                    : <React.Fragment>
                        <span className={style.bold}> "Мы работаем с пн.-пт. с 8 до 19.00"}</span>
                        <span>+375 (33) 658-02-20</span>
                    </React.Fragment>}
            </div>
        </div>
    );
}

export default HeaderMenu;
