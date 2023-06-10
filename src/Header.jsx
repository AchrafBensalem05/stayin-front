
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Nav';
import { Image } from 'react-bootstrap';
import logoo from './logo.svg';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './Navbar.css';
import { PageRoutes } from './Routes/PageRoutes';
import { Link, Navigate } from "react-router-dom";
import { AppConsts } from './Routes/AppConsts';
import { ApiRoutes } from './Routes/ApiRoutes';





const NavBar = () => {

  const [notifications, setNotifications] = useState([]);
  const [displayNotifications, setDisplayNotifications] = useState(false);

  async function OpenReservation(notification) {
    if (notification.not_read) {
      try {
        await fetch(AppConsts.ServerAddress + ApiRoutes.SetNotificationRead.replace("{id}", notification._id));
      }
      catch (error) {
        console.log("error when setting notification as unread")
      }
    }
    var link = PageRoutes.AccountBookingById.replace(":id", notification.id_reservation);
    window.open(link);
  }

  async function OpenNotifications() {

    if (displayNotifications) {
      setDisplayNotifications(false);
      return;
    }

    setDisplayNotifications(true);

    try {
      var res = await fetch(AppConsts.ServerAddress + ApiRoutes.GetNotificationByUser.replace("{userid}", AppConsts.GetUserId()));
      var body = await res.json();
      setNotifications(body);

    }
    catch (error) {
      console.log("Error talking to server from notifications");
    }

  }



  // useEffect(

  //   () => {

  //     setInterval(async () => {

  //       console.log(body)
  //     }, 2000)
  //   }, []
  // )

  return (
    <Navbar bg="light" expand="lg" className='shadow-sm'>
      <Container className='fluid'>
       <Image src={logoo} alt="Image" className="xx" fluid />

        <Form className="d-flex">

          <div>
            <img src="/assets/notification.svg" width="25px" className="me-3 mt-1" onClick={() => OpenNotifications()} />

            <div className={displayNotifications ? "notification-container" : "notification-container hide"}>
              {notifications?.length > 0 && notifications.map(notif => (
                <div className={notif.not_read ? "not-read" : ""} onClick={() => OpenReservation(notif)} >{notif.message}</div>
              ))}
              {notifications?.length <= 0 ? " No notifications " : ""}
            </div>
          </div>




           <Nav.Link className="me-3"><Link to={PageRoutes.UserPlaces}><h6 className="font-weight-bold">Accounct</h6></Link></Nav.Link>

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