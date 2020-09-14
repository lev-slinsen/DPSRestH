import React from 'react';
import style from './Footer.module.css';
import belCard from "../../assets/icons/payment/belCard.png";
import bePaid from "../../assets/icons/payment/bePaid.png";
import maestro from "../../assets/icons/payment/maestro.png";
import masterCard from "../../assets/icons/payment/masterCard.png";
import mtbank from "../../assets/icons/payment/mtbank.png";
import visa from "../../assets/icons/payment/visa.png";
import {NavLink} from "react-router-dom";
import {I_LanguageData} from "../../types/types";

interface IProps {
    data: I_LanguageData
}

const Footer:React.FC<IProps> = ({data}) => {

    let payments = [
        {title: 'belCard', logo: belCard},
        {title: 'bePaid', logo: bePaid},
        {title: 'maestro', logo: maestro},
        {title: 'masterCard', logo: masterCard},
        {title: 'mtbank', logo: mtbank},
        {title: 'visa', logo: visa}
    ].map(p => {
        return (
            <NavLink className={style.payment} key={p.title} to="/payment">
                <img src={p.logo} alt={p.title}/>
            </NavLink>
        )
    });

    const req  = data.cross.front_text.filter(t => t.text_name.indexOf("req") >= 1);
    const cont = data.cross.front_text.filter(t => t.text_name.indexOf("cont") >= 1);

    return (
        <footer className={style.footerWrapper}>
            <div className={style.container}>
                <div className={style.containerRow}>
                    <div className={style.containerCol}>
                        <h4>
                            РЕКВИЗИТЫ КОМПАНИИ
                        </h4>
                        {req.length
                            ? req.map(d => <p key={d.text_name}>{d.text}</p>)
                            : <React.Fragment>
                                <p>"Общество с ограниченной ответственностью «Печь Орин»"}</p>
                                <p>220035, г. Минск, ул. Бачило, д. 18</p>
                                <p>УНП 192810299</p>
                                <p>Регистрационный номер в ТР РБ: 402852</p>
                            </React.Fragment>}
                    </div>
                    <div className={style.containerCol}>
                        <h4>
                            КОНТАКТЫ
                        </h4>
                        {cont.length
                            ? cont.map(d => <p key={d.text_name}>{d.text}</p>)
                            : <React.Fragment>
                                <p>Телефон: +375 33 6580220</p>
                                <p>E-mail: info@pechorin.by</p>
                            </React.Fragment>}
                        <p>Сайт: <a href={'pechorin.by'}>pechorin.by</a></p>
                    </div>
                </div>
                <hr/>
                <div className={style.containerRow}>
                    {payments}
                </div>
                <hr/>
                <div className={style.container}>
                    <span>© 2019 Copyright: <a href={'pechorin.by'}>pechorin.by</a></span>
                </div>

            </div>
        </footer>
    )
};

export default Footer;
