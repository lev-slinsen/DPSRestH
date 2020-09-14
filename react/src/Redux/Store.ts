import {applyMiddleware, combineReducers, createStore} from "redux";
import productsReducer from "./productsReducer";
import { reducer as formReducer } from "redux-form";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import {I_orderLocalStorage} from "../types/types";
import languageReducer from "./languageDataReducer";


const rootReducer = combineReducers({
    reducer: productsReducer,
    language: languageReducer,
    form: formReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

store.subscribe(()=>{
    let orderStorage:I_orderLocalStorage = {
        order: store.getState().reducer.order,
        totalPrice: store.getState().reducer.totalPrice,
        totalQuantity: store.getState().reducer.totalQuantity,
    };
    localStorage.setItem('order', JSON.stringify(orderStorage))
});

export default store;