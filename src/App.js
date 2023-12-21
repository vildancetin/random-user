import React, { useEffect, useState } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loadingImage from "./assets/loading.gif";


const url = "https://randomuser.me/api/";
function App() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    picture: "",
    dob: "",
    location: "",
    phone: "",
    password: "",
  });
  const [info, setInfo] = useState("");
  const [addUserList, setAddUserList] = useState(JSON.parse(localStorage.getItem("userlist")) || []);

  const [loading, setLoading] = useState(true);

  const notify=()=>toast.warn('You cannot add twice!', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });

  const handleIcon = (personInfo) => {
    setInfo(personInfo);
  };

  const getUser = () => {
    try {

      fetch(url)
        .then((res) => {
          if(!res.ok){
            throw new Error("Something went wrong")
          }
          return res.json()
        })

        .then((data) => setUser(data.results[0]));
    } catch (error) {
      
      console.log(error);
    }finally{
      setLoading(false)
    }
  };

  const addUserToList = () => {
    if (user) {
      if (!addUserList.includes(user)) {
        setAddUserList([...addUserList, user]);
        localStorage.setItem("userlist",JSON.stringify(addUserList))
      }
      else{notify()}
    }
  };
  useEffect(() => {
    setLoading(false)
    getUser();
  }, []);

  const {

    picture: { large },

  } = user;

  return (
    <main>
      {loading && <img src={loadingImage}/>}
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img src={large} alt="random user" className="user-img" />
          <p className="user-title">My {info} is</p>
          <p className="user-value">
            {" "}
            {info === "street"
              ? user["location"]["street"]["name"]
              : info === "name"
              ? user["name"]["first"] + " " + user["name"]["last"]
              : info === "password"
              ? user["login"]["password"]
              : info === "age"
              ? user["dob"][info]
              : user[info]}
          </p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseEnter={(e) => handleIcon(e.target.dataset.label)}
            >
              <img
                src={user["gender"] === "female" ? womanSvg : manSvg}
                alt="user"
                id="iconImg"
              />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseEnter={(e) => handleIcon(e.target.dataset.label)}
            >
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="age"
              onMouseEnter={(e) => handleIcon(e.target.dataset.label)}
            >
              <img
                src={user["gender"] === "female" ? womanAgeSvg : manAgeSvg}
                alt="age"
                id="iconImg"
              />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseEnter={(e) => handleIcon(e.target.dataset.label)}
            >
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseEnter={(e) => handleIcon(e.target.dataset.label)}
            >
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseEnter={(e) => handleIcon(e.target.dataset.label)}
            >
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={getUser}>
              new user
            </button>
            <button className="btn" type="button" onClick={addUserToList}>
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              {addUserList.map((item, index) => 
              (
                <tr className="body-tr" key={index}>
                  <td>{item.name.first}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.dob.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
      <ToastContainer/>
    </main>
  );
}

export default App;
