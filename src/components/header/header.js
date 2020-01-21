import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { 
    Navbar, 
    Nav,
} from 'react-bootstrap';

class Header extends Component {
    render() {
        return (
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand onClick={() => {this.props.history.push('/');}} style={{cursor:'pointer'}}>Survey Tool</Navbar.Brand>
                <Nav className="mr-auto">
                    {/* <Nav.Link>View Surveys</Nav.Link> */}
                </Nav>
                <Nav className="mr-sm-2">
                    <Nav.Link href="#home">Logout</Nav.Link>
                </Nav>
            </Navbar>
        );
    }
};

export default withRouter(Header);