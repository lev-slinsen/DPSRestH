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


const unique = function (a: string[]) {
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
    popupProduct: I_productItem | null,
    categories: Array<string>,
    selectedFilter: string,
    selectedCategory: string
}

const Catalog: React.FC<I_ConnectProps & I_LinkDispatchProps> = (props) => {
    let [state, setState] = useState<I_State>({
        bgPict: bgPict,
        isPopupOpen: false,
        popupProduct: null,
        categories: [],
        selectedFilter: 'All',
        selectedCategory: ''
    });
    useEffect(() => {
        if (!state.categories.length) {
            let cat = unique(props.products.map(p => p.category));
            setState({...state, categories: cat, selectedCategory: cat[0]})
        }
    }, [props.products]);

    let {languageData} = props;

    const setPopupOpen = useCallback((product: I_productItem | null, option: boolean) => {
        setState({...state, popupProduct: product, isPopupOpen: option});
    }, [state]);

    const setPopupClose = useCallback(() => {
        setPopupOpen(null, false)
    }, [state]);

    const callCalculateOrder = useCallback(props.calculateOrder, []);

    const callAddProductToOrder = useCallback(props.addProductToOrder, []);

    const changeFilter = useCallback((filterName: string) => {
        if (filterName === "All") {
            setState({...state, selectedFilter: filterName})
        } else {
            setState({...state, selectedFilter: filterName})
        }
    }, [state]);
    const changeCategory = useCallback((category: string) => {
        if (state.selectedCategory === category) {
            setState({...state, selectedCategory: ''})
        } else {
            setState({...state, selectedCategory: category, selectedFilter: 'All'})
        }
    }, [state]);

    return (
        <div>
            {state.isPopupOpen && state.popupProduct &&
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
                <Filters categories={state.categories}
                         filters={props.filters}
                         changeCategory={changeCategory}
                         changeFilter={changeFilter}
                         products={props.products}
                         selectedCategory={state.selectedCategory}
                         selectedFilter={state.selectedFilter}
                />
                <Products
                    products={props.products
                        .filter(p => +state.selectedCategory === +p.category)
                        .filter(p => !(state.selectedFilter && state.selectedFilter !== 'All')
                            ? true
                            : p.filter.map(f => f.name).includes(state.selectedFilter))
                    }
                    setPopupOpen={setPopupOpen}
                    callCalculateOrder={callCalculateOrder}
                    callAddProductToOrder={callAddProductToOrder}
                />
            </div>
        </div>
    )
};

interface IProductsProps {
    products: I_productItem[],
    callAddProductToOrder: (product: I_productItem, quantity: number) => void
    callCalculateOrder: () => void
    setPopupOpen: (product: I_productItem, option: boolean) => void
}

const Products = React.memo<IProductsProps>(({products, setPopupOpen, callCalculateOrder, callAddProductToOrder}) => {
    return (
        <div className={style.productsContainer}>
            {products
                .map(p => (
                    <ProductCard product={p}
                                 openPopup={setPopupOpen}
                                 key={p.id}
                                 calculateOrder={callCalculateOrder}
                                 addProductToOrder={callAddProductToOrder}
                    />
                ))}
        </div>
    )
});

interface IFiltersProps {
    categories: Array<string>,
    selectedFilter: string,
    selectedCategory: string,
    products: Array<I_productItem>,
    filters: Array<I_filterItem>,
    changeCategory: (c: string) => void
    changeFilter: (f: string) => void
}

const Filters = React.memo<IFiltersProps>(({categories, filters, changeCategory, changeFilter, products, selectedCategory, selectedFilter}) => {
    const renaming = [
        '',
        'Готовые наборы',
        'Фуршетные (5 по 70г.)',
        'Большие (135г.)',
    ];

    return (
        <div className={style.filterBlock}>
            <div className={style.filterBlockTop} style={{}}>
                {categories
                    .map((c, i) => {
                        let classBtn = c === selectedCategory ? `${style.filterBtn} ${style.active}` : style.filterBtn;
                        return (
                            <button key={c + 'category' + i} className={classBtn}
                                    onClick={() => {
                                        changeCategory(c)
                                    }}
                            >{renaming[+c]}
                            </button>
                        )
                    })}
            </div>
            <div className={style.filterBlockTop}>
                {filters.map(f => {
                    let classBtn = f.name === selectedFilter ? `${style.filterBtn} ${style.active}` : style.filterBtn;
                    //let itemInRow = Math.round(props.filters.length / 2);
                    return <button key={f.name}
                                   className={classBtn}
                                   onClick={() => {
                                       changeFilter(f.name)
                                   }}
                                   disabled={f.name === 'All' ? false :
                                       products.filter(p =>
                                           selectedCategory ?
                                               p.filter.map(fi => fi.name).includes(f.name)
                                               && p.category === selectedCategory : true
                                       ).length <= 0
                                   }
                    >{f.name === 'All' ? 'Все' : f.name}</button>
                })}
            </div>
        </div>
    )
});

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
