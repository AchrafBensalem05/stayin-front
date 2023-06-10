import {Link, redirect, useParams} from "react-router-dom";
import Modal from 'react-modal';
import {useEffect, useState} from "react";
import axios from "axios";
import { AppConsts } from "../Routes/AppConsts";
import { ApiRoutes } from "../Routes/ApiRoutes";
import PlaceImg from "../PlaceImg";
import { PageRoutes } from "../Routes/PageRoutes.js";

// CSS styles for the modal
const modalStyles = {
  overlay: {
    backgroundColor: 'transparent',
    zIndex: 9999,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: '4px',
    outline: 'none',
    maxWidth: '300px',
     maxHeight: '200px',
    padding: '20px',
    maxWidth: '400px',
    margin: '0 auto',
    textAlign: 'center',
  },
  
  button: {
    margin: '5px',
    padding: '10px 20px',
    backgroundColor: '#00CEE0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

function ConfirmationBox({ isOpen, onClose, onConfirm }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles}>
      <h2>Are you sure?</h2>
      <div style={modalStyles.buttonContainer}>
      <button  style={modalStyles.button} onClick={onConfirm}>Yes</button>
      <button style={modalStyles.button} onClick={onClose}>No</button>
      </div>
    </Modal>
  );
}
let idApparetementToDelete= null;
export default function PlacesPage() {

  
///get user id///////////

  // console.log('user '+AppConsts.GetUserId());

  const [places,setPlaces] = useState([]);
  
  const [sum, setSum] = useState(0);
  
  
  useEffect( () => {

 const owner = AppConsts.GetUserId()

    axios.get(ApiRoutes.UserPlaces.replace("{owner}", owner)).then(({data}) => {
      setPlaces(data.places);
      setSum(data.sum)
     
    });

    
  

  }, []);


  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleOpenConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

 
  
  const handleConfirm = async () => {
    try {
      console.log("we want to delte " + idApparetementToDelete)
      await axios.delete(ApiRoutes.GetPlaceById.replace("{id}", idApparetementToDelete));
      // Refresh the places list after successful deletion
      const owner = AppConsts.GetUserId();
      const { data } = await axios.get(ApiRoutes.UserPlaces.replace("{owner}", owner));
      setPlaces(data.places);
      setSum(data.sum);
    } catch (error) {
      console.log(error);
    } finally {
      handleCloseConfirmation();
    }
  };

  


  return (
    <div>
     
        
        <div className="mt-4">
          
          {places.length > 0 && places.map(place => (
            <div>
           <Link to={PageRoutes.PlaceById.replace(":id",place._id)} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
              <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                <PlaceImg place={place} />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
                <p className="text-sm mt-2">{place.somme}</p>
              </div>
             

            </Link>
           
              <Link className="signin mb-3 mt-3 px-3 py-2 text-light " to={PageRoutes.updateAppartement.replace(":id" , place._id)}>
                update apartement
                 </Link>
            
              <button className="signin mb-3 mt-3 px-3 py-2 text-light " onClick={ ()=>{handleOpenConfirmation(); idApparetementToDelete =place._id }}>delete apartement </button>



              {showConfirmation && (
       <ConfirmationBox
       isOpen={showConfirmation}
       onClose={handleCloseConfirmation}
       onConfirm={handleConfirm}
     />
      )}



            </div>
                    
            ))}
     
            
            
          
        </div>

     <div>
       <h1>you have {sum} </h1>

     </div>



    </div>
  );
}




