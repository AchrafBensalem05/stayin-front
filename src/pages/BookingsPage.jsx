
import Header from "../Header.jsx"
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Image from "../Image.jsx";
import { PageRoutes } from "../Routes/PageRoutes.js";

import { ApiRoutes } from "../Routes/ApiRoutes.js";
import { AppConsts } from "../Routes/AppConsts";

import BookingDates from "../BookingDates";

axios.defaults.baseURL = AppConsts.ServerAddress;


export default function BookingsPage() {
  const [bookings,setBookings] = useState([]);
  


  function GetUserId() {
    var token = localStorage.getItem(AppConsts.JwtTokenKey);
    var body = JSON.parse(atob(token.split('.')[1]));
    return body.nameid;
  }
  

  useEffect(() => { 
 
    const user = GetUserId() 
    
       axios.get(ApiRoutes.GetBookingsByUser.replace("{user}", user)).then(async (response) => {
        setBookings(response.data)
        
       }); 
     }, []);
    console.log(bookings)
    
    
 
  return (
    <div className="row">

{bookings.length > 0 && bookings.map(booking => (


<div class="max-w-sm bg-white border border-gray-200 rounded-4xl shadow dark:bg-gray-800 dark:border-gray-700  col-md-4 mb-4 mx-8 ">
    <a href="#">
    <Image max-w-4 src={booking.appartement[0].photos[0]} alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{booking.appartement[0].title}</h5>
        </a>
        <div className="flex">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

<p class="mb-3 font-normal mx-2 text-gray-700 dark:text-gray-400">{booking.appartement[0].price}</p>

</div>
        <div className="flex">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
  <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clip-rule="evenodd" />
</svg>
        <p class="mb-3 font-normal flex text-gray-700 dark:text-gray-400">  <strong>{new Date(booking.checkIn).toLocaleDateString()} </strong> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
</svg>

        
        <strong>{new Date(booking.checkOut).toLocaleDateString()}</strong> </p>
     

        </div>
        <Link to= {PageRoutes.PlaceById.replace(":id",booking.appartement[0].idAppartement)} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            More Details
            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </Link>
    </div>
</div>



))}

    </div>
  );
}