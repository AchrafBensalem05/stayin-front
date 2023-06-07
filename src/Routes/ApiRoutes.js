export class ApiRoutes {
    static Login = "/auth/login";
    static SignUp = "/auth/signup";
    static GetAllUsers = "/auth/users/all/{page}";

    static UploadFile = "/storage/file/upload";
    static FileById = "/storage/file/{id}";

    static GetReservations = "/ms-reservation/reservation/getReservations";
    static CreateReservation = "/ms-reservation/reservation/createReservation"
    static ValidateRerservation= "/ms-reservation/reservation/validate/{id}/{token}/{PayerId}"
    static GetAppartementById = "/ms-reservation/reservation/getAppartementId/{id}";
    static ReservationGetPlaces = "/ms-reservation/places/{id}";
    static CreateReservationForAppartement = "/ms-reservation/reservation/createReservation/{id}"
    static GetNotificationByUser = "/ms-reservation/notification/{userid}"
    static SetNotificationRead = "/ms-reservation/notification/setread/{id}"
    

    static Paid= "/payment/create/order"
    
    static GetPlaceById = "/appartement/places/{id}";
    static GetAllPlaces = "/appartement/places/all";
    static AddPlace = "/appartement/places";
    static Profile = "/appartement/profile";
    static UserPlaces = "/appartement/user-places/{owner}";
    static FeedBack= "/appartement/feedBack";
    static FeedBackById= "/appartement/feedBack/{id}";
    
}