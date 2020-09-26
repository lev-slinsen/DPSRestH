import {languageDataAPI} from "./API/api";
import {
    I_appLanguageState, I_languagePage, I_LanguageData,
} from "../types/types";

import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./Store";
import {FormAction} from "redux-form";
import {convertArrayToObject} from "../utils/object-helpers";
import {I_appActions} from "./actions";
import Ico from '../assets/icons/sets.png'

const SET_LANGUAGE_DATA_SUCCESS = 'LANGUAGE_DATA/SET_LANGUAGE_DATA_SUCCESS';
const SET_LANGUAGE_DATA_ERROR = 'LANGUAGE_DATA/SET_LANGUAGE_DATA_ERROR';
const SET_LANGUAGE_DATA_FETCHING = 'LANGUAGE_DATA/SET_LANGUAGE_DATA_FETCHING';

const initialState: I_appLanguageState = {
    languageData: {
        cross: {
            id: '1',
            page_name: "cross",
            front_text: [
                {
                    "text_name": "header time",
                    "text": "Мы работаем с пн.-пт. с 8 до 19.00"
                },
                {
                    "text_name": "header phone",
                    "text": "+375 (33) 658-02-20"
                },
                {
                    "text_name": "req1",
                    "text": "Общество с ограниченной ответственностью «Печь Орин»"
                },
                {
                    "text_name": "req2",
                    "text": "220035, г. Минск, ул. Бачило, д. 18"
                },
                {
                    "text_name": "req3",
                    "text": "УНП 192810299"
                },
                {
                    "text_name": "req4",
                    "text": "Регистрационный номер в ТР РБ: 402852"
                },
                {
                    "text_name": "cont1",
                    "text": "Телефон: +375 33 6580220"
                },
                {
                    "text_name": "cont2",
                    "text": "E-mail: info@pechorin.by"
                },
            ],
            front_image: []
        },
        index: {
            id: 2,
            page_name: "index",
            front_text: [
                {
                    text_name: "carousel text 1",
                    text: "Пекарня Печорин предлагает Вам выпечку по оригинальным рецептам," +
                        " основанных на классической славянской кухне."
                },
                {
                    text_name: "carousel text 2",
                    text: "Тонкое, без дрожжевое тесто, много разнообразной начинки," +
                        " это и есть настоящие, правильные пирожки."
                },
                {
                    text_name: "carousel text 3",
                    text: "Мы предлагаем только свежую выпечку, Наши кондитера приготовят и" +
                        " отпекут Ваш заказ непосредственно перед доставкой."
                }
            ],
            front_image: [
                {
                    image_name: "carousel image 3",
                    image: Ico
                },
                {
                    image_name: "carousel image 2",
                    image: Ico
                },
                {
                    image_name: "carousel image 1",
                    image: Ico
                }
            ]
        },
        about: {
            "id": 3,
            "page_name": "about",
            "front_text": [
                {
                    "text_name": "head1",
                    "text": "О нас"
                },
                {
                    "text_name": "article1",
                    "text": "Пекарня Печорин предлагает Вам выпечку по оригинальным рецептам, основанных на классической славянской кухне. Тонкое, без дрожжевое тесто, много разнообразной начинки, это и есть настоящие, правильные пирожки. Мы предлагаем только свежую выпечку, Наши кондитера приготовят и отпекут Ваш заказ непосредственно перед доставкой. Вы можете самостоятельно собрать набор из нашего ассортимента для любого случая. Накрыть стол для друзей, коллег по работе, организовать фуршет. Каждый найдет в нашем ассортименте пирог по своему вкусу."
                },
                {
                    "text_name": "head2",
                    "text": "О сервисе"
                },
                {
                    "text_name": "article2",
                    "text": "Пекарня Печорин предлагает Вам выпечку по оригинальным рецептам, основанных на классической славянской кухне. Тонкое, без дрожжевое тесто, много разнообразной начинки, это и есть настоящие, правильные пирожки. Мы предлагаем только свежую выпечку, Наши кондитера приготовят и отпекут Ваш заказ непосредственно перед доставкой. Вы можете самостоятельно собрать набор из нашего ассортимента для любого случая. Накрыть стол для друзей, коллег по работе, организовать фуршет. Каждый найдет в нашем ассортименте пирог по своему вкусу."
                },
                {
                    "text_name": "head3",
                    "text": "Для юридических лиц"
                },
                {
                    "text_name": "article3",
                    "text": "Если Вы хотите сделать заказ на организацию, с оплатой по безналичному расчету. Пришлите, пожалуйста, Ваш заказ и реквизиты на наш e-mail: info@pechorin.by. Мы также осуществляем поставки нашей продукции на регулярной (договорной) основе для ИП и юр.лиц для реализации или корпоративного питания."
                },
                {
                    "text_name": "head4",
                    "text": "Для юридических лиц"
                },
                {
                    "text_name": "article5",
                    "text": "Если Вы хотите сделать заказ на организацию, с оплатой по безналичному расчету. Пришлите, пожалуйста, Ваш заказ и реквизиты на наш e-mail: info@pechorin.by. Мы также осуществляем поставки нашей продукции на регулярной (договорной) основе для ИП и юр.лиц для реализации или корпоративного питания."
                }
            ],
            "front_image": [
                {
                    "image_name": "carusel1",
                    "image": Ico
                },
                {
                    "image_name": "carusel1",
                    "image": Ico
                },
                {
                    "image_name": "carusel1",
                    "image": Ico
                },
                {
                    "image_name": "quatro1",
                    "image": Ico
                },
                {
                    "image_name": "quatro2",
                    "image": Ico
                },
                {
                    "image_name": "quatro3",
                    "image": Ico
                },
                {
                    "image_name": "quatro4",
                    "image": Ico
                },
                {
                    "image_name": "aboutMiddle1",
                    "image": Ico
                },
                {
                    "image_name": "aboutMiddle2",
                    "image": Ico
                },
                {
                    "image_name": "quatro11",
                    "image": Ico
                },
                {
                    "image_name": "quatro12",
                    "image": Ico
                },
                {
                    "image_name": "quatro13",
                    "image": Ico
                },
                {
                    "image_name": "quatro14",
                    "image": Ico
                },
            ]
        },
        order: {
            "id": 4,
            "page_name": "order",
            "front_image": [],
            "front_text": [
                {
                    text: "Ваш заказ успешно принят",
                    text_name: "modal1"
                },
                {
                    text: "Спасибо за заказ. В ближайшее время с вами свяжутся по указанному телефону.",
                    text_name: "modal2"
                }
            ]
        },
    },
    isFetchingLanguageData: false,
    errorLanguageData: null,
};

