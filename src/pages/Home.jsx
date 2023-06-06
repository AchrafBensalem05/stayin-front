import '../App.css';
import logoo from '../beach.png';
import Button from 'react-bootstrap/Button';
import { AiOutlineFilter } from 'react-icons/ai';
import IndexPage from "./IndexPage";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Image from "../Image.jsx";
import { AppConsts } from "../Routes/AppConsts";
import { ApiRoutes } from "../Routes/ApiRoutes";
import { PageRoutes } from "../Routes/PageRoutes.js";






///get user id///////////




function Home() {
return (
    <div className='section'>
        <div>
        <div className='background ' >
            <img src={logoo} alt="" className="cc" fluid />
        </div>
        <div className='search-content position-absolute d-flex flex-column justify-content-center align-items-center'>
            <div className='title'>
                <h1 className="text-light ch">Choose your dream home</h1>
            </div>
            <p className="text-light fs-6 p-2">
                Find your next stay
                Search low prices on hotels, homes and much more...
            </p>
        
        <div className='search d-flex bg-light p-2 rounded-4 '>
            <div className='containers '>
            <div className="input-group px-4  d-flex flex-column justify-content-center align-items-center">
                <div className="input-group-prepend">
                    <label className='labele' for="inputGroupSelect01">Wilaya</label>
                </div>
                <select className="custom-select selecthome d-flex flex-column justify-content-start align-items-start" id="inputGroupSelect01">
                    <option selected>Choose...</option>
                    <option value="1">batna</option>
                    <option value="2">alger</option>
                    <option value="3">belabbes</option>
                </select>
                </div>
            </div>
            <div className='containers  '>
            <div class="input-group px-4 d-flex flex-column justify-content-center align-items-center">
                <div class="input-group-prepend">
                    <label className='labele'  for="inputGroupSelect01">commune</label>
                </div>
                <select class="custom-select selecthome" id="inputGroupSelect01">
                    <option selected>Choose...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
                </div>
            </div>
            <div className='containers px-4'>
                <label htmlFor="" className='labele'>checkIn</label>
                <input className='inpute' type="date" placeholder='choose date '/>
            </div>
            <div className='containers px-4'>
                <label htmlFor="" className='labele'>CheckOut</label>
                <input className='inpute' type="date" placeholder='choose date '/>
            </div>
            <div className='containers'>
                <Button variant="" className="mx-2 mt-3 signin text-white">search</Button>   
            </div>
            <div className="vertical-divider"></div>
            <div className='containers'>
                <Button data-toggle="modal" data-target=".bd-example-modal-lg" variant="" className="d-flex justify-content-center align-items-center mx-2 mt-3 signup text-dark"> <AiOutlineFilter  style={{ marginRight: '0.5rem' }} />Filter</Button>   
            </div>
        </div>
       </div>
      <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
     <div class="modal-dialog modal-lg">
     <div className="bg-light modal-content">
        <div class="container">
            <div class="container">
                <form action="{{ route('apartment.search') }}" method="GET"> 
                  <div className='mt-3'>
                    <h3>price range</h3>
                    <p>The average nightly price is ‎$80, not including fees or taxes.</p>
                  </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-sm">
                            <div class="input-group mb-3">
                                <input type="text" name="min" class="form-control" placeholder="Enter your input" aria-label="Enter your input" aria-describedby="minimum-text"/>
                            </div>
                            </div>
                            <div class="col-sm">
                            <div class="input-group mb-3">
                                <input type="text" name="max" class="form-control" placeholder="Enter your input" aria-label="Enter your input" aria-describedby="minimum-text"/>
                            </div>
                            </div>
                            
                        </div>
                    </div>
                    <hr className="divider" />

                    <div class="container">
                        <div class="row">
                            <div class="col-sm">
                                <h3 >
                                    number of guests
                                </h3>
                                <label for="custom-select " className='mb-2'>choose your apartement type:</label>
                                <div class="input-group mb-3">
                                    <input type="text" name="ming" class="form-control" placeholder="Enter your input" aria-label="Enter your input" aria-describedby="minimum-text"/>
                            </div>

                            </div>
                            <div class="col-sm">
                                <h3 >
                                    property type
                                </h3>
                                <div class="form-group">
                                        <label for="custom-select" className='mb-2'>choose your apartement type:</label>
                                        <select class="form-control" name="type" id="custom-select">
                                        <option value="">Select a country</option>
                                            <option value="apartement">apartement</option>
                                            <option value="room">room</option>
                                            <option value="shared house">shared house</option>
                                        </select>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <hr className="divider " />
                    <h3 >choose a date</h3>
                    <div class="container">
                        <div class="row mb-3">
                            <div class="col-sm">
                                <label for="checkin">checkin</label>
                                <input type="date" id="checkin" name="checkin"/>
                            </div>
                            <div class="col-sm">
                                <label for="checkout">checkout</label>
                                <input type="date" id="checkout" name="checkout"/>
                            </div>
                        </div>
                    </div>
                    
                    <h3 >
                        perks
                    </h3>

                    <div class="container">
                        <div class="row">
                            <div class="col-sm">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" value="wifi" name="perks[]" class="custom-control-input" id="customCheck1"/>
                                <label class="custom-control-label" for="customCheck1">wifi</label>
                            </div>
                            </div>
                            <div class="col-sm">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" value="tv" name="perks[]" class="custom-control-input" id="customCheck1"/>
                                <label class="custom-control-label" for="customCheck1">tv</label>
                            </div>
                            </div>  
                        </div>
                        <div class="row">
                            <div class="col-sm">
                            <div class="custom-control custom-checkbox">
                                <input value="dryer" type="checkbox" name="perks[]" class="custom-control-input" id="customCheck1"/>
                                <label class="custom-control-label" for="customCheck1">dryer</label>
                            </div>
                            </div>
                            <div class="col-sm">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" value="kitchen" name="perks[]" class="custom-control-input" id="customCheck1"/>
                                <label class="custom-control-label" for="customCheck1">kitchen</label>
                            </div>
                            </div>  
                        </div>
                </div>
                <hr className="divider" />
                <h3 >adresse</h3>

                    <div class="container"  >
                        <div class="row">
                            <div class="col-sm">
                            <div class="form-group">
                            <label for="country">Select a country:</label>
                                <select id="country" class="form-select" name="wilaya">
                                    <option value="">Select a country</option>
                                    <option value="Algeria">Algeria</option>
                                    <option value="England">England</option>
                                </select>
                            </div>
                            </div>
                            
                            <div class="col-sm">
                            <div class="form-group">
                            <label for="state">Select a state:</label>
                                <select class="form-select" id="state" name="commune" disabled>
                                    <option value="">Select a state</option>
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
 
 <IndexPage/>


    </div>
    






  );
}

export default Home;
