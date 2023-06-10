import { Link, useParams } from "react-router-dom";
import { useState , useEffect } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { AppConsts } from "./Routes/AppConsts";
import { ApiRoutes } from "./Routes/ApiRoutes";
import { PageRoutes } from "./Routes/PageRoutes";
import reserve from "./images/reservation.jpg"
export default function Booking() {


  
  const user = AppConsts.GetUserId();
  

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [redirect, setRedirect] = useState('');
  const [message, setMessage] = useState('');
  const [price, setPrice] = useState('');


 /*  const [socket, setSocket] = useState(); 
 
  useEffect(() => { 
    setSocket(io("http://localhost:8800")); 
  }, []); 
 
 
  
  useEffect(() => { 
      socket?.on('customEvent', (data) => {
      console.log('Received custom event:', data);
  }, [socket])
}
  );
 */
  const queryParameters = new URLSearchParams(window.location.search)
  // const AppartementId = queryParameters.get("id") 
  const { id } = useParams();
  // console.log(id)

  axios.defaults.baseURL = AppConsts.ServerAddress;

  const [appartement, setAppartement] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [reservedDates, setReservedDates] = useState([]);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);


  let numberOfNights = 0;
  if (date[0].startDate && date[0].endDate) {
    numberOfNights = differenceInCalendarDays(new Date(date[0].endDate), new Date(date[0].startDate));
    console.log(numberOfNights)
  }

 
  /* try {
    
    axios.get(ApiRoutes.GetAppartementById.replace("{id}", id)).then(async (response) => {
      setAppartement(response.data)
      console.log(appartement)
      const reservedDates = await appartement.reservedDates;
     // console.log("reserve"+reservedDates);
      setPrice(numberOfNights * appartement.price);
      /*  for (let i = 0; i < reservedDates.length; i++) {
           const date=new Date(reservedDates[i])
           const dateString= date.toLocaleDateString();
        
       };  
      setReservedDates(reservedDates);
    //  console.log("appartement"+appartement)
   
    });



  } catch (error) {

  } */
     useEffect(() => { 
 
  
    
    axios.get(ApiRoutes.GetAppartementById.replace("{id}", id)).then(async (response) => {
      setAppartement(response.data)
      console.log(appartement)
      const reservedDates = await appartement.reservedDates;
     // console.log("reserve"+reservedDates);
      setPrice(numberOfNights * appartement.price);
      /*  for (let i = 0; i < reservedDates.length; i++) {
           const date=new Date(reservedDates[i])
           const dateString= date.toLocaleDateString();
      
       };  */
      console.log(price)
      setReservedDates(reservedDates);
    //  console.log("appartement"+appartement)
   
    });
     }, []);
   

   const reservedDate = appartement.reservedDates;
    console.log(reservedDate);
   

  

    


    if (reservedDate) {
      var dateObjects = reservedDate.map((reservedDate) => new Date(reservedDate));
     // console.log(dateObjects);
  
    } else {
      console.log("The dates array is undefined.");
    }

    console.log(dateObjects);
  /*   const isDateDisabled = (date) => {
      return reservedDates.includes(date);
    }; */



  async function bookThisPlace() {
    const user=AppConsts.GetUserId()
    
    setIsLoading(true);

    try {
      const response = await axios.post(ApiRoutes.CreateReservationForAppartement.replace("{id}", id), {
        //appartement:id,
        checkIn: date[0].startDate,
        checkOut: date[0].endDate,
        numberOfGuests: numberOfGuests,
        name: name,
        phone: phone,
        email: email,
        price: (numberOfNights+1) * appartement.price,
        user: user,
        reserved: false,
        //  reservedDates:["2023-05-03" , "2023-05-04", "2023-05-05"],


      

      });
      const bookingId = response.data._id;
      setRedirect(PageRoutes.AccountBookingById.replace(":id", bookingId));
    } catch (error) {


    } finally {
      setIsLoading(false);
    }



  }

  if (redirect) {
    return <Navigate to={redirect} />
  }


  console.log(new Date('2023-06-12'));
 

  return (
    
   
<div>
  <div className="h-screen flex relative justify-end">
    <div className="w-1/2 h-full absolute top-0 left-0">
      <img src={reserve} alt="" className="h-full w-full object-cover" />
      <div className="h-full w-full absolute top-0 left-0 bg-black opacity-50"></div>
      <div className="h-full w-full absolute top-0 left-0 flex flex-col items-center justify-center">
        <div className="text-white text-5xl font-semibold mb-4">Discover a Beautiful Contest</div>
        <div className="text-white text-3xl font-semibold">Rooms Starting from <strong>{appartement.price} $</strong> per night</div>
      </div>
    </div>



<div className=" flex items-center mx-40">
      
<form class="w-full max-w-lg">
  
  <div class="flex flex-wrap -mx-3 mb-6">
  <div className=" py-4 px-4 ml-32 border-t ">
           
           <DateRange
             editableDateInputs={true}
             onChange={(item) => setDate([item.selection])}
             moveRangeOnFirstSelection={false}
             ranges={date}
             disabledDates={dateObjects}

           // disabledDates={[new Date('2023-06-20'), new Date('2023-06-21')]}
             className="date"
             minDate={new Date()}
           />
         </div>

    <div class="w-full px-3 flex items-center border-b border-teal-500 py-2">

  
       <input type="text" required class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"  placeholder="Full name" 
        value={name}
        onChange={ev => setName(ev.target.value)} />
    </div>

    <div class="w-full px-3 flex items-center border-b border-teal-500 py-2">
       
    <input type="number" required class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"  placeholder="Number of guests" 
             value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)} />
    </div>

    <div class="w-full px-3 flex items-center border-b border-teal-500 py-2">
      
    <input type="number" required class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"  placeholder="Phone Number" 
               value={phone}
               onChange={ev => setPhone(ev.target.value)}  />
    </div>

    <div class="w-full px-3 flex items-center border-b border-teal-500 py-2">
    <input type="email" required class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"  placeholder="Email" 
               value={email}
               onChange={ev => setEmail(ev.target.value)}  />
    </div>

  </div>
  <button onClick={bookThisPlace} className="bg-[#02b4c4] hover:bg-[#02b4c4] ml-40 text-white font-bold py-2 px-4 rounded" disabled={isLoading}>
          Book this place
          <ToastContainer />
          {numberOfNights > 0 && (

            <span>$ {appartement.price * numberOfNights}</span>
          )
          }
        </button>
  
