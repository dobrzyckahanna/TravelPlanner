import React from 'react';
import Cookies from 'universal-cookie';
import AddTrip from './AddTrip';
import EditTrip from './EditTrip';
import { connect } from 'react-redux';
import {addFirstOne} from '../actions/exampleAction';
import Signup from './Signup';
import Login from './Login';

class App extends React.Component {

  constructor(props) {
    super(props);

    const cookies = new Cookies();
    this.state = { 
      apiResponse: "",
      travelplanner_jwt: cookies.get('travelplanner_jwt') || ""
    };
  }

  callAPI() {
    fetch("http://localhost:5000/testAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
  }

  changeText = () => {
    this.props.addFirstOne("Zupełenie nowy text")    
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
    <div>
      <header>
        Place for navigation menu
      </header>

      <Signup/>
      <Login/>

      <AddTrip/>
      <EditTrip/>
      <p>{this.state.apiResponse}</p>
      <h1>{this.props.text}</h1>
      <button onClick={this.changeText}>kliknij</button>
    </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    text: state.text
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFirstOne: newText => dispatch(addFirstOne(newText))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);