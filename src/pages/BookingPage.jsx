import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import BookingDates from "../BookingDates";
import { ApiRoutes } from "../Routes/ApiRoutes";
import { AppConsts } from "../Routes/AppConsts";
import { Navigate } from "react-router-dom";
axios.defaults.baseURL = AppConsts.ServerAddress;

export default function BookingPage() {
  const {id} = useParams();
  const [reservation,setReservation] = useState(null);
  const [redirect, setRedirect] = useState('');
  useEffect(() => {
    if (id) {
      axios.get(ApiRoutes.GetReservations).then(response => {
        var foundBooking = response.data.find(({_id}) => _id === id);
        if (foundBooking) {
          setReservation(foundBooking);
        }
      });
    }
  }, [id]);

  if (!reservation) {
    return '';
  }
  const idreservation =reservation._id
  const price =reservation.price
  const user= reservation.user


  async function payForThisPlace(){
    const response = await axios.post(ApiRoutes.Paid , {
      //appartement:id,
     payerId:user,
     Amount:reservation.price ,
     CurrencyCode: "USD",
     PaymentDate: new Date(),
     ReservationId: idreservation,
     CancelUrl: "http://localhost:3000",
     ReturnUrl: "http://localhost:5000/ms-reservation/reservation/validate?ReservationId="+idreservation,
      //  reservedDates:["2023-05-03" , "2023-05-04", "2023-05-05"],


      

    });
    const approveLink = response.data.approveLink;
      // setRedirect(approveLink);
      window.location.replace(approveLink)

    
  }



  if (redirect) {
    return <Navigate to={redirect} />
  }


  

  return (
    <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
    <div>
      <h2 className="text-2xl mb-4">Your booking information:</h2>
      <BookingDates reservation={reservation} />
    </div>
    <div className="bg-primary p-6 text-white rounded-2xl">
      <div>Total price</div>
      <div className="text-3xl">${reservation.price}</div>{reservation.pending ? 
      <button className="primary mt-4" onClick={payForThisPlace}>
      Pay</button>:<button className="px-4 btn btn-info mt-4">
      Paid</button>}
    </div>
  </div>

  );
}