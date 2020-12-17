import { createStore } from 'redux';

const intialState = {
    groceries: [],
    view: ''
};

const store = createStore((state = intialState, action)=> {
    if(action.type === 'LOAD'){
        console.log(action.groceries);
        state = {...state, groceries: action.groceries};
    }
    if(action.type === 'UPDATE'){
        state = {...state, groceries: state.groceries.map(grocery => grocery.id === action.grocery.id ? action.grocery : grocery) };
    }
    if(action.type === 'CREATE'){
        state = {...state, groceries: [...state.groceries, action.grocery] };
    }
    if(action.type === 'SET_VIEW'){
        state = {...state, view: action.view };
    }
    return state;
});

export default store;