// import Header from "../Header.jsx"
import IndexPage from "./IndexPage";
import PlacesPage from "./IndexPage";

export default function ProfilePage() {

    // TODO: maybe change this in the future
    let editable = true;

    // TODO: get data from server
    var user = { Username: "hossem", Email: "email@supermail.com", PhoneNumber: "4234324323", Description: "Real great guy to work with Lorem, ipsum dolor sit amet consectetur adipisicing elit." }

    let publications = [
        { Title: "title of the publication", Description: "some description to say about this thing and how good it is", Id: "fmakfdamjk" },
        { Title: "title of the publication", Description: "some description to say about this thing and how good it is", Id: "fmakfdamjk" },
    ]
    let reservations = [
        { PublicationTitle: "title of  for this reservation", StartDate: new Date(), EndDate: new Date() },
        { PublicationTitle: "title of  for this reservation", StartDate: new Date(), EndDate: new Date() },
        { PublicationTitle: "title  for this reservation", StartDate: new Date(), EndDate: new Date() },
        { PublicationTitle: "title of  this reservation", StartDate: new Date(), EndDate: new Date() },
    ]


    function DeletePublication(publication) {
        // TODO: not implemented
        console.log("deleting", publication);
    }

    function EditPublication(publication) {
        // TODO: not implemented
        console.log("editing", publication);
    }

    function OpenPublication(publication) {
        // TODO: not implemented
        console.log("opening", publication);
    }


    function OpenReservation(reservation) {
        // TODO: not implemented
        console.log("opening", reservation);
    }

    return (
        <div>


            <div className="profile-page">
                <button ><img src="/assets/arrow-left.svg" alt="arrow left" /></button>
                <div className="left-section">
                    <div>
                        <img src="/assets/house.jpg" alt="profile picture" />
                        <input type="file" hidden name="ProfilePic" />
                    </div>
                    <div className="display" spellCheck="false" contenteditable={editable.toString()} id="Username">{user.Username}</div>
                    <div className="display" spellCheck="false" contenteditable={editable.toString()} id="Email">{user.Email}</div>
                    <div className="display" spellCheck="false" contenteditable={editable.toString()} id="PhoneNumber">{user.PhoneNumber}</div>
                    <div className="display" spellCheck="false" contenteditable={editable.toString()} id="Description">{user.Description}</div>
                    {
                        (!editable) ? "" :
                            <div className="button-container">
                                <button>Edit</button>
                            </div>
                    }
                </div>
                <div className="right-section">
                    <div>
                        <span>Publications: </span>
                        {
                            publications.map(publication => {
                                return (
                                    <div>
                                        <div><span>{publication.Title}</span><span>
                                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                                onClick={() => DeletePublication(publication)}
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16 9L13.0001 11.9999M13.0001 11.9999L10 15M13.0001 11.9999L10.0002 9M13.0001 11.9999L16.0002 15M8 6H19C19.5523 6 20 6.44772 20 7V17C20 17.5523 19.5523 18 19 18H8L2 12L8 6Z"
                                                    stroke="#00CEE0" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>

                                            <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none"
                                                onClick={() => EditPublication(publication)}

                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M12 3.99997H6C4.89543 3.99997 4 4.8954 4 5.99997V18C4 19.1045 4.89543 20 6 20H18C19.1046 20 20 19.1045 20 18V12M18.4142 8.41417L19.5 7.32842C20.281 6.54737 20.281 5.28104 19.5 4.5C18.7189 3.71895 17.4526 3.71895 16.6715 4.50001L15.5858 5.58575M18.4142 8.41417L12.3779 14.4505C12.0987 14.7297 11.7431 14.9201 11.356 14.9975L8.41422 15.5858L9.00257 12.6441C9.08001 12.2569 9.27032 11.9013 9.54951 11.6221L15.5858 5.58575M18.4142 8.41417L15.5858 5.58575"
                                                    stroke="#00CEE0" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>

                                            <svg width="13px" height="13px" viewBox="-4.5 0 20 20" version="1.1"
                                                onClick={() => OpenPublication(publication)}
                                                xmlns="http://www.w3.org/2000/svg" >
                                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                    <g transform="translate(-305.000000, -6679.000000)" fill="#00CEE0">
                                                        <g transform="translate(56.000000, 160.000000)">
                                                            <path
                                                                d="M249.365851,6538.70769 L249.365851,6538.70769 C249.770764,6539.09744 250.426289,6539.09744 250.830166,6538.70769 L259.393407,6530.44413 C260.202198,6529.66364 260.202198,6528.39747 259.393407,6527.61699 L250.768031,6519.29246 C250.367261,6518.90671 249.720021,6518.90172 249.314072,6519.28247 L249.314072,6519.28247 C248.899839,6519.67121 248.894661,6520.31179 249.302681,6520.70653 L257.196934,6528.32352 C257.601847,6528.71426 257.601847,6529.34685 257.196934,6529.73759 L249.365851,6537.29462 C248.960938,6537.68437 248.960938,6538.31795 249.365851,6538.70769">
                                                            </path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>

                                        </span></div>
                                        <div>{publication.Description}</div>
                                    </div>)


                            })
                        }
                    </div>
                    <div>
                        <span>Reservations: </span>

                        {
                            reservations.length > 0 && reservations.map(reservation => {
                                return (

                                    <div>
                                        <span>{reservation.PublicationTitle}</span>
                                        <span>
                                            <span>{reservation.StartDate.toDateString()}</span>
                                            <span>{reservation.EndDate.toDateString()}</span>
                                            <svg width="13px" height="13px" viewBox="-4.5 0 20 20" version="1.1"
                                                onClick={() => OpenReservation(reservation)}
                                                xmlns="http://www.w3.org/2000/svg" >
                                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                    <g transform="translate(-305.000000, -6679.000000)" fill="#00CEE0">
                                                        <g transform="translate(56.000000, 160.000000)">
                                                            <path
                                                                d="M249.365851,6538.70769 L249.365851,6538.70769 C249.770764,6539.09744 250.426289,6539.09744 250.830166,6538.70769 L259.393407,6530.44413 C260.202198,6529.66364 260.202198,6528.39747 259.393407,6527.61699 L250.768031,6519.29246 C250.367261,6518.90671 249.720021,6518.90172 249.314072,6519.28247 L249.314072,6519.28247 C248.899839,6519.67121 248.894661,6520.31179 249.302681,6520.70653 L257.196934,6528.32352 C257.601847,6528.71426 257.601847,6529.34685 257.196934,6529.73759 L249.365851,6537.29462 C248.960938,6537.68437 248.960938,6538.31795 249.365851,6538.70769">
                                                            </path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>

                                        </span>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
            </div>


        </div>
    );
}