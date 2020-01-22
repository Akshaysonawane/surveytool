import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { 
    Navbar, 
    Nav,
} from 'react-bootstrap';

import * as actions from '../../store/actions/index';

class Header extends Component {

    redirectToLogin = () => {
        this.props.onLogout();
        this.props.history.push('/auth');
    }

    render() {
        return (
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand onClick={() => {this.props.history.push('/');}} style={{cursor:'pointer'}}>Survey Tool</Navbar.Brand>
                <Nav className="mr-auto">
                    {/* <Nav.Link>View Surveys</Nav.Link> */}
                </Nav>
                <Nav className="mr-sm-2">

                    { this.props.isAuthenticated ? <span onClick={this.redirectToLogin} style={{color: 'white', cursor: 'pointer'}}>Logout</span> : <Link to="/auth" style={{color: 'white'}}>Authenticate</Link>}
                </Nav>
            </Navbar>
        );
    }
};

const mapStateToProps = state => {
    return {
        loading: state.loading,
        token: state.token,
        error: state.error,
        isAuthenticated: state.token !== null,
        authRedirectPath: state.authRedirectPath,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));