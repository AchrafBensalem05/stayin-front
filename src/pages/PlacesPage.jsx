import {Link, useParams} from "react-router-dom";

import {useEffect, useState} from "react";
import axios from "axios";
import { AppConsts } from "../Routes/AppConsts";
import { ApiRoutes } from "../Routes/ApiRoutes";
import PlaceImg from "../PlaceImg";


export default function PlacesPage() {

  
///get user id///////////

function GetUserId(){
    var token = localStorage.getItem(AppConsts.JwtTokenKey);
    var body = JSON.parse(atob(token.split('.')[1]));
    console.log(typeof(body.nameid))
    return body.nameid;
  }
  console.log('user '+GetUserId())

  const [places,setPlaces] = useState([]);
  
  const [sum, setSum] = useState(0);

  useEffect( () => {

 const owner = GetUserId()

    axios.get(ApiRoutes.UserPlaces.replace("{owner}", owner)).then(({data}) => {
      setPlaces(data.places);
      setSum(data.sum)
     
    });

    
  

  }, []);

  /* useEffect(()=>{
    places.forEach(place=>{
      console.log("eeeeeeeeeeeeeeeeeeeeeeeeee "+place.somme)
      setTotal( total + place.somme)
      
    })
  } , []) */


   


  


  return (
    <div>
     
        
        <div className="mt-4">
          {places.length > 0 && places.map(place => (

            <Link to={'/account/places/'+place._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
              <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                <PlaceImg place={place} />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
                <p className="text-sm mt-2">{place.somme}</p>
              </div>
            </Link>
          ))}
        </div>

     <div>
       <h1>you have {sum} </h1>

     </div>



    </div>
  );
}