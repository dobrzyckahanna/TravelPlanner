import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Form, Label, Input } from './styled';
import Button from './Button';
import ContentWrapper from './ContentWrapper';
import getSupportedCurrencies from '../utils/getSupportedCurrencies';
import {
  setLoggedIn,
  setCurrencyList
} from '../redux/actions/userActions';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }    
  }

  onFormSubmit = async (e) => {
    e.preventDefault();    
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    const url = "http://localhost:3000/api/users/login";
    await axios.post(url, user)
      .then(res => localStorage.setItem('travelplanner_x-auth-token', res.headers["x-auth-token"]))
      .then(() => this.props.setLoggedIn())
      .then(() => getSupportedCurrencies())
      .then((list) => this.props.setCurrencyList(list))
      .then(() => console.log('Currency List' + this.props.currencyList))
      .then(() => this.props.history.push('/trips/all'))
      // Uncomment and change :tripId for testing Expenses View
      // .then(() => this.props.history.push('/trips/5e13afa0da2daf0ef07a3b8b/expenses/all'))
      .catch(err => console.log(err));
  }

  onInputChange = (inputName, e) => {
    this.setState({
      [inputName]: e.target.value
    })
  }

  render() { 
    return (
      <ContentWrapper title="Login">
        <Form onSubmit={this.onFormSubmit}>

          <Label htmlFor="login-email">Email:</Label>
          <Input type="email" name="email" id="login-email" placeholder="Email" required 
          onChange={this.onInputChange.bind(this, "email")} value={this.state.email} />

          <Label htmlFor="login-password">Password:</Label>
          <Input type="password" name="password" id="login-password" placeholder="Password" required 
          onChange={this.onInputChange.bind(this, "password")} value={this.state.password}/>

          <Button textOnButton="Login" textColor="#fff" btnColor="#2EC66D" btnBorder="none"/> 
        </Form>
      </ContentWrapper>
      
    )
  }
}


const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    currencyList: state.currencyList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoggedIn: () => dispatch(setLoggedIn()),
    setCurrencyList: (list) => dispatch(setCurrencyList(list))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
