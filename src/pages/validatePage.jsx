import axios from 'axios';
import { redirect, useParams } from 'react-router-dom';
import { ApiRoutes } from '../Routes/ApiRoutes';
import { PageRoutes } from '../Routes/PageRoutes';
import { Navigate } from "react-router-dom";
import { useState , useEffect } from "react";
import { id } from 'date-fns/locale';

const ReservationUpdatePage = ({ reservationId }) => {
    const id = useParams()
const [redirect, setRedirect] = useState('');
useEffect(() => {
    
    const updateReservation = async () => {
      try {
        const response = await axios.put(ApiRoutes.ValidateRerservation.replace("{id}",id),{
            pending:false
        })

        // Check if the update was successful
        if (response.ok) {
          // Redirect the user to the home page
          setRedirect(PageRoutes.validateReservation)
        } else {
          // Handle error response
          const errorData = await response.json();
          console.log(errorData.error);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (redirect) {
        return <Navigate to={redirect} />
      }
    updateReservation();
  }, reservationId);

  return (
    <div>
      <h1>Updating Reservation...</h1>
      {/* You can show a loading spinner or other UI while the update is in progress */}
    </div>
  );
};
export default ReservationUpdatePage;