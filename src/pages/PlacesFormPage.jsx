//import PhotosUploader from "../PhotosUploader.jsx";
import { useState ,useEffect} from "react";
import { Navigate , useParams } from "react-router-dom";
import Perks from "../Perks.jsx";
import AppartementTypes from "../AppartementTypes.jsx";
import axios from "axios";
import { AppConsts } from "../Routes/AppConsts";
import { ApiRoutes } from "../Routes/ApiRoutes";
import { PageRoutes } from "../Routes/PageRoutes";

axios.defaults.baseURL = AppConsts.ServerAddress;

export default function PlacesFormPage() {
   const {id} = useParams();
  const [title, setTitle] = useState('');
  const [wilaya, setWilaya] = useState('');
  const [comun, setComun] = useState('');
  const [street, setStreet] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [apartementType, setApartementType] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
 
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
     if (!id) {
       return;
     }
     axios.get(ApiRoutes.GetPlaceById.replace("{id}", id)).then(response => {
        const {data} = response;
        setTitle(data.title);
        setWilaya(data.wilaya);
       setComun(data.comun);
       setStreet(data.street)
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setApartementType(data.apartementType)
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
     });
   }, [id]); 
  function inputHeader(text) {
    return (
      <h2 className="text">{text}</h2>
    );
  }
  function inputDescription(text) {
    return (
      <p className="text-gray-700 text-sm">{text}</p>
    );
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }


  function uploadPhoto(ev) {
    var file = {
      FileType: "",
      Content: ""
    }

    const files = ev.target.files;

    // Get file extension
    var parts = files[0].name.split(".");
    file.FileType = "." + parts[parts.length - 1];

    // Create file reader
    var reader = new FileReader();

    // When data has been read
    reader.onload = async function (e) {
      // Base64 encode the contend of the file that we read
      file.Content = window.btoa(reader.result);

      // Send request to storage server
      var result = await fetch(AppConsts.ServerAddress + ApiRoutes.UploadFile,
        {
          method: "post",
          body: JSON.stringify(file),
          headers: { "Content-Type": "application/json" }
        });

      // Get body of the response
      var fileId = await result.text();

      // Add the created file id to the list of ids of images
      setAddedPhotos(prev => {
        return [...prev, fileId];
      });

    }
    // Read the content of the file that we submitted
    reader.readAsBinaryString(files[0]);
  }

  function removePhoto(ev, filename) {
    ev.preventDefault();
    setAddedPhotos(prev => {
      return [...addedPhotos.filter(photo => photo !== filename)]
    })

  }


  //////get user id///////////
  const owner = AppConsts.GetUserId()

  //const {id} = 
  async function savePlace(ev) {
   
   ev.preventDefault();

    if (id) {
    // update
    await axios.put(ApiRoutes.AddPlace, {
      id,
      owner,
      title, wilaya, comun, street, addedPhotos,
      description, perks,apartementType,extraInfo,
      checkIn, checkOut, maxGuests, price
    });
    setRedirect(true);
  } else {
    // new place
    
    await axios.post(ApiRoutes.AddPlace, {owner,
      title, wilaya, comun, street, addedPhotos,
      description, perks,apartementType,extraInfo,
      checkIn, checkOut, maxGuests, price
    });
    setRedirect(true);
  } 

    
  }

  if (redirect) {
    return <Navigate to={PageRoutes.Search} />
  }

  return (
    <div className="">
      
      {/* <Header /> */}
      <div className="container xxxx">
      <h1 className="mt-4 List">List your apartements</h1>
      <form onSubmit={savePlace}>
        <div class="input-group mb-3">
              <input type="text" value={title} required onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apt" class="form-control"  aria-label="Enter your input" aria-describedby="minimum-text"/>
         </div>
        {preInput('Address', 'specify your exact address')}

        <div className="p-6 border border-gray-300 sm:rounded-md">

          <label className="block mb-6">
            <span className="text-gray-700">Wilaya</span>
            <div class="input-group mb-3">
              <input type="text" required name="Wilaya"  placeholder="wilaya" value={wilaya} onChange={ev => setWilaya(ev.target.value)} class="form-control"  aria-label="Enter your input" aria-describedby="minimum-text"/>
            </div>
          </label>

          <label className="block mb-6">
            <span className="text-gray-700">commune</span>
            
             <div class="input-group mb-3">
              <input type="text"  name="comune" required  placeholder="commune" value={comun} onChange={ev => setComun(ev.target.value)} class="form-control"  aria-label="Enter your input" aria-describedby="minimum-text"/>
            </div>
          </label>
          <label className="block mb-6">
            <span className="text-gray-700">Street</span>
            <div class="input-group mb-3">
              <input type="text"  name="street" required  placeholder="street" value={street} onChange={ev => setStreet(ev.target.value)}  class="form-control"  aria-label="Enter your input" aria-describedby="minimum-text"/>
            </div>
          </label>

        </div>



        {preInput('Photos', 'more = better')}

        <div className="mt-2 col-6">
          {addedPhotos.length > 0 && addedPhotos.map(fileId => (
            <div className="h-32 flex relative" key={fileId}>
              <button onClick={ev => removePhoto(ev, fileId)} className="cursor-pointer absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
              <img src={AppConsts.ServerAddress + ApiRoutes.FileById.replace("{id}", fileId)} className="rounded-2xl w-full object-cover" alt=""/>

            </div>
          ))}

          <label className=" m-1 h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl text-2xl text-gray-600">
            <input type="file" multiple className="hidden"required onChange={uploadPhoto} />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
            Upload
          </label>

        </div>

        {preInput('Description', 'description of the place')}
        <textarea class="form-control" required value={description} onChange={ev => setDescription(ev.target.value)} rows="30"></textarea>


        {preInput('Perks', 'select all the perks of your place')}
        <div className="">
          <Perks  selected={perks} onChange={setPerks} />
        </div>
     
        {preInput('Apartement Type', 'select your apartement type')}
        <div className="">
          <AppartementTypes selected={apartementType} onChange={setApartementType} />
        </div>

        {preInput('Extra info', 'house rules, etc')}
        <textarea class="form-control mt-3" required value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} rows="30"></textarea>
        {preInput('Check in&out times', 'add check in and out times, remember to have some time window for cleaning the room between guests')}
        <div className="" >
          {/*
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input type="text"
                   value={checkIn}
                   onChange={ev => setCheckIn(ev.target.value)}
                   placeholder="14"/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input type="text"
                   value={checkOut}
                   onChange={ev => setCheckOut(ev.target.value)}
                   placeholder="11" />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input type="number" value={maxGuests}
                   onChange={ev => setMaxGuests(ev.target.value)}/>
          </div> */}
          <div class="container">
            <div class="row">
              <div class="col-12">
              <div className="p-6 border border-gray-300 sm:rounded-md flex flex-row ">
                <label className="block mb-6">
                  <span className="text-gray-700">Check in time</span>
                  <div class="input-group mb-3">
                      <input type="text" required value={checkIn}onChange={ev => setCheckIn(ev.target.value)} placeholder="14" class="form-control"  aria-label="Enter your input" aria-describedby="minimum-text"/>
                  </div>
                </label>
            
            <div className="row">
              <div class="col-12">
                  <label className="block mb-6">
                  <span className="text-gray-700">Check out time</span>
                  <div class="input-group mb-3">
                      <input type="text" required value={checkOut} onChange={ev => setCheckOut(ev.target.value)}placeholder="11" class="form-control"  aria-label="Enter your input" aria-describedby="minimum-text"/>
                  </div>
                </label>
              </div>
              </div>
              <div className="row">
              <div class="col-12">
                  <label className="block mb-6">
                  <span className="text-gray-700">Max number of guests</span>
                  <div class="input-group mb-3">
                      <input type="text" required value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} placeholder="11" class="form-control"  aria-label="Enter your input" aria-describedby="minimum-text"/>
                  </div>
                </label>
              </div>
              </div>
              </div>
            </div>
  
          </div>
          </div>
          <div className="p-6 border border-gray-300 sm:rounded-md  mt-4 ">
          <div class="row ">
            <div className="col-6">
            <label className="block mb-6">
              <span className="text-gray-700">Price per night</span>
                   <div class="input-group mb-3">
                      <input type="text" required  value={price} onChange={ev => setPrice(ev.target.value)} placeholder="11" class="form-control"  aria-label="Enter your input" aria-describedby="minimum-text"/>
                </div>
            </label>
            </div>
          </div>
          </div>
        </div>
          <button className="signin mb-3 mt-3 px-3 py-2 text-light ">save apartement</button>
      </form>
      </div>
    </div>
  );
}