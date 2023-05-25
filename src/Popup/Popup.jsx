import './Popup.css';

import { AiOutlineFilter } from 'react-icons/ai';
function Popup() {
  return (
    <>
<button variant="" data-toggle="modal" data-target=".bd-example-modal-lg" className="d-flex justify-content-center  align-items-center mx-2 mt-3 signup text-dark"> <AiOutlineFilter  style={{ marginRight: '0.5rem' }} />Filter</button>
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
                        <button type="submit" className="btnp mb-3 mt-3 px-3 py-2 text-light ">Submit</button>
                    </div>   
                </form>
            </div>
        </div>
     </div>
  </div>
</div>
    </>
  );
}

export default Popup;
