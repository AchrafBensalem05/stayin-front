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
                                        <option value="tipaza">Tipaza</option>
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
                                                <option value="cherraga">Cherraga</option>
                                            </>
                                        )}
                                        {selectedWilaya === 'batna' && (
                                            <>
                                                <option value="arris">Arris</option>
                                                <option value="ichemoul">Ichemoul</option>
                                            </>
                                        )}
                                        {selectedWilaya === 'tipaza' && (
                                                                <>
                                                                    <option value="gouraya">Gouraya</option>
                                                                    <option value="cherchell">Cherchell</option>
                                                                    <option value="kolean">Kolea</option>
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
                                                        <input value="parking" type="checkbox" checked={perks.includes('parking')} onChange={handlePerksChange} name="perks[]" class="custom-control-input" id="customCheck1" />
                                                        <label class="custom-control-label" for="customCheck1">parking</label>
                                                    </div>
                                                </div>
                                                <div class="col-sm">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" value="pets" checked={perks.includes('pets')} onChange={handlePerksChange} name="perks[]" class="custom-control-input" id="customCheck1" />
                                                        <label class="custom-control-label" for="customCheck1">pets</label>
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
                                                            <option value="tipaza">Tipaza</option>
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
                                                                    <option value="cherrage">Cherraga</option>
                                                                </>
                                                            )}
                                                            {selectedWilaya === 'batna' && (
                                                                <>
                                                                    <option value="arris">Arris</option>
                                                                    <option value="ichemoul">Ichemoul</option>
                                                                </>
                                                            )}
                                                            {selectedWilaya === 'tipaza' && (
                                                                <>
                                                                    <option value="gouraya">Gouraya</option>
                                                                    <option value="cherchell">Cherchell</option>
                                                                    <option value="kolean">Kolea</option>
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
            </div>

        </div>
    );
}

export default Home;
