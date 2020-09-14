import React, {useCallback, useEffect, useState} from 'react';
import style from './Catalog.module.css';
import ProductCard from "../ProductItem/ProductItem";
import {compose} from "redux";
import {connect} from "react-redux";
import bgPict from "./../../assets/images/slide1.png"
import {I_filterItem, I_LanguageData, I_productItem} from "../../types/types";
import {AppStateType} from "../../Redux/Store";
import {getFilters, getLanguageData, getProducts,} from "../../Redux/selectors";
import Slider from "../../common/Slider";
import {ProductsModal} from "../../common/PopupWrapper";
import {addProductToOrder, calculateOrder, setSortCategory, setSortFilter} from "../../Redux/actions";


const unique = function(a:string[]) {
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j]) a.splice(j--, 1);
        }
    }
    return a;
};


interface I_ConnectProps {
    products: Array<I_productItem>,
    filters: Array<I_filterItem>,
    languageData: I_LanguageData,
}

interface I_LinkDispatchProps {
    addProductToOrder: (productItem: I_productItem, quantity: number) => void;
    calculateOrder: () => void;
    setSortFilter: (filter: string) => void;
    setSortCategory: (category: string) => void;
}

interface I_State {
    bgPict: string
    isPopupOpen: boolean
    popupProduct: I_productItem,
    categories: Array<string>,
    selectedFilter: string,
    selectedCategory: string
}

const Catalog: React.FC<I_ConnectProps & I_LinkDispatchProps> = (props) => {
    let [state, setState] = useState<I_State>({
        bgPict: bgPict,
        isPopupOpen: false,
        popupProduct: props.products[0],
        categories: [],
        selectedFilter: 'All',
        selectedCategory: ''
    });
    useEffect(() => {
        let cat = unique(props.products.map(p => p.category));
        setState({...state, categories: cat, selectedCategory: cat[0]})
    }, [props.products]);
    let {languageData} = props;

    const setPopupOpen = useCallback((product: I_productItem, option: boolean) => {
        setState({...state, popupProduct: product});
        setState({...state, isPopupOpen: option});
    }, []);

    const setPopupClose = useCallback(() => {
        setPopupOpen(state.popupProduct, false)
    }, []);

    const callCalculateOrder = useCallback(props.calculateOrder, []);

    const callAddProductToOrder = useCallback(props.addProductToOrder, []);

    const changeFilter = (filterName: string) => {
        if (filterName === "All") {
            setState({...state, selectedFilter: filterName})
        } else {
            setState({...state, selectedFilter: filterName})
        }
    };
    const changeCategory = (category: string) => {
        if (state.selectedCategory === category) {
            setState({...state, selectedCategory: ''})
        } else {
            setState({...state, selectedCategory: category, selectedFilter: 'All'})
        }
    };

    let products = props.products
        .filter(p =>
            state.selectedCategory
                ? p.category === state.selectedCategory
                : !(state.selectedFilter && state.selectedFilter !== 'All')
                    ? true
                    : p.filter.map(f => f.name).includes(state.selectedFilter)
        )
        .map(p => (
            <ProductCard product={p}
                         openPopup={setPopupOpen}
                         key={p.id}
                         calculateOrder={callCalculateOrder}
                         addProductToOrder={callAddProductToOrder}
            />
        ));
    let filters = props.filters.map(f => {
        let classBtn = f.name === state.selectedFilter ? `${style.filterBtn} ${style.active}` : style.filterBtn;
        //let itemInRow = Math.round(props.filters.length / 2);
        return <button key={f.name}
                       className={classBtn}
                       onClick={() => {
                           changeFilter(f.name)
                       }}
                       disabled={f.name === 'All' ? false :
                           props.products.filter(p =>
                               state.selectedCategory ?
                               p.filter.map(fi => fi.name).includes(f.name)
                               && p.category === state.selectedCategory : true
                           ).length <= 0
                       }
        >{f.name}</button>
    });
    let categories = state.categories
        .map((c, i) => {
            let classBtn = c === state.selectedCategory ? `${style.filterBtn} ${style.active}` : style.filterBtn;
            return (
                <button key={c + 'category' + i} className={classBtn}
                        onClick={() => {
                            changeCategory(c)
                        }}
                >{c}
                </button>
            )
        });

    return (
        <div>
            {state.isPopupOpen &&
            <ProductsModal
                product={state.popupProduct}
                setPopupClose={setPopupClose}
            />}

            <div>
                <div>
                    <Slider
                        commonImages={languageData.index.front_image}
                        commonTexts={languageData.index.front_text}
                    />
                </div>
                <div className={style.container}>
                    <div className={style.filterBlock}>
                        <div className={style.filterBlockTop} style={{}}>
                            {categories}
                        </div>
                        <div className={style.filterBlockTop}>
                            {filters}
                        </div>
                    </div>
                </div>
                <div className={style.productsContainer}>
                    {products}
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state: AppStateType): I_ConnectProps => {
    return {
        products: getProducts(state),
        filters: getFilters(state),
        languageData: getLanguageData(state)
    }
};
export default compose(
    connect(mapStateToProps, {addProductToOrder, calculateOrder, setSortFilter, setSortCategory})
)(Catalog);
