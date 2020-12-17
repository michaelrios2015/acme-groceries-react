import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';

const _Groceries = ({ groceries, view, toggle, create })=> {
    return (
        <div>
            <button onClick={ create }>Create</button>
            <ul>
            {
                groceries.filter( grocery => !view || ( grocery.purchased && view === 'purchased') || ( !grocery.purchased && view === 'needs')).map(grocery => {
                    return (
                    <li onClick= { ()=> toggle(grocery) } key = { grocery.id } className = { grocery.purchased ? 'purchased' : ' '}>{ grocery.name }</li>
                    );
                })
            }
            </ul>
        </div>
    );
};

const mapDispatchToProps = (dispatch)=> {
    return {
        toggle: async (grocery)=>{
            const updated = (await axios.put(`/api/groceries/${grocery.id}`, { purchased: !grocery.purchased })).data;
            //console.log(updated);
            dispatch({ type: 'UPDATE', grocery: updated});
        },
        create: async ()=>{
            const grocery = (await axios.post(`/api/groceries/random`)).data;
            //console.log(updated);
            dispatch({ type: 'CREATE', grocery });
        }
    };

};

const Groceries = connect(state => state, mapDispatchToProps)(_Groceries);

export default Groceries;