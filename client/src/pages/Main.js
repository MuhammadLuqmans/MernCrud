import React, { useState, useEffect } from "react";
import Axios from "axios";

function Main() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [dataList, setDataList] = useState([]);
  const [updateUser, setUpdate] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/read")
      .then((res) => setDataList(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handelList = () => {
    console.log(userName + " " + " " + email);
    Axios.post("http://localhost:3001/insert", {
      userName: userName,
      email: email,
    });
  };
  const handelUpdate = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      updateUser: updateUser,
    });
    console.log(updateUser);
  };
  const deletbtn = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  };
  return (
    <div>
      <br />
      <label>User Name: </label>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />
      <br />
      <label>Email: </label>
      <input
        type="email"
        required
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handelList}>Submite</button>
      <br />
      <br />
      <div
        style={{
          maxWidth: "600px",
          margin: "auto",
          background: "#0ff",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        {dataList.map((data, index) => {
          return (
            <div key={index}>
              <ul>
                <li>
                  <h3 style={{ textAlign: "left" }}>{data.userName}</h3>
                  <p
                    style={{
                      background: "#0e0e0e85",
                      fontWeight: "bold",
                      fontFamily: "Roboto",
                      textAlign: "left",
                      color: "#fff",
                      padding: "5px 10px",
                    }}
                  >
                    {data.email}
                  </p>
                  <input
                    type="text"
                    placeholder="update User..."
                    onChange={(e) => setUpdate(e.target.value)}
                  />
                  <button onClick={() => handelUpdate(data._id)}>Update</button>
                  <br />
                  <button onClick={() => deletbtn(data._id)}>Delete</button>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Main;
