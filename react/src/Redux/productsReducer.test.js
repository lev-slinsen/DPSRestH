import productsReducer, {
    addPizzaToOrder,
    setPizzasSuccess
} from "./productsReducer";
import {_decreaseQuantity, _increaseQuantity, setFiltersSuccess} from "./actions";

let state = {
    pizzas: [
        {
            filter: [{name: 'big'}],
            name: "123",
            id: 123,
            photo: "http://127.0.0.1:8000/media/images/user.jpg",
            price: "22.00",
            size: "2",
            text_long: "ng",
            text_short: "da",
            active: true,
        },
    ],
    order: [
        {
            name: "123",
            id: 123,
            photo: "http://127.0.0.1:8000/media/images/user.jpg",
            price: "22.00",
            size: "2",
            text_short: "da",
            quantity: 2
        },
    ],
    filters: [],
    totalPrice: 0,
    totalQuantity: 0,
    selectedFilter: 'All'
};
it('active pizzas should be added to state', () => {
    //test data

    let emptyState = {};
    let pizzas = [
        {
            filter: [{name: 'big'}],
            id: 123,
            name: "123",
            photo: "http://127.0.0.1:8000/media/images/user.jpg",
            price: "22.00",
            size: "2",
            text_long: "ng",
            text_short: "da",
            active: true,
        },
        {
            filter: [{name: 'big'}],
            id: 1456643,
            name: "123",
            photo: "http://127.0.0.1:8000/media/images/user.jpg",
            price: "22.00",
            size: "2",
            text_long: "ng",
            text_short: "da",
            active: false,
        },
    ];
    let action = setPizzasSuccess(pizzas);

    //action
    let newState = productsReducer(emptyState,action);

    //expectation
    expect(newState.pizzas.length).toBe(1);
    expect(newState.pizzas[0].id).toBe(123);
});

it('filters should be added to state', () => {
    //test data

    let filters = [{name: 'one'},{name: 'two'}];
    let action = setFiltersSuccess(filters);

    //action
    let newState = productsReducer(state,action);

    //expectation
    expect(newState.filters.length).toBe(3);
    expect(newState.filters[2].name).toBe('All');
});

it('pizza quantity in order should be increased', () => {
    //test data

    let action = _increaseQuantity(123);

    //action
    let newState = productsReducer(state,action);

    //expectation
    expect(newState.order[0].quantity).toBe(3);
});

it('pizza quantity should be decreased', () => {
    //test data

    let action = _decreaseQuantity(123);

    //action
    let newState = productsReducer(state,action);

    //expectation
    expect(newState.order[0].quantity).toBe(1);
});

it('pizza quantity should not be decreased if 1', () => {
    //test data
    let oldState = {
        order: [
            {
            name: "123",
            id: 123,
            photo: "http://127.0.0.1:8000/media/images/user.jpg",
            price: "22.00",
            size: "2",
            text_short: "da",
            quantity: 1
        },
        ],
    };

    let action = _decreaseQuantity(123);

    //action
    let newState = productsReducer(oldState, action);

    //expectation
    expect(newState.order[0].quantity).toBe(1);
});

it('pizza should be added to order with id, name, photo url, quantity', () => {
    //test data
    let stateNoOrder = {
        order: [],
    };
    let action = addPizzaToOrder(state.pizzas[0], 4);

    //action
    let newState = productsReducer(stateNoOrder,action);

    //expectation
    expect(newState.order[0].quantity).toBe(4);
    expect(newState.order[0].id).toBe(123);
    expect(newState.order[0].name).toBe("123");
    expect(newState.order[0].price).toBe("22.00");
    expect(newState.order[0].size).toBe("2");
    expect(newState.order[0].text_short).toBe("da");
    expect(newState.order[0].photo).toBe ("http://127.0.0.1:8000/media/images/user.jpg");
});