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
    state = {
        email: '',
        password: '',
        isSignup: true,
    };

    // componentDidMount () {
    //     if (this.props.authRedirectPath !== '/') {
    //         this.props.onSetAuthRedirectPath('/');
    //     }
    // }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.email, this.state.password, this.state.isSignup);
    }

    switchAuthModeHanlder = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup,
            };
        });
    }

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
        if(this.props.error) {
            errorMessage = (
                <p>
                    {this.props.error.message}
                </p>
            );
        }

        let authRedirect = null;
        if(this.props.isAuthenticated) {
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
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.token !== null,
        authRedirectPath: state.authRedirectPath,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);