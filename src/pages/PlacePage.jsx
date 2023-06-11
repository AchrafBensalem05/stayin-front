import { useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import { AppConsts } from "../Routes/AppConsts";
import { ApiRoutes } from "../Routes/ApiRoutes";
import { Link } from "react-router-dom";
import Image from "../Image.jsx";
import checkIn from '../images/check-in.png';
import checkOut from '../images/check-out.png';
import nbGuests from '../images/guests.png';
import ImageCarousel from '../Carousel';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Footer from "../Footer";

import Button from 'react-bootstrap/Button';



axios.defaults.baseURL = AppConsts.ServerAddress;



export default function PlacePage() {

 



  
  const {id} = useParams();
  const [place,setPlace] = useState(null);
  const [feedBack, setFeedBack] = useState('');
  const [appFeed, setAppFeed] = useState([]);
 

  async function addFeedBack(ev) {
    ev.preventDefault();
    const user = AppConsts.GetUserId()

    //////////////////// add feedBack/////////////////////

    await axios.post(ApiRoutes.FeedBack, { id,user,feedBack } );
    console.log("user " + user);
    console.log("feedback " +feedBack)
    console.log("id app " +id)
    
   }


   //////////////////get all appartement feed backs////////////
   
 useEffect(() =>{
  axios.get(ApiRoutes.FeedBackById.replace("{id}", id)).then(response=>{
    setAppFeed(response.data);
    console.log(typeof(id))
  })
 }, [])


  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(ApiRoutes.GetPlaceById.replace("{id}", id)).then(response => { 
      setPlace(response.data);
      
    });
  }, [id]);

  if (!place) return '';


  ///get user id///////////



  
  

  return (
    <div class="">
    <div className="relative overflow-hidden mt-18 mx-auto px-20">
      <div class="flex items-center">
        <h1 class="text-4xl ">{place.title}</h1>
        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
      </div>
      <AddressLink>{place.wilaya} - {place.comun}- {place.street}</AddressLink>

   {/*  <h1 className="text-xl font-semibold"></h1> */}
   <div class="flex space-x-4 px-40 ">
    <Image class="w-150  hover:scale-100 transition-all duration-300 mr-6" src={place.photos?.[0]} alt="" />
    <div className="my-12 ">
          <h2 className="font-semibold text-2xl my-4 ">Description</h2>
          <p>{place.description}</p>
       </div>
    </div>
   
    <div class="flex space-x-4 px-40 my-40 ">
    <div className="my-12 ">
          <h2 className="font-semibold text-2xl my-4 ">Exrta Informations</h2>
          <p>{place.extraInfo}</p>
       </div>
    <Image class="w-150  hover:scale-100 transition-all duration-300 mr-6" src={place.photos?.[1]} alt="" />
    
    </div>
   {/*  <PlaceGallery place={place} /> */}
   
      
  



{/* **************************************check in check out *************************** */}  

<div class="flex justify-between ">

  <div className="shadow-lg shadow-cyan-500/50 border-1 border-[#02b4c4] hover:bg-[#02b4c4]  hover:scale-110 rounded-md w-70 h-60 mx-5 transition-colors duration-300">

    <img src={checkIn} className="w-20 h-20 mx-40  my-10" alt="" />
   <div className=" text-center text-black font-bold ">Check In Time</div>
   <div class=" text-center text-black mt-2">{place.checkIn}</div>
  </div>

  <div  className="shadow-lg shadow-cyan-500/50 border-1 border-[#02b4c4] hover:bg-[#02b4c4]  hover:scale-110 rounded-md w-70 h-60 mx-5 transition-colors duration-300">

  <img src={checkOut} className="w-20 h-20 mx-40 my-10 " alt="" />
 <div className="  text-center text-black font-bold ">Check In Time</div>
   <div class=" text-center text-black  mt-2">{place.checkOut}</div>
  </div>

  <div className="shadow-lg shadow-cyan-500/50 border-1  border-[#02b4c4] hover:bg-[#02b4c4]  hover:scale-110 rounded-md w-70 h-60 mx-5 transition-colors duration-300">

  <img src={nbGuests} className="w-20 h-20 mx-40 my-10" alt="" />
 <div className=" text-center text-black font-bold ">Check In Time</div>
   <div class=" text-center text-black  mt-2">{place.maxGuests}</div>
  </div>
  
</div>
{/******************** perks *****************************/}
<div className="mt-20">
   <div className="row mt-3 ">
   <hr class="h-px my-8 bg-black-200 border-0 dark:bg-black-100 mt-20"/>
   <h2 className="font-semibold text-2xl my-4 ">What this accommodation offers</h2>

      {place.perks.length > 0 && place.perks.map(perk =>(
    <div className="flex mx-1 col-3 border p-4 rounded-2xl justify-between items-center cursor-pointer">
       <div className="   gap-2 font-bold ">
      {perk}
    </div>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"  stroke="currentColor" class="w-6 h-6 ">
         <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      
        
        
        
        </div>
     
     ))}
     
     </div>
    </div> 



{/****************  feedbackkkkkkkkkkkkkkkkk ******************************/}


  
  <hr class="h-px my-8 bg-black-200 border-0 dark:bg-black-100 "/>
  <div className="flex">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
</svg>
<h2 className="font-semibold text-2xl mx-2 " >Comments</h2>
  </div>



   <div className="row mt-3">

      {appFeed.length > 0 && appFeed.map(feedBack =>(
      
       <div className="col-4  p-4 rounded-2xl gap-2 items-center cursor-pointer">
        <div className="flex">
          
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
           <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            
          </svg>
          <p className="bold mt-2 ml-2">Rofaida</p>
        </div>
        
         {feedBack.feedBack}
        </div>
     
     ))}
     
     </div>



  


























<div class="w-150 h-150 bg-sky-50" >
	<div class="bg-gray text-black ">
  <div  class="container mx-auto flex flex-col md:flex-row my-0 md:my-0">
			<div class="flex flex-col w-full lg:w-1/3 p-8">
				
				<p class="text-3xl md:text-5xl my-4 leading-relaxed md:leading-snug">Leave us a feedback!</p>
				<p class="text-sm md:text-base leading-snug text-black-50 text-opacity-100">
					Please provide your valuable feedback and something ...
				</p>
			</div>
			<div class="flex flex-col w-full lg:w-2/3 justify-center">
				<div class="container w-full px-4">
					<div class="flex flex-wrap justify-center">
						<div class="w-full lg:w-6/12 px-4">
							<div
								class="relative flex flex-col min-w-0 break-words w-full mb-6 mt-6 shadow-lg rounded-lg bg-white">
								<div class="flex-auto p-5 lg:p-10">
									<h4 class="text-2xl mb-4 text-black font-semibold">Have a suggestion?</h4>
									<form id="feedbackForm" onSubmit={addFeedBack}>
										
											<div class="relative w-full mb-3">
												<label class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="message">Message</label><textarea maxlength="300" name="feedback" id="feedback" rows="4"
                        cols="80"
                        class="border-0 px-3 py-3 bg-gray-300 placeholder-black text-gray-800 rounded text-sm shadow focus:outline-none w-full"
                        placeholder="" required value={feedBack} onChange={ev => setFeedBack(ev.target.value)}></textarea>
											</div>
											<div class="text-center mt-6">
												<button id="feedbackBtn"
                        class="bg-blue-300 text-black text-center mx-auto active:bg-yellow-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="submit" >Submit
                      </button>
											</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


</div>


     {/*****************************  galeryyyyyy **********************************/}

     <h2 className="font-semibold text-2xl my-4 ">See All Photos</h2> 
<Carousel autoPlay infiniteLoop className="mt-20">
      {place.photos.map((photo, index) => (
        <div key={index} className="carousel-slide">
           <Image  src={place.photos[index]} alt="" className="carousel-image"/>
        </div>
      ))}
    </Carousel>


    
   
    



 {/*  <div className=" text-center"> 
          <Link  className="inline-flex gap-2 bg-primary mr-5 gap-2 text-white py-2 px-4 items-center rounded-full" to={'/booking/'+place._id}> 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"> 
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" /> 
          </svg> 
              Reserver</Link> 
          </div>   */}




  </div> 
<Footer/>
  </div>
  );
  }  