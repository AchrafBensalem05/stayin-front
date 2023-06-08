import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ApiRoutes } from '../Routes/ApiRoutes';
import { PageRoutes } from '../Routes/PageRoutes';
import { useNavigate } from 'react-router-dom';

const ReservationUpdatePage = () => {
  const { reservationId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const updateReservation = async () => {
      try {
        const response = await axios.put(ApiRoutes.ValidateReservation.replace('{id}', reservationId), {
          pending: false,
        });

        // Check if the update was successful
        if (response.status === 200) {
          // Redirect the user to the home page
          navigate(PageRoutes.validateReservation);
        } else {
          // Handle error response
          console.log('Error:', response.data.error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    updateReservation();
  }, [navigate, reservationId]);

  return (
    <div>
      <h1>Updating Reservation...</h1>
      {/* You can show a loading spinner or other UI while the update is in progress */}
    </div>
  );
};

export default ReservationUpdatePage;
