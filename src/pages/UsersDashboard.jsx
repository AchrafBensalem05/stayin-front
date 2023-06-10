import { PageRoutes } from "../Routes/PageRoutes";
import { ApiRoutes } from "../Routes/ApiRoutes";
import { AppConsts } from "../Routes/AppConsts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



// TODO: implement search
// TODO: implement filter

const UsersDashboardPage = () => {

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [page, setPage] = useState([0]);

  let users = [];

  async function DeleteUser(user) {
    users.splice(users.indexOf(user), 1);
    await fetch(AppConsts.ServerAddress + ApiRoutes.DeleteUserById.replace("{userid}", user.Id));
    DisplayUsers();
  }

  function EditUser(user) {
    navigate(PageRoutes.ProfilePage, {
      state: { editing: true, userId : user.Id }
    });
  }

  function OpenUserProfile(user) {
    navigate(PageRoutes.ProfilePage, {
      state: { editing: false, userId : user.Id }
    });
  }


  function PreviousPage() {
    if (Number(page) <= 0)
      return;

    ; (async () => {
      var result = await fetch(AppConsts.ServerAddress + ApiRoutes.GetAllUsers.replace("{page}", Number(page) - 1));
      users = await result.json();
      DisplayUsers();
      setPage(Number(page) - 1);
    })()

  }
  function NextPage() {

    ; (async () => {
      var result = await fetch(AppConsts.ServerAddress + ApiRoutes.GetAllUsers.replace("{page}", Number(page) + 1));
      users = await result.json();
      DisplayUsers();
      setPage(Number(page) + 1);
    })()
  }



  function DisplayUsers() {
    var displayList = [];

    for (let i = 0; i < users.length; i++) {
      const user = users[i];

      displayList.push(
        <div key={user.Username}>
          <span>{user.Username}</span>
          <span>{user.Email}</span>
          <span>{(user.PhoneNumber == undefined || user.PhoneNumber == "") ? "None" : user.PhoneNumber}</span>
          <span>{user.Type}</span>
          <span>{user.ReservationCount}</span>
          <span>{user.PublicationsCount}</span>
          <span><button className="update" onClick={() => EditUser(user)}>Edit</button></span>
          <span><button className="delete" onClick={() => DeleteUser(user)}>Delete</button></span>
          <span className="profile" onClick={() => OpenUserProfile(user)}><img src="/assets/profile.svg"></img></span></div>
      );
    }

    setData(displayList);
  }


  useEffect(() => {
    ; (async () => {
      var result = await fetch(AppConsts.ServerAddress + ApiRoutes.GetAllUsers.replace("{page}", page));
      users = await result.json();
      DisplayUsers();
    })()
  }, [])

  return (
    <div className="users-page">
      <div className="hossem-search">
        <select>
          <option value="Username">Username</option>
          <option value="Email">Email</option>
          <option value="PhoneNumber">Phone number</option>
          <option value="Type">Type</option>
          <option value="ReservationsCount">Reservations created</option>
          <option value="AppartmentsCount">Appartment publications</option>
        </select>
        <input type="text" placeholder="Search..."></input>
      </div>

      <div className="table-header">
        <span>Username</span>
        <span>Email</span>
        <span>Phone Number</span>
        <span>Type</span>
        <span>Reservations</span>
        <span>Publications</span>
      </div>
      <div className="hossem-table">
        {data}
      </div>

      <div className="paging">
        <button onClick={() => PreviousPage()} >&lt;</button>
        <span>{page}</span>
        <button onClick={() => NextPage()}>&gt;</button>
      </div>
    </div>
  );

}

export default UsersDashboardPage