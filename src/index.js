import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import axios from 'axios';
import Nav from './Nav';
import store from './store';
import Groceries from './Groceries';
import CreateForm from './CreateForm';


class Route extends Component{
    constructor(){
        super();
        this.state = {
            view: ''
        };
    }
    componentDidMount(){
        window.addEventListener('hashchange', ()=>{
            this.setState({ view: window.location.hash.slice(1) });
        })
        this.setState({ view: window.location.hash.slice(1) });

    }
    render(){
        console.log(this.state);
        const HashConnected = this.props.component;
        return (
            <HashConnected { ...this.state }/>
        );
    }
}

class _App extends Component{
    componentDidMount(){
        //console.log(this.props.bootstrap);
        this.props.bootstrap();

    }
  render(){ 
    //console.log(this.props.groceries);   
    //const { groceries } = this.props;
    //console.log(view);
    return (
        <div>
      <h1>Acme Groceries</h1>
        <Route component= { Nav } />
        <CreateForm />
        <Route component= { Groceries } />
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