import Header from "../Header.jsx"
import {useEffect, useState} from "react";
import axios from "axios";

import { ApiRoutes } from "../Routes/ApiRoutes.js";
import { AppConsts } from "../Routes/AppConsts";


axios.defaults.baseURL = AppConsts.ServerAddress;


export default function BookingsPage() {
  const [bookings,setBookings] = useState([]);
 /*  useEffect(() => {
    axios.get(ApiRoutes.GetReservation).then(response => {
      setBookings(response.data);
    });
  }, []); */

  

  useEffect(() => { 
 
    const user = AppConsts.GetUserId() 
    
       axios.get(ApiRoutes.GetUserWithBooking.replace("{user}", user)).then(async (response) => {
        setBookings(response.data)
        console.log("data"+response.data)
       }); 
     }, []);
    console.log(bookings)
  return (
    <div>
      
      <div>
        {bookings?.length > 0 && bookings.map(booking => (
           <p>{booking.name}</p>
        ))}
      </div>
    </div>
  );
}