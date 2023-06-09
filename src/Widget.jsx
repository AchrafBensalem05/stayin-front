import BookingWidget from "./BookingWidget";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import { ApiRoutes } from "./Routes/ApiRoutes";

export default function Widget() {

    const {id} = useParams();
    const [appartement,setAppartement] = useState(null);
    useEffect(() => {
      if (!id) {
        return;
      }
      axios.get(ApiRoutes.ReservationGetPlaces.replace("{id}", id)).then(response => {
        setAppartement(response.data);
      });
    }, [id]);
  
    if (!appartement) return '';
  return (
    
    <div className="py-4 px-8 flex flex-col min-h-screen max-w-4xl mx-auto">
      <BookingWidget appartement={appartement} />
     
    </div>
  );
}
