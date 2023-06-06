import { useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import { AppConsts } from "../Routes/AppConsts";
import { ApiRoutes } from "../Routes/ApiRoutes";

axios.defaults.baseURL = AppConsts.ServerAddress;

export default function PlacePage() {
  const {id} = useParams();
  const [place,setPlace] = useState(null);
  const [feedBack, setFeedBack] = useState('');
  const [appFeed, setAppFeed] = useState([])

  async function addFeedBack(ev) {
    ev.preventDefault();
    const user = GetUserId()

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

function GetUserId(){
  var token = localStorage.getItem(AppConsts.JwtTokenKey);
  var body = JSON.parse(atob(token.split('.')[1]));
  return body.nameid;
}
console.log('user '+GetUserId())


  
  

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn}<br />
          Check-out: {place.checkOut}<br />
          Max number of guests: {place.maxGuests}
        </div>
       
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
    

      </div>


      <div>
     

 
       {appFeed.length > 0 && appFeed.map(feedBack =>(
        <div>
          <div>user:{feedBack.user}</div>
          <div>{feedBack.feedBack}</div>
        </div>
       ))}
       

      </div>

    <div>
      <form onSubmit={addFeedBack} >
        <textarea value={feedBack} onChange={ev => setFeedBack(ev.target.value)} placeholder="add a comment"  ></textarea>
        <button >add feedBack</button>
      </form>
    </div>
      
    </div> 
  );
}
