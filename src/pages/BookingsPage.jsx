import Header from "../Header.jsx"
import {useEffect, useState} from "react";
import axios from "axios";

import { ApiRoutes } from "../Routes/ApiRoutes.js";
import { AppConsts } from "../Routes/AppConsts";

import BookingDates from "../BookingDates";

axios.defaults.baseURL = AppConsts.ServerAddress;


export default function BookingsPage() {
  const [bookings,setBookings] = useState([]);
  //const [appartement, setAppartement]= useState([]);


  function GetUserId() {
    var token = localStorage.getItem(AppConsts.JwtTokenKey);
    var body = JSON.parse(atob(token.split('.')[1]));
    return body.nameid;
  }
  

  useEffect(() => { 
 
    const user = GetUserId() 
    
       axios.get(ApiRoutes.GetBookingsByUser.replace("{user}", user)).then(async (response) => {
        setBookings(response.data)
      //  console.log("data"+response.data)
       }); 
     }, []);
    console.log(bookings)

    /* useEffect(() => { 

        for(let i=0 ; i<bookings.length ; i++){
          const idAppartement = bookings[i].id
          axios.get(ApiRoutes.GetAppartementByBooking.replace("{idAppartement}", idAppartement)).then(async (response) => {
            setAppartement(response.data)
          //  console.log("data"+response.data)
           }); 
        }
        console.log(appartement)
       }, []); */
 
  return (
    <div>
      
      <div>
        {bookings.length > 0 && bookings.map(booking => (
          <div className="border ">
          <p>{booking.name}</p>
          <p className="amani">{booking.appartement[0].title}</p>
          </div>
          /*  <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
           <div className="w-48">
             <PlaceImg place={booking.place} />
           </div>
           <div className="py-3 pr-3 grow">
             <h2 className="text-xl">{booking.place.title}</h2>
             <div className="text-xl">
               <BookingDates booking={booking} className="mb-2 mt-4 text-gray-500" />
               <div className="flex gap-1">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                 </svg>
                 <span className="text-2xl">
                   Total price: ${booking.price}
                 </span>
               </div>
             </div>
           </div>
         </Link> */
        ))}
      </div>
    </div>
  );
}