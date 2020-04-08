import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, NavLink} from 'react-router-dom';
import * as puppyAPI from '../../services/puppies-api';
import PuppyListPage from '../PuppyListPage/PuppyListPage';
import AddPuppyPage from '../AddPuppyPage/AddPuppyPage';

class App extends Component {
  state = {
    puppies: []
  };

  handleAddPuppy = async newPupData => {
    const newPup = await puppyAPI.create(newPupData);
    this.setState(state => ({
      puppies: [...state.puppies, newPup]
    }), () => this.props.history.push('/'));
  }

  handleDeletePuppy= async id => {
    await puppyAPI.deleteOne(id);
    this.setState(state => ({
      puppies: state.puppies.filter(p => p._id !== id)
    }), () => this.props.history.push('/'));
  }

  async componentDidMount() {
    const puppies = await puppyAPI.getAll();
    this.setState({puppies});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink exact to="/">Puppies List</NavLink>
            &nbsp;&nbsp;&nbsp;
            <NavLink exact to="/add">Add Puppy</NavLink>
          </nav>
        </header>
        <main>
          <Route exact path="/" render={({history}) =>
            <PuppyListPage 
              puppies={this.state.puppies}
              handleDeletePuppy={this.handleDeletePuppy}
            />
          } />
          <Route exact path='/add' render={() => 
            <AddPuppyPage
              handleAddPuppy = {this.handleAddPuppy}
            />
          } />
        </main>
        
      </div>
    )
  }
}



export default App;
