import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BookingPage from './pages/BookingPage';
import Layout from "./Layout";
import axios from "axios";
import Booking from './Booking';
import BookingsPage from "./pages/BookingsPage";
import PlacePage from "./pages/PlacePage";
import ProfilePage from "./pages/ProfilePage.jsx";
import { PageRoutes } from './Routes/PageRoutes';
import PlacesFormPage from './pages/PlacesFormPage'
import PlacesPage from './pages/PlacesPage'
import UsersDashboardPage from './pages/UsersDashboard'
import ValidatePage from './pages/validatePage'
import { AppConsts } from './Routes/AppConsts';
// import Popup from './Popup/Popup';
import Home from './pages/Home';
import ReservationUpdatePage from './pages/validatePage';
import NotFound from './pages/NotFound';

axios.defaults.baseURL = AppConsts.ServerAddress;


function App() {


  //const [appartement,setAppartement] = useState(null);
  /*  useEffect(() => {
     if (!id) {
       return;
     }
     axios.get(`/places/${id}`).then(response => {
       setAppartement(response.data);
     });
   }, [id]);
 
   if (!appartement) return ''; */
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PageRoutes.Home} element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path={PageRoutes.AccountBookingById} element={<BookingPage />} />
          <Route path={PageRoutes.BookingById} element={<Booking />} />
          <Route path={PageRoutes.AccountBookings} element={<BookingsPage />} />
         <Route path={PageRoutes.UserPlaces } element={<PlacesPage/>}/>
          <Route path={PageRoutes.deleteAppartement } element={<PlacesPage/>}/>
          <Route path={PageRoutes.NewPlace} element={<PlacesFormPage />} />
          <Route path={PageRoutes.updateAppartement} element={<PlacesFormPage />} />
           <Route path={PageRoutes.PlaceById} element={<PlacePage />} />
          <Route path={PageRoutes.Search} element={<Home />} />
          <Route path={PageRoutes.UsersDashboard} element={<UsersDashboardPage />} /> deleteAppartement
          <Route path={PageRoutes.validateReservation} element={<ReservationUpdatePage />} />
          <Route path={PageRoutes.ProfilePage} element={<ProfilePage />} />
          <Route component={NotFound} />
        </Route>

        <Route>
          <Route path={PageRoutes.Login} element={<LoginPage />} />
          <Route path={PageRoutes.SignUp} element={<SignupPage />} />
        </Route>

      </Routes>
    </BrowserRouter>


  );
}

export default App;
