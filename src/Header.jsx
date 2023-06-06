
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Nav';
import { Image } from 'react-bootstrap';
import logoo from './logo.svg';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './Navbar.css';
import { PageRoutes } from './Routes/PageRoutes';
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container className='fluid'>
        <Image src={logoo} alt="Image" className="xx" fluid />

        <Form className="d-flex">
          <Nav.Link className="me-3"><Link to={PageRoutes.AccountBookings}><h6 className="font-weight-bold">AccountBookings</h6></Link></Nav.Link>
          <Nav.Link className="me-3"><Link to={PageRoutes.Search}><h6 className="font-weight-bold">Search</h6></Link></Nav.Link>
          <Nav.Link className="me-3"><Link to={PageRoutes.UsersDashboard}><h6 className="font-weight-bold">UsersDashboard</h6></Link></Nav.Link>
          <Nav.Link className="me-3"><Link to={PageRoutes.NewPlace}><h6 className="font-weight-bold">New Place</h6></Link></Nav.Link>

          <Button variant="primary " className="mx-2 signin" ><Link to={PageRoutes.Login}> sign in </Link></Button>
          <Button variant="outline-" className="mx-2 signup"><Link to={PageRoutes.SignUp}> sign up</Link></Button>
        </Form>

      </Container>
    </Navbar>
  );
};

export default NavBar;