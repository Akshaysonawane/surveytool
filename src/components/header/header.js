import React, { Component } from 'react';

import { 
    Navbar, 
    Nav,
} from 'react-bootstrap';

class Header extends Component {
    render() {
        return (
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#home">Survey Tool</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">View Surveys</Nav.Link>
                </Nav>
                <Nav className="mr-sm-2">
                    <Nav.Link href="#home">Logout</Nav.Link>
                </Nav>
            </Navbar>
        );
    }
};

export default Header;