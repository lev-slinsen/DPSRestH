import {createSelector} from "reselect";
import {AppStateType} from "./Store";
import {I_productItem} from "../types/types";

export const _getProducts = (state:AppStateType) => state.reducer.products;
export const getFilters = (state:AppStateType) => state.reducer.filters;
export const getCategories = (state:AppStateType) => state.reducer.categories;
export const getSelectedFilter = (state:AppStateType) => state.reducer.selectedFilter;
export const getTotalPrice = (state:AppStateType) => state.reducer.totalPrice;
export const getIsFetching = (state:AppStateType) => state.reducer.isFetching;
export const getTotalQuantity = (state:AppStateType) => state.reducer.totalQuantity;
export const getOrder = (state:AppStateType) => state.reducer.order;
export const getOrderDates = (state:AppStateType) => state.reducer.orderData;
export const getOrderSuccess = (state:AppStateType) => state.reducer.orderSuccess;
export const getSelectedCategory = (state:AppStateType) => state.reducer.selectedCategory;

export const getLanguageData = (state:AppStateType) => state.language.languageData;

export const getProducts = createSelector(_getProducts, getSelectedFilter, getSelectedCategory,(products, selectedFilter, selectedCategory) => {
    return products.filter((p:I_productItem) => {
        // if ((selectedFilter === 'All' || !selectedFilter) && selectedCategory) {
        //     return p.category === selectedCategory
        // } else if (selectedFilter && selectedFilter !== 'All') {
        //     return p.filter.map(f => f.name).includes(selectedFilter) && p.category === selectedCategory
        // } else return true
        return true
    })
});
