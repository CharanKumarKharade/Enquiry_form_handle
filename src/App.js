import { useState } from "react";
import "./App.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-notifications/lib/notifications.css";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
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
    if (formData.index === "") {
      let UpdatedData = userData.filter(
        (v) => v.uemail === formData.uemail || v.uphone === formData.uphone
      );
      if (UpdatedData.length >= 1) {
        NotificationManager.info("Email or Phone Already Exists", "note");
      } else {
        let oldUserData = [...userData, currentData];
        setuserData(oldUserData);
        NotificationManager.success("Success", "Added data");
        setformData({
          uname: "",
          uemail: "",
          uphone: "",
          index: "",
        });
      }
    } else {
      let editIndex = formData.index;
      let oldData = userData;
      let checkFilter = userData.filter(
        (v, i) =>
          (v.uemail === formData.uemail || v.uphone === formData.uphone) &&
          i !== editIndex
      );
      if (checkFilter.length === 0) {
        oldData[editIndex]["uname"] = formData.uname;
        oldData[editIndex]["uemail"] = formData.uemail;
        oldData[editIndex]["uphone"] = formData.uphone;
        setuserData(oldData);
        setformData({
          uname: "",
          uemail: "",
          uphone: "",
          index: "",
        });
      } else {
        NotificationManager.info("Email or Phone Already Exists", "note");
      }
    }
    event.preventDefault();
  };

  let deleteData = (index) => {
    let UpdatedData = userData.filter((v, i) => i !== index);
    setuserData(UpdatedData);
    toast.success("Deleted successfully");
  };
  let editData = (index) => {
    let editRow = userData.filter((v, i) => i === index)[0];
    editRow["index"] = index;
    setformData(editRow);
  };
  return (
    <>
      <ToastContainer />
      <NotificationContainer />
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
                    <button onClick={() => deleteData(i)}>Delete</button>
                    <button onClick={() => editData(i)}>Edit</button>
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
