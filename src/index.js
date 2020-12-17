import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import axios from 'axios';
import Nav from './Nav';
import store from './store';
import Groceries from './Groceries';
import CreateForm from './CreateForm';

// const _Groceries = ({ groceries, view })=> {
//     return (
//         <ul>
//         {
//             groceries.filter( grocery => !view || ( grocery.purchased && view === 'purchased') || ( !grocery.purchased && view === 'needs')).map(grocery => {
//                 return (
//                 <li key = { grocery.id } className = { grocery.purchased ? 'purchased' : ' '}>{ grocery.name }</li>
//                 );
//             })
//         }
//         </ul>
//     );
// };

// const Groceries = connect(state => state)(_Groceries);

class _App extends Component{
    componentDidMount(){
        //console.log(this.props.bootstrap);
        this.props.bootstrap();
        window.addEventListener('hashchange', ()=>{
            this.props.setView(window.location.hash.slice(1));
        })
        this.props.setView(window.location.hash.slice(1));
    }
  render(){ 
    //console.log(this.props.groceries);   
    const { groceries, view } = this.props;
    console.log(view);
    return (
        <div>
      <h1>Acme Groceries</h1>
        <Nav />
        <CreateForm />
        <Groceries />
        </div>
      );
  }
}

const App = connect(
    state => state,
    (dispatch)=> {
        //console.log('I was called');
        return { 
            setView: (view)=> dispatch({type: 'SET_VIEW', view}),
            bootstrap: async()=> {
                const groceries = (await axios.get('/api/groceries')).data
                dispatch({
                    type: 'LOAD',
                    groceries
                })
            }
    }
}
)(_App);


render(<Provider store={ store }><App /></Provider>, document.querySelector('#root'));