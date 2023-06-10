// import Header from "../Header.jsx"
import { useLocation } from "react-router-dom";
import IndexPage from "./IndexPage";
import PlacesPage from "./IndexPage";
import { AppConsts } from "../Routes/AppConsts";
import { ApiRoutes } from "../Routes/ApiRoutes";
import { useEffect, useState } from "react";

export default function ProfilePage() {

    var location = useLocation()

    let editable = null;
    var userid = null;

    const [pageState, setPageState] = useState({ imageChanged: false })

    const defaultImage = "/assets/profile.svg";

    if (location.state) {
        editable = location.state.editing;
        userid = location.state.userId;
    }
    else {
        editable = true;
        userid = AppConsts.GetUserId();
    }

    const [user, setUser] = useState({});
    const [reservations, setReservations] = useState([]);
    const [publications, setPublications] = useState([]);

    useEffect(() => {
        ; (async () => {

            var input = document.querySelector("#ProfilePic");
            setPageState({ imageChanged: true });
            input.onchange = (e) => {
                setPageState({ imageChanged: true });
                var file = input.files[0];
                document.querySelector(".profile-page>.left-section>div>img").src = URL.createObjectURL(file);
            }

            {
                var response = await fetch(AppConsts.ServerAddress + ApiRoutes.GetUserById.replace("{userid}", userid))
                var content = await response.json();
                setUser(content.Body);
            }
            {
                var response = await fetch(AppConsts.ServerAddress + ApiRoutes.GetReservationsForUser.replace("{userid}", userid))
                var content = await response.json();
                setReservations(content);
            }
            {
                var response = await fetch(AppConsts.ServerAddress + ApiRoutes.GetPublicationsForUser.replace("{userid}", userid))
                var content = await response.json();
                setPublications(content);
            }
        })();
    }, []);



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

    async function EditUser() {
        var newUser = {};
        newUser.Username = document.querySelector("#Username").textContent;
        newUser.Email = document.querySelector("#Email").textContent;
        newUser.PhoneNumber = document.querySelector("#PhoneNumber").textContent;
        newUser.Description = document.querySelector("#Description").textContent;

        if (pageState.imageChanged) {
            setPageState({ imageChanged: false })
            var file = document.querySelector("#ProfilePic").files[0];

            var requestBody = {
                FileType: "",
                Content: ""
            }
            // Get file extension
            var parts = file.name.split(".");
            requestBody.FileType = "." + parts[parts.length - 1];


            // Create file reader
            var reader = new FileReader();

            // When data has been read
            reader.onload = async function (e) {
                // Base64 encode the contend of the file that we read
                requestBody.Content = window.btoa(reader.result);

                // Send request to storage server
                var result = await fetch(AppConsts.ServerAddress + ApiRoutes.UploadFile,
                    {
                        method: "post",
                        body: JSON.stringify(requestBody),
                        headers: { "Content-Type": "application/json" }
                    });

                // Get body of the response
                var fileId = await result.text();

                newUser.ProfileImageId = fileId;

                await fetch(AppConsts.ServerAddress + ApiRoutes.UpdateUserById.replace("{userid}", user.Id),
                    {
                        method: "POST",
                        body: JSON.stringify(newUser),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );

            }
            // Read the content of the file that we submitted
            reader.readAsBinaryString(file);

        } else {
            newUser.ProfileImageId = user.ProfileImageId;

            await fetch(AppConsts.ServerAddress + ApiRoutes.UpdateUserById.replace("{userid}", user.Id),
                {
                    method: "POST",
                    body: JSON.stringify(newUser),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }




    }

    return (
        <div>


            <div className="profile-page">
                <button onClick={() => window.history.back()} ><img src="/assets/arrow-left.svg" alt="arrow left" /></button>
                <div className="left-section">
                    <div id="profile-pic-container">
                        <img src={
                            (user.ProfileImageId != null) ?
                             AppConsts.ServerAddress + 
                             ApiRoutes.FileById.replace("{id}", user.ProfileImageId) 
                             : defaultImage}
                              alt="profile picture" />
                        <input type="file" id="ProfilePic" />
                    </div>
                    <div className="display" spellCheck="false" contenteditable={editable.toString()} id="Username">{user?.Username}</div>
                    <div className="display" spellCheck="false" contenteditable={editable.toString()} id="Email">{user?.Email}</div>
                    <div className="display" spellCheck="false" contenteditable={editable.toString()} id="PhoneNumber">{user?.PhoneNumber}</div>
                    <div className="display" spellCheck="false" contenteditable={editable.toString()} id="Description">{user?.Description}</div>
                    {
                        (!editable) ? "" :
                            <div className="button-container">
                                <button onClick={() => EditUser()}>Edit</button>
                            </div>
                    }
                </div>
                <div className="right-section">
                    <div>
                        <span>Publications: </span>
                        {
                            publications?.length > 0 && publications.map(publication => {
                                return (
                                    <div>
                                        <div><span>{publication.Title}</span><span>
                                            {(!editable) ? "" :
                                                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                                    onClick={() => DeletePublication(publication)}
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M16 9L13.0001 11.9999M13.0001 11.9999L10 15M13.0001 11.9999L10.0002 9M13.0001 11.9999L16.0002 15M8 6H19C19.5523 6 20 6.44772 20 7V17C20 17.5523 19.5523 18 19 18H8L2 12L8 6Z"
                                                        stroke="#00CEE0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            }
                                            {(!editable) ? "" :
                                                <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none"
                                                    onClick={() => EditPublication(publication)}

                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M12 3.99997H6C4.89543 3.99997 4 4.8954 4 5.99997V18C4 19.1045 4.89543 20 6 20H18C19.1046 20 20 19.1045 20 18V12M18.4142 8.41417L19.5 7.32842C20.281 6.54737 20.281 5.28104 19.5 4.5C18.7189 3.71895 17.4526 3.71895 16.6715 4.50001L15.5858 5.58575M18.4142 8.41417L12.3779 14.4505C12.0987 14.7297 11.7431 14.9201 11.356 14.9975L8.41422 15.5858L9.00257 12.6441C9.08001 12.2569 9.27032 11.9013 9.54951 11.6221L15.5858 5.58575M18.4142 8.41417L15.5858 5.58575"
                                                        stroke="#00CEE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            }

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
                            reservations?.length > 0 && reservations.map(reservation => {
                                return (

                                    <div>
                                        <span>{reservation.PublicationTitle}</span>
                                        <span>
                                            <span>{reservation.StartedDate}</span>
                                            <span>{reservation.EndedDate}</span>
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