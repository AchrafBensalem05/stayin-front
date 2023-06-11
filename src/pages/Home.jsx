import '../App.css';
import logoo from '../beach.png';
import Button from 'react-bootstrap/Button';
import { AiOutlineFilter } from 'react-icons/ai';
import IndexPage from "./IndexPage";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../Image.jsx";
import { AppConsts } from "../Routes/AppConsts";
import { ApiRoutes } from "../Routes/ApiRoutes";
import { PageRoutes } from "../Routes/PageRoutes.js";



axios.defaults.baseURL = AppConsts.ServerAddress;




///get user id///////////




function Home() {
    const [csrfToken, setCsrfToken] = useState('');
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        const meta = document.querySelector('meta[name="csrf-token"]');
        if (meta) {
            setCsrfToken(meta.content);
        }
        axios.get(ApiRoutes.GetAllFromSearch).then(response => {
        //     setPlaces(response.data);
            setPlaces(response.data[0]);
        });
    }, []);

    const [showPopup, setShowPopup] = useState(true);



    const search = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('min', min);
        formData.append('max', max);
        formData.append('minguests', minguests);
        formData.append('checkin', checkindate);
        formData.append('checkout', checkoutdate);
        formData.append('type', type);
        formData.append('perks', perks);
        formData.append('wilaya', selectedWilaya);

        formData.append('commune', selectedCommune);



        axios.post(ApiRoutes.Search, formData, {
            csrfToken,
        }
        ).then(response => {
            setPlaces(response.data[0]);
        });
        setShowPopup(false);
    }

    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [minguests, setMingeusts] = useState('');
    const [checkindate, setCheckindate] = useState('');
    const [checkoutdate, setCheckoutdate] = useState('');
    const [type, setType] = useState('');
    const [perks, setPerks] = useState([]);
    const [selectedWilaya, setSelectedWilaya] = useState('');
    const [selectedCommune, setSelectedCommune] = useState('');
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setType((prevSelectedChoices) => [...prevSelectedChoices, value]);
        } else {
            setType((prevSelectedChoices) =>
                prevSelectedChoices.filter((choice) => choice !== value)
            );
        }
    };

    const handlePerksChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setPerks((prevSelectedChoices) => [...prevSelectedChoices, value]);
        } else {
            setPerks((prevSelectedChoices) =>
                prevSelectedChoices.filter((choice) => choice !== value)
            );
        }
    };

    const handleWilayaChange = (e) => {
        setSelectedWilaya(e.target.value);
        setSelectedCommune('');
    };

    const handleCommuneChange = (e) => {
        setSelectedCommune(e.target.value);
    };
    return (
        <div>

            <div className='section position-relative'>
                <div className='background ' >
                    <img src={logoo} alt="" className="cc" fluid />
                </div>
                <form onSubmit={search}>
                    <div className='content position-absolute d-flex flex-column justify-content-center align-items-center'>
                        <div className='title'>
                            <h1 className="text-light ch">Choose your dream home</h1>
                        </div>
                        <p className="text-light fs-6 p-2">
                            Find your next stay
                            Search low prices on hotels, homes and much more...
                        </p>

                        <div className='search-content d-flex bg-light p-2 rounded-4 '>
                            <div className='containers '>
                                <div className="input-group px-4  d-flex flex-column justify-content-center align-items-center">
                                    <div className="input-group-prepend">
                                        <label className='labele' for="wilaya">Wilaya</label>
                                    </div>
                                    <select className="custom-select selecthome d-flex flex-column justify-content-start align-items-start" name="wilaya" id="wilaya" value={selectedWilaya} onChange={handleWilayaChange}>
                                        <option value="">Select Wilaya</option>
                                        <option value="alger">Alger</option>
                                        <option value="batna">Batna</option>
                                    </select>
                                </div>
                            </div>
                            <div className='containers  '>
                                <div class="input-group px-4 d-flex flex-column justify-content-center align-items-center">
                                    <div class="input-group-prepend">
                                        <label className='labele' for="wilaya">Wilaya</label>
                                    </div>
                                    <select class="custom-select selecthome"
                                        id="commune"
                                        name="commune"
                                        value={selectedCommune}
                                        onChange={handleCommuneChange}
                                        disabled={!selectedWilaya}
                                    >
                                        <option value="">Select Commune</option>
                                        {selectedWilaya === 'alger' && (
                                            <>
                                                <option value="bab-zouar">Bab Zouar</option>
                                                <option value="zeralda">Zeralda</option>
                                            </>
                                        )}
                                        {selectedWilaya === 'batna' && (
                                            <>
                                                <option value="arris">Arris</option>
                                                <option value="ichemoul">Ichemoul</option>
                                            </>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className='containers px-4'>
                                <label htmlFor="" className='labele'>checkIn</label>
                                <input value={checkindate} onChange={(e) => { setCheckindate(e.target.value) }} className='inpute' type="date" placeholder='choose date ' />
                            </div>
                            <div className='containers px-4'>
                                <label htmlFor="" className='labele'>CheckOut</label>
                                <input value={checkoutdate} onChange={(e) => { setCheckoutdate(e.target.value) }} className='inpute' type="date" placeholder='choose date ' />
                            </div>
                            <div className='containers'>
                                <Button type='submit' className="mx-2 mt-3 signin text-white">search</Button>
                            </div>
                            <div className="vertical-divider"></div>
                            <div className='containers'>
                                <Button data-toggle="modal" data-target=".bd-example-modal-lg" variant="" className="d-flex justify-content-center align-items-center mx-2 mt-3 signup text-dark"> <AiOutlineFilter style={{ marginRight: '0.5rem' }} />Filter</Button>
                            </div>
                        </div>
                    </div>
                </form>

                <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div className="bg-light modal-content">
                            <div class="container">
                                <div class="container">
                                    <form onSubmit={search} >
                                        <div className='mt-3'>
                                            <h3 className="h3">price range</h3>
                                            <p className='pp'>The average nightly price is $80, not including fees or taxes.</p>
                                        </div>
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-sm">
                                                    <div class="input-group mb-3">
                                                        <input type="text" value={min} onChange={(e) => { setMin(e.target.value) }} name="min" class="form-control" placeholder="Enter your input" aria-label="Enter your input" aria-describedby="minimum-text" />
                                                    </div>
                                                </div>
                                                <div class="col-sm">
                                                    <div class="input-group mb-3">
                                                        <input type="text" name="max" value={max} onChange={(e) => { setMax(e.target.value) }} class="form-control" placeholder="Enter your input" aria-label="Enter your input" aria-describedby="minimum-text" />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <hr className="divider" />
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-sm">
                                                    <h3 className="h3">
                                                        number of guests
                                                    </h3>
                                                    <label for="custom-select " className='pp' >choose your apartement minguests:</label>
                                                    <div class="input-group mb-3">
                                                        <input type="text" name="ming" value={minguests} onChange={(e) => { setMingeusts(e.target.value) }} class="form-control" placeholder="Enter your input" aria-label="Enter your input" aria-describedby="minimum-text" />
                                                    </div>

                                                </div>
                                                <div class="col-sm">


                                                </div>

                                            </div>
                                        </div>

                                        <hr className="divider " />
                                        <h3 className="h3">choose a date</h3>
                                        <div class="container">
                                            <div class="row mb-3">
                                                <div class="col-sm">
                                                    <label for="checkin" className='label'>checkin:</label>
                                                    <input type="date" value={checkindate} onChange={(e) => { setCheckindate(e.target.value) }} id="checkin" name="checkin" />
                                                </div>
                                                <div class="col-sm">
                                                    <label for="checkout" className='label'>checkout:</label>
                                                    <input type="date" value={checkoutdate} onChange={(e) => { setCheckoutdate(e.target.value) }} id="checkout" name="checkout" />
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className="h3">
                                            property type
                                        </h3>
                                        <div class="container mt-3 mb-2">
                                            <div class="row">
                                                <div class="col-sm">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" checked={type.includes('apartement')} onChange={handleCheckboxChange} value="apartement" name="type[]" class="custom-control-input" id="customCheck1" />
                                                        <label class="custom-control-label" for="customCheck1">apartement</label>
                                                    </div>
                                                </div>
                                                <div class="col-sm">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" value="shared house" checked={type.includes('shared house')} onChange={handleCheckboxChange} name="type[]" class="custom-control-input" id="customCheck1" />
                                                        <label class="custom-control-label" for="customCheck1">shared house</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm">
                                                    <div class="custom-control custom-checkbox">
                                                        <input value="garage" checked={type.includes('garage')} onChange={handleCheckboxChange} type="checkbox" name="type[]" class="custom-control-input" id="customCheck1" />
                                                        <label class="custom-control-label" for="customCheck1">garage</label>
                                                    </div>
                                                </div>
                                                <div class="col-sm">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" checked={type.includes('hotel')} onChange={handleCheckboxChange} value="hotel" name="type[]" class="custom-control-input" id="customCheck1" />
                                                        <label class="custom-control-label" for="customCheck1">hotel</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="divider " />
                                        <h3 className="h3">
                                            perks
                                        </h3>

                                        <div class="container">
                                            <div class="row">
                                                <div class="col-sm">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" checked={perks.includes('wifi')} onChange={handlePerksChange} value="wifi" name="perks[]" class="custom-control-input" id="customCheck1" />
                                                        <label class="custom-control-label" for="customCheck1">wifi</label>
                                                    </div>
                                                </div>
                                                <div class="col-sm">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" checked={perks.includes('tv')} onChange={handlePerksChange} value="tv" name="perks[]" class="custom-control-input" id="customCheck1" />
                                                        <label class="custom-control-label" for="customCheck1">tv</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm">
                                                    <div class="custom-control custom-checkbox">
                                                        <input value="dryer" type="checkbox" checked={perks.includes('dryer')} onChange={handlePerksChange} name="perks[]" class="custom-control-input" id="customCheck1" />
                                                        <label class="custom-control-label" for="customCheck1">dryer</label>
                                                    </div>
                                                </div>
                                                <div class="col-sm">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" value="kitchen" checked={perks.includes('kitchen')} onChange={handlePerksChange} name="perks[]" class="custom-control-input" id="customCheck1" />
                                                        <label class="custom-control-label" for="customCheck1">kitchen</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="divider" />
                                        <h3 className="h3" >adresse</h3>

                                        <div class="container mb-4"  >
                                            <div class="row">
                                                <div class="col-sm">
                                                    <div class="form-group">
                                                        <label htmlFor="wilaya">Wilaya:</label>
                                                        <select id="wilaya" class="form-select" name="wilaya" value={selectedWilaya} onChange={handleWilayaChange}>
                                                            <option value="">Select Wilaya</option>
                                                            <option value="alger">Alger</option>
                                                            <option value="batna">Batna</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div class="col-sm">
                                                    <div class="form-group">
                                                        <label htmlFor="commune">Commune:</label>
                                                        <select class="form-select" name="commune"
                                                            id="commune"
                                                            value={selectedCommune}
                                                            onChange={handleCommuneChange}
                                                            disabled={!selectedWilaya}
                                                        >
                                                            <option value="">Select a commune</option>
                                                            {selectedWilaya === 'alger' && (
                                                                <>
                                                                    <option value="bab-zouar">Bab Zouar</option>
                                                                    <option value="zeralda">Zeralda</option>
                                                                </>
                                                            )}
                                                            {selectedWilaya === 'batna' && (
                                                                <>
                                                                    <option value="arris">Arris</option>
                                                                    <option value="ichemoul">Ichemoul</option>
                                                                </>
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <hr className="divider" />
                                        <div>
                                            <button type="submit" className="signin mb-3 mt-3 px-3 py-2 text-light ">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
{/* 

            <div>

                <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                    {

                        places != undefined && places != null && places.length > 0 && places.map(place => (

                            <Link to={PageRoutes.PlaceById.replace(":id", place.id)}>

                                <div className="w-400 h-60 rounded-2xl flex">

                                    <Image className="rounded-2xl h-full w-full aspect-square " src={JSON.parse(place.photo)[0]} />

                                </div>
                                <h2 className="font-bold">{place.commune}-{place.wilaya}</h2>
                                <h3 className="text-sm text-gray-500">{place.title}</h3>
                                <div className="mt-1">
                                    <span className="font-bold">${place.price}</span> per night
                                </div>
                            </Link>
                        ))}
                </div>
            </div> */}

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.0/css/all.css" integrity="sha384-Bfad6CLCknfcloXFOyFnlgtENryhrpZCe29RTifKEixXQZ38WheV+i/6YWSzkz3V" crossorigin="anonymous" />
<script src="https://cdn.tailwindcss.com"></script>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
 {  places != undefined && places != null && places.length > 0 && places.map(place => (
  <Link to={PageRoutes.PlaceById.replace(":id",place.id)}  class="relative inline-block w-full transform transition-transform duration-300 ease-in-out hover:-translate-y-2">
  



  
  <div class="relative mx-auto w-full ">

      <div class="rounded-lg bg-white p-4 shadow">
        <div class="relative flex h-52 justify-center overflow-hidden rounded-lg">
          <div class="w-full transform transition-transform duration-500 ease-in-out hover:scale-110">
            <div class="absolute inset-0 bg-black bg-opacity-80">
              <Image src={JSON.parse(place.photo)?.[0]} alt="" />
              {/* <div>{place.photos[0]}</div> */}
            </div>
          </div>

          
          <div class="absolute bottom-0 right-5 mb-3 flex">
            <p class="flex items-center font-medium text-gray-800">
              <i class="fa fa-heart mr-2 text-2xl text-white"></i>
            </p>
          </div>

          <span class="absolute top-0 right-2 z-10 mt-3 ml-3 inline-flex select-none rounded-sm bg-[#1f93ff] px-2 py-1 text-xs font-semibold text-white"> Residential </span>
          <span class="absolute top-0 left-0 z-10 mt-3 ml-3 inline-flex select-none rounded-lg bg-transparent px-3 py-2 text-lg font-medium text-white"> <i class="fa fa-star"></i> </span>
        </div>

        <div class="mt-4">
          <h2 class="line-clamp-1 text-2xl font-medium text-gray-800 md:text-lg" >{place.description}</h2>

          <p class="text-primary mt-2 inline-block whitespace-nowrap rounded-xl font-semibold leading-tight">
            <span class="text-sm uppercase"> Price </span>
            <span class="text-2xl">{place.price}</span>$
          </p>
        </div>
        <div class="mt-4">
          <p class="line-clamp-1 mt-2 text-lg text-gray-800">{place.extraInfo}</p>
        </div>
        <div class="justify-center">
          <div class="mt-4 flex space-x-3 overflow-hidden rounded-lg px-1 py-1">
            <p class="flex items-center font-medium text-gray-800">
              <i class="fa fa-bed mr-2 text-blue-900"></i>
              2
            </p>

            <p class="flex items-center font-medium text-gray-800">
              <i class="fa fa-bath mr-2 text-blue-900"></i>
              3
            </p>
            <p class="flex items-center font-medium text-gray-800">
              <i class="fa fa-home mr-2 text-blue-900"></i>
              {JSON.parse(place.type)?.[0]}
            </p>
          </div>
        </div>
        
      </div>
   
  </div>


 </Link>

      ))}

      

</div>



        </div>
    );
}

export default Home;