export type I_languageStateActions =
    I_setDataSuccess  |
    I_setLanguageDataError | I_setLanguageDataFetching

type GetStateType = () => AppStateType

const languageReducer = (state: I_appLanguageState = initialState, action: I_languageStateActions) => {
    switch (action.type) {
        //setting fetching status
        case SET_LANGUAGE_DATA_FETCHING:
            return {
                ...state,
                isFetching: action.status,
            };
        //error Status
        case SET_LANGUAGE_DATA_ERROR:
            return {
                ...state,
                errorLanguageData: action.errorMessage
            };
        //adding data to state
        case SET_LANGUAGE_DATA_SUCCESS:
            return {
                ...state,
                languageData: {
                    ...state.languageData,
                    ...action.languageData
                },
                errorLanguageData: null,
            };
        default:
            return state;
    }
};

//interfaces
interface I_setDataSuccess {
    type: typeof SET_LANGUAGE_DATA_SUCCESS,
    languageData: I_LanguageData
}

interface I_setLanguageDataError {
    type: typeof SET_LANGUAGE_DATA_ERROR,
    errorMessage: string
}

interface I_setLanguageDataFetching {
    type: typeof SET_LANGUAGE_DATA_FETCHING,
    status: boolean
}

//LOCAL ACTIONS
export const _setDataSuccess = (languageData: I_LanguageData): I_setDataSuccess =>
    ({type: SET_LANGUAGE_DATA_SUCCESS, languageData});

export const _setLanguageDataError = (errorMessage: string): I_setLanguageDataError =>
    ({type: SET_LANGUAGE_DATA_ERROR, errorMessage});

export const _setLanguageDataFetching = (status: boolean): I_setLanguageDataFetching =>
    ({type: SET_LANGUAGE_DATA_FETCHING, status});


//FETCH ACTIONS
export const fetchLanguageData = () =>
    async (dispatch: ThunkDispatch<{}, {}, I_languageStateActions | I_appActions | FormAction >, getState: GetStateType) => {
    dispatch(_setLanguageDataFetching(true));
    try {
        const data: Array<I_languagePage> = await languageDataAPI.getLanguageData();
        dispatch(_setDataSuccess(convertArrayToObject(data, "page_name")));
    } catch (err) {
        console.log(err);
        dispatch(_setLanguageDataError(err.message));
        dispatch(_setDataSuccess(initialState.languageData));
    }
    dispatch(_setLanguageDataFetching(false));
};

export default languageReducer;
