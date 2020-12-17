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
    if(action.type === 'SET_VIEW'){
        state = {...state, view: action.view };
    }
    return state;
});

export default store;