</form>

    </div>
    

  </div>
 
</div>








      

   






  );


}


{/* <div className="flex">
      <div className="h-screen w-1/2  flex ">
        <img src={reserve}  className="h-full w-full object-cover" alt="" />
      </div> 
     </div>  */}

  


      
      {/* <div className="bg-white py-32 px-64 shadow  rounded-2xl" >
      <div>
        <p className="text-center text-blue-700 text-base"> Reservation request</p> 
        </div>
        <div className="text-2xl text-center"  >
          price per night : {appartement.price}
        </div>
        <div className="border rounded-2xl mt-4">
//////////////////////////////////////////////////////////
          <div className=" py-4 px-4 ">
                    <label>Check in :</label>
                    <input type="Date"  value={checkIn} onChange={ev =>setCheckIn(ev.target.value)}/> 
                    </div>
                    <div></div>
                    <div className=" py-4 px-4 ">
                    <label>Check out :</label>
                    <input type="Date"  value={checkOut} onChange={ev =>setCheckOut(ev.target.value)} />  
                    </div>   
           <DateRangePicker
                                ranges={[selectedRange.selection]}
                                onChange={handleSelect} 
                                selectedRange={selectedRange}
                               setSelectedRange={setSelectedRange}  
                             /> 
   //////////////////////////////////////////////////////                         
          <div className=" py-4 px-4 ml-32 border-t ">
           
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
              disabledDates={dateObjects}

            // disabledDates={[new Date('2023-06-20'), new Date('2023-06-21')]}
              className="date"
              minDate={new Date()}
            />
          </div>

          <div className=" py-4 px-4 border-t ">
            <label>Number of guests :</label>
            <input type="number" className="w-full border my-1 py-2 px-3 rounded-2xl" value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)} />
          </div>


          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input type="text"  className="w-full border my-1 py-2 px-3 rounded-2xl"
              value={name}
              onChange={ev => setName(ev.target.value)} />
            <label>Phone number:</label>
            <input type="tel" className="w-full border my-1 py-2 px-3 rounded-2xl"
              value={phone}
              onChange={ev => setPhone(ev.target.value)} />
            <label>email:</label>
            <input type="email" className="w-full border my-1 py-2 px-3 rounded-2xl"
              value={email}
              onChange={ev => setEmail(ev.target.value)} />

          </div>



        </div>

        <button className="primary mt-4" onClick={bookThisPlace} disabled={isLoading}>
          Book this place
          <ToastContainer />
          {numberOfNights > 0 && (

            <span>$ {appartement.price * numberOfNights}</span>
          )
          }
        </button>
        <Link to={PageRoutes.Home}>
          <button className="light mt-8">Annuler</button>
        </Link>
        {message && <div>{message}</div>}
      </div> */}