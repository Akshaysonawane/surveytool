import React, {  Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import {
    Form,
    Button
} from 'react-bootstrap';

import './auth.module.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    // state to store email and password
    state = {
        email: '',
        password: '',
        isSignup: true,                // To switch between SignIn and SignUp
    };

    // function to submit email and pasword entered by user
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.email, this.state.password, this.state.isSignup);    // Dispatch action to cal an api
    }

    // function to switch between SignIn and SignUp
    switchAuthModeHanlder = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup,
            };
        });
    }

    // On chnage function to store email and password in state
    inputChangedHandler = (event) => {
        if(event.target.id === 'emailInput') {
            this.setState({
                email: event.target.value,
            });
        } else {
            this.setState({
                password: event.target.value,
            });
        }
    }

    render() {
        let errorMessage = null;
        if(this.props.error) {          // If there is any error from SignIn or SignUp api
            errorMessage = (            // Displaying row messgae. Need to improve the UI
                <p>
                    {this.props.error.message}
                </p>
            );
        }

        let authRedirect = null;
        if(this.props.isAuthenticated) {            // Redirect user to Home(Survey Form) page if authenticated
            authRedirect = <Redirect to="/"/>
        }

        return (
            <div>
                {authRedirect}
                {errorMessage}
                <div className="row d-flex justify-content-center">
                    <Form
                        className="col-xs-6 col-md-6 col-lg-6"
                        onSubmit={(event) => { event.preventDefault() }}>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                id="emailInput"
                                onChange={(event) => { this.inputChangedHandler(event) }}
                                required />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                        </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                id="passwordInput"
                                onChange={(event) => { this.inputChangedHandler(event) }}
                                required />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={this.submitHandler}>
                            Submit
                    </Button>
                        <br /><br />
                        <Button
                            variant="primary"
                            onClick={this.switchAuthModeHanlder}>
                            Switch to {this.state.isSignup ? 'SignIn' : 'SignUp'}
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.error,
        isAuthenticated: state.token !== null,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);