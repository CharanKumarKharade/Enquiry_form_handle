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
      name: formData.uname,
      email: formData.uemail,
      phone: formData.uphone,
      index: formData.index,
    };
    let oldUserData = [...userData, currentData];
    setuserData(oldUserData);
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
    </>
  );
}

export default App;
