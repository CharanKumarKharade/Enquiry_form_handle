import { useState } from "react";
import "./App.css";

function App() {
  let [formData, setformData] = useState({
    uname: "",
    uemail: "",
    uphone: "",
    index: "",
  });
  let [userData, setuserData] = useState([]);
  let getValue = (event) => {
    let oldData = { ...formData };
    let inputName = event.target.name;
    oldData[inputName] = event.target.value;
    setformData(oldData);
  };
  let handleSubmit = (event) => {
    let currentData = {
      uname: formData.uname,
      uemail: formData.uemail,
      uphone: formData.uphone,
      index: formData.index,
    };
    let oldUserData = [...userData, currentData];
    setuserData(oldUserData);
    setformData({
      uname: "",
      uemail: "",
      uphone: "",
      index: "",
    });
    event.preventDefault();
  };
  return (
    <>
      <div className="form-data">
        <h2>Enquiry Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-elements">
            <label>Name </label>
            <br />
            <input
              type="text"
              onChange={getValue}
              name="uname"
              value={formData.uname}
            />
          </div>
          <div className="form-elements">
            <label>Email </label>
            <br />
            <input
              type="email"
              onChange={getValue}
              name="uemail"
              value={formData.uemail}
            />
          </div>
          <div className="form-elements">
            <label>Phone Number </label>
            <input
              type="text"
              onChange={getValue}
              name="uphone"
              value={formData.uphone}
            />
          </div>

          <button>{formData.index !== "" ? "Update" : "Save"}</button>
        </form>
      </div>
      <div>
        <table border="1">
          <tr>
            <th>Sl.no</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
          {userData.length >= 1 ? (
            userData.map((obj, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{obj.uname}</td>
                  <td>{obj.uemail}</td>
                  <td>{obj.uphone}</td>
                  <td>
                    <button>Edit</button>
                    <button>Save</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          )}
        </table>
      </div>
    </>
  );
}

export default App;
