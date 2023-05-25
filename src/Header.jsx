
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
          <Nav.Link className="mx-5  ">
          <Link to={PageRoutes.NewPlace}><h6 className="font-weight-bold">New Place</h6></Link>
          </Nav.Link>
          <Nav.Link  className="mx-5  ">
            <Link to={PageRoutes.Account}><h6 className="font-weight-bold">Account</h6></Link>
          </Nav.Link>
          <Button variant="primary " className="mx-2 signin" ><Link to={PageRoutes.Login}> sign in </Link></Button>
          <Button variant="outline-" className="mx-2 signup"><Link to={PageRoutes.SignUp}> sign up</Link></Button>
        </Form>

      </Container>
    </Navbar>
  );
};

export default NavBar;







// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from "react";

// import io from "socket.io-client";
// import { AppConsts } from "./Routes/AppConsts";
// import { PageRoutes } from "./Routes/PageRoutes";




// export default function Header() {
//   const [user, setUser] = useState("")
//   const [socket, setSocket] = useState(null)

//   useEffect(() => {
//     const socket = io(AppConsts.ServerAddress)
//     // console.log(socket)
//   })



//   /* useEffect(() => {
//     socket?.emit("AddNewUser", user);
//   }, [socket, user]) */





//   return (
//     <div>
//        <header className="flex  justify-between">
//         <Link to={PageRoutes.Home} className="flex items-center gap-1">
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 -rotate-90">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
//           </svg>
//           <span className="font-bold text-xl">StayIn</span>
//         </Link>
//         <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
//           <div>Anywhere</div>
//           <div className="border-l border-gray-300"></div>
//           <div>Any week</div>
//           <div className="border-l border-gray-300"></div>
//           <div>Add guests</div>
//           <button className="bg-primary text-white p-1 rounded-full" >
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
//             </svg>



//           </button>
//         </div>

//         <div className="inline-flex">
//           <div className=" text-center">
//             <Link className="inline-flex gap-2 bg-primary mr-5 gap-2 text-white py-2 px-4 items-center rounded-full" to={PageRoutes.NewPlace}>
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//                 <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
//               </svg>
//               add new place</Link>
//           </div>

//           <Link to={PageRoutes.Account} className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 ">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
//             </svg>
//             <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
//                 <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
//               </svg>
//             </div>
//           </Link>
//         </div>
//       </header>
//     </div>

//   );
// }
