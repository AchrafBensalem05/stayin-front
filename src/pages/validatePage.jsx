import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ApiRoutes } from '../Routes/ApiRoutes';
import { PageRoutes } from '../Routes/PageRoutes';
import { useNavigate } from 'react-router-dom';

export default function ReservationUpdatePage(){
  const { id } = useParams();
    useEffect(() => {
      const updateReservation = async () => {
        try {
          await axios.get(PageRoutes.reservationValidated);
          console.log('Reservation updated successfully');
        } catch (error) {
          console.log('Error updating reservation:', error);
        }
      };
  
      updateReservation();
    }, [id]);
  
    return (
      <div>
        <h2>Updating Reservation</h2>
        {/* Additional content */}
      </div>
    );
  }