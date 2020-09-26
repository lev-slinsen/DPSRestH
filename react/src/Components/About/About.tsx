import React, {useState} from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import style from './About.module.css';
import {AppStateType} from "../../Redux/Store";
import Slider from "../../common/Slider";
import bgPict from "../../assets/images/slide1.png";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDesktop} from '@fortawesome/free-solid-svg-icons'
import {faTruck} from '@fortawesome/free-solid-svg-icons'
import {faIdCardAlt} from '@fortawesome/free-solid-svg-icons'
import useRecursiveTimeout from "../../utils/useRecursiveTimeout";

interface I_Props {
    imageLoaded?: any
    order?: any
}

let commonCarusel = {
    index: {
        "front_image": [
            {"image": bgPict},
            {"image": bgPict},
            {"image": bgPict}
        ],
        front_text: [
            {text: "carousel asdasdasd image 1"},
            {text: "Общество с ограниченной ответственностью «Печь Орин» image 2"},
            {text: "Общество с ограниченной ответственностью «Печь Орин» image 3"}
        ]
    }
};


const About: React.FC<I_Props> = (props: any) => {
    // let [progress, setProgress] = useState(0);
    // let [progress2, setProgress2] = useState(0);
    // let [progress3, setProgress3] = useState(0);
    //
    // useRecursiveTimeout(
    //     () =>
    //         new Promise(r => {
    //             setProgress(progress + 1);
    //             r();
    //         }), 50);
    // useRecursiveTimeout(
    //     () =>
    //         new Promise(r => {
    //             setProgress2(progress2 + 1);
    //             r();
    //         }), 70);
    // useRecursiveTimeout(
    //     () =>
    //         new Promise(r => {
    //             setProgress3(progress3 + 1);
    //             r();
    //         }), 90);
    return (
        <div>
            <Slider
                commonImages={commonCarusel.index.front_image}
                commonTexts={commonCarusel.index.front_text}
            />
            <div className={style.aboutWrapper}>
                <h2>About</h2>
                <div className={style.row}>
                    <div className={`${style.imgBlock} ${style.grid}`}>
                        <div className={style.gridItem}>
                            <img src="https://pechorin.by/media/hardcode/about/2.jpg" alt=""/>
                        </div>
                        <div className={style.gridItem}>
                            <img src="https://pechorin.by/media/hardcode/about/2.jpg" alt=""/>
                        </div>
                        <div className={style.gridItem}>
                            <img src="https://pechorin.by/media/hardcode/about/2.jpg" alt=""/>
                        </div>
                        <div className={style.gridItem}>
                            <img src="https://pechorin.by/media/hardcode/about/2.jpg" alt=""/>
                        </div>
                    </div>
                    <div className={style.textBlock}>
                        <div className={style.topBlock}></div>
                        <p>
                            Пекарня Печорин предлагает Вам выпечку по оригинальным рецептам, основанных на классической
                            славянской кухне. Тонкое, без дрожжевое тесто, много разнообразной начинки, это и есть
                            настоящие, правильные пирожки. Мы предлагаем только свежую выпечку, Наши кондитера
                            приготовят и
                            отпекут Ваш заказ непосредственно перед доставкой. Вы можете самостоятельно собрать набор из
                            нашего ассортимента для любого случая. Накрыть стол для друзей, коллег по работе,
                            организовать
                            фуршет. Каждый найдет в нашем ассортименте пирог по своему вкусу.
                        </p>
                    </div>
                </div>
                <div className={style.row}>
                    <div className={style.imgBlock}>
                        <img src={'https://pechorin.by/media/hardcode/about/5.jpg'} alt={''}/>
                    </div>
                    <div className={style.textBlock}>
                        <div className={style.topBlock}>
                            <div className={style.icon}>
                                <FontAwesomeIcon icon={faDesktop}/>
                            </div>
                            <div className={style.title}>О Сервисе</div>
                        </div>
                        <p>
                            Мы работаем с понедельника по пятницу, по рабочим дням. Заказы сегодня на сегодня
                            принимаются только по телефону до 12-30. Время для приготовления и доставки занимает от 1,5
                            часов, и зависит от величины заказа и района доставки. Если Вам нужно приготовить большой
                            заказ или важно время доставки, пожалуйста, сделайте заказ заранее.
                        </p>
                    </div>
                </div>
                <div className={style.row}>
                    <div className={style.imgBlock}>
                        <img src={'https://pechorin.by/media/hardcode/about/5.jpg'} alt={''}/>
                    </div>
                    <div className={style.textBlock}>
                        <div className={style.topBlock}>
                            <div className={style.icon}>
                                <FontAwesomeIcon icon={faIdCardAlt}/>
                            </div>
                            <div className={style.title}>Для юридических лиц</div>
                        </div>
                        <p>
                            Если Вы хотите сделать заказ на организацию, с оплатой по безналичному расчету. Пришлите,
                            пожалуйста, Ваш заказ и реквизиты на наш e-mail: info@pechorin.by. Мы также осуществляем
                            поставки нашей продукции на регулярной (договорной) основе для ИП и юр.лиц для реализации
                            или корпоративного питания.
                        </p>
                    </div>
                </div>
                <div className={style.row}>
                    <div className={`${style.imgBlock} ${style.grid}`}>
                        <div className={style.gridItem}>
                            <img src="https://pechorin.by/media/hardcode/about/2.jpg" alt=""/>
                        </div>
                        <div className={style.gridItem}>
                            <img src="https://pechorin.by/media/hardcode/about/2.jpg" alt=""/>
                        </div>
                        <div className={style.gridItem}>
                            <img src="https://pechorin.by/media/hardcode/about/2.jpg" alt=""/>
                        </div>
                        <div className={style.gridItem}>
                            <img src="https://pechorin.by/media/hardcode/about/2.jpg" alt=""/>
                        </div>
                    </div>
                    <div className={style.textBlock}>
                        <div className={style.topBlock}>
                            <div className={style.icon}>
                                <FontAwesomeIcon icon={faTruck}/>
                            </div>
                            <div className={style.title}>Доставка</div>
                        </div>
                        <p>Доставка осуществляется нашими курьерами с 9-00 до 18-30.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


const mapStateToProps = (state: AppStateType) => {
    return {}
};

export default compose(connect(mapStateToProps, {}))(About);